package handlers

import (
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/achadinhos/backend/internal/agenda"
	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/email"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// maxSlotsWindowDays caps the from..to range accepted by the slots endpoint.
const maxSlotsWindowDays = 45

var (
	emailRe = regexp.MustCompile(`^[^@\s]+@[^@\s]+\.[^@\s]+$`)
	hhmmRe  = regexp.MustCompile(`^([01][0-9]|2[0-3]):[0-5][0-9]$`)
)

var (
	ptWeekdays = [...]string{"domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"}
	ptMonths   = [...]string{"", "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"}
)

// formatAgendaQuando renders a booking's start/end in pt-BR, e.g.
// "terça-feira, 15 de julho de 2026, das 14:00 às 15:00 (horário de Brasília)".
// start and end are expected already in the agenda's timezone.
func formatAgendaQuando(start, end time.Time, tz string) string {
	when := fmt.Sprintf("%s, %d de %s de %d, das %02d:%02d às %02d:%02d",
		ptWeekdays[int(start.Weekday())], start.Day(), ptMonths[int(start.Month())], start.Year(),
		start.Hour(), start.Minute(), end.Hour(), end.Minute())
	if tz == "America/Sao_Paulo" {
		when += " (horário de Brasília)"
	}
	return when
}

// AgendaHandler exposes the booking feature: public page info, free slots and
// booking, plus the admin settings CRUD and the Google OAuth connect flow.
type AgendaHandler struct {
	db      *gorm.DB
	svc     *agenda.Service
	mailer  *email.Client
	baseURL string
}

// NewAgendaHandler builds an AgendaHandler. baseURL is the public app URL used
// for the post-OAuth redirect (no trailing slash expected). mailer sends the
// branded booking-confirmation e-mail (best-effort; may be a disabled client).
func NewAgendaHandler(db *gorm.DB, svc *agenda.Service, mailer *email.Client, baseURL string) *AgendaHandler {
	return &AgendaHandler{db: db, svc: svc, mailer: mailer, baseURL: strings.TrimRight(baseURL, "/")}
}

func (h *AgendaHandler) settingsBySlug(c *gin.Context, slug string) (*models.AgendaSettings, bool) {
	var s models.AgendaSettings
	if err := h.db.WithContext(c.Request.Context()).First(&s, "slug = ?", slug).Error; err != nil {
		JSONError(c, http.StatusNotFound, "agenda não encontrada")
		return nil, false
	}
	return &s, true
}

// firstSettings returns the single (first) agenda settings row for the admin
// endpoints, which are not slug-scoped.
func (h *AgendaHandler) firstSettings(c *gin.Context) (*models.AgendaSettings, bool) {
	var s models.AgendaSettings
	if err := h.db.WithContext(c.Request.Context()).
		Order("created_at ASC").First(&s).Error; err != nil {
		JSONError(c, http.StatusNotFound, "agenda não configurada")
		return nil, false
	}
	return &s, true
}

// googleError maps a Google/agenda service error to the proper HTTP response
// without leaking upstream details.
func (h *AgendaHandler) googleError(c *gin.Context, op string, err error) {
	switch {
	case errors.Is(err, agenda.ErrNotConnected):
		JSONError(c, http.StatusConflict, "not_connected")
	case errors.Is(err, agenda.ErrNotConfigured):
		JSONError(c, http.StatusConflict, "google_not_configured")
	default:
		slog.Warn("agenda google call failed", "op", op, "err", err)
		JSONError(c, http.StatusBadGateway, "google_error")
	}
}

// ── Público ──────────────────────────────────────────────────────────────────

// GetPublic handles GET /agenda/:slug — the public booking page info.
func (h *AgendaHandler) GetPublic(c *gin.Context) {
	s, ok := h.settingsBySlug(c, c.Param("slug"))
	if !ok {
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"slug":         s.Slug,
		"display_name": s.DisplayName,
		"title":        s.Title,
		"duration_min": s.DurationMin,
		"timezone":     s.Timezone,
		"connected":    h.svc.Connected(c.Request.Context(), agenda.Owner(s.Slug)),
		"active":       s.Active,
	})
}

// Slots handles GET /agenda/:slug/slots?from=YYYY-MM-DD&to=YYYY-MM-DD.
// Returns the available slot start times in the agenda's local offset.
func (h *AgendaHandler) Slots(c *gin.Context) {
	s, ok := h.settingsBySlug(c, c.Param("slug"))
	if !ok {
		return
	}
	if !s.Active {
		c.JSON(http.StatusOK, gin.H{"slots": []string{}})
		return
	}

	loc, err := time.LoadLocation(s.Timezone)
	if err != nil {
		slog.Warn("agenda has invalid timezone", "slug", s.Slug, "tz", s.Timezone)
		JSONError(c, http.StatusInternalServerError, "invalid agenda timezone")
		return
	}
	now := time.Now().In(loc)
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, loc)

	from, err1 := time.ParseInLocation("2006-01-02", c.DefaultQuery("from", today.Format("2006-01-02")), loc)
	to, err2 := time.ParseInLocation("2006-01-02", c.DefaultQuery("to", from.AddDate(0, 0, 6).Format("2006-01-02")), loc)
	if err1 != nil || err2 != nil || to.Before(from) {
		JSONError(c, http.StatusUnprocessableEntity, "invalid_range")
		return
	}
	if to.Sub(from) > maxSlotsWindowDays*24*time.Hour {
		JSONError(c, http.StatusUnprocessableEntity, "invalid_range")
		return
	}

	// Clamp to [today, horizon].
	if from.Before(today) {
		from = today
	}
	horizonEnd := now.AddDate(0, 0, s.HorizonDays)
	if from.After(horizonEnd) {
		c.JSON(http.StatusOK, gin.H{"slots": []string{}})
		return
	}
	if to.After(horizonEnd) {
		to = time.Date(horizonEnd.Year(), horizonEnd.Month(), horizonEnd.Day(), 0, 0, 0, 0, loc)
	}

	owner := agenda.Owner(s.Slug)
	busy, err := h.svc.FreeBusy(c.Request.Context(), owner, from, to.AddDate(0, 0, 1))
	if err != nil {
		h.googleError(c, "freebusy", err)
		return
	}

	duration := time.Duration(s.DurationMin) * time.Minute
	buffer := time.Duration(s.BufferMin) * time.Minute
	notBefore := now.Add(time.Duration(s.LeadTimeMin) * time.Minute)

	slots := []string{}
	for day := from; !day.After(to); day = day.AddDate(0, 0, 1) {
		windows := s.WorkHours[strconv.Itoa(int(day.Weekday()))]
		for _, t := range agenda.DaySlots(day, windows, duration, buffer, busy, notBefore, horizonEnd) {
			slots = append(slots, t.Format(time.RFC3339))
		}
	}
	c.JSON(http.StatusOK, gin.H{"slots": slots})
}

// Book handles POST /agenda/:slug/book — validates the payload, revalidates
// the slot against FreeBusy (avoiding races) and creates the Calendar event
// with a Google Meet link, inviting the visitor.
func (h *AgendaHandler) Book(c *gin.Context) {
	s, ok := h.settingsBySlug(c, c.Param("slug"))
	if !ok {
		return
	}
	if !s.Active {
		JSONError(c, http.StatusConflict, "agenda_inactive")
		return
	}

	var req dto.AgendaBookRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		JSONError(c, http.StatusBadRequest, "invalid request body")
		return
	}

	loc, err := time.LoadLocation(s.Timezone)
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "invalid agenda timezone")
		return
	}

	details := map[string]string{}
	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	req.Whatsapp = strings.TrimSpace(req.Whatsapp)
	req.Notes = strings.TrimSpace(req.Notes)
	if len(req.Name) < 2 || len(req.Name) > 255 {
		details["name"] = "min=2,max=255"
	}
	if !emailRe.MatchString(req.Email) || len(req.Email) > 255 {
		details["email"] = "email"
	}
	if len(req.Whatsapp) > 64 {
		details["whatsapp"] = "max=64"
	}
	if len(req.Notes) > 2000 {
		details["notes"] = "max=2000"
	}
	start, perr := time.Parse(time.RFC3339, req.Start)
	if perr != nil {
		details["start"] = "rfc3339"
	}
	if len(details) > 0 {
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation failed",
			Code:    http.StatusUnprocessableEntity,
			Details: details,
		})
		return
	}
	start = start.In(loc)

	// Revalidate the requested slot against work hours, lead time, horizon and
	// a fresh FreeBusy snapshot — recomputing the day's slots and requiring
	// membership closes the race between listing and booking.
	now := time.Now().In(loc)
	day := time.Date(start.Year(), start.Month(), start.Day(), 0, 0, 0, 0, loc)
	owner := agenda.Owner(s.Slug)
	busy, err := h.svc.FreeBusy(c.Request.Context(), owner, day, day.AddDate(0, 0, 1))
	if err != nil {
		h.googleError(c, "freebusy", err)
		return
	}
	duration := time.Duration(s.DurationMin) * time.Minute
	buffer := time.Duration(s.BufferMin) * time.Minute
	notBefore := now.Add(time.Duration(s.LeadTimeMin) * time.Minute)
	horizonEnd := now.AddDate(0, 0, s.HorizonDays)
	windows := s.WorkHours[strconv.Itoa(int(day.Weekday()))]

	available := false
	for _, t := range agenda.DaySlots(day, windows, duration, buffer, busy, notBefore, horizonEnd) {
		if t.Equal(start) {
			available = true
			break
		}
	}
	if !available {
		JSONError(c, http.StatusConflict, "slot_taken")
		return
	}

	end := start.Add(duration)
	desc := fmt.Sprintf("Agendamento via %s\n\nNome: %s\nE-mail: %s", h.baseURL, req.Name, req.Email)
	if req.Whatsapp != "" {
		desc += "\nWhatsApp: " + req.Whatsapp
	}
	if req.Notes != "" {
		desc += "\n\nObservações:\n" + req.Notes
	}
	created, err := h.svc.CreateEvent(c.Request.Context(), owner, agenda.EventInput{
		Summary:     s.Title + " — " + req.Name,
		Description: desc,
		Start:       start,
		End:         end,
		Timezone:    s.Timezone,
		Attendee:    req.Email,
		Name:        req.Name,
	})
	if err != nil {
		h.googleError(c, "create_event", err)
		return
	}

	// Persist the booking so the admin can review it in the panel and cross-check
	// against Google. Best-effort: the event already exists on the calendar, so a
	// DB failure must not fail the booking (just logs a warning).
	booking := models.AgendaBooking{
		Slug:          s.Slug,
		Name:          req.Name,
		Email:         req.Email,
		Whatsapp:      req.Whatsapp,
		Notes:         req.Notes,
		StartsAt:      start,
		EndsAt:        end,
		Timezone:      s.Timezone,
		MeetLink:      created.MeetLink,
		GoogleEventID: created.ID,
	}
	if err := h.db.WithContext(c.Request.Context()).Create(&booking).Error; err != nil {
		slog.Warn("agenda booking persist failed", "err", err, "email", req.Email)
	}

	// Branded confirmation e-mail to the visitor. Best-effort: Google already
	// sent its own calendar invite, so a mailer failure must not fail the booking.
	quando := formatAgendaQuando(start, end, s.Timezone)
	if err := h.mailer.SendAgendamentoConfirmado(c.Request.Context(), req.Email, req.Name, s.DisplayName, quando, created.MeetLink); err != nil {
		slog.Warn("agenda confirmation email failed", "err", err, "email", req.Email)
	}

	c.JSON(http.StatusCreated, gin.H{
		"start":     start.Format(time.RFC3339),
		"end":       end.Format(time.RFC3339),
		"meet_link": created.MeetLink,
	})
}

// GoogleCallback handles GET /agenda/google/callback?code&state — the public
// OAuth redirect target. Always redirects back to the admin panel.
func (h *AgendaHandler) GoogleCallback(c *gin.Context) {
	code := c.Query("code")
	state := c.Query("state")
	if code == "" || state == "" {
		c.Redirect(http.StatusFound, h.baseURL+"/admin/?agenda=erro")
		return
	}
	if _, err := h.svc.HandleCallback(c.Request.Context(), code, state); err != nil {
		slog.Warn("agenda google callback failed", "err", err)
		c.Redirect(http.StatusFound, h.baseURL+"/admin/?agenda=erro")
		return
	}
	c.Redirect(http.StatusFound, h.baseURL+"/admin/?agenda=conectada")
}

// ── Admin ────────────────────────────────────────────────────────────────────

// AdminGet handles GET /admin/agenda — settings plus connection status.
func (h *AgendaHandler) AdminGet(c *gin.Context) {
	s, ok := h.firstSettings(c)
	if !ok {
		return
	}
	c.JSON(http.StatusOK, adminAgendaResponse{
		AgendaSettings: *s,
		Connected:      h.svc.Connected(c.Request.Context(), agenda.Owner(s.Slug)),
	})
}

// adminAgendaResponse achata settings + connected num único objeto — é o
// formato que o frontend (adminApi.agendaGet/agendaUpdate) consome.
type adminAgendaResponse struct {
	models.AgendaSettings
	Connected bool `json:"connected"`
}

// AdminUpdate handles PUT /admin/agenda — partial settings update.
func (h *AgendaHandler) AdminUpdate(c *gin.Context) {
	s, ok := h.firstSettings(c)
	if !ok {
		return
	}
	var req dto.AgendaSettingsUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		JSONError(c, http.StatusBadRequest, "invalid request body")
		return
	}

	details := map[string]string{}
	updates := map[string]any{}

	if req.DisplayName != nil {
		v := strings.TrimSpace(*req.DisplayName)
		if len(v) < 2 || len(v) > 255 {
			details["display_name"] = "min=2,max=255"
		} else {
			updates["display_name"] = v
		}
	}
	if req.Title != nil {
		v := strings.TrimSpace(*req.Title)
		if len(v) > 255 {
			details["title"] = "max=255"
		} else {
			updates["title"] = v
		}
	}
	if req.DurationMin != nil {
		if *req.DurationMin < 15 || *req.DurationMin > 240 {
			details["duration_min"] = "min=15,max=240"
		} else {
			updates["duration_min"] = *req.DurationMin
		}
	}
	if req.BufferMin != nil {
		if *req.BufferMin < 0 || *req.BufferMin > 240 {
			details["buffer_min"] = "min=0,max=240"
		} else {
			updates["buffer_min"] = *req.BufferMin
		}
	}
	if req.Timezone != nil {
		if _, err := time.LoadLocation(*req.Timezone); err != nil || *req.Timezone == "" {
			details["timezone"] = "iana_timezone"
		} else {
			updates["timezone"] = *req.Timezone
		}
	}
	if req.LeadTimeMin != nil {
		if *req.LeadTimeMin < 0 || *req.LeadTimeMin > 20160 {
			details["lead_time_min"] = "min=0,max=20160"
		} else {
			updates["lead_time_min"] = *req.LeadTimeMin
		}
	}
	if req.HorizonDays != nil {
		if *req.HorizonDays < 1 || *req.HorizonDays > 365 {
			details["horizon_days"] = "min=1,max=365"
		} else {
			updates["horizon_days"] = *req.HorizonDays
		}
	}
	if req.Active != nil {
		updates["active"] = *req.Active
	}
	if req.WorkHours != nil {
		if msg := validateWorkHours(*req.WorkHours); msg != "" {
			details["work_hours"] = msg
		} else {
			updates["work_hours"] = *req.WorkHours
		}
	}

	if len(details) > 0 {
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation failed",
			Code:    http.StatusUnprocessableEntity,
			Details: details,
		})
		return
	}
	if len(updates) > 0 {
		if err := h.db.WithContext(c.Request.Context()).
			Model(s).Updates(updates).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update agenda settings")
			return
		}
	}
	// Reload to return the persisted state.
	if err := h.db.WithContext(c.Request.Context()).
		First(s, "id = ?", s.ID).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to reload agenda settings")
		return
	}
	c.JSON(http.StatusOK, adminAgendaResponse{
		AgendaSettings: *s,
		Connected:      h.svc.Connected(c.Request.Context(), agenda.Owner(s.Slug)),
	})
}

// validateWorkHours checks weekday keys and HH:MM windows. Returns "" when valid.
func validateWorkHours(wh models.AgendaWorkHours) string {
	for day, windows := range wh {
		d, err := strconv.Atoi(day)
		if err != nil || d < 0 || d > 6 {
			return "weekday keys must be \"0\"..\"6\""
		}
		for _, w := range windows {
			if !hhmmRe.MatchString(w.Start) || !hhmmRe.MatchString(w.End) {
				return "windows must use HH:MM"
			}
			if w.End <= w.Start {
				return "window end must be after start"
			}
		}
	}
	return ""
}

// AdminBookings handles GET /admin/agenda/bookings — the bookings made through
// the agenda, most recent/future first, for review inside the admin panel.
func (h *AgendaHandler) AdminBookings(c *gin.Context) {
	s, ok := h.firstSettings(c)
	if !ok {
		return
	}
	var bookings []models.AgendaBooking
	if err := h.db.WithContext(c.Request.Context()).
		Where("slug = ?", s.Slug).
		Order("starts_at DESC").
		Limit(500).
		Find(&bookings).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list bookings")
		return
	}
	c.JSON(http.StatusOK, gin.H{"bookings": bookings})
}

// GoogleAuthURL handles GET /admin/agenda/google/url — returns the Google
// consent URL for connecting the agenda owner's account.
func (h *AgendaHandler) GoogleAuthURL(c *gin.Context) {
	s, ok := h.firstSettings(c)
	if !ok {
		return
	}
	url, err := h.svc.AuthURL(s.Slug)
	if err != nil {
		h.googleError(c, "auth_url", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"url": url})
}

// GoogleDisconnect handles DELETE /admin/agenda/google — removes the stored
// Google tokens.
func (h *AgendaHandler) GoogleDisconnect(c *gin.Context) {
	s, ok := h.firstSettings(c)
	if !ok {
		return
	}
	if err := h.svc.Disconnect(c.Request.Context(), agenda.Owner(s.Slug)); err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to disconnect")
		return
	}
	c.Status(http.StatusNoContent)
}

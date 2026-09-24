package handlers

import (
	"net/http"
	"regexp"
	"sort"
	"strings"
	"time"

	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// EventHandler exposes the condominium events endpoints: public reads plus
// admin CRUD (the admin routes must be protected by RequireRole("admin")).
type EventHandler struct {
	db *gorm.DB
}

// NewEventHandler builds an EventHandler.
func NewEventHandler(db *gorm.DB) *EventHandler {
	return &EventHandler{db: db}
}

const eventDateLayout = "2006-01-02"

var eventTimeRe = regexp.MustCompile(`^([01]\d|2[0-3]):[0-5]\d$`)

// parseEventDate validates a "YYYY-MM-DD" string and writes a 400 on failure.
func parseEventDate(c *gin.Context, raw string) (time.Time, bool) {
	d, err := time.Parse(eventDateLayout, strings.TrimSpace(raw))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "data inválida (use AAAA-MM-DD)")
		return time.Time{}, false
	}
	return d, true
}

// validateEventTime allows empty or a valid "HH:MM" string.
func validateEventTime(c *gin.Context, raw string) (string, bool) {
	t := strings.TrimSpace(raw)
	if t != "" && !eventTimeRe.MatchString(t) {
		JSONError(c, http.StatusBadRequest, "hora inválida (use HH:MM)")
		return "", false
	}
	return t, true
}

// parseEventDays valida e ordena os dias do request (data crescente). O
// espelho events.event_date/event_time recebe o primeiro dia. Escreve o 400
// e devolve ok=false em entrada inválida.
func parseEventDays(c *gin.Context, inputs []dto.AdminEventDayInput) ([]models.EventDay, bool) {
	days := make([]models.EventDay, 0, len(inputs))
	for _, in := range inputs {
		date, ok := parseEventDate(c, in.Day)
		if !ok {
			return nil, false
		}
		tm, ok := validateEventTime(c, in.Time)
		if !ok {
			return nil, false
		}
		d := models.EventDay{Day: date, DayTime: tm}
		if strings.TrimSpace(in.ID) != "" {
			id, err := uuid.Parse(in.ID)
			if err != nil {
				JSONError(c, http.StatusBadRequest, "id de dia inválido")
				return nil, false
			}
			d.ID = id
		}
		days = append(days, d)
	}
	sort.SliceStable(days, func(i, j int) bool {
		if !days[i].Day.Equal(days[j].Day) {
			return days[i].Day.Before(days[j].Day)
		}
		return days[i].DayTime < days[j].DayTime
	})
	return days, true
}

// preloadDays carrega os dias ordenados junto do evento.
func preloadDays(db *gorm.DB) *gorm.DB {
	return db.Preload("Days", func(db *gorm.DB) *gorm.DB {
		return db.Order("day ASC, day_time ASC")
	})
}

// ── Público ──────────────────────────────────────────────────────────────────

// List handles GET /events — todos os eventos ordenados por data e hora.
func (h *EventHandler) List(c *gin.Context) {
	var events []models.Event
	if err := preloadDays(h.db.WithContext(c.Request.Context())).
		Order("event_date ASC, event_time ASC").
		Find(&events).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list events")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": events})
}

// Get handles GET /events/:id.
func (h *EventHandler) Get(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var ev models.Event
	if err := preloadDays(h.db.WithContext(c.Request.Context())).
		First(&ev, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "evento não encontrado")
		return
	}
	c.JSON(http.StatusOK, ev)
}

// ── Admin ────────────────────────────────────────────────────────────────────

// Create handles POST /admin/events.
func (h *EventHandler) Create(c *gin.Context) {
	var req dto.AdminEventRequest
	if !BindJSON(c, &req) {
		return
	}
	// Clientes novos mandam days; os antigos, event_date/event_time.
	if len(req.Days) == 0 {
		if strings.TrimSpace(req.EventDate) == "" {
			JSONError(c, http.StatusBadRequest, "informe ao menos uma data")
			return
		}
		req.Days = []dto.AdminEventDayInput{{Day: req.EventDate, Time: req.EventTime}}
	}
	days, ok := parseEventDays(c, req.Days)
	if !ok {
		return
	}
	for i := range days {
		days[i].ID = uuid.Nil // create: ids são sempre novos
	}
	ev := &models.Event{
		Title:       strings.TrimSpace(req.Title),
		Description: strings.TrimSpace(req.Description),
		Location:    strings.TrimSpace(req.Location),
		EventDate:   days[0].Day,
		EventTime:   days[0].DayTime,
		Highlight:   req.Highlight,
		Days:        days,
	}
	if err := h.db.WithContext(c.Request.Context()).Create(ev).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create event")
		return
	}
	c.JSON(http.StatusCreated, ev)
}

// Update handles PATCH /admin/events/:id.
func (h *EventHandler) Update(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var ev models.Event
	if err := h.db.WithContext(c.Request.Context()).First(&ev, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "evento não encontrado")
		return
	}

	var req dto.AdminEventPatch
	if !BindJSON(c, &req) {
		return
	}
	updates := map[string]any{}
	if req.Title != nil {
		updates["title"] = strings.TrimSpace(*req.Title)
	}
	if req.Description != nil {
		updates["description"] = strings.TrimSpace(*req.Description)
	}
	if req.Location != nil {
		updates["location"] = strings.TrimSpace(*req.Location)
	}
	if req.EventDate != nil {
		date, ok := parseEventDate(c, *req.EventDate)
		if !ok {
			return
		}
		updates["event_date"] = date
	}
	if req.EventTime != nil {
		tm, ok := validateEventTime(c, *req.EventTime)
		if !ok {
			return
		}
		updates["event_time"] = tm
	}
	if req.Highlight != nil {
		updates["highlight"] = *req.Highlight
	}

	// Days substitui o conjunto: dia com id conhecido é atualizado (mantém a
	// imagem), sem id é criado, e os ausentes saem (arquivo de imagem junto).
	var removedBanners []string
	if req.Days != nil {
		if len(*req.Days) == 0 {
			JSONError(c, http.StatusBadRequest, "informe ao menos uma data")
			return
		}
		days, ok := parseEventDays(c, *req.Days)
		if !ok {
			return
		}
		var existing []models.EventDay
		if err := h.db.WithContext(c.Request.Context()).
			Where("event_id = ?", ev.ID).Find(&existing).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to load event days")
			return
		}
		byID := make(map[uuid.UUID]*models.EventDay, len(existing))
		for i := range existing {
			byID[existing[i].ID] = &existing[i]
		}
		keep := map[uuid.UUID]bool{}
		err := h.db.WithContext(c.Request.Context()).Transaction(func(tx *gorm.DB) error {
			for i := range days {
				d := &days[i]
				if cur, okID := byID[d.ID]; d.ID != uuid.Nil && okID {
					keep[d.ID] = true
					if err := tx.Model(cur).Updates(map[string]any{
						"day": d.Day, "day_time": d.DayTime,
					}).Error; err != nil {
						return err
					}
					continue
				}
				nd := models.EventDay{EventID: ev.ID, Day: d.Day, DayTime: d.DayTime}
				if err := tx.Create(&nd).Error; err != nil {
					return err
				}
				keep[nd.ID] = true
			}
			for i := range existing {
				if keep[existing[i].ID] {
					continue
				}
				if err := tx.Delete(&models.EventDay{}, "id = ?", existing[i].ID).Error; err != nil {
					return err
				}
				if existing[i].BannerURL != "" {
					removedBanners = append(removedBanners, existing[i].BannerURL)
				}
			}
			return nil
		})
		if err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update event days")
			return
		}
		// Espelha o primeiro dia no evento.
		updates["event_date"] = days[0].Day
		updates["event_time"] = days[0].DayTime
	}

	if len(updates) > 0 {
		if err := h.db.WithContext(c.Request.Context()).Model(&ev).Updates(updates).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update event")
			return
		}
	}
	for _, url := range removedBanners {
		removeUploadedFile(url)
	}
	if err := preloadDays(h.db.WithContext(c.Request.Context())).
		First(&ev, "id = ?", ev.ID).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to reload event")
		return
	}
	c.JSON(http.StatusOK, ev)
}

// Delete handles DELETE /admin/events/:id (soft delete).
func (h *EventHandler) Delete(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	res := h.db.WithContext(c.Request.Context()).Delete(&models.Event{}, "id = ?", id)
	if res.Error != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete event")
		return
	}
	if res.RowsAffected == 0 {
		JSONError(c, http.StatusNotFound, "evento não encontrado")
		return
	}
	c.Status(http.StatusNoContent)
}

// UploadBanner handles POST /admin/events/:id/banner (multipart, campo "file").
// Salva a imagem em /uploads/event-banners/ e grava banner_url no evento.
func (h *EventHandler) UploadBanner(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var ev models.Event
	if err := h.db.WithContext(c.Request.Context()).First(&ev, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "evento não encontrado")
		return
	}
	url, ok := saveUploadedFile(c, "event-banners", false, false)
	if !ok {
		return
	}
	if err := h.db.WithContext(c.Request.Context()).Model(&ev).
		Update("banner_url", url).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save banner")
		return
	}
	c.JSON(http.StatusOK, gin.H{"banner_url": url})
}

// findEventDay resolve :id/:dayID e garante que o dia pertence ao evento.
func (h *EventHandler) findEventDay(c *gin.Context) (*models.EventDay, bool) {
	eventID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return nil, false
	}
	dayID, err := uuid.Parse(c.Param("dayID"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid day id")
		return nil, false
	}
	var day models.EventDay
	if err := h.db.WithContext(c.Request.Context()).
		First(&day, "id = ? AND event_id = ?", dayID, eventID).Error; err != nil {
		JSONError(c, http.StatusNotFound, "dia do evento não encontrado")
		return nil, false
	}
	return &day, true
}

// UploadDayBanner handles POST /admin/events/:id/days/:dayID/banner
// (multipart, campo "file") — a imagem daquele dia do evento.
func (h *EventHandler) UploadDayBanner(c *gin.Context) {
	day, ok := h.findEventDay(c)
	if !ok {
		return
	}
	url, ok := saveUploadedFile(c, "event-banners", false, false)
	if !ok {
		return
	}
	old := day.BannerURL
	if err := h.db.WithContext(c.Request.Context()).Model(day).
		Update("banner_url", url).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save banner")
		return
	}
	if old != "" && old != url {
		removeUploadedFile(old)
	}
	c.JSON(http.StatusOK, gin.H{"banner_url": url})
}

// DeleteDayBanner handles DELETE /admin/events/:id/days/:dayID/banner.
func (h *EventHandler) DeleteDayBanner(c *gin.Context) {
	day, ok := h.findEventDay(c)
	if !ok {
		return
	}
	old := day.BannerURL
	if err := h.db.WithContext(c.Request.Context()).Model(day).
		Update("banner_url", "").Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to clear banner")
		return
	}
	removeUploadedFile(old)
	c.Status(http.StatusNoContent)
}

// DeleteBanner handles DELETE /admin/events/:id/banner — limpa banner_url e
// remove o arquivo do disco (best-effort).
func (h *EventHandler) DeleteBanner(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var ev models.Event
	if err := h.db.WithContext(c.Request.Context()).First(&ev, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "evento não encontrado")
		return
	}
	old := ev.BannerURL
	if err := h.db.WithContext(c.Request.Context()).Model(&ev).
		Update("banner_url", "").Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to clear banner")
		return
	}
	removeUploadedFile(old)
	c.Status(http.StatusNoContent)
}

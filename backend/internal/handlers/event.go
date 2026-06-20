package handlers

import (
	"net/http"
	"regexp"
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

// ── Público ──────────────────────────────────────────────────────────────────

// List handles GET /events — todos os eventos ordenados por data e hora.
func (h *EventHandler) List(c *gin.Context) {
	var events []models.Event
	if err := h.db.WithContext(c.Request.Context()).
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
	if err := h.db.WithContext(c.Request.Context()).First(&ev, "id = ?", id).Error; err != nil {
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
	date, ok := parseEventDate(c, req.EventDate)
	if !ok {
		return
	}
	tm, ok := validateEventTime(c, req.EventTime)
	if !ok {
		return
	}
	ev := &models.Event{
		Title:       strings.TrimSpace(req.Title),
		Description: strings.TrimSpace(req.Description),
		Location:    strings.TrimSpace(req.Location),
		EventDate:   date,
		EventTime:   tm,
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
	if len(updates) > 0 {
		if err := h.db.WithContext(c.Request.Context()).Model(&ev).Updates(updates).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update event")
			return
		}
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

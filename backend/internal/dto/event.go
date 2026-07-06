package dto

// ── Eventos do condomínio ────────────────────────────────────────────────────

// AdminEventRequest is the body for POST /admin/events. EventDate must be
// "YYYY-MM-DD" and EventTime "HH:MM" (validated in the handler).
type AdminEventRequest struct {
	Title       string `json:"title" binding:"required,min=2,max=255"`
	Description string `json:"description" binding:"max=2000"`
	Location    string `json:"location" binding:"max=500"`
	EventDate   string `json:"event_date" binding:"required"`
	EventTime   string `json:"event_time" binding:"max=5"`
	Highlight   bool   `json:"highlight"`
}

// AdminEventPatch is the body for PATCH /admin/events/:id. All fields optional.
type AdminEventPatch struct {
	Title       *string `json:"title" binding:"omitempty,min=2,max=255"`
	Description *string `json:"description" binding:"omitempty,max=2000"`
	Location    *string `json:"location" binding:"omitempty,max=500"`
	EventDate   *string `json:"event_date"`
	EventTime   *string `json:"event_time" binding:"omitempty,max=5"`
	Highlight   *bool   `json:"highlight"`
}

package dto

// ── Eventos do condomínio ────────────────────────────────────────────────────

// AdminEventDayInput é um dia do evento no create/update. Day "YYYY-MM-DD",
// Time "HH:MM" (validados no handler). ID vazio = dia novo; com ID, o dia
// existente é atualizado (preservando a imagem já enviada).
type AdminEventDayInput struct {
	ID   string `json:"id" binding:"max=64"`
	Day  string `json:"day" binding:"required"`
	Time string `json:"time" binding:"max=5"`
}

// AdminEventRequest is the body for POST /admin/events. Envia `days` (>= 1);
// event_date/event_time seguem aceitos como fallback de clientes antigos.
type AdminEventRequest struct {
	Title       string               `json:"title" binding:"required,min=2,max=255"`
	Description string               `json:"description" binding:"max=2000"`
	Location    string               `json:"location" binding:"max=500"`
	EventDate   string               `json:"event_date"`
	EventTime   string               `json:"event_time" binding:"max=5"`
	Highlight   bool                 `json:"highlight"`
	Days        []AdminEventDayInput `json:"days" binding:"omitempty,max=30,dive"`
}

// AdminEventPatch is the body for PATCH /admin/events/:id. All fields optional.
// Days, quando presente, substitui o conjunto de dias (dias ausentes são
// removidos).
type AdminEventPatch struct {
	Title       *string               `json:"title" binding:"omitempty,min=2,max=255"`
	Description *string               `json:"description" binding:"omitempty,max=2000"`
	Location    *string               `json:"location" binding:"omitempty,max=500"`
	EventDate   *string               `json:"event_date"`
	EventTime   *string               `json:"event_time" binding:"omitempty,max=5"`
	Highlight   *bool                 `json:"highlight"`
	Days        *[]AdminEventDayInput `json:"days" binding:"omitempty,max=30,dive"`
}

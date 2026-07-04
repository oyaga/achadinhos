package dto

import "github.com/achadinhos/backend/internal/models"

// ── Agendamento (booking) ────────────────────────────────────────────────────

// AgendaBookRequest is the public body for POST /agenda/:slug/book. Validation
// is done by the handler (422 with per-field details).
type AgendaBookRequest struct {
	Start    string `json:"start"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Whatsapp string `json:"whatsapp"`
	Notes    string `json:"notes"`
}

// AgendaSettingsUpdateRequest is the body for PUT /admin/agenda. All fields are
// optional; only present ones are applied.
type AgendaSettingsUpdateRequest struct {
	DisplayName *string                 `json:"display_name"`
	Title       *string                 `json:"title"`
	DurationMin *int                    `json:"duration_min"`
	BufferMin   *int                    `json:"buffer_min"`
	Timezone    *string                 `json:"timezone"`
	WorkHours   *models.AgendaWorkHours `json:"work_hours"`
	Active      *bool                   `json:"active"`
	LeadTimeMin *int                    `json:"lead_time_min"`
	HorizonDays *int                    `json:"horizon_days"`
}

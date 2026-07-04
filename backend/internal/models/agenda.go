package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// AgendaWindow is a single availability window inside a day ("09:00"–"18:00").
type AgendaWindow struct {
	Start string `json:"start"`
	End   string `json:"end"`
}

// AgendaWorkHours maps the weekday ("0"=domingo .. "6"=sábado) to its list of
// availability windows. A missing or empty list means the day is unavailable.
// Serialised as JSONB.
type AgendaWorkHours map[string][]AgendaWindow

// Scan implements sql.Scanner.
func (w *AgendaWorkHours) Scan(value any) error {
	if value == nil {
		*w = nil
		return nil
	}
	var bytes []byte
	switch v := value.(type) {
	case []byte:
		bytes = v
	case string:
		bytes = []byte(v)
	default:
		return errors.New("AgendaWorkHours: unsupported scan type")
	}
	if len(bytes) == 0 {
		*w = nil
		return nil
	}
	return json.Unmarshal(bytes, w)
}

// Value implements driver.Valuer.
func (w AgendaWorkHours) Value() (driver.Value, error) {
	if w == nil {
		return "{}", nil
	}
	b, err := json.Marshal(w)
	if err != nil {
		return nil, err
	}
	return string(b), nil
}

// AgendaSettings configures a public booking page (Calendly-like). One row per
// slug; today only "ligia" exists.
type AgendaSettings struct {
	ID          uuid.UUID       `gorm:"type:uuid;primaryKey" json:"id"`
	Slug        string          `gorm:"size:64;not null;uniqueIndex" json:"slug"`
	DisplayName string          `gorm:"size:255;not null" json:"display_name"`
	Title       string          `gorm:"size:255;not null;default:''" json:"title"`
	DurationMin int             `gorm:"not null;default:60" json:"duration_min"`
	BufferMin   int             `gorm:"not null;default:15" json:"buffer_min"`
	Timezone    string          `gorm:"size:64;not null;default:'America/Sao_Paulo'" json:"timezone"`
	WorkHours   AgendaWorkHours `gorm:"type:jsonb;not null;default:'{}'" json:"work_hours"`
	Active      bool            `gorm:"not null;default:true" json:"active"`
	LeadTimeMin int             `gorm:"not null;default:120" json:"lead_time_min"`
	HorizonDays int             `gorm:"not null;default:30" json:"horizon_days"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// TableName pins the table name (GORM would pluralize differently).
func (AgendaSettings) TableName() string { return "agenda_settings" }

func (a *AgendaSettings) BeforeCreate(tx *gorm.DB) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	return nil
}

// GoogleOAuthToken stores the offline OAuth credentials for a logical owner
// (e.g. "agenda:ligia"). Tokens are never serialised to JSON.
type GoogleOAuthToken struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Owner        string    `gorm:"size:128;not null;uniqueIndex" json:"owner"`
	RefreshToken string    `gorm:"type:text;not null" json:"-"`
	AccessToken  string    `gorm:"type:text;not null;default:''" json:"-"`
	Expiry       time.Time `json:"-"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// TableName pins the table name.
func (GoogleOAuthToken) TableName() string { return "google_oauth_tokens" }

func (t *GoogleOAuthToken) BeforeCreate(tx *gorm.DB) error {
	if t.ID == uuid.Nil {
		t.ID = uuid.New()
	}
	return nil
}

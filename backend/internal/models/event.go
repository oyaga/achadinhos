package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Event is a condominium event ("evento do condomínio") created by the admin
// and shown to síndicos in a calendar. Events are global (not scoped per condo).
//
// EventDate is a date-only column (no timezone) so the calendar day never
// shifts by timezone; EventTime is a free "HH:MM" string.
type Event struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Title       string    `gorm:"size:255;not null" json:"title"`
	Description string    `gorm:"type:text;not null;default:''" json:"description"`
	Location    string    `gorm:"size:500;not null;default:''" json:"location"`
	EventDate   time.Time `gorm:"type:date;not null;index" json:"event_date"`
	EventTime   string    `gorm:"size:5;not null;default:''" json:"event_time"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (e *Event) BeforeCreate(tx *gorm.DB) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return nil
}

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

	// Highlight marks the event to be shown as a slide in the home carousel;
	// BannerURL is the uploaded banner image served from /uploads.
	Highlight bool   `gorm:"not null;default:false;index" json:"highlight"`
	BannerURL string `gorm:"size:1000;not null;default:''" json:"banner_url"`

	// Days são as datas do evento (um evento pode ocupar vários dias, cada um
	// com hora e imagem próprias). EventDate/EventTime acima espelham o
	// primeiro dia, para ordenação e para clientes antigos.
	Days []EventDay `gorm:"foreignKey:EventID;constraint:OnDelete:CASCADE" json:"days"`

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

// EventDay é um dia de um evento: data (date-only, sem fuso), hora "HH:MM"
// livre e imagem opcional do dia (fallback: o banner do evento).
type EventDay struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	EventID   uuid.UUID `gorm:"type:uuid;not null;index" json:"event_id"`
	Day       time.Time `gorm:"type:date;not null;index" json:"day"`
	DayTime   string    `gorm:"size:5;not null;default:''" json:"time"`
	BannerURL string    `gorm:"size:1000;not null;default:''" json:"banner_url"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

func (d *EventDay) BeforeCreate(tx *gorm.DB) error {
	if d.ID == uuid.Nil {
		d.ID = uuid.New()
	}
	return nil
}

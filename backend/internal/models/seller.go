package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Seller is a vendor of products in the shopping section.
type Seller struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Name        string    `gorm:"size:255;not null;uniqueIndex" json:"name"`
	Avatar      string    `gorm:"size:8" json:"avatar"`
	Description string    `gorm:"type:text" json:"description,omitempty"`
	WhatsApp    string    `gorm:"size:32" json:"whatsapp"`
	Link        string    `gorm:"size:500" json:"link,omitempty"`
	Partner     bool      `gorm:"default:false" json:"partner"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (s *Seller) BeforeCreate(tx *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return nil
}

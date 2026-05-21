package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Condominio represents a condominium building.
type Condominio struct {
	ID        uuid.UUID  `gorm:"type:uuid;primaryKey" json:"id"`
	Name      string     `gorm:"size:255;not null" json:"name"`
	Address   string     `gorm:"size:500" json:"address,omitempty"`
	City      string     `gorm:"size:128" json:"city,omitempty"`
	State     string     `gorm:"size:32" json:"state,omitempty"`
	SindicoID *uuid.UUID `gorm:"type:uuid;index" json:"sindico_id,omitempty"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (c *Condominio) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return nil
}

package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// PortfolioPhoto is a showcase image attached to a business — either a Seller
// (empresa) or a Provider (prestador). The owner is polymorphic.
type PortfolioPhoto struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	OwnerID   uuid.UUID      `gorm:"type:uuid;not null;index" json:"owner_id"`
	OwnerType string         `gorm:"size:16;not null;index" json:"owner_type"`
	URL       string         `gorm:"size:1000;not null" json:"url"`
	Position  int            `gorm:"not null;default:0" json:"position"`
	CreatedAt time.Time      `json:"created_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (p *PortfolioPhoto) BeforeCreate(tx *gorm.DB) error {
	if p.ID == uuid.Nil {
		p.ID = uuid.New()
	}
	return nil
}

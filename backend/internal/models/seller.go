package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Seller is a company (empresa) that sells products in the shopping section.
type Seller struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Name         string    `gorm:"size:255;not null;uniqueIndex" json:"name"`
	CategoryID   string    `gorm:"size:64;index" json:"category_id,omitempty"`
	Avatar       string    `gorm:"size:8" json:"avatar"`
	LogoURL      string    `gorm:"size:500" json:"logo_url,omitempty"`
	Description  string    `gorm:"type:text" json:"description,omitempty"`
	WhatsApp     string    `gorm:"size:32" json:"whatsapp"`
	Link         string    `gorm:"size:500" json:"link,omitempty"`
	Partner      bool      `gorm:"default:false" json:"partner"`
	Highlight    bool      `gorm:"default:false;index" json:"highlight"`
	DocumentType string    `gorm:"size:4" json:"document_type,omitempty"`
	Document     string    `gorm:"size:18" json:"document,omitempty"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Category        *Category        `gorm:"foreignKey:CategoryID;references:ID" json:"category,omitempty"`
	PortfolioPhotos []PortfolioPhoto `gorm:"polymorphic:Owner;polymorphicValue:seller" json:"portfolio_photos,omitempty"`
}

func (s *Seller) BeforeCreate(tx *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return nil
}

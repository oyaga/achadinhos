package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Product is an item for sale in the shopping section. ID is a slug ("p1") to match the frontend.
type Product struct {
	ID                string     `gorm:"primaryKey;size:64" json:"id"`
	SellerID          *uuid.UUID `gorm:"type:uuid;index" json:"seller_id,omitempty"`
	Name              string     `gorm:"size:255;not null;index" json:"name"`
	Category          string     `gorm:"size:32;not null;index" json:"category"`
	Price             float64    `gorm:"type:numeric(10,2);not null" json:"price"`
	OldPrice          *float64   `gorm:"type:numeric(10,2)" json:"old_price,omitempty"`
	Rating            float64    `gorm:"type:numeric(3,2);default:0" json:"rating"`
	ReviewsCount      int        `gorm:"default:0" json:"reviews_count"`
	Tag               string     `gorm:"size:64" json:"tag,omitempty"`
	Badge             string     `gorm:"size:16" json:"badge,omitempty"`
	Stock             string     `gorm:"size:64" json:"stock"`
	WhatsAppOverride  string     `gorm:"size:32" json:"whatsapp_override,omitempty"`
	LinkOverride      string     `gorm:"size:500" json:"link_override,omitempty"`
	Manufacturer      string     `gorm:"size:255" json:"manufacturer,omitempty"`
	Highlight         bool       `gorm:"not null;default:false;index" json:"highlight"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Seller *Seller        `gorm:"foreignKey:SellerID" json:"seller,omitempty"`
	Photos []ProductPhoto `gorm:"foreignKey:ProductID" json:"photos,omitempty"`
}

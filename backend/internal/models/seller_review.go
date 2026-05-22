package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// SellerReview is a rating + comment left by a user on a seller (empresa).
type SellerReview struct {
	ID       uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	SellerID uuid.UUID `gorm:"type:uuid;not null;index" json:"seller_id"`
	UserID   uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	Rating   int       `gorm:"not null;check:rating >= 1 AND rating <= 5" json:"rating"`
	Text     string    `gorm:"type:text" json:"text"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	User *User `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

func (r *SellerReview) BeforeCreate(tx *gorm.DB) error {
	if r.ID == uuid.Nil {
		r.ID = uuid.New()
	}
	return nil
}

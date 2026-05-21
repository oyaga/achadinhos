package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Review is a rating + comment left by a user on a provider.
type Review struct {
	ID           uuid.UUID   `gorm:"type:uuid;primaryKey" json:"id"`
	ProviderID   uuid.UUID   `gorm:"type:uuid;not null;index" json:"provider_id"`
	UserID       uuid.UUID   `gorm:"type:uuid;not null;index" json:"user_id"`
	Rating       int         `gorm:"not null;check:rating >= 1 AND rating <= 5" json:"rating"`
	Text         string      `gorm:"type:text" json:"text"`
	HelpfulCount int         `gorm:"default:0" json:"helpful_count"`
	Tags         StringSlice `gorm:"type:jsonb;default:'[]'" json:"tags"`
	Verified     bool        `gorm:"default:false" json:"verified"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	User     *User     `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Provider *Provider `gorm:"foreignKey:ProviderID" json:"-"`
}

func (r *Review) BeforeCreate(tx *gorm.DB) error {
	if r.ID == uuid.Nil {
		r.ID = uuid.New()
	}
	return nil
}

// ReviewHelpful tracks which user marked which review as helpful (idempotency).
type ReviewHelpful struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	ReviewID  uuid.UUID `gorm:"type:uuid;not null;uniqueIndex:idx_review_user" json:"review_id"`
	UserID    uuid.UUID `gorm:"type:uuid;not null;uniqueIndex:idx_review_user" json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
}

func (r *ReviewHelpful) BeforeCreate(tx *gorm.DB) error {
	if r.ID == uuid.Nil {
		r.ID = uuid.New()
	}
	return nil
}

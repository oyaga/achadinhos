package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// FavoriteTargetType is what kind of entity is being favorited.
type FavoriteTargetType string

const (
	FavoriteTargetProvider FavoriteTargetType = "provider"
	FavoriteTargetProduct  FavoriteTargetType = "product"
)

// Favorite is a user's favorite provider or product.
// TargetID is stored as text since providers use UUIDs but products use slug ids.
type Favorite struct {
	ID         uuid.UUID          `gorm:"type:uuid;primaryKey" json:"id"`
	UserID     uuid.UUID          `gorm:"type:uuid;not null;uniqueIndex:idx_user_target" json:"user_id"`
	TargetType FavoriteTargetType `gorm:"size:16;not null;uniqueIndex:idx_user_target" json:"target_type"`
	TargetID   string             `gorm:"size:64;not null;uniqueIndex:idx_user_target" json:"target_id"`
	CreatedAt  time.Time          `json:"created_at"`
}

func (f *Favorite) BeforeCreate(tx *gorm.DB) error {
	if f.ID == uuid.Nil {
		f.ID = uuid.New()
	}
	return nil
}

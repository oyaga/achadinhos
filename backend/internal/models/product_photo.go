package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ProductPhoto struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	ProductID string         `gorm:"size:64;not null;index" json:"product_id"`
	URL       string         `gorm:"size:1000;not null" json:"url"`
	Position  int            `gorm:"not null;default:0" json:"position"`
	CreatedAt time.Time      `json:"created_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

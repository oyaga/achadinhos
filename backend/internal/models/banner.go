package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Banner placements — onde o anúncio aparece no site.
const (
	// BannerPlacementHero: slide principal da home (carrossel hero).
	BannerPlacementHero = "hero"
	// BannerPlacementEventos: widget de eventos/calendário da home.
	BannerPlacementEventos = "eventos"
)

// Banner is an admin-managed ad/slide ("anúncio"). The admin uploads an image
// and chooses where it appears (Placement); Position orders the slides and
// Active toggles visibility without deleting.
type Banner struct {
	ID       uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Title    string    `gorm:"size:255;not null;default:''" json:"title"`
	Subtitle string    `gorm:"size:500;not null;default:''" json:"subtitle"`
	// LinkURL is opened when the slide is tapped. Absolute (https://…) or a
	// site-relative path like /categoria/limpeza. Empty = not clickable.
	LinkURL  string `gorm:"size:1000;not null;default:''" json:"link_url"`
	ImageURL string `gorm:"size:1000;not null;default:''" json:"image_url"`

	Placement string `gorm:"size:20;not null;default:'hero';index" json:"placement"`
	Position  int    `gorm:"not null;default:0" json:"position"`
	Active    bool   `gorm:"not null;default:true;index" json:"active"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (b *Banner) BeforeCreate(tx *gorm.DB) error {
	if b.ID == uuid.Nil {
		b.ID = uuid.New()
	}
	return nil
}

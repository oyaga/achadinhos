package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Banner placements — onde o slide aparece no widget "Mural" da home.
// "hero" = Slide principal (abre o mural); "eventos" = Anúncios do mural.
// Os valores ficam como estão por compatibilidade; os rótulos do admin são
// "Slide principal" e "Anúncios".
const (
	BannerPlacementHero    = "hero"
	BannerPlacementEventos = "eventos"
)

// Banner is an admin-managed slide/ad do Mural. The admin uploads an image
// and chooses where it appears (Placement); Position orders the slides and
// Active toggles visibility without deleting. StartsAt/EndsAt (date-only,
// nullable) delimitam o período de exibição — fora dele o slide não sai na
// listagem pública, mas segue visível no admin como "fora do período".
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

	StartsAt *time.Time `gorm:"type:date" json:"starts_at"`
	EndsAt   *time.Time `gorm:"type:date" json:"ends_at"`

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

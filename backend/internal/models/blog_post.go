package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

const (
	BlogFormatTraditional  = "traditional"
	BlogFormatPresentation = "presentation"
)

type BlogPost struct {
	ID          uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	Title       string         `gorm:"size:255;not null" json:"title"`
	Slug        string         `gorm:"size:255;uniqueIndex;not null" json:"slug"`
	Excerpt     string         `gorm:"size:600;not null;default:''" json:"excerpt"`
	Format      string         `gorm:"size:20;not null;default:'traditional';index" json:"format"`
	ContentHTML string         `gorm:"type:text;not null;default:''" json:"content_html"`
	CoverURL    string         `gorm:"size:1000;not null;default:''" json:"cover_url"`
	PDFURL      string         `gorm:"size:1000;not null;default:''" json:"pdf_url"`
	Published   bool           `gorm:"not null;default:false;index" json:"published"`
	PublishedAt *time.Time     `json:"published_at"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (p *BlogPost) BeforeCreate(tx *gorm.DB) error {
	if p.ID == uuid.Nil {
		p.ID = uuid.New()
	}
	return nil
}

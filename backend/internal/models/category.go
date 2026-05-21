package models

import "time"

// Category mirrors the frontend slug-id taxonomy (e.g. "manutencao", "seguranca").
// The ID is a human-readable slug, NOT a UUID — must match the frontend's CategoryId union.
type Category struct {
	ID          string `gorm:"primaryKey;size:64" json:"id"`
	Label       string `gorm:"size:128;not null" json:"label"`
	Short       string `gorm:"size:64" json:"short"`
	Icon        string `gorm:"size:64" json:"icon"`
	Badge       string `gorm:"size:16" json:"badge,omitempty"`
	Description string `gorm:"type:text" json:"desc,omitempty"`
	SortOrder   int    `json:"-"`

	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

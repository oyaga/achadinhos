package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// StringSlice is a JSON-serialised []string suitable for PostgreSQL JSONB columns.
type StringSlice []string

// Scan implements sql.Scanner.
func (s *StringSlice) Scan(value any) error {
	if value == nil {
		*s = nil
		return nil
	}
	var bytes []byte
	switch v := value.(type) {
	case []byte:
		bytes = v
	case string:
		bytes = []byte(v)
	default:
		return errors.New("StringSlice: unsupported scan type")
	}
	if len(bytes) == 0 {
		*s = nil
		return nil
	}
	return json.Unmarshal(bytes, s)
}

// Value implements driver.Valuer.
func (s StringSlice) Value() (driver.Value, error) {
	if s == nil {
		return "[]", nil
	}
	b, err := json.Marshal(s)
	if err != nil {
		return nil, err
	}
	return string(b), nil
}

// Coverage describes the provider's geographic coverage.
type Coverage string

const (
	CoverageBairro Coverage = "bairro"
	CoverageCidade Coverage = "cidade"
	CoverageRegiao Coverage = "regiao"
)

// Provider is a service provider.
type Provider struct {
	ID                 uuid.UUID   `gorm:"type:uuid;primaryKey" json:"id"`
	Name               string      `gorm:"size:255;not null;index" json:"name"`
	CategoryID         string      `gorm:"size:64;not null;index" json:"category_id"`
	Avatar             string      `gorm:"size:8" json:"avatar"`
	Rating             float64     `gorm:"type:numeric(3,2);default:0" json:"rating"`
	ReviewsCount       int         `gorm:"default:0" json:"reviews_count"`
	Badge              string      `gorm:"size:16" json:"badge,omitempty"`
	Verified           bool        `gorm:"default:false;index" json:"verified"`
	DistanceLabel      string      `gorm:"size:64" json:"distance_label"`
	PriceLabel         string      `gorm:"size:64" json:"price_label"`
	ResponseTimeLabel  string      `gorm:"size:64" json:"response_time_label"`
	Description        string      `gorm:"type:text" json:"description"`
	Services           StringSlice `gorm:"type:jsonb;default:'[]'" json:"services"`
	YearsActive        int         `json:"years_active"`
	JobsDone           int         `json:"jobs_done"`
	WhatsApp           string      `gorm:"size:32" json:"whatsapp"`
	Highlight          bool        `gorm:"default:false;index" json:"highlight"`
	OwnerUserID        *uuid.UUID  `gorm:"type:uuid;index" json:"owner_user_id,omitempty"`
	Coverage           Coverage    `gorm:"size:16;default:'cidade'" json:"coverage"`
	RadiusKM           int         `gorm:"default:10" json:"radius_km"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Category *Category `gorm:"foreignKey:CategoryID;references:ID" json:"category,omitempty"`
}

func (p *Provider) BeforeCreate(tx *gorm.DB) error {
	if p.ID == uuid.Nil {
		p.ID = uuid.New()
	}
	return nil
}

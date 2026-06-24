package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Certificate is a "Empresa Qualificada" certificate issued by the admin for a
// company (Seller). It is publicly verifiable by its Code via the QR code on the
// generated PDF (-> /verificar/?c=CODE).
//
// EmpresaNome and Categoria are snapshots taken at issue time so the document
// stays stable even if the seller record is later edited. IssuedAt/ValidUntil
// are date-only columns so the day never shifts by timezone.
type Certificate struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Code            string    `gorm:"size:32;not null;uniqueIndex" json:"code"`
	SellerID        uuid.UUID `gorm:"type:uuid;not null;index" json:"seller_id"`
	EmpresaNome     string    `gorm:"size:255;not null" json:"empresa_nome"`
	Categoria       string    `gorm:"size:120;not null;default:''" json:"categoria"`
	ResponsavelNome string    `gorm:"size:255;not null" json:"responsavel_nome"`
	ResponsavelCPF  string    `gorm:"size:14;not null;default:''" json:"responsavel_cpf"`
	SignatureURL    string    `gorm:"size:500;not null;default:''" json:"signature_url"`
	IssuedAt        time.Time `gorm:"type:date;not null" json:"issued_at"`
	ValidUntil      time.Time `gorm:"type:date;not null" json:"valid_until"`
	Revoked         bool      `gorm:"not null;default:false" json:"revoked"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Seller *Seller `gorm:"foreignKey:SellerID;references:ID" json:"seller,omitempty"`
}

func (c *Certificate) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return nil
}

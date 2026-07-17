package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Cert tipo (titular do certificado) e tier (nível).
type CertTipo = string

const (
	CertTipoEmpresa  CertTipo = "empresa"  // titular é uma empresa (Seller)
	CertTipoAfiliado CertTipo = "afiliado" // titular é um afiliado/prestador (Provider)
)

type CertTier = string

const (
	CertTierPrata CertTier = "prata"
	CertTierBlue  CertTier = "blue"
	CertTierBlack CertTier = "black"
)

// Certificate is a qualification certificate issued by the admin for a company
// (Seller) or an afiliado/prestador (Provider). It is publicly verifiable by its
// Code via the QR code on the generated PDF (-> /verificar/?c=CODE).
//
// O titular é referenciado por SellerID OU ProviderID (exatamente um), com Tipo
// como discriminador explícito. EmpresaNome e Categoria são snapshots tirados no
// momento da emissão, então o documento permanece estável mesmo se o cadastro do
// titular mudar depois. IssuedAt/ValidUntil são colunas date-only.
type Certificate struct {
	ID              uuid.UUID  `gorm:"type:uuid;primaryKey" json:"id"`
	Code            string     `gorm:"size:32;not null;uniqueIndex" json:"code"`
	Tipo            CertTipo   `gorm:"size:16;not null;default:'empresa'" json:"tipo"`
	Tier            CertTier   `gorm:"size:8;not null;default:'blue'" json:"tier"`
	SellerID        *uuid.UUID `gorm:"type:uuid;index" json:"seller_id,omitempty"`
	ProviderID      *uuid.UUID `gorm:"type:uuid;index" json:"provider_id,omitempty"`
	EmpresaNome     string     `gorm:"size:255;not null" json:"empresa_nome"`
	Categoria       string     `gorm:"size:120;not null;default:''" json:"categoria"`
	ResponsavelNome string     `gorm:"size:255;not null" json:"responsavel_nome"`
	ResponsavelCPF  string     `gorm:"size:14;not null;default:''" json:"responsavel_cpf"`
	SignatureURL    string     `gorm:"size:500;not null;default:''" json:"signature_url"`
	IssuedAt        time.Time  `gorm:"type:date;not null" json:"issued_at"`
	ValidUntil      time.Time  `gorm:"type:date;not null" json:"valid_until"`
	Revoked         bool       `gorm:"not null;default:false" json:"revoked"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Seller   *Seller   `gorm:"foreignKey:SellerID;references:ID" json:"seller,omitempty"`
	Provider *Provider `gorm:"foreignKey:ProviderID;references:ID" json:"provider,omitempty"`
}

func (c *Certificate) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return nil
}

// OwnerID returns the certificate holder's id (seller or provider), or uuid.Nil.
func (c *Certificate) OwnerID() uuid.UUID {
	if c.SellerID != nil {
		return *c.SellerID
	}
	if c.ProviderID != nil {
		return *c.ProviderID
	}
	return uuid.Nil
}

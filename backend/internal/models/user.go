package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Role represents the user's role. Only síndicos (public sign-up) and admins
// (seeded / internal) have login accounts. Empresas and prestadores are
// catalog records managed through the admin panel — they do not log in.
type Role string

const (
	RoleSindico Role = "sindico"
	RoleAdmin   Role = "admin"
)

// CondoRole is the granular role inside a condomínio.
type CondoRole string

const (
	CondoRoleMorador  CondoRole = "morador"
	CondoRoleSindico  CondoRole = "sindico"
	CondoRoleConselho CondoRole = "conselho"
)

// DocumentType differentiates CPF (individuals) from CNPJ (companies).
type DocumentType string

const (
	DocCPF  DocumentType = "cpf"
	DocCNPJ DocumentType = "cnpj"
)

// User is an account on the platform: síndico (condo manager) or admin.
type User struct {
	ID           uuid.UUID  `gorm:"type:uuid;primaryKey" json:"id"`
	Email        string     `gorm:"uniqueIndex;size:255;not null" json:"email"`
	PasswordHash string     `gorm:"size:255;not null" json:"-"`
	Name         string     `gorm:"size:255;not null" json:"name"`
	Role         Role       `gorm:"size:32;not null;index" json:"role"`
	CondoID      *uuid.UUID `gorm:"type:uuid;index" json:"condo_id,omitempty"`
	AvatarURL    string     `gorm:"size:500" json:"avatar_url,omitempty"`
	Phone        string     `gorm:"size:32" json:"phone,omitempty"`

	// Profile fields populated by the síndico register endpoint.
	// All optional at the DB level so older accounts keep working.
	CPF          string `gorm:"size:14;column:cpf" json:"cpf,omitempty"`
	DocumentType string `gorm:"size:4;column:document_type" json:"document_type,omitempty"`
	Document     string `gorm:"size:18;column:document" json:"document,omitempty"`
	CondoName    string `gorm:"size:120;column:condo_name" json:"condo_name,omitempty"`
	CondoRole    string `gorm:"size:16;column:condo_role" json:"condo_role,omitempty"`

	// Address.
	CEP          string `gorm:"size:9;column:cep" json:"cep,omitempty"`
	Street       string `gorm:"size:160;column:street" json:"street,omitempty"`
	Number       string `gorm:"size:20;column:number" json:"number,omitempty"`
	Complement   string `gorm:"size:80;column:complement" json:"complement,omitempty"`
	Neighborhood string `gorm:"size:80;column:neighborhood" json:"neighborhood,omitempty"`
	City         string `gorm:"size:80;column:city" json:"city,omitempty"`
	State        string `gorm:"size:2;column:state" json:"state,omitempty"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Condo *Condominio `gorm:"foreignKey:CondoID" json:"condo,omitempty"`
}

// BeforeCreate ensures a UUID is assigned.
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

// RefreshToken stores opaque rotating refresh tokens.
type RefreshToken struct {
	ID        uuid.UUID  `gorm:"type:uuid;primaryKey" json:"id"`
	UserID    uuid.UUID  `gorm:"type:uuid;not null;index" json:"user_id"`
	Token     string     `gorm:"size:128;uniqueIndex;not null" json:"token"`
	ExpiresAt time.Time  `gorm:"not null" json:"expires_at"`
	RevokedAt *time.Time `json:"revoked_at,omitempty"`
	CreatedAt time.Time  `json:"created_at"`
}

func (r *RefreshToken) BeforeCreate(tx *gorm.DB) error {
	if r.ID == uuid.Nil {
		r.ID = uuid.New()
	}
	return nil
}

package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Status values for a FichaCadastro.
const (
	FichaStatusPendente  = "pendente"
	FichaStatusConcluido = "concluido"
)

// FichaCadastro is a company onboarding form ("ficha de cadastro do
// responsável"). The admin creates one with just the responsável's name and
// e-mail; the system mails a unique link (token); the responsável fills the
// remaining fields and the ficha flips from "pendente" to "concluido".
type FichaCadastro struct {
	ID     uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Token  string    `gorm:"size:64;not null;uniqueIndex" json:"-"`
	Status string    `gorm:"size:16;not null;index;default:'pendente'" json:"status"`

	// Informado pelo admin ao criar a ficha.
	ResponsavelNome  string `gorm:"size:255;not null;column:responsavel_nome" json:"responsavel_nome"`
	ResponsavelEmail string `gorm:"size:255;not null;column:responsavel_email" json:"responsavel_email"`

	// Dados do responsável (preenchidos no formulário).
	RespCPF        string `gorm:"size:32;not null;default:'';column:resp_cpf" json:"resp_cpf"`
	RespNascimento string `gorm:"size:32;not null;default:'';column:resp_nascimento" json:"resp_nascimento"`
	RespEndereco   string `gorm:"size:500;not null;default:'';column:resp_endereco" json:"resp_endereco"`
	RespTelefone   string `gorm:"size:32;not null;default:'';column:resp_telefone" json:"resp_telefone"`
	RespCargo      string `gorm:"size:255;not null;default:'';column:resp_cargo" json:"resp_cargo"`

	// Dados da empresa.
	RazaoSocial           string `gorm:"size:255;not null;default:''" json:"razao_social"`
	CNPJ                  string `gorm:"size:32;not null;default:''" json:"cnpj"`
	EmpresaEndereco       string `gorm:"size:500;not null;default:''" json:"empresa_endereco"`
	Instagram             string `gorm:"size:255;not null;default:''" json:"instagram"`
	Facebook              string `gorm:"size:255;not null;default:''" json:"facebook"`
	LinkedIn              string `gorm:"size:255;not null;default:''" json:"linkedin"`
	Site                  string `gorm:"size:255;not null;default:''" json:"site"`
	ContratoInicio        string `gorm:"size:32;not null;default:''" json:"contrato_inicio"`
	ContratoVigenciaMeses string `gorm:"size:32;not null;default:''" json:"contrato_vigencia_meses"`
	ValorMensal           string `gorm:"size:64;not null;default:''" json:"valor_mensal"`
	ValorAnual            string `gorm:"size:64;not null;default:''" json:"valor_anual"`
	Observacoes           string `gorm:"type:text;not null;default:''" json:"observacoes"`

	SubmittedAt *time.Time     `json:"submitted_at,omitempty"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

// TableName pins the table to "fichas_cadastro" (GORM would otherwise pluralize
// to "ficha_cadastros").
func (FichaCadastro) TableName() string { return "fichas_cadastro" }

func (f *FichaCadastro) BeforeCreate(tx *gorm.DB) error {
	if f.ID == uuid.Nil {
		f.ID = uuid.New()
	}
	return nil
}

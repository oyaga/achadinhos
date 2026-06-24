package dto

// AddressDTO is the embedded address payload used by both register endpoints.
// Backend stores only what it receives — geographic enrichment is the frontend's job.
type AddressDTO struct {
	CEP          string `json:"cep" binding:"required"`
	Street       string `json:"street" binding:"required"`
	Number       string `json:"number" binding:"required"`
	Complement   string `json:"complement"`
	Neighborhood string `json:"neighborhood" binding:"required"`
	City         string `json:"city" binding:"required"`
	State        string `json:"state" binding:"required,len=2"`
}

// RegisterSindicoRequest is the body for POST /api/v1/auth/register/sindico —
// the only public sign-up flow.
//
// account_type distinguishes "pessoa" (física: CPF + condo_role) from "empresa"
// (administradora de condomínios: CNPJ + razão social). The type-specific
// fields (cpf / cnpj / company_name / condo_role / condo_name) are validated in
// the service according to account_type, so they are not "required" here.
type RegisterSindicoRequest struct {
	AccountType string     `json:"account_type" binding:"omitempty,oneof=pessoa empresa"`
	Name        string     `json:"name" binding:"required,min=2,max=128"`
	Email       string     `json:"email" binding:"required,email"`
	Password    string     `json:"password" binding:"required,min=8,max=128"`
	CPF         string     `json:"cpf" binding:"omitempty,max=14"`
	CNPJ        string     `json:"cnpj" binding:"omitempty,max=18"`
	CompanyName string     `json:"company_name" binding:"omitempty,max=160"`
	Phone       string     `json:"phone" binding:"required"`
	Address     AddressDTO `json:"address" binding:"required"`
	CondoName   string     `json:"condo_name" binding:"omitempty,max=120"`
	CondoRole   string     `json:"condo_role" binding:"omitempty,oneof=morador sindico conselho"`
}

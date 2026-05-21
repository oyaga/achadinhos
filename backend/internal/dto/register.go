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

// RegisterSindicoRequest is the body for POST /api/v1/auth/register/sindico.
// "sindico" here refers to the platform role; condo_role distinguishes
// morador / sindico / conselho inside the condomínio.
type RegisterSindicoRequest struct {
	Name      string     `json:"name" binding:"required,min=2,max=128"`
	Email     string     `json:"email" binding:"required,email"`
	Password  string     `json:"password" binding:"required,min=8,max=128"`
	CPF       string     `json:"cpf" binding:"required"`
	Phone     string     `json:"phone" binding:"required"`
	Address   AddressDTO `json:"address" binding:"required"`
	CondoName string     `json:"condo_name" binding:"required,min=2,max=120"`
	CondoRole string     `json:"condo_role" binding:"required,oneof=morador sindico conselho"`
}

// RegisterPrestadorRequest is the body for POST /api/v1/auth/register/prestador.
type RegisterPrestadorRequest struct {
	Name         string     `json:"name" binding:"required,min=2,max=128"`
	Email        string     `json:"email" binding:"required,email"`
	Password     string     `json:"password" binding:"required,min=8,max=128"`
	Whatsapp     string     `json:"whatsapp" binding:"required"`
	DocumentType string     `json:"document_type" binding:"required,oneof=cpf cnpj"`
	Document     string     `json:"document" binding:"required"`
	CompanyName  string     `json:"company_name" binding:"required,min=2,max=160"`
	Address      AddressDTO `json:"address" binding:"required"`
}

// RegisterSellerRequest is the body for POST /api/v1/auth/register/seller.
type RegisterSellerRequest struct {
	Name         string     `json:"name" binding:"required,min=2,max=128"`
	Email        string     `json:"email" binding:"required,email"`
	Password     string     `json:"password" binding:"required,min=8,max=128"`
	Whatsapp     string     `json:"whatsapp" binding:"required"`
	DocumentType string     `json:"document_type" binding:"required,oneof=cpf cnpj"`
	Document     string     `json:"document" binding:"required"`
	CompanyName  string     `json:"company_name" binding:"required,min=2,max=160"`
	Description  string     `json:"description"`
	Categories   []string   `json:"categories"`
	Address      AddressDTO `json:"address" binding:"required"`
}

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

// RegisterEmpresaRequest is the body for POST /api/v1/auth/register/empresa —
// autocadastro de empresa free (sem certificado). Cria a conta de login do
// responsável e a empresa, que aparece no site na hora, sem selo.
type RegisterEmpresaRequest struct {
	Name         string   `json:"name" binding:"required,min=2,max=128"`
	Email        string   `json:"email" binding:"required,email"`
	Password     string   `json:"password" binding:"required,min=8,max=128"`
	CompanyName  string   `json:"company_name" binding:"required,min=2,max=255"`
	CategoryIDs  []string `json:"category_ids" binding:"required,min=1,max=10"`
	WhatsApp     string   `json:"whatsapp" binding:"required,min=8,max=32"`
	DocumentType string   `json:"document_type" binding:"required,oneof=cpf cnpj"`
	Document     string   `json:"document" binding:"required"`
	Description  string   `json:"description" binding:"omitempty,max=2000"`
	Link         string   `json:"link" binding:"omitempty,max=500"`
	Instagram    string   `json:"instagram" binding:"omitempty,max=255"`
	Facebook     string   `json:"facebook" binding:"omitempty,max=255"`
	TikTok       string   `json:"tiktok" binding:"omitempty,max=255"`
	YouTube      string   `json:"youtube" binding:"omitempty,max=255"`
}

// MyCompanyPatch is the body for PATCH /api/v1/me/empresa — o que a empresa
// free pode editar em si mesma. Selo, "Parceira", destaque e contrato ficam
// só com o admin.
type MyCompanyPatch struct {
	Name        *string   `json:"name" binding:"omitempty,min=2,max=255"`
	CategoryIDs *[]string `json:"category_ids" binding:"omitempty,min=1,max=10"`
	Description *string   `json:"description" binding:"omitempty,max=2000"`
	WhatsApp    *string   `json:"whatsapp" binding:"omitempty,min=8,max=32"`
	Link        *string   `json:"link" binding:"omitempty,max=500"`
	Instagram   *string   `json:"instagram" binding:"omitempty,max=255"`
	Facebook    *string   `json:"facebook" binding:"omitempty,max=255"`
	TikTok      *string   `json:"tiktok" binding:"omitempty,max=255"`
	YouTube     *string   `json:"youtube" binding:"omitempty,max=255"`
}

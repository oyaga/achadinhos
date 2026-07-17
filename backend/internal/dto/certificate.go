package dto

// ── Certificados de empresa qualificada ──────────────────────────────────────

// AdminCertificateCreateRequest is the body for POST /admin/certificates.
// Tipo é "empresa" (titular é um Seller) ou "afiliado" (titular é um Provider);
// OwnerID é o id do titular correspondente. Tier é o nível do certificado.
// IssuedAt/ValidUntil are "YYYY-MM-DD" (handler defaults them when empty).
// SignaturePNG is a data URL ("data:image/png;base64,...") drawn by the
// responsável on the signature pad; optional.
type AdminCertificateCreateRequest struct {
	Tipo            string `json:"tipo" binding:"required,oneof=empresa afiliado"`
	OwnerID         string `json:"owner_id" binding:"required,uuid"`
	Tier            string `json:"tier" binding:"required,oneof=blue ouro black"`
	ResponsavelNome string `json:"responsavel_nome" binding:"required,min=2,max=255"`
	ResponsavelCPF  string `json:"responsavel_cpf" binding:"max=14"`
	IssuedAt        string `json:"issued_at"`
	ValidUntil      string `json:"valid_until"`
	SignaturePNG    string `json:"signature_png"`
}

// AdminCertificateRevokeRequest is the body for PATCH /admin/certificates/:id.
type AdminCertificateRevokeRequest struct {
	Revoked bool `json:"revoked"`
}

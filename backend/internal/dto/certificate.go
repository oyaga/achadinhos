package dto

// ── Certificados de empresa qualificada ──────────────────────────────────────

// AdminCertificateCreateRequest is the body for POST /admin/certificates.
// IssuedAt/ValidUntil are "YYYY-MM-DD" (handler defaults them when empty).
// SignaturePNG is a data URL ("data:image/png;base64,...") drawn by the
// responsável on the signature pad; optional.
type AdminCertificateCreateRequest struct {
	SellerID        string `json:"seller_id" binding:"required,uuid"`
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

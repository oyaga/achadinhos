package handlers

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// CertificateHandler exposes the "empresa qualificada" certificate endpoints:
// admin CRUD (protected) plus the public verification by code.
type CertificateHandler struct {
	db *gorm.DB
}

// NewCertificateHandler builds a CertificateHandler.
func NewCertificateHandler(db *gorm.DB) *CertificateHandler {
	return &CertificateHandler{db: db}
}

const certDateLayout = "2006-01-02"

// codeAlphabet excludes ambiguous chars (0/O, 1/I) so codes are easy to read
// off a printed certificate.
const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

// genUniqueCode returns a verification code like "ACH-2026-7K2QF9" that is not
// yet present in the DB.
func (h *CertificateHandler) genUniqueCode(c *gin.Context) (string, bool) {
	year := time.Now().Year()
	for attempt := 0; attempt < 8; attempt++ {
		raw := make([]byte, 6)
		if _, err := rand.Read(raw); err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to generate code")
			return "", false
		}
		var sb strings.Builder
		for _, x := range raw {
			sb.WriteByte(codeAlphabet[int(x)%len(codeAlphabet)])
		}
		code := "ACH-" + strconv.Itoa(year) + "-" + sb.String()
		var count int64
		if err := h.db.WithContext(c.Request.Context()).
			Model(&models.Certificate{}).
			Where("code = ?", code).Count(&count).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to check code")
			return "", false
		}
		if count == 0 {
			return code, true
		}
	}
	JSONError(c, http.StatusInternalServerError, "failed to generate unique code")
	return "", false
}

// saveSignaturePNG decodes a "data:image/png;base64,..." data URL and stores it
// under ./uploads/signatures/. Returns "" (no error) when the input is empty.
func saveSignaturePNG(dataURL string) (string, error) {
	dataURL = strings.TrimSpace(dataURL)
	if dataURL == "" {
		return "", nil
	}
	const prefix = "data:image/png;base64,"
	if !strings.HasPrefix(dataURL, prefix) {
		return "", os.ErrInvalid
	}
	raw, err := base64.StdEncoding.DecodeString(dataURL[len(prefix):])
	if err != nil {
		return "", err
	}
	if len(raw) > 2<<20 { // 2 MB cap — assinaturas são pequenas
		return "", os.ErrInvalid
	}
	dir := filepath.Join(".", "uploads", "signatures")
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return "", err
	}
	filename := uuid.New().String() + ".png"
	if err := os.WriteFile(filepath.Join(dir, filename), raw, 0o644); err != nil {
		return "", err
	}
	return "/uploads/signatures/" + filename, nil
}

// ── Admin ────────────────────────────────────────────────────────────────────

// List handles GET /admin/certificates.
func (h *CertificateHandler) List(c *gin.Context) {
	var certs []models.Certificate
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Seller").
		Preload("Provider").
		Order("created_at DESC").
		Find(&certs).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list certificates")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": certs})
}

// Create handles POST /admin/certificates.
func (h *CertificateHandler) Create(c *gin.Context) {
	var req dto.AdminCertificateCreateRequest
	if !BindJSON(c, &req) {
		return
	}

	ownerID, err := uuid.Parse(req.OwnerID)
	if err != nil {
		JSONError(c, http.StatusBadRequest, "titular inválido")
		return
	}

	// Resolve o titular conforme o tipo: empresa (Seller) ou afiliado (Provider).
	// EmpresaNome/Categoria são snapshots tirados agora.
	var (
		sellerID, providerID *uuid.UUID
		empresaNome          string
		categoria            string
	)
	switch req.Tipo {
	case models.CertTipoEmpresa:
		var seller models.Seller
		if err := h.db.WithContext(c.Request.Context()).
			Preload("Category").
			First(&seller, "id = ?", ownerID).Error; err != nil {
			JSONError(c, http.StatusNotFound, "empresa não encontrada")
			return
		}
		sellerID = &seller.ID
		empresaNome = seller.Name
		if seller.Category != nil {
			categoria = seller.Category.Label
		}
	case models.CertTipoAfiliado:
		var provider models.Provider
		if err := h.db.WithContext(c.Request.Context()).
			Preload("Category").
			First(&provider, "id = ?", ownerID).Error; err != nil {
			JSONError(c, http.StatusNotFound, "afiliado não encontrado")
			return
		}
		providerID = &provider.ID
		empresaNome = provider.Name
		if provider.Category != nil {
			categoria = provider.Category.Label
		}
	default:
		JSONError(c, http.StatusBadRequest, "tipo inválido")
		return
	}

	// Datas: emissão default hoje; validade default +12 meses.
	issued := time.Now()
	if strings.TrimSpace(req.IssuedAt) != "" {
		d, perr := time.Parse(certDateLayout, strings.TrimSpace(req.IssuedAt))
		if perr != nil {
			JSONError(c, http.StatusBadRequest, "data de emissão inválida (use AAAA-MM-DD)")
			return
		}
		issued = d
	}
	valid := issued.AddDate(1, 0, 0)
	if strings.TrimSpace(req.ValidUntil) != "" {
		d, perr := time.Parse(certDateLayout, strings.TrimSpace(req.ValidUntil))
		if perr != nil {
			JSONError(c, http.StatusBadRequest, "data de validade inválida (use AAAA-MM-DD)")
			return
		}
		valid = d
	}
	if valid.Before(issued) {
		JSONError(c, http.StatusBadRequest, "validade não pode ser anterior à emissão")
		return
	}

	sigURL, err := saveSignaturePNG(req.SignaturePNG)
	if err != nil {
		JSONError(c, http.StatusBadRequest, "assinatura inválida")
		return
	}

	code, ok := h.genUniqueCode(c)
	if !ok {
		return
	}

	cert := &models.Certificate{
		Code:            code,
		Tipo:            req.Tipo,
		Tier:            req.Tier,
		SellerID:        sellerID,
		ProviderID:      providerID,
		EmpresaNome:     empresaNome,
		Categoria:       categoria,
		ResponsavelNome: strings.TrimSpace(req.ResponsavelNome),
		ResponsavelCPF:  strings.TrimSpace(req.ResponsavelCPF),
		SignatureURL:    sigURL,
		IssuedAt:        issued,
		ValidUntil:      valid,
	}
	if err := h.db.WithContext(c.Request.Context()).Create(cert).Error; err != nil {
		removeUploadedFile(sigURL)
		JSONError(c, http.StatusInternalServerError, "failed to create certificate")
		return
	}
	h.syncOwnerCertTier(c, req.Tipo, ownerID)
	c.JSON(http.StatusCreated, cert)
}

// syncOwnerCertTier recomputa o selo (cert_tier) do titular a partir do
// certificado ativo mais recente (não revogado e dentro da validade). Grava ''
// quando não há nenhum ativo. Best-effort: erros são ignorados (o selo é
// cosmético; a verificação por código é a fonte da verdade).
func (h *CertificateHandler) syncOwnerCertTier(c *gin.Context, tipo string, ownerID uuid.UUID) {
	table, col := "sellers", "seller_id"
	if tipo == models.CertTipoAfiliado {
		table, col = "providers", "provider_id"
	}
	sql := "UPDATE " + table + " o SET cert_tier = COALESCE((" +
		"SELECT c.tier FROM certificates c WHERE c." + col + " = o.id " +
		"AND c.deleted_at IS NULL AND c.revoked = FALSE AND c.valid_until >= CURRENT_DATE " +
		"ORDER BY c.issued_at DESC LIMIT 1), '') WHERE o.id = ?"
	_ = h.db.WithContext(c.Request.Context()).Exec(sql, ownerID).Error
}

// Revoke handles PATCH /admin/certificates/:id — toggles the revoked flag.
func (h *CertificateHandler) Revoke(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var cert models.Certificate
	if err := h.db.WithContext(c.Request.Context()).First(&cert, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "certificado não encontrado")
		return
	}
	var req dto.AdminCertificateRevokeRequest
	if !BindJSON(c, &req) {
		return
	}
	if err := h.db.WithContext(c.Request.Context()).
		Model(&cert).Update("revoked", req.Revoked).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to update certificate")
		return
	}
	if oid := cert.OwnerID(); oid != uuid.Nil {
		h.syncOwnerCertTier(c, cert.Tipo, oid)
	}
	c.JSON(http.StatusOK, cert)
}

// Delete handles DELETE /admin/certificates/:id (soft delete + signature file).
func (h *CertificateHandler) Delete(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var cert models.Certificate
	if err := h.db.WithContext(c.Request.Context()).First(&cert, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "certificado não encontrado")
		return
	}
	if err := h.db.WithContext(c.Request.Context()).Delete(&cert).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete certificate")
		return
	}
	removeUploadedFile(cert.SignatureURL)
	if oid := cert.OwnerID(); oid != uuid.Nil {
		h.syncOwnerCertTier(c, cert.Tipo, oid)
	}
	c.Status(http.StatusNoContent)
}

// ── Público (verificação por código) ─────────────────────────────────────────

// GetByCode handles GET /certificates/:code — used by the public /verificar page
// (and reachable via the QR code). Returns the certificate plus a small seller
// summary and a computed "valid" status.
func (h *CertificateHandler) GetByCode(c *gin.Context) {
	code := strings.ToUpper(strings.TrimSpace(c.Param("code")))
	var cert models.Certificate
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Seller").Preload("Provider").
		First(&cert, "code = ?", code).Error; err != nil {
		JSONError(c, http.StatusNotFound, "certificado não encontrado")
		return
	}

	today := time.Now().Truncate(24 * time.Hour)
	valid := !cert.Revoked && !cert.ValidUntil.Before(today)

	resp := gin.H{
		"code":             cert.Code,
		"tipo":             cert.Tipo,
		"tier":             cert.Tier,
		"empresa_nome":     cert.EmpresaNome,
		"categoria":        cert.Categoria,
		"responsavel_nome": cert.ResponsavelNome,
		"issued_at":        cert.IssuedAt,
		"valid_until":      cert.ValidUntil,
		"revoked":          cert.Revoked,
		"valid":            valid,
	}
	// Bloco genérico do titular (empresa ou afiliado). Mantém "seller" por
	// compatibilidade com clientes antigos quando o titular é uma empresa.
	if cert.Seller != nil {
		owner := gin.H{
			"id":       cert.Seller.ID,
			"name":     cert.Seller.Name,
			"logo_url": cert.Seller.LogoURL,
			"type":     "seller",
		}
		resp["owner"] = owner
		resp["seller"] = owner
	} else if cert.Provider != nil {
		resp["owner"] = gin.H{
			"id":       cert.Provider.ID,
			"name":     cert.Provider.Name,
			"logo_url": cert.Provider.LogoURL,
			"type":     "provider",
		}
	}
	c.JSON(http.StatusOK, resp)
}

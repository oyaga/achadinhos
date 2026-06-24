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

	sellerID, err := uuid.Parse(req.SellerID)
	if err != nil {
		JSONError(c, http.StatusBadRequest, "empresa inválida")
		return
	}
	var seller models.Seller
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Category").
		First(&seller, "id = ?", sellerID).Error; err != nil {
		JSONError(c, http.StatusNotFound, "empresa não encontrada")
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

	categoria := ""
	if seller.Category != nil {
		categoria = seller.Category.Label
	}

	cert := &models.Certificate{
		Code:            code,
		SellerID:        seller.ID,
		EmpresaNome:     seller.Name,
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
	cert.Seller = &seller
	c.JSON(http.StatusCreated, cert)
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
		Preload("Seller").Preload("Seller.Category").
		First(&cert, "code = ?", code).Error; err != nil {
		JSONError(c, http.StatusNotFound, "certificado não encontrado")
		return
	}

	today := time.Now().Truncate(24 * time.Hour)
	valid := !cert.Revoked && !cert.ValidUntil.Before(today)

	resp := gin.H{
		"code":             cert.Code,
		"empresa_nome":     cert.EmpresaNome,
		"categoria":        cert.Categoria,
		"responsavel_nome": cert.ResponsavelNome,
		"issued_at":        cert.IssuedAt,
		"valid_until":      cert.ValidUntil,
		"revoked":          cert.Revoked,
		"valid":            valid,
	}
	if cert.Seller != nil {
		resp["seller"] = gin.H{
			"id":       cert.Seller.ID,
			"name":     cert.Seller.Name,
			"logo_url": cert.Seller.LogoURL,
		}
	}
	c.JSON(http.StatusOK, resp)
}

package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/email"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// FichaHandler exposes the company onboarding form ("ficha de cadastro")
// endpoints: admin CRUD (protected) plus the public get/submit by token.
type FichaHandler struct {
	db      *gorm.DB
	mailer  *email.Client
	baseURL string
}

// NewFichaHandler builds a FichaHandler. baseURL is the public frontend URL
// used to build the fill link (no trailing slash expected).
func NewFichaHandler(db *gorm.DB, mailer *email.Client, baseURL string) *FichaHandler {
	return &FichaHandler{db: db, mailer: mailer, baseURL: strings.TrimRight(baseURL, "/")}
}

func newFichaToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

// fillLink builds the public URL the responsável uses to fill the ficha. The
// frontend is a static export with trailingSlash, so the token rides in the
// query string of the static /ficha/ route.
func (h *FichaHandler) fillLink(token string) string {
	return h.baseURL + "/ficha/?token=" + token
}

// ── Admin ────────────────────────────────────────────────────────────────────

// List handles GET /admin/fichas.
func (h *FichaHandler) List(c *gin.Context) {
	var fichas []models.FichaCadastro
	if err := h.db.WithContext(c.Request.Context()).
		Order("created_at DESC").
		Find(&fichas).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list fichas")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fichas})
}

// Create handles POST /admin/fichas. Generates a unique token, persists the
// ficha as "pendente" and mails the fill link (best-effort).
func (h *FichaHandler) Create(c *gin.Context) {
	var req dto.AdminFichaCreateRequest
	if !BindJSON(c, &req) {
		return
	}
	token, err := newFichaToken()
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to generate token")
		return
	}
	f := &models.FichaCadastro{
		Token:            token,
		Status:           models.FichaStatusPendente,
		ResponsavelNome:  strings.TrimSpace(req.ResponsavelNome),
		ResponsavelEmail: strings.ToLower(strings.TrimSpace(req.ResponsavelEmail)),
	}
	if err := h.db.WithContext(c.Request.Context()).Create(f).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create ficha")
		return
	}

	link := h.fillLink(token)
	if err := h.mailer.SendFichaCadastro(c.Request.Context(), f.ResponsavelEmail, f.ResponsavelNome, link); err != nil {
		slog.Warn("failed to send ficha cadastro email", "ficha_id", f.ID, "err", err)
	}

	c.JSON(http.StatusCreated, gin.H{"ficha": f, "link": link, "email_enabled": h.mailer.Enabled()})
}

// Resend handles POST /admin/fichas/:id/resend — re-sends the fill e-mail and
// returns the link (useful when e-mail is disabled in dev).
func (h *FichaHandler) Resend(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var f models.FichaCadastro
	if err := h.db.WithContext(c.Request.Context()).First(&f, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "ficha não encontrada")
		return
	}
	link := h.fillLink(f.Token)
	if err := h.mailer.SendFichaCadastro(c.Request.Context(), f.ResponsavelEmail, f.ResponsavelNome, link); err != nil {
		slog.Warn("failed to resend ficha cadastro email", "ficha_id", f.ID, "err", err)
	}
	c.JSON(http.StatusOK, gin.H{"link": link, "email_enabled": h.mailer.Enabled()})
}

// Delete handles DELETE /admin/fichas/:id (soft delete).
func (h *FichaHandler) Delete(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	res := h.db.WithContext(c.Request.Context()).Delete(&models.FichaCadastro{}, "id = ?", id)
	if res.Error != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete ficha")
		return
	}
	if res.RowsAffected == 0 {
		JSONError(c, http.StatusNotFound, "ficha não encontrada")
		return
	}
	c.Status(http.StatusNoContent)
}

// ── Público (por token) ──────────────────────────────────────────────────────

// GetByToken handles GET /fichas/:token — returns the ficha so the public form
// can show the responsável's name and whether it was already submitted.
func (h *FichaHandler) GetByToken(c *gin.Context) {
	token := c.Param("token")
	var f models.FichaCadastro
	if err := h.db.WithContext(c.Request.Context()).
		First(&f, "token = ?", token).Error; err != nil {
		JSONError(c, http.StatusNotFound, "link inválido ou expirado")
		return
	}
	c.JSON(http.StatusOK, gin.H{"ficha": f})
}

// Submit handles POST /fichas/:token — the responsável fills the form. Only a
// "pendente" ficha can be submitted; afterwards it becomes "concluido".
func (h *FichaHandler) Submit(c *gin.Context) {
	token := c.Param("token")
	var f models.FichaCadastro
	if err := h.db.WithContext(c.Request.Context()).
		First(&f, "token = ?", token).Error; err != nil {
		JSONError(c, http.StatusNotFound, "link inválido ou expirado")
		return
	}
	if f.Status == models.FichaStatusConcluido {
		JSONError(c, http.StatusConflict, "esta ficha já foi preenchida")
		return
	}

	var req dto.FichaFillRequest
	if !BindJSON(c, &req) {
		return
	}

	now := time.Now()
	updates := map[string]any{
		"status":                  models.FichaStatusConcluido,
		"submitted_at":            now,
		"resp_cpf":                strings.TrimSpace(req.RespCPF),
		"resp_nascimento":         strings.TrimSpace(req.RespNascimento),
		"resp_endereco":           strings.TrimSpace(req.RespEndereco),
		"resp_telefone":           strings.TrimSpace(req.RespTelefone),
		"resp_cargo":              strings.TrimSpace(req.RespCargo),
		"razao_social":            strings.TrimSpace(req.RazaoSocial),
		"cnpj":                    strings.TrimSpace(req.CNPJ),
		"empresa_endereco":        strings.TrimSpace(req.EmpresaEndereco),
		"instagram":               strings.TrimSpace(req.Instagram),
		"facebook":                strings.TrimSpace(req.Facebook),
		"linked_in":               strings.TrimSpace(req.LinkedIn),
		"site":                    strings.TrimSpace(req.Site),
		"contrato_inicio":         strings.TrimSpace(req.ContratoInicio),
		"contrato_vigencia_meses": strings.TrimSpace(req.ContratoVigenciaMeses),
		"valor_mensal":            strings.TrimSpace(req.ValorMensal),
		"valor_anual":             strings.TrimSpace(req.ValorAnual),
		"observacoes":             strings.TrimSpace(req.Observacoes),
	}
	if err := h.db.WithContext(c.Request.Context()).
		Model(&f).Updates(updates).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "falha ao salvar a ficha")
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": models.FichaStatusConcluido})
}

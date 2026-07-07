package handlers

import (
	"net/http"
	"strings"
	"time"

	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// parseBannerDate valida "YYYY-MM-DD" (vazio => nil) e escreve 400 na falha.
func parseBannerDate(c *gin.Context, raw string) (*time.Time, bool) {
	s := strings.TrimSpace(raw)
	if s == "" {
		return nil, true
	}
	d, err := time.Parse("2006-01-02", s)
	if err != nil {
		JSONError(c, http.StatusBadRequest, "data inválida (use AAAA-MM-DD)")
		return nil, false
	}
	return &d, true
}

// BannerHandler exposes the ad/slide endpoints: public read of active banners
// plus admin CRUD (admin routes protected by RequireRole("admin")).
type BannerHandler struct {
	db *gorm.DB
}

// NewBannerHandler builds a BannerHandler.
func NewBannerHandler(db *gorm.DB) *BannerHandler {
	return &BannerHandler{db: db}
}

// ── Público ──────────────────────────────────────────────────────────────────

// List handles GET /banners?placement=hero|eventos — só ativos, com imagem e
// dentro do período de exibição (quando agendado), ordenados por posição.
func (h *BannerHandler) List(c *gin.Context) {
	today := time.Now().Format("2006-01-02")
	q := h.db.WithContext(c.Request.Context()).
		Where("active = ? AND image_url <> ''", true).
		Where("(starts_at IS NULL OR starts_at <= ?) AND (ends_at IS NULL OR ends_at >= ?)", today, today).
		Order("position ASC, created_at ASC")
	if p := strings.TrimSpace(c.Query("placement")); p != "" {
		if p != models.BannerPlacementHero && p != models.BannerPlacementEventos {
			JSONError(c, http.StatusBadRequest, "placement inválido")
			return
		}
		q = q.Where("placement = ?", p)
	}
	var banners []models.Banner
	if err := q.Find(&banners).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list banners")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": banners})
}

// ── Admin ────────────────────────────────────────────────────────────────────

// AdminList handles GET /admin/banners — todos, inclusive inativos/sem imagem.
func (h *BannerHandler) AdminList(c *gin.Context) {
	var banners []models.Banner
	if err := h.db.WithContext(c.Request.Context()).
		Order("placement ASC, position ASC, created_at ASC").
		Find(&banners).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list banners")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": banners})
}

// Create handles POST /admin/banners.
func (h *BannerHandler) Create(c *gin.Context) {
	var req dto.AdminBannerRequest
	if !BindJSON(c, &req) {
		return
	}
	active := true
	if req.Active != nil {
		active = *req.Active
	}
	starts, ok := parseBannerDate(c, req.StartsAt)
	if !ok {
		return
	}
	ends, ok := parseBannerDate(c, req.EndsAt)
	if !ok {
		return
	}
	b := &models.Banner{
		Title:     strings.TrimSpace(req.Title),
		Subtitle:  strings.TrimSpace(req.Subtitle),
		LinkURL:   strings.TrimSpace(req.LinkURL),
		Placement: req.Placement,
		Position:  req.Position,
		Active:    active,
		StartsAt:  starts,
		EndsAt:    ends,
	}
	if err := h.db.WithContext(c.Request.Context()).Create(b).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create banner")
		return
	}
	c.JSON(http.StatusCreated, b)
}

// Update handles PATCH /admin/banners/:id.
func (h *BannerHandler) Update(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var b models.Banner
	if err := h.db.WithContext(c.Request.Context()).First(&b, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "anúncio não encontrado")
		return
	}
	var req dto.AdminBannerPatch
	if !BindJSON(c, &req) {
		return
	}
	updates := map[string]any{}
	if req.Title != nil {
		updates["title"] = strings.TrimSpace(*req.Title)
	}
	if req.Subtitle != nil {
		updates["subtitle"] = strings.TrimSpace(*req.Subtitle)
	}
	if req.LinkURL != nil {
		updates["link_url"] = strings.TrimSpace(*req.LinkURL)
	}
	if req.Placement != nil {
		updates["placement"] = *req.Placement
	}
	if req.Position != nil {
		updates["position"] = *req.Position
	}
	if req.Active != nil {
		updates["active"] = *req.Active
	}
	if req.StartsAt != nil {
		d, ok := parseBannerDate(c, *req.StartsAt)
		if !ok {
			return
		}
		updates["starts_at"] = d
	}
	if req.EndsAt != nil {
		d, ok := parseBannerDate(c, *req.EndsAt)
		if !ok {
			return
		}
		updates["ends_at"] = d
	}
	if len(updates) > 0 {
		if err := h.db.WithContext(c.Request.Context()).Model(&b).Updates(updates).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update banner")
			return
		}
	}
	c.JSON(http.StatusOK, b)
}

// Delete handles DELETE /admin/banners/:id (soft delete). A imagem do disco é
// removida best-effort.
func (h *BannerHandler) Delete(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var b models.Banner
	if err := h.db.WithContext(c.Request.Context()).First(&b, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "anúncio não encontrado")
		return
	}
	if err := h.db.WithContext(c.Request.Context()).Delete(&b).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete banner")
		return
	}
	removeUploadedFile(b.ImageURL)
	c.Status(http.StatusNoContent)
}

// Reorder handles PUT /admin/banners/reorder — regrava as posições conforme a
// ordem dos ids recebidos (drag-and-drop no admin). Ids desconhecidos são
// ignorados; banners fora da lista mantêm a posição.
func (h *BannerHandler) Reorder(c *gin.Context) {
	var req dto.AdminBannerReorder
	if !BindJSON(c, &req) {
		return
	}
	err := h.db.WithContext(c.Request.Context()).Transaction(func(tx *gorm.DB) error {
		for i, raw := range req.IDs {
			id, err := uuid.Parse(raw)
			if err != nil {
				continue
			}
			if err := tx.Model(&models.Banner{}).
				Where("id = ?", id).
				Update("position", i).Error; err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to reorder banners")
		return
	}
	c.Status(http.StatusNoContent)
}

// UploadImage handles POST /admin/banners/:id/image (multipart, campo "file").
// Salva em /uploads/banners/ e grava image_url no anúncio.
func (h *BannerHandler) UploadImage(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var b models.Banner
	if err := h.db.WithContext(c.Request.Context()).First(&b, "id = ?", id).Error; err != nil {
		JSONError(c, http.StatusNotFound, "anúncio não encontrado")
		return
	}
	url, ok := saveUploadedFile(c, "banners", false, false)
	if !ok {
		return
	}
	old := b.ImageURL
	if err := h.db.WithContext(c.Request.Context()).Model(&b).
		Update("image_url", url).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save image")
		return
	}
	if old != "" && old != url {
		removeUploadedFile(old)
	}
	c.JSON(http.StatusOK, gin.H{"image_url": url})
}

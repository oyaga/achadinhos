package handlers

import (
	"errors"
	"net/http"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/middleware"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// MyCompanyHandler expõe /me/empresa: a empresa free (autocadastro, role
// empresa) vê e edita os próprios dados, logo e portfólio. Reusa a lógica do
// admin, mas sempre sobre o Seller da conta logada e só com os campos que a
// empresa pode mexer (selo, "Parceira", destaque e contrato ficam com o admin).
type MyCompanyHandler struct {
	db    *gorm.DB
	admin *AdminHandler
}

// NewMyCompanyHandler builds a MyCompanyHandler.
func NewMyCompanyHandler(db *gorm.DB) *MyCompanyHandler {
	return &MyCompanyHandler{db: db, admin: NewAdminHandler(db)}
}

// ownedSeller carrega a empresa da conta logada e injeta o id dela como o
// parâmetro :id da rota, que é de onde os helpers do admin o leem. Em erro, já
// escreve a resposta.
func (h *MyCompanyHandler) ownedSeller(c *gin.Context) (*models.Seller, bool) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return nil, false
	}
	var s models.Seller
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Category").
		Preload("Categories").
		Preload("PortfolioPhotos", orderByPosition).
		First(&s, "owner_user_id = ?", uid).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "empresa não encontrada")
			return nil, false
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch company")
		return nil, false
	}
	c.Params = append(c.Params, gin.Param{Key: "id", Value: s.ID.String()})
	return &s, true
}

// Get handles GET /me/empresa.
func (h *MyCompanyHandler) Get(c *gin.Context) {
	s, ok := h.ownedSeller(c)
	if !ok {
		return
	}
	c.JSON(http.StatusOK, s)
}

// Patch handles PATCH /me/empresa.
func (h *MyCompanyHandler) Patch(c *gin.Context) {
	s, ok := h.ownedSeller(c)
	if !ok {
		return
	}
	var req dto.MyCompanyPatch
	if !BindJSON(c, &req) {
		return
	}
	if req.CategoryIDs != nil {
		for _, id := range *req.CategoryIDs {
			if auth.ReservedCategory(id) {
				JSONError(c, http.StatusBadRequest, "category not allowed: "+id)
				return
			}
		}
	}
	if req.Name != nil {
		var n int64
		if err := h.db.WithContext(c.Request.Context()).Unscoped().Model(&models.Seller{}).
			Where("LOWER(name) = LOWER(?) AND id <> ?", *req.Name, s.ID).
			Count(&n).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to check name")
			return
		}
		if n > 0 {
			c.AbortWithStatusJSON(http.StatusConflict, ErrorResponse{
				Error: "company_name_taken",
				Code:  http.StatusConflict,
			})
			return
		}
	}
	patch := dto.AdminSellerPatch{
		Name:        req.Name,
		CategoryIDs: req.CategoryIDs,
		Description: req.Description,
		WhatsApp:    req.WhatsApp,
		Link:        req.Link,
		Instagram:   req.Instagram,
		Facebook:    req.Facebook,
		TikTok:      req.TikTok,
		YouTube:     req.YouTube,
	}
	// Grava sobre uma cópia sem as associações pré-carregadas: com a Category
	// antiga carregada, o GORM regravava o category_id anterior no Updates.
	var plain models.Seller
	if err := h.db.WithContext(c.Request.Context()).First(&plain, "id = ?", s.ID).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to fetch company")
		return
	}
	if !h.admin.applySellerPatch(c, &plain, &patch) {
		return
	}
	h.Get(c)
}

// UploadLogo handles POST /me/empresa/logo.
func (h *MyCompanyHandler) UploadLogo(c *gin.Context) {
	if _, ok := h.ownedSeller(c); ok {
		h.admin.uploadLogo(c, &models.Seller{})
	}
}

// UploadPortfolio handles POST /me/empresa/portfolio.
func (h *MyCompanyHandler) UploadPortfolio(c *gin.Context) {
	if _, ok := h.ownedSeller(c); ok {
		h.admin.uploadPortfolio(c, "seller", &models.Seller{})
	}
}

// AddPortfolioLink handles POST /me/empresa/portfolio/link.
func (h *MyCompanyHandler) AddPortfolioLink(c *gin.Context) {
	if _, ok := h.ownedSeller(c); ok {
		h.admin.addPortfolioLink(c, "seller", &models.Seller{})
	}
}

// DeletePortfolio handles DELETE /me/empresa/portfolio/:photo_id. O helper
// filtra por owner_id, então só apaga itens da própria empresa.
func (h *MyCompanyHandler) DeletePortfolio(c *gin.Context) {
	if _, ok := h.ownedSeller(c); ok {
		h.admin.deletePortfolio(c, "seller")
	}
}

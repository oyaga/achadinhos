package handlers

import (
	"errors"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/achadinhos/backend/internal/middleware"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// SellersHandler exposes seller endpoints.
type SellersHandler struct {
	db *gorm.DB
}

// NewSellersHandler builds a SellersHandler.
func NewSellersHandler(db *gorm.DB) *SellersHandler {
	return &SellersHandler{db: db}
}

// Get handles GET /sellers/:id — public seller profile + products.
func (h *SellersHandler) Get(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid seller id")
		return
	}
	var s models.Seller
	if err := h.db.WithContext(c.Request.Context()).First(&s, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "seller not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch seller")
		return
	}
	var products []models.Product
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Photos", func(db *gorm.DB) *gorm.DB {
			return db.Order("position ASC")
		}).
		Where("seller_id = ?", id).
		Order("rating DESC").
		Find(&products).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to fetch products")
		return
	}
	c.JSON(http.StatusOK, gin.H{"seller": s, "products": products})
}

// GetMe handles GET /sellers/me — authenticated seller's own profile + products.
func (h *SellersHandler) GetMe(c *gin.Context) {
	seller, ok := h.requireSeller(c)
	if !ok {
		return
	}
	var products []models.Product
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Photos", func(db *gorm.DB) *gorm.DB {
			return db.Order("position ASC")
		}).
		Where("seller_id = ?", seller.ID).
		Order("created_at DESC").
		Find(&products).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to fetch products")
		return
	}
	c.JSON(http.StatusOK, gin.H{"seller": seller, "products": products})
}

// PatchMe handles PATCH /sellers/me — update seller profile.
func (h *SellersHandler) PatchMe(c *gin.Context) {
	seller, ok := h.requireSeller(c)
	if !ok {
		return
	}
	var body struct {
		Name        *string `json:"name"`
		Description *string `json:"description"`
		WhatsApp    *string `json:"whatsapp"`
		Link        *string `json:"link"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		JSONError(c, http.StatusBadRequest, err.Error())
		return
	}
	updates := map[string]any{}
	if body.Name != nil {
		v := strings.TrimSpace(*body.Name)
		if v != "" {
			updates["name"] = v
		}
	}
	if body.Description != nil {
		updates["description"] = strings.TrimSpace(*body.Description)
	}
	if body.WhatsApp != nil {
		updates["whats_app"] = strings.TrimSpace(*body.WhatsApp)
	}
	if body.Link != nil {
		updates["link"] = strings.TrimSpace(*body.Link)
	}
	if len(updates) == 0 {
		c.JSON(http.StatusOK, seller)
		return
	}
	if err := h.db.WithContext(c.Request.Context()).Model(seller).Updates(updates).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to update seller")
		return
	}
	c.JSON(http.StatusOK, seller)
}

// CreateProduct handles POST /sellers/me/products.
func (h *SellersHandler) CreateProduct(c *gin.Context) {
	seller, ok := h.requireSeller(c)
	if !ok {
		return
	}
	var body struct {
		Name         string   `json:"name" binding:"required,min=2,max=255"`
		Category     string   `json:"category" binding:"required"`
		Price        float64  `json:"price" binding:"required,gt=0"`
		OldPrice     *float64 `json:"old_price"`
		Tag          string   `json:"tag"`
		Badge        string   `json:"badge"`
		Stock        string   `json:"stock"`
		Link         string   `json:"link"`
		Manufacturer string   `json:"manufacturer"`
	}
	if !BindJSON(c, &body) {
		return
	}
	p := &models.Product{
		ID:               uuid.New().String(),
		SellerID:         seller.ID,
		Name:             strings.TrimSpace(body.Name),
		Category:         strings.ToLower(strings.TrimSpace(body.Category)),
		Price:            body.Price,
		OldPrice:         body.OldPrice,
		Tag:              strings.TrimSpace(body.Tag),
		Badge:            strings.TrimSpace(body.Badge),
		Stock:            strings.TrimSpace(body.Stock),
		WhatsAppOverride: seller.WhatsApp,
		LinkOverride:     strings.TrimSpace(body.Link),
		Manufacturer:     strings.TrimSpace(body.Manufacturer),
	}
	if p.Stock == "" {
		p.Stock = "Em estoque"
	}
	if err := h.db.WithContext(c.Request.Context()).Create(p).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create product")
		return
	}
	c.JSON(http.StatusCreated, p)
}

// UpdateProduct handles PATCH /sellers/me/products/:id.
func (h *SellersHandler) UpdateProduct(c *gin.Context) {
	seller, ok := h.requireSeller(c)
	if !ok {
		return
	}
	pid := c.Param("id")
	var p models.Product
	if err := h.db.WithContext(c.Request.Context()).
		Where("id = ? AND seller_id = ?", pid, seller.ID).
		First(&p).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "product not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch product")
		return
	}
	var body struct {
		Name         *string  `json:"name"`
		Category     *string  `json:"category"`
		Price        *float64 `json:"price"`
		OldPrice     *float64 `json:"old_price"`
		Tag          *string  `json:"tag"`
		Badge        *string  `json:"badge"`
		Stock        *string  `json:"stock"`
		Link         *string  `json:"link"`
		Manufacturer *string  `json:"manufacturer"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		JSONError(c, http.StatusBadRequest, err.Error())
		return
	}
	updates := map[string]any{}
	if body.Name != nil {
		updates["name"] = strings.TrimSpace(*body.Name)
	}
	if body.Category != nil {
		updates["category"] = strings.ToLower(strings.TrimSpace(*body.Category))
	}
	if body.Price != nil && *body.Price > 0 {
		updates["price"] = *body.Price
	}
	if body.OldPrice != nil {
		updates["old_price"] = body.OldPrice
	}
	if body.Tag != nil {
		updates["tag"] = strings.TrimSpace(*body.Tag)
	}
	if body.Badge != nil {
		updates["badge"] = strings.TrimSpace(*body.Badge)
	}
	if body.Stock != nil {
		updates["stock"] = strings.TrimSpace(*body.Stock)
	}
	if body.Link != nil {
		updates["link_override"] = strings.TrimSpace(*body.Link)
	}
	if body.Manufacturer != nil {
		updates["manufacturer"] = strings.TrimSpace(*body.Manufacturer)
	}
	if len(updates) > 0 {
		if err := h.db.WithContext(c.Request.Context()).Model(&p).Updates(updates).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update product")
			return
		}
	}
	c.JSON(http.StatusOK, &p)
}

// DeleteProduct handles DELETE /sellers/me/products/:id.
func (h *SellersHandler) DeleteProduct(c *gin.Context) {
	seller, ok := h.requireSeller(c)
	if !ok {
		return
	}
	pid := c.Param("id")
	res := h.db.WithContext(c.Request.Context()).
		Where("id = ? AND seller_id = ?", pid, seller.ID).
		Delete(&models.Product{})
	if res.Error != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete product")
		return
	}
	if res.RowsAffected == 0 {
		JSONError(c, http.StatusNotFound, "product not found")
		return
	}
	c.Status(http.StatusNoContent)
}

// UploadProductPhoto handles POST /sellers/me/products/:id/photos.
// Accepts a multipart field "file" (jpg/png/webp/gif, max 5 MB).
// Saves the file to ./uploads/products/ and creates a ProductPhoto record.
func (h *SellersHandler) UploadProductPhoto(c *gin.Context) {
	seller, ok := h.requireSeller(c)
	if !ok {
		return
	}
	pid := c.Param("id")

	// Verify product belongs to seller.
	var p models.Product
	if err := h.db.WithContext(c.Request.Context()).
		Where("id = ? AND seller_id = ?", pid, seller.ID).
		First(&p).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "product not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch product")
		return
	}

	// Count existing non-deleted photos.
	var count int64
	if err := h.db.WithContext(c.Request.Context()).
		Model(&models.ProductPhoto{}).
		Where("product_id = ?", pid).
		Count(&count).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count photos")
		return
	}
	if count >= 5 {
		JSONError(c, http.StatusBadRequest, "máximo de 5 fotos por produto")
		return
	}

	fileHeader, err := c.FormFile("file")
	if err != nil {
		JSONError(c, http.StatusBadRequest, "campo 'file' ausente ou inválido")
		return
	}

	// Validate content type.
	ct := fileHeader.Header.Get("Content-Type")
	allowed := map[string]string{
		"image/jpeg": ".jpg",
		"image/png":  ".png",
		"image/webp": ".webp",
		"image/gif":  ".gif",
	}
	ext, ok := allowed[ct]
	if !ok {
		JSONError(c, http.StatusBadRequest, "tipo de arquivo não permitido (use jpg, png, webp)")
		return
	}

	// Validate file size (<= 5 MB).
	const maxSize = 5 << 20 // 5 MiB
	if fileHeader.Size > maxSize {
		JSONError(c, http.StatusBadRequest, "arquivo muito grande (máx 5 MB)")
		return
	}

	// Prefer extension from original filename if present.
	if origExt := filepath.Ext(fileHeader.Filename); origExt != "" {
		ext = strings.ToLower(origExt)
	}

	filename := uuid.New().String() + ext
	dir := filepath.Join(".", "uploads", "products")
	if err := os.MkdirAll(dir, 0755); err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create upload directory")
		return
	}
	destPath := filepath.Join(dir, filename)

	src, err := fileHeader.Open()
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to open uploaded file")
		return
	}
	defer src.Close()

	dst, err := os.Create(destPath)
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save file")
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, src); err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to write file")
		return
	}

	photo := &models.ProductPhoto{
		ProductID: pid,
		URL:       "/uploads/products/" + filename,
		Position:  int(count),
	}
	if err := h.db.WithContext(c.Request.Context()).Create(photo).Error; err != nil {
		// Best-effort cleanup of the saved file.
		_ = os.Remove(destPath)
		JSONError(c, http.StatusInternalServerError, "failed to save photo record")
		return
	}

	c.JSON(http.StatusCreated, photo)
}

// DeleteProductPhoto handles DELETE /sellers/me/products/:id/photos/:photo_id.
func (h *SellersHandler) DeleteProductPhoto(c *gin.Context) {
	seller, ok := h.requireSeller(c)
	if !ok {
		return
	}
	pid := c.Param("id")
	photoID := c.Param("photo_id")

	// Verify product belongs to seller.
	var p models.Product
	if err := h.db.WithContext(c.Request.Context()).
		Where("id = ? AND seller_id = ?", pid, seller.ID).
		First(&p).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "product not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch product")
		return
	}

	var photo models.ProductPhoto
	if err := h.db.WithContext(c.Request.Context()).
		Where("id = ? AND product_id = ?", photoID, pid).
		First(&photo).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "photo not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch photo")
		return
	}

	if err := h.db.WithContext(c.Request.Context()).Delete(&photo).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete photo")
		return
	}

	// Best-effort file removal — derive disk path from URL.
	if photo.URL != "" {
		// URL is "/uploads/products/<filename>"; map to local path.
		_ = os.Remove(filepath.Join(".", photo.URL))
	}

	c.Status(http.StatusNoContent)
}

// requireSeller extracts the authenticated user, verifies role=seller,
// loads their Seller record, and returns it. On any failure it writes the
// error response and returns ok=false.
func (h *SellersHandler) requireSeller(c *gin.Context) (*models.Seller, bool) {
	roleVal, _ := c.Get(middleware.CtxRole)
	role, _ := roleVal.(string)
	if role != string(models.RoleSeller) && role != string(models.RoleAdmin) {
		JSONError(c, http.StatusForbidden, "seller account required")
		return nil, false
	}
	userID := middleware.MustUserID(c)
	if userID == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthorized")
		return nil, false
	}
	var u models.User
	if err := h.db.WithContext(c.Request.Context()).First(&u, "id = ?", userID).Error; err != nil {
		JSONError(c, http.StatusUnauthorized, "user not found")
		return nil, false
	}
	if u.SellerID == nil {
		JSONError(c, http.StatusUnprocessableEntity, "no seller profile linked")
		return nil, false
	}
	var s models.Seller
	if err := h.db.WithContext(c.Request.Context()).First(&s, "id = ?", *u.SellerID).Error; err != nil {
		JSONError(c, http.StatusNotFound, "seller profile not found")
		return nil, false
	}
	return &s, true
}

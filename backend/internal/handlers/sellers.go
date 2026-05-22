package handlers

import (
	"errors"
	"net/http"

	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// SellersHandler exposes the public seller (empresa) endpoints. Sellers are
// catalog records managed by admins — they have no login of their own.
type SellersHandler struct {
	db *gorm.DB
}

// NewSellersHandler builds a SellersHandler.
func NewSellersHandler(db *gorm.DB) *SellersHandler {
	return &SellersHandler{db: db}
}

// List handles GET /sellers — public seller listing. Supports ?highlight=true
// to fetch only the empresas flagged for the home "destaque" section.
func (h *SellersHandler) List(c *gin.Context) {
	q := h.db.WithContext(c.Request.Context()).Model(&models.Seller{})
	if c.Query("highlight") == "true" {
		q = q.Where("highlight = ?", true)
	}
	var sellers []models.Seller
	if err := q.Order("name ASC").Find(&sellers).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list sellers")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sellers})
}

// Get handles GET /sellers/:id — public seller profile + products.
func (h *SellersHandler) Get(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid seller id")
		return
	}
	var s models.Seller
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Category").
		Preload("PortfolioPhotos", orderByPosition).
		First(&s, "id = ?", id).Error; err != nil {
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

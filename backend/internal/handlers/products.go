package handlers

import (
	"errors"
	"net/http"

	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// ProductsHandler exposes product endpoints.
type ProductsHandler struct {
	db *gorm.DB
}

// NewProductsHandler builds a ProductsHandler.
func NewProductsHandler(db *gorm.DB) *ProductsHandler {
	return &ProductsHandler{db: db}
}

// List handles GET /products.
func (h *ProductsHandler) List(c *gin.Context) {
	q := h.db.WithContext(c.Request.Context()).Model(&models.Product{}).Preload("Seller")
	if cat := c.Query("category"); cat != "" && cat != "all" {
		q = q.Where("category = ?", cat)
	}
	if search := c.Query("q"); search != "" {
		q = q.Where("name ILIKE ?", "%"+search+"%")
	}
	switch c.Query("sort") {
	case "price-asc":
		q = q.Order("price ASC")
	case "price-desc":
		q = q.Order("price DESC")
	case "rating":
		q = q.Order("rating DESC, reviews_count DESC")
	default:
		q = q.Order("rating DESC, reviews_count DESC, name ASC")
	}

	pg := ParsePagination(c)

	var total int64
	if err := q.Count(&total).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count products")
		return
	}
	var products []models.Product
	if err := q.Limit(pg.Limit).Offset(pg.Offset).Find(&products).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list products")
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data":   products,
		"total":  total,
		"limit":  pg.Limit,
		"offset": pg.Offset,
	})
}

// Get handles GET /products/:id.
func (h *ProductsHandler) Get(c *gin.Context) {
	id := c.Param("id")
	var p models.Product
	if err := h.db.WithContext(c.Request.Context()).Preload("Seller").First(&p, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "product not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch product")
		return
	}
	var related []models.Product
	if err := h.db.WithContext(c.Request.Context()).
		Where("category = ? AND id <> ?", p.Category, p.ID).
		Order("rating DESC").
		Limit(4).
		Find(&related).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to fetch related products")
		return
	}
	c.JSON(http.StatusOK, gin.H{"product": p, "related_products": related})
}

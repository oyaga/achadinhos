package handlers

import (
	"errors"
	"net/http"

	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// ProvidersHandler exposes provider endpoints.
type ProvidersHandler struct {
	db *gorm.DB
}

// NewProvidersHandler builds a ProvidersHandler.
func NewProvidersHandler(db *gorm.DB) *ProvidersHandler {
	return &ProvidersHandler{db: db}
}

// List handles GET /providers.
func (h *ProvidersHandler) List(c *gin.Context) {
	q := h.db.WithContext(c.Request.Context()).Model(&models.Provider{})

	if cat := c.Query("category"); cat != "" {
		q = q.Where("category_id = ?", cat)
	}
	if c.Query("verified") == "true" {
		q = q.Where("verified = ?", true)
	}
	if badge := c.Query("badge"); badge != "" {
		q = q.Where("badge = ?", badge)
	}
	if c.Query("highlight") == "true" {
		q = q.Where("highlight = ?", true)
	}
	if search := c.Query("q"); search != "" {
		like := "%" + search + "%"
		q = q.Where("name ILIKE ? OR description ILIKE ?", like, like)
	}

	switch c.Query("sort") {
	case "rating":
		q = q.Order("rating DESC, reviews_count DESC")
	case "distance":
		q = q.Order("distance_label ASC")
	case "price":
		q = q.Order("price_label ASC")
	default:
		// "relevance": highlight first, then rating, then reviews
		q = q.Order("highlight DESC, rating DESC, reviews_count DESC")
	}

	pg := ParsePagination(c)

	var total int64
	if err := q.Count(&total).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count providers")
		return
	}

	var providers []models.Provider
	if err := q.Limit(pg.Limit).Offset(pg.Offset).Find(&providers).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list providers")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":   providers,
		"total":  total,
		"limit":  pg.Limit,
		"offset": pg.Offset,
	})
}

// Get handles GET /providers/:id.
func (h *ProvidersHandler) Get(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid provider id")
		return
	}
	var p models.Provider
	if err := h.db.WithContext(c.Request.Context()).Preload("Category").First(&p, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "provider not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch provider")
		return
	}
	c.JSON(http.StatusOK, p)
}

// ListReviews handles GET /providers/:id/reviews.
func (h *ProvidersHandler) ListReviews(c *gin.Context) {
	pid, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid provider id")
		return
	}
	pg := ParsePagination(c)
	var reviews []models.Review
	if err := h.db.WithContext(c.Request.Context()).
		Preload("User").
		Where("provider_id = ?", pid).
		Order("helpful_count DESC, created_at DESC").
		Limit(pg.Limit).
		Offset(pg.Offset).
		Find(&reviews).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list reviews")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reviews, "limit": pg.Limit, "offset": pg.Offset})
}

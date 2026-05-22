package handlers

import (
	"errors"
	"net/http"
	"strings"

	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/middleware"
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
	if cat := c.Query("category"); cat != "" {
		q = q.Where("category_id = ?", cat)
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

// ── Avaliações da empresa ────────────────────────────────────────────────────

// ListReviews handles GET /sellers/:id/reviews — public.
func (h *SellersHandler) ListReviews(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid seller id")
		return
	}
	var reviews []models.SellerReview
	if err := h.db.WithContext(c.Request.Context()).
		Preload("User", func(db *gorm.DB) *gorm.DB { return db.Select("id", "name") }).
		Where("seller_id = ?", id).
		Order("created_at DESC").
		Find(&reviews).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list reviews")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reviews})
}

// CreateReview handles POST /sellers/:id/reviews. Requires auth. One review per
// user per seller — uma nova submissão do mesmo usuário atualiza a anterior.
func (h *SellersHandler) CreateReview(c *gin.Context) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return
	}
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid seller id")
		return
	}
	var req dto.CreateSellerReviewRequest
	if !BindJSON(c, &req) {
		return
	}

	ctx := c.Request.Context()
	var count int64
	if err := h.db.WithContext(ctx).Model(&models.Seller{}).Where("id = ?", id).
		Count(&count).Error; err != nil || count == 0 {
		JSONError(c, http.StatusNotFound, "seller not found")
		return
	}

	var review models.SellerReview
	err = h.db.WithContext(ctx).
		Where("seller_id = ? AND user_id = ?", id, uid).
		First(&review).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		review = models.SellerReview{SellerID: id, UserID: uid}
	} else if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to check review")
		return
	}
	review.Rating = req.Rating
	review.Text = strings.TrimSpace(req.Text)

	if err := h.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Save(&review).Error; err != nil {
			return err
		}
		return recalcSellerRating(tx, id)
	}); err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save review")
		return
	}

	_ = h.db.WithContext(ctx).
		Preload("User", func(db *gorm.DB) *gorm.DB { return db.Select("id", "name") }).
		First(&review, "id = ?", review.ID).Error
	c.JSON(http.StatusCreated, review)
}

// recalcSellerRating recomputes seller.rating and reviews_count from scratch.
func recalcSellerRating(tx *gorm.DB, sellerID uuid.UUID) error {
	type agg struct {
		AvgRating *float64
		Count     int64
	}
	var a agg
	if err := tx.Model(&models.SellerReview{}).
		Select("AVG(rating) AS avg_rating, COUNT(*) AS count").
		Where("seller_id = ?", sellerID).
		Scan(&a).Error; err != nil {
		return err
	}
	rating := 0.0
	if a.AvgRating != nil {
		rating = *a.AvgRating
	}
	return tx.Model(&models.Seller{}).Where("id = ?", sellerID).
		Updates(map[string]any{"rating": rating, "reviews_count": a.Count}).Error
}

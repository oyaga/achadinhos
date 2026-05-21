package handlers

import (
	"errors"
	"net/http"

	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/middleware"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// ReviewsHandler manages reviews.
type ReviewsHandler struct {
	db *gorm.DB
}

// NewReviewsHandler builds a ReviewsHandler.
func NewReviewsHandler(db *gorm.DB) *ReviewsHandler {
	return &ReviewsHandler{db: db}
}

// Create handles POST /providers/:id/reviews.
func (h *ReviewsHandler) Create(c *gin.Context) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return
	}
	pid, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid provider id")
		return
	}

	var req dto.CreateReviewRequest
	if !BindJSON(c, &req) {
		return
	}

	// Provider must exist.
	var p models.Provider
	if err := h.db.WithContext(c.Request.Context()).First(&p, "id = ?", pid).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "provider not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch provider")
		return
	}

	// Anti-duplicate: 1 review per user per provider.
	var existing models.Review
	err = h.db.WithContext(c.Request.Context()).Where("provider_id = ? AND user_id = ?", pid, uid).First(&existing).Error
	if err == nil {
		JSONError(c, http.StatusConflict, "review already exists for this provider")
		return
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		JSONError(c, http.StatusInternalServerError, "failed to check review")
		return
	}

	r := &models.Review{
		ProviderID: pid,
		UserID:     uid,
		Rating:     req.Rating,
		Text:       req.Text,
		Tags:       models.StringSlice(req.Tags),
		Verified:   true,
	}

	err = h.db.WithContext(c.Request.Context()).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(r).Error; err != nil {
			return err
		}
		return recalcProviderRating(tx, pid)
	})
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create review")
		return
	}

	c.JSON(http.StatusCreated, r)
}

// Delete handles DELETE /reviews/:id (own only or admin).
func (h *ReviewsHandler) Delete(c *gin.Context) {
	uid := middleware.MustUserID(c)
	role, _ := c.Get(middleware.CtxRole)
	roleStr, _ := role.(string)

	rid, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid review id")
		return
	}
	var r models.Review
	if err := h.db.WithContext(c.Request.Context()).First(&r, "id = ?", rid).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "review not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch review")
		return
	}
	if r.UserID != uid && roleStr != "admin" {
		JSONError(c, http.StatusForbidden, "not allowed")
		return
	}
	pid := r.ProviderID
	err = h.db.WithContext(c.Request.Context()).Transaction(func(tx *gorm.DB) error {
		if err := tx.Delete(&r).Error; err != nil {
			return err
		}
		return recalcProviderRating(tx, pid)
	})
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete review")
		return
	}
	c.Status(http.StatusNoContent)
}

// MarkHelpful handles POST /reviews/:id/helpful (idempotent per user).
func (h *ReviewsHandler) MarkHelpful(c *gin.Context) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return
	}
	rid, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid review id")
		return
	}

	err = h.db.WithContext(c.Request.Context()).Transaction(func(tx *gorm.DB) error {
		var r models.Review
		if err := tx.First(&r, "id = ?", rid).Error; err != nil {
			return err
		}
		// Idempotent insert.
		var existing models.ReviewHelpful
		if err := tx.Where("review_id = ? AND user_id = ?", rid, uid).First(&existing).Error; err == nil {
			return nil
		} else if !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
		if err := tx.Create(&models.ReviewHelpful{ReviewID: rid, UserID: uid}).Error; err != nil {
			return err
		}
		return tx.Model(&models.Review{}).Where("id = ?", rid).
			UpdateColumn("helpful_count", gorm.Expr("helpful_count + 1")).Error
	})
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "review not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to mark helpful")
		return
	}
	c.Status(http.StatusNoContent)
}

// recalcProviderRating recomputes provider.rating and reviews_count from scratch.
func recalcProviderRating(tx *gorm.DB, providerID uuid.UUID) error {
	type agg struct {
		AvgRating *float64
		Count     int64
	}
	var a agg
	if err := tx.Model(&models.Review{}).
		Select("AVG(rating) AS avg_rating, COUNT(*) AS count").
		Where("provider_id = ?", providerID).
		Scan(&a).Error; err != nil {
		return err
	}
	rating := 0.0
	if a.AvgRating != nil {
		rating = *a.AvgRating
	}
	return tx.Model(&models.Provider{}).Where("id = ?", providerID).
		Updates(map[string]any{
			"rating":        rating,
			"reviews_count": a.Count,
		}).Error
}

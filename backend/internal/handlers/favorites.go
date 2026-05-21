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

// FavoritesHandler manages user favorites.
type FavoritesHandler struct {
	db *gorm.DB
}

// NewFavoritesHandler builds a FavoritesHandler.
func NewFavoritesHandler(db *gorm.DB) *FavoritesHandler {
	return &FavoritesHandler{db: db}
}

// List handles GET /favorites?type=provider|product.
func (h *FavoritesHandler) List(c *gin.Context) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return
	}
	q := h.db.WithContext(c.Request.Context()).Where("user_id = ?", uid)
	if t := c.Query("type"); t != "" {
		if t != "provider" && t != "product" {
			JSONError(c, http.StatusBadRequest, "invalid type")
			return
		}
		q = q.Where("target_type = ?", t)
	}
	var favs []models.Favorite
	if err := q.Order("created_at DESC").Find(&favs).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list favorites")
		return
	}
	c.JSON(http.StatusOK, favs)
}

// Create handles POST /favorites.
func (h *FavoritesHandler) Create(c *gin.Context) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return
	}
	var req dto.FavoriteRequest
	if !BindJSON(c, &req) {
		return
	}

	f := &models.Favorite{
		UserID:     uid,
		TargetType: models.FavoriteTargetType(req.TargetType),
		TargetID:   req.TargetID,
	}
	err := h.db.WithContext(c.Request.Context()).Create(f).Error
	if err != nil {
		// Unique constraint violation = already favorited.
		var existing models.Favorite
		if e := h.db.WithContext(c.Request.Context()).
			Where("user_id = ? AND target_type = ? AND target_id = ?", uid, req.TargetType, req.TargetID).
			First(&existing).Error; e == nil {
			JSONError(c, http.StatusConflict, "already favorited")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to create favorite")
		return
	}
	c.JSON(http.StatusCreated, f)
}

// Delete handles DELETE /favorites.
func (h *FavoritesHandler) Delete(c *gin.Context) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return
	}
	var req dto.FavoriteRequest
	if !BindJSON(c, &req) {
		return
	}
	res := h.db.WithContext(c.Request.Context()).
		Where("user_id = ? AND target_type = ? AND target_id = ?", uid, req.TargetType, req.TargetID).
		Delete(&models.Favorite{})
	if res.Error != nil {
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "favorite not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to delete favorite")
		return
	}
	if res.RowsAffected == 0 {
		JSONError(c, http.StatusNotFound, "favorite not found")
		return
	}
	c.Status(http.StatusNoContent)
}

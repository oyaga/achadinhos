package handlers

import (
	"net/http"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/middleware"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// MeHandler manages /me endpoints.
type MeHandler struct {
	db   *gorm.DB
	auth *auth.Service
}

// NewMeHandler builds a MeHandler.
func NewMeHandler(db *gorm.DB, svc *auth.Service) *MeHandler {
	return &MeHandler{db: db, auth: svc}
}

// Get handles GET /me.
func (h *MeHandler) Get(c *gin.Context) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return
	}
	u, err := h.auth.FindByID(c.Request.Context(), uid)
	if err != nil {
		JSONError(c, http.StatusNotFound, "user not found")
		return
	}
	c.JSON(http.StatusOK, u)
}

// Patch handles PATCH /me.
func (h *MeHandler) Patch(c *gin.Context) {
	uid := middleware.MustUserID(c)
	if uid == uuid.Nil {
		JSONError(c, http.StatusUnauthorized, "unauthenticated")
		return
	}

	var req dto.UpdateMeRequest
	if !BindJSON(c, &req) {
		return
	}

	updates := map[string]any{}
	if req.Name != nil {
		updates["name"] = *req.Name
	}
	if req.Phone != nil {
		updates["phone"] = *req.Phone
	}
	if req.AvatarURL != nil {
		updates["avatar_url"] = *req.AvatarURL
	}
	if req.CondoID != nil {
		cid, err := uuid.Parse(*req.CondoID)
		if err != nil {
			JSONError(c, http.StatusBadRequest, "invalid condo_id")
			return
		}
		updates["condo_id"] = cid
	}
	if req.CompanyName != nil {
		updates["company_name"] = *req.CompanyName
	}
	if req.CondoName != nil {
		updates["condo_name"] = *req.CondoName
	}
	if req.CondoRole != nil {
		updates["condo_role"] = *req.CondoRole
	}
	if req.CEP != nil {
		updates["cep"] = *req.CEP
	}
	if req.Street != nil {
		updates["street"] = *req.Street
	}
	if req.Number != nil {
		updates["number"] = *req.Number
	}
	if req.Complement != nil {
		updates["complement"] = *req.Complement
	}
	if req.Neighborhood != nil {
		updates["neighborhood"] = *req.Neighborhood
	}
	if req.City != nil {
		updates["city"] = *req.City
	}
	if req.State != nil {
		updates["state"] = *req.State
	}

	if len(updates) == 0 {
		// Nothing to update — return current user.
		u, err := h.auth.FindByID(c.Request.Context(), uid)
		if err != nil {
			JSONError(c, http.StatusNotFound, "user not found")
			return
		}
		c.JSON(http.StatusOK, u)
		return
	}

	if err := h.db.WithContext(c.Request.Context()).Model(&models.User{}).Where("id = ?", uid).Updates(updates).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to update user")
		return
	}
	u, err := h.auth.FindByID(c.Request.Context(), uid)
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to reload user")
		return
	}
	c.JSON(http.StatusOK, u)
}

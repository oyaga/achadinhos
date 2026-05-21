package dto

import "github.com/achadinhos/backend/internal/models"

// RegisterRequest is the body of POST /auth/register.
type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6,max=128"`
	Name     string `json:"name" binding:"required,min=2,max=128"`
	Role     string `json:"role" binding:"required,oneof=sindico prestador"`
}

// LoginRequest is the body of POST /auth/login.
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// RefreshRequest is the body of POST /auth/refresh.
type RefreshRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

// AuthResponse is returned after successful auth.
type AuthResponse struct {
	User         *models.User `json:"user"`
	AccessToken  string       `json:"access_token"`
	RefreshToken string       `json:"refresh_token"`
	TokenType    string       `json:"token_type"`
	ExpiresIn    int64        `json:"expires_in"`
}

// UpdateMeRequest is the body of PATCH /me.
type UpdateMeRequest struct {
	Name      *string `json:"name" binding:"omitempty,min=2,max=128"`
	Phone     *string `json:"phone" binding:"omitempty,max=32"`
	AvatarURL *string `json:"avatar_url" binding:"omitempty,url,max=500"`
	CondoID   *string `json:"condo_id" binding:"omitempty,uuid"`
}

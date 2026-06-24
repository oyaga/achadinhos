package dto

import "github.com/achadinhos/backend/internal/models"

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

// UpdateMeRequest is the body of PATCH /me. All fields optional — only the ones
// present are updated. Identity fields (account_type, document) are set at
// sign-up and intentionally not editable here.
type UpdateMeRequest struct {
	Name      *string `json:"name" binding:"omitempty,min=2,max=128"`
	Phone     *string `json:"phone" binding:"omitempty,max=32"`
	AvatarURL *string `json:"avatar_url" binding:"omitempty,url,max=500"`
	CondoID   *string `json:"condo_id" binding:"omitempty,uuid"`

	CompanyName *string `json:"company_name" binding:"omitempty,max=160"`
	CondoName   *string `json:"condo_name" binding:"omitempty,max=120"`
	CondoRole   *string `json:"condo_role" binding:"omitempty,oneof=morador sindico conselho administradora"`

	CEP          *string `json:"cep" binding:"omitempty,max=9"`
	Street       *string `json:"street" binding:"omitempty,max=160"`
	Number       *string `json:"number" binding:"omitempty,max=20"`
	Complement   *string `json:"complement" binding:"omitempty,max=80"`
	Neighborhood *string `json:"neighborhood" binding:"omitempty,max=80"`
	City         *string `json:"city" binding:"omitempty,max=80"`
	State        *string `json:"state" binding:"omitempty,max=2"`
}

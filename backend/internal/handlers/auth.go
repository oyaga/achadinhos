package handlers

import (
	"errors"
	"net/http"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
)

// AuthHandler bundles auth-related HTTP handlers.
type AuthHandler struct {
	svc *auth.Service
}

// NewAuthHandler builds an AuthHandler.
func NewAuthHandler(svc *auth.Service) *AuthHandler {
	return &AuthHandler{svc: svc}
}

// Register handles POST /auth/register (legacy generic endpoint).
func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterRequest
	if !BindJSON(c, &req) {
		return
	}
	user, pair, err := h.svc.Register(c.Request.Context(), req.Email, req.Password, req.Name, models.Role(req.Role))
	if err != nil {
		if errors.Is(err, auth.ErrEmailTaken) {
			JSONError(c, http.StatusConflict, err.Error())
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to register")
		return
	}
	c.JSON(http.StatusCreated, dto.AuthResponse{
		User:         user,
		AccessToken:  pair.AccessToken,
		RefreshToken: pair.RefreshToken,
		TokenType:    pair.TokenType,
		ExpiresIn:    pair.ExpiresIn,
	})
}

// RegisterSindico handles POST /auth/register/sindico.
// Used for both moradores and síndicos (the condo_role field disambiguates).
func (h *AuthHandler) RegisterSindico(c *gin.Context) {
	var req dto.RegisterSindicoRequest
	if !BindJSON(c, &req) {
		return
	}
	user, pair, err := h.svc.RegisterSindico(c.Request.Context(), auth.SindicoProfile{
		Email:        req.Email,
		Password:     req.Password,
		Name:         req.Name,
		CPF:          req.CPF,
		Phone:        req.Phone,
		CondoName:    req.CondoName,
		CondoRole:    req.CondoRole,
		CEP:          req.Address.CEP,
		Street:       req.Address.Street,
		Number:       req.Address.Number,
		Complement:   req.Address.Complement,
		Neighborhood: req.Address.Neighborhood,
		City:         req.Address.City,
		State:        req.Address.State,
	})
	if err != nil {
		writeRegisterError(c, err)
		return
	}
	c.JSON(http.StatusCreated, dto.AuthResponse{
		User:         user,
		AccessToken:  pair.AccessToken,
		RefreshToken: pair.RefreshToken,
		TokenType:    pair.TokenType,
		ExpiresIn:    pair.ExpiresIn,
	})
}

// RegisterPrestador handles POST /auth/register/prestador.
func (h *AuthHandler) RegisterPrestador(c *gin.Context) {
	var req dto.RegisterPrestadorRequest
	if !BindJSON(c, &req) {
		return
	}
	user, pair, err := h.svc.RegisterPrestador(c.Request.Context(), auth.PrestadorProfile{
		Email:        req.Email,
		Password:     req.Password,
		Name:         req.Name,
		Whatsapp:     req.Whatsapp,
		DocumentType: req.DocumentType,
		Document:     req.Document,
		CompanyName:  req.CompanyName,
		CEP:          req.Address.CEP,
		Street:       req.Address.Street,
		Number:       req.Address.Number,
		Complement:   req.Address.Complement,
		Neighborhood: req.Address.Neighborhood,
		City:         req.Address.City,
		State:        req.Address.State,
	})
	if err != nil {
		writeRegisterError(c, err)
		return
	}
	c.JSON(http.StatusCreated, dto.AuthResponse{
		User:         user,
		AccessToken:  pair.AccessToken,
		RefreshToken: pair.RefreshToken,
		TokenType:    pair.TokenType,
		ExpiresIn:    pair.ExpiresIn,
	})
}

// RegisterSeller handles POST /auth/register/seller.
func (h *AuthHandler) RegisterSeller(c *gin.Context) {
	var req dto.RegisterSellerRequest
	if !BindJSON(c, &req) {
		return
	}
	user, pair, err := h.svc.RegisterSeller(c.Request.Context(), auth.SellerProfile{
		Email:        req.Email,
		Password:     req.Password,
		Name:         req.Name,
		Whatsapp:     req.Whatsapp,
		DocumentType: req.DocumentType,
		Document:     req.Document,
		CompanyName:  req.CompanyName,
		Description:  req.Description,
		Categories:   req.Categories,
		CEP:          req.Address.CEP,
		Street:       req.Address.Street,
		Number:       req.Address.Number,
		Complement:   req.Address.Complement,
		Neighborhood: req.Address.Neighborhood,
		City:         req.Address.City,
		State:        req.Address.State,
	})
	if err != nil {
		writeRegisterError(c, err)
		return
	}
	c.JSON(http.StatusCreated, dto.AuthResponse{
		User:         user,
		AccessToken:  pair.AccessToken,
		RefreshToken: pair.RefreshToken,
		TokenType:    pair.TokenType,
		ExpiresIn:    pair.ExpiresIn,
	})
}

// writeRegisterError translates service errors into the right HTTP status.
func writeRegisterError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, auth.ErrEmailTaken):
		c.AbortWithStatusJSON(http.StatusConflict, ErrorResponse{
			Error: "email_taken",
			Code:  http.StatusConflict,
		})
	case errors.Is(err, auth.ErrCPFTaken):
		c.AbortWithStatusJSON(http.StatusConflict, ErrorResponse{
			Error: "cpf_taken",
			Code:  http.StatusConflict,
		})
	case errors.Is(err, auth.ErrDocumentTaken):
		c.AbortWithStatusJSON(http.StatusConflict, ErrorResponse{
			Error: "document_taken",
			Code:  http.StatusConflict,
		})
	case errors.Is(err, auth.ErrInvalidCPF):
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"cpf": "invalid"},
		})
	case errors.Is(err, auth.ErrInvalidCNPJ):
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"document": "invalid_cnpj"},
		})
	case errors.Is(err, auth.ErrInvalidDocumentType):
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"document_type": "invalid"},
		})
	case errors.Is(err, auth.ErrInvalidCEP):
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"cep": "invalid"},
		})
	case errors.Is(err, auth.ErrInvalidRole):
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"condo_role": "invalid"},
		})
	default:
		JSONError(c, http.StatusInternalServerError, "failed to register")
	}
}

// Login handles POST /auth/login.
func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
	if !BindJSON(c, &req) {
		return
	}
	user, pair, err := h.svc.Login(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		if errors.Is(err, auth.ErrInvalidCredentials) {
			JSONError(c, http.StatusUnauthorized, "invalid email or password")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to login")
		return
	}
	c.JSON(http.StatusOK, dto.AuthResponse{
		User:         user,
		AccessToken:  pair.AccessToken,
		RefreshToken: pair.RefreshToken,
		TokenType:    pair.TokenType,
		ExpiresIn:    pair.ExpiresIn,
	})
}

// Refresh handles POST /auth/refresh.
func (h *AuthHandler) Refresh(c *gin.Context) {
	var req dto.RefreshRequest
	if !BindJSON(c, &req) {
		return
	}
	user, pair, err := h.svc.Refresh(c.Request.Context(), req.RefreshToken)
	if err != nil {
		if errors.Is(err, auth.ErrInvalidRefresh) {
			JSONError(c, http.StatusUnauthorized, "invalid or expired refresh token")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to refresh")
		return
	}
	c.JSON(http.StatusOK, dto.AuthResponse{
		User:         user,
		AccessToken:  pair.AccessToken,
		RefreshToken: pair.RefreshToken,
		TokenType:    pair.TokenType,
		ExpiresIn:    pair.ExpiresIn,
	})
}

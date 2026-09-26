package handlers

import (
	"errors"
	"net/http"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/dto"
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

// RegisterSindico handles POST /auth/register/sindico.
// This is the only public sign-up flow — used for moradores, síndicos and
// conselho (the condo_role field disambiguates).
func (h *AuthHandler) RegisterSindico(c *gin.Context) {
	var req dto.RegisterSindicoRequest
	if !BindJSON(c, &req) {
		return
	}
	user, pair, err := h.svc.RegisterSindico(c.Request.Context(), auth.SindicoProfile{
		AccountType:  req.AccountType,
		Email:        req.Email,
		Password:     req.Password,
		Name:         req.Name,
		CPF:          req.CPF,
		CNPJ:         req.CNPJ,
		CompanyName:  req.CompanyName,
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

// RegisterEmpresa handles POST /auth/register/empresa — autocadastro da
// empresa free (sem certificado). Cria a conta role=empresa e a empresa, que
// já aparece no site, sem selo.
func (h *AuthHandler) RegisterEmpresa(c *gin.Context) {
	var req dto.RegisterEmpresaRequest
	if !BindJSON(c, &req) {
		return
	}
	user, seller, pair, err := h.svc.RegisterEmpresa(c.Request.Context(), auth.EmpresaProfile{
		Name:         req.Name,
		Email:        req.Email,
		Password:     req.Password,
		CompanyName:  req.CompanyName,
		CategoryIDs:  req.CategoryIDs,
		WhatsApp:     req.WhatsApp,
		DocumentType: req.DocumentType,
		Document:     req.Document,
		Description:  req.Description,
		Link:         req.Link,
		Instagram:    req.Instagram,
		Facebook:     req.Facebook,
		TikTok:       req.TikTok,
		YouTube:      req.YouTube,
	})
	if err != nil {
		switch {
		case errors.Is(err, auth.ErrCompanyNameTaken):
			c.AbortWithStatusJSON(http.StatusConflict, ErrorResponse{Error: "company_name_taken", Code: http.StatusConflict})
		case errors.Is(err, auth.ErrCompanyDocTaken):
			c.AbortWithStatusJSON(http.StatusConflict, ErrorResponse{Error: "document_taken", Code: http.StatusConflict})
		case errors.Is(err, auth.ErrInvalidDocument):
			c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
				Error:   "validation_error",
				Code:    http.StatusUnprocessableEntity,
				Details: map[string]string{"document": "invalid"},
			})
		case errors.Is(err, auth.ErrInvalidCategories):
			c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
				Error:   "validation_error",
				Code:    http.StatusUnprocessableEntity,
				Details: map[string]string{"category_ids": "invalid"},
			})
		default:
			writeRegisterError(c, err)
		}
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"user":          user,
		"seller":        seller,
		"access_token":  pair.AccessToken,
		"refresh_token": pair.RefreshToken,
		"token_type":    pair.TokenType,
		"expires_in":    pair.ExpiresIn,
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
	case errors.Is(err, auth.ErrCNPJTaken):
		c.AbortWithStatusJSON(http.StatusConflict, ErrorResponse{
			Error: "cnpj_taken",
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
			Details: map[string]string{"cnpj": "invalid"},
		})
	case errors.Is(err, auth.ErrCompanyNameRequired):
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"company_name": "required"},
		})
	case errors.Is(err, auth.ErrCondoNameRequired):
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"condo_name": "required"},
		})
	case errors.Is(err, auth.ErrInvalidAccountType):
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"account_type": "invalid"},
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

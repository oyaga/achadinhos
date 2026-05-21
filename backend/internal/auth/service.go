package auth

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"strings"
	"time"

	"github.com/achadinhos/backend/internal/config"
	"github.com/achadinhos/backend/internal/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Common service errors.
var (
	ErrEmailTaken         = errors.New("email already registered")
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrInvalidRefresh     = errors.New("invalid or expired refresh token")
	ErrUserNotFound       = errors.New("user not found")
)

// Service handles register, login, refresh, and user lookups.
type Service struct {
	db  *gorm.DB
	cfg *config.Config
}

// New creates an auth Service.
func New(db *gorm.DB, cfg *config.Config) *Service {
	return &Service{db: db, cfg: cfg}
}

// TokenPair carries the access + refresh tokens returned to clients.
type TokenPair struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int64  `json:"expires_in"`
}

// Register creates a new user account and returns the user + initial token pair.
func (s *Service) Register(ctx context.Context, email, password, name string, role models.Role) (*models.User, *TokenPair, error) {
	email = strings.ToLower(strings.TrimSpace(email))

	var existing models.User
	if err := s.db.WithContext(ctx).Where("email = ?", email).First(&existing).Error; err == nil {
		return nil, nil, ErrEmailTaken
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil, err
	}

	hash, err := HashPassword(password)
	if err != nil {
		return nil, nil, err
	}

	u := &models.User{
		Email:        email,
		PasswordHash: hash,
		Name:         strings.TrimSpace(name),
		Role:         role,
	}
	if err := s.db.WithContext(ctx).Create(u).Error; err != nil {
		return nil, nil, err
	}

	pair, err := s.issueTokens(ctx, u)
	if err != nil {
		return nil, nil, err
	}
	return u, pair, nil
}

// Login authenticates a user and issues a new token pair.
func (s *Service) Login(ctx context.Context, email, password string) (*models.User, *TokenPair, error) {
	email = strings.ToLower(strings.TrimSpace(email))

	var u models.User
	if err := s.db.WithContext(ctx).Where("email = ?", email).First(&u).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil, ErrInvalidCredentials
		}
		return nil, nil, err
	}
	if err := CheckPassword(u.PasswordHash, password); err != nil {
		return nil, nil, ErrInvalidCredentials
	}
	pair, err := s.issueTokens(ctx, &u)
	if err != nil {
		return nil, nil, err
	}
	return &u, pair, nil
}

// Refresh validates an existing refresh token, revokes it, and issues a new pair.
func (s *Service) Refresh(ctx context.Context, refreshToken string) (*models.User, *TokenPair, error) {
	var rt models.RefreshToken
	if err := s.db.WithContext(ctx).Where("token = ?", refreshToken).First(&rt).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil, ErrInvalidRefresh
		}
		return nil, nil, err
	}
	if rt.RevokedAt != nil || time.Now().After(rt.ExpiresAt) {
		return nil, nil, ErrInvalidRefresh
	}

	var u models.User
	if err := s.db.WithContext(ctx).First(&u, "id = ?", rt.UserID).Error; err != nil {
		return nil, nil, ErrInvalidRefresh
	}

	now := time.Now()
	if err := s.db.WithContext(ctx).Model(&rt).Update("revoked_at", &now).Error; err != nil {
		return nil, nil, err
	}

	pair, err := s.issueTokens(ctx, &u)
	if err != nil {
		return nil, nil, err
	}
	return &u, pair, nil
}

// FindByID returns a user by ID.
func (s *Service) FindByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	var u models.User
	if err := s.db.WithContext(ctx).First(&u, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}
	return &u, nil
}

func (s *Service) issueTokens(ctx context.Context, u *models.User) (*TokenPair, error) {
	access, err := GenerateAccessToken(s.cfg.JWTSecret, u.ID, u.Email, string(u.Role), s.cfg.JWTAccessTTL)
	if err != nil {
		return nil, err
	}

	raw := make([]byte, 48)
	if _, err := rand.Read(raw); err != nil {
		return nil, err
	}
	refresh := hex.EncodeToString(raw)

	rt := &models.RefreshToken{
		UserID:    u.ID,
		Token:     refresh,
		ExpiresAt: time.Now().Add(s.cfg.JWTRefreshTTL),
	}
	if err := s.db.WithContext(ctx).Create(rt).Error; err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  access,
		RefreshToken: refresh,
		TokenType:    "Bearer",
		ExpiresIn:    int64(s.cfg.JWTAccessTTL.Seconds()),
	}, nil
}

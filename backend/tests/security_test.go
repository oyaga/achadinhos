package tests

import (
	"net/http"
	"sync"
	"testing"

	"github.com/achadinhos/backend/internal/config"
	"github.com/achadinhos/backend/internal/models"
)

// Two simultaneous refreshes with the same token: exactly one may succeed.
func TestRefreshTokenRotationIsAtomic(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)
	_, refresh := createUser(t, env, "race@test.com", "supersecret", "Race", models.RoleSindico)

	const n = 8
	codes := make([]int, n)
	var wg sync.WaitGroup
	for i := 0; i < n; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/refresh",
				map[string]any{"refresh_token": refresh}, "")
			codes[i] = rec.Code
		}(i)
	}
	wg.Wait()
	ok := 0
	for _, c := range codes {
		if c == http.StatusOK {
			ok++
		}
	}
	if ok != 1 {
		t.Fatalf("expected exactly 1 successful refresh, got %d (codes=%v)", ok, codes)
	}
}

// The raw refresh token must not be stored in the database.
func TestRefreshTokenStoredHashed(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)
	_, refresh := createUser(t, env, "hash@test.com", "supersecret", "Hash", models.RoleSindico)

	var n int64
	env.DB.Model(&models.RefreshToken{}).Where("token = ?", refresh).Count(&n)
	if n != 0 {
		t.Fatal("raw refresh token found in database")
	}
}

func TestSecurityHeaders(t *testing.T) {
	env := SetupTestEnv(t)
	rec, _ := doJSON(t, env.Router, http.MethodGet, "/health", nil, "")
	if rec.Header().Get("X-Content-Type-Options") != "nosniff" {
		t.Fatal("missing X-Content-Type-Options")
	}
	if rec.Header().Get("X-Frame-Options") == "" {
		t.Fatal("missing X-Frame-Options")
	}
}

func TestConfigRejectsWeakSecretsInProduction(t *testing.T) {
	weak := &config.Config{AppEnv: "production", JWTSecret: "dev-insecure-secret-change-me", DBPassword: "x-strong-db-pass-123"}
	if err := weak.Validate(); err == nil {
		t.Fatal("expected error for weak JWT secret in production")
	}
	good := &config.Config{AppEnv: "production", JWTSecret: "0123456789abcdef0123456789abcdef0123456789abcdef", DBPassword: "s3cure-db-pass-xyz"}
	if err := good.Validate(); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	dev := &config.Config{AppEnv: "development", JWTSecret: "short", DBPassword: "achadinhos_dev"}
	if err := dev.Validate(); err != nil {
		t.Fatalf("dev must only warn: %v", err)
	}
}

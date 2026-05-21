package tests

import (
	"net/http"
	"testing"
)

func TestAuthFlow(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)

	t.Run("register success", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register", map[string]any{
			"email":    "alice@test.com",
			"password": "supersecret",
			"name":     "Alice",
			"role":     "sindico",
		}, "")
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d body=%v", rec.Code, body)
		}
		if body["access_token"] == "" || body["refresh_token"] == "" {
			t.Fatalf("missing tokens: %v", body)
		}
	})

	t.Run("register duplicate email -> 409", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register", map[string]any{
			"email":    "alice@test.com",
			"password": "supersecret",
			"name":     "Alice2",
			"role":     "sindico",
		}, "")
		if rec.Code != http.StatusConflict {
			t.Fatalf("expected 409, got %d", rec.Code)
		}
	})

	t.Run("login success", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/login", map[string]any{
			"email":    "alice@test.com",
			"password": "supersecret",
		}, "")
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d body=%v", rec.Code, body)
		}
		if body["access_token"] == "" {
			t.Fatalf("missing access_token")
		}
	})

	t.Run("login wrong password -> 401", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/login", map[string]any{
			"email":    "alice@test.com",
			"password": "wrongpass",
		}, "")
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("expected 401, got %d", rec.Code)
		}
	})

	t.Run("refresh rotates", func(t *testing.T) {
		_, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/login", map[string]any{
			"email":    "alice@test.com",
			"password": "supersecret",
		}, "")
		oldRefresh, _ := body["refresh_token"].(string)
		rec, body2 := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/refresh", map[string]any{
			"refresh_token": oldRefresh,
		}, "")
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d body=%v", rec.Code, body2)
		}
		newRefresh, _ := body2["refresh_token"].(string)
		if newRefresh == "" || newRefresh == oldRefresh {
			t.Fatalf("expected rotated refresh token")
		}
		// old refresh must now be invalid
		recOld, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/refresh", map[string]any{
			"refresh_token": oldRefresh,
		}, "")
		if recOld.Code != http.StatusUnauthorized {
			t.Fatalf("expected 401 on revoked refresh, got %d", recOld.Code)
		}
	})

	t.Run("me requires auth", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodGet, "/api/v1/me", nil, "")
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("expected 401, got %d", rec.Code)
		}
	})

	t.Run("me with token", func(t *testing.T) {
		_, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/login", map[string]any{
			"email":    "alice@test.com",
			"password": "supersecret",
		}, "")
		access, _ := body["access_token"].(string)
		rec, body2 := doJSON(t, env.Router, http.MethodGet, "/api/v1/me", nil, access)
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d body=%v", rec.Code, body2)
		}
		if body2["email"] != "alice@test.com" {
			t.Fatalf("expected email alice@test.com, got %v", body2["email"])
		}
	})
}

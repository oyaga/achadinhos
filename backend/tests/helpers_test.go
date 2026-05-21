package tests

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
)

func doJSON(t *testing.T, r *gin.Engine, method, path string, body any, token string) (*httptest.ResponseRecorder, map[string]any) {
	t.Helper()
	var buf io.Reader
	if body != nil {
		b, err := json.Marshal(body)
		if err != nil {
			t.Fatalf("marshal: %v", err)
		}
		buf = bytes.NewReader(b)
	}
	req := httptest.NewRequest(method, path, buf)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)
	out := map[string]any{}
	if rec.Body.Len() > 0 && rec.Header().Get("Content-Type") != "" {
		_ = json.Unmarshal(rec.Body.Bytes(), &out)
	}
	return rec, out
}

// createUser inserts a user row directly (sign-up endpoints are limited to
// síndicos) and logs in, returning the access + refresh tokens.
func createUser(t *testing.T, env *testEnv, email, password, name string, role models.Role) (string, string) {
	t.Helper()
	hash, err := auth.HashPassword(password)
	if err != nil {
		t.Fatalf("hash password: %v", err)
	}
	u := &models.User{Email: email, PasswordHash: hash, Name: name, Role: role}
	if err := env.DB.Create(u).Error; err != nil {
		t.Fatalf("create user: %v", err)
	}
	rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/login", map[string]any{
		"email":    email,
		"password": password,
	}, "")
	if rec.Code != http.StatusOK {
		t.Fatalf("login: got status %d body=%v", rec.Code, body)
	}
	access, _ := body["access_token"].(string)
	refresh, _ := body["refresh_token"].(string)
	if access == "" || refresh == "" {
		t.Fatalf("login: missing tokens; body=%v", body)
	}
	return access, refresh
}

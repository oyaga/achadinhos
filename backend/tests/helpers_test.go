package tests

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

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

func registerUser(t *testing.T, r *gin.Engine, email, password, name, role string) (string, string) {
	t.Helper()
	rec, body := doJSON(t, r, http.MethodPost, "/api/v1/auth/register", map[string]any{
		"email":    email,
		"password": password,
		"name":     name,
		"role":     role,
	}, "")
	if rec.Code != http.StatusCreated {
		t.Fatalf("register: got status %d body=%v", rec.Code, body)
	}
	access, _ := body["access_token"].(string)
	refresh, _ := body["refresh_token"].(string)
	if access == "" || refresh == "" {
		t.Fatalf("register: missing tokens; body=%v", body)
	}
	return access, refresh
}

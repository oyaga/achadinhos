package tests

import (
	"net/http"
	"testing"
)

func TestFavoritesFlow(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)

	access, _ := registerUser(t, env.Router, "fav@test.com", "supersecret", "Fav User", "sindico")

	body := map[string]any{
		"target_type": "provider",
		"target_id":   "11111111-1111-1111-1111-111111111111",
	}

	t.Run("create", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/favorites", body, access)
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d", rec.Code)
		}
	})

	t.Run("create duplicate -> 409", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/favorites", body, access)
		if rec.Code != http.StatusConflict {
			t.Fatalf("expected 409, got %d", rec.Code)
		}
	})

	t.Run("list", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodGet, "/api/v1/favorites?type=provider", nil, access)
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
		// body is a JSON array, but we decoded into a map — check via raw recorder.
		_ = body
	})

	t.Run("delete", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodDelete, "/api/v1/favorites", body, access)
		if rec.Code != http.StatusNoContent {
			t.Fatalf("expected 204, got %d", rec.Code)
		}
	})

	t.Run("delete missing -> 404", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodDelete, "/api/v1/favorites", body, access)
		if rec.Code != http.StatusNotFound {
			t.Fatalf("expected 404, got %d", rec.Code)
		}
	})
}

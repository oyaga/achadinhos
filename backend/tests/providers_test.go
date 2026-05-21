package tests

import (
	"net/http"
	"testing"

	"github.com/achadinhos/backend/internal/models"
	"github.com/google/uuid"
)

func seedCatsAndProviders(t *testing.T, env *testEnv) {
	t.Helper()
	cats := []models.Category{
		{ID: "manutencao", Label: "Manutenção", Short: "Manutenção", Icon: "CatMaintenance"},
		{ID: "eletrica", Label: "Elétrica", Short: "Elétrica", Icon: "CatElectric"},
	}
	for i := range cats {
		if err := env.DB.Create(&cats[i]).Error; err != nil {
			t.Fatalf("seed cat: %v", err)
		}
	}
	providers := []models.Provider{
		{ID: uuid.New(), Name: "TurboElev", CategoryID: "manutencao", Avatar: "T", Rating: 4.9, ReviewsCount: 128, Verified: true, Highlight: true, WhatsApp: "11999999999"},
		{ID: uuid.New(), Name: "Alpha Elétrica", CategoryID: "eletrica", Avatar: "A", Rating: 4.5, ReviewsCount: 50, Verified: true, WhatsApp: "11888888888"},
		{ID: uuid.New(), Name: "Bad Provider", CategoryID: "eletrica", Avatar: "B", Rating: 3.0, ReviewsCount: 5, Verified: false, WhatsApp: "11777777777"},
	}
	for i := range providers {
		if err := env.DB.Create(&providers[i]).Error; err != nil {
			t.Fatalf("seed provider: %v", err)
		}
	}
}

func TestProviders(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)
	seedCatsAndProviders(t, env)

	t.Run("list all", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodGet, "/api/v1/providers", nil, "")
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
		data, _ := body["data"].([]any)
		if len(data) != 3 {
			t.Fatalf("expected 3 providers, got %d", len(data))
		}
	})

	t.Run("filter by category", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodGet, "/api/v1/providers?category=eletrica", nil, "")
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
		data, _ := body["data"].([]any)
		if len(data) != 2 {
			t.Fatalf("expected 2, got %d", len(data))
		}
	})

	t.Run("filter by verified", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodGet, "/api/v1/providers?verified=true", nil, "")
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
		data, _ := body["data"].([]any)
		if len(data) != 2 {
			t.Fatalf("expected 2 verified, got %d", len(data))
		}
	})

	t.Run("highlight", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodGet, "/api/v1/providers?highlight=true", nil, "")
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
		data, _ := body["data"].([]any)
		if len(data) != 1 {
			t.Fatalf("expected 1 highlight, got %d", len(data))
		}
	})

	t.Run("get by id 404", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodGet, "/api/v1/providers/00000000-0000-0000-0000-000000000000", nil, "")
		if rec.Code != http.StatusNotFound {
			t.Fatalf("expected 404, got %d", rec.Code)
		}
	})
}

func TestCategoriesList(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)
	seedCatsAndProviders(t, env)

	rec, _ := doJSON(t, env.Router, http.MethodGet, "/api/v1/categories", nil, "")
	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}
}

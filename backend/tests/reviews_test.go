package tests

import (
	"net/http"
	"testing"

	"github.com/achadinhos/backend/internal/models"
	"github.com/google/uuid"
)

func TestReviewsFlow(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)

	// Seed a category + provider.
	if err := env.DB.Create(&models.Category{ID: "manutencao", Label: "Manutenção", Short: "Manutenção", Icon: "X"}).Error; err != nil {
		t.Fatalf("seed cat: %v", err)
	}
	provID := uuid.New()
	if err := env.DB.Create(&models.Provider{ID: provID, Name: "Test Prov", CategoryID: "manutencao", WhatsApp: "11900000000"}).Error; err != nil {
		t.Fatalf("seed provider: %v", err)
	}

	access, _ := registerUser(t, env.Router, "rev@test.com", "supersecret", "Reviewer", "sindico")

	t.Run("create review recalcs rating", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/providers/"+provID.String()+"/reviews", map[string]any{
			"rating": 5,
			"text":   "Excelente atendimento!",
			"tags":   []string{"Pontual"},
		}, access)
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d", rec.Code)
		}
		var p models.Provider
		if err := env.DB.First(&p, "id = ?", provID).Error; err != nil {
			t.Fatalf("reload provider: %v", err)
		}
		if p.ReviewsCount != 1 || p.Rating != 5.0 {
			t.Fatalf("expected 1 review @5.0, got count=%d rating=%v", p.ReviewsCount, p.Rating)
		}
	})

	t.Run("duplicate review -> 409", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/providers/"+provID.String()+"/reviews", map[string]any{
			"rating": 4,
			"text":   "Outro comentário",
		}, access)
		if rec.Code != http.StatusConflict {
			t.Fatalf("expected 409, got %d", rec.Code)
		}
	})

	t.Run("review on missing provider -> 404", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/providers/00000000-0000-0000-0000-000000000000/reviews", map[string]any{
			"rating": 5,
			"text":   "ola tudo bem",
		}, access)
		if rec.Code != http.StatusNotFound {
			t.Fatalf("expected 404, got %d", rec.Code)
		}
	})
}

package tests

import (
	"net/http"
	"testing"

	"github.com/achadinhos/backend/internal/models"
)

func TestAdminPanel(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)

	if err := env.DB.Create(&models.Category{ID: "limpeza", Label: "Limpeza", Short: "Limpeza", Icon: "CatCleaning"}).Error; err != nil {
		t.Fatalf("seed category: %v", err)
	}

	adminToken, _ := createUser(t, env, "admin@test.com", "supersecret", "Admin", models.RoleAdmin)
	sindicoToken, _ := createUser(t, env, "sindico@test.com", "supersecret", "Síndico", models.RoleSindico)

	t.Run("sindico is forbidden", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodGet, "/api/v1/admin/sellers", nil, sindicoToken)
		if rec.Code != http.StatusForbidden {
			t.Fatalf("expected 403 for non-admin, got %d", rec.Code)
		}
	})

	t.Run("anonymous is unauthorized", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodGet, "/api/v1/admin/sellers", nil, "")
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("expected 401 for anonymous, got %d", rec.Code)
		}
	})

	var sellerID string
	t.Run("create empresa", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/admin/sellers", map[string]any{
			"name":          "Distribuidora Teste",
			"category_id":   "limpeza",
			"whatsapp":      "11987654000",
			"partner":       true,
			"document_type": "cnpj",
			"document":      "11.222.333/0001-81",
		}, adminToken)
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d body=%v", rec.Code, body)
		}
		sellerID, _ = body["id"].(string)
		if sellerID == "" {
			t.Fatalf("missing seller id: %v", body)
		}
	})

	t.Run("create prestador", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/admin/providers", map[string]any{
			"name":          "CleanPro Teste",
			"category_id":   "limpeza",
			"description":   "Equipe de limpeza para áreas comuns.",
			"whatsapp":      "11987654001",
			"verified":      true,
			"document_type": "cpf",
			"document":      "529.982.247-25",
		}, adminToken)
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d body=%v", rec.Code, body)
		}
		if body["verified"] != true {
			t.Errorf("expected verified=true, got %v", body["verified"])
		}
	})

	t.Run("create prestador with bad category -> 400", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/admin/providers", map[string]any{
			"name":          "Sem Categoria",
			"category_id":   "inexistente",
			"description":   "Descrição suficientemente longa.",
			"whatsapp":      "11987654002",
			"document_type": "cnpj",
			"document":      "11.222.333/0001-81",
		}, adminToken)
		if rec.Code != http.StatusBadRequest {
			t.Fatalf("expected 400, got %d", rec.Code)
		}
	})

	t.Run("create empresa with invalid document -> 422", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/admin/sellers", map[string]any{
			"name":          "Doc Inválido",
			"category_id":   "limpeza",
			"whatsapp":      "11987654003",
			"document_type": "cnpj",
			"document":      "11.111.111/1111-11",
		}, adminToken)
		if rec.Code != http.StatusUnprocessableEntity {
			t.Fatalf("expected 422 for invalid document, got %d", rec.Code)
		}
	})

	var productID string
	t.Run("create produto", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/admin/products", map[string]any{
			"name":      "Saco de lixo 100L",
			"category":  "limpeza",
			"price":     89.9,
			"seller_id": sellerID,
		}, adminToken)
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d body=%v", rec.Code, body)
		}
		productID, _ = body["id"].(string)
		if productID == "" {
			t.Fatalf("missing product id: %v", body)
		}
	})

	t.Run("produto appears in public listing", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodGet, "/api/v1/products", nil, "")
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
		data, _ := body["data"].([]any)
		if len(data) != 1 {
			t.Fatalf("expected 1 product, got %d", len(data))
		}
	})

	t.Run("delete empresa with products -> 409", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodDelete, "/api/v1/admin/sellers/"+sellerID, nil, adminToken)
		if rec.Code != http.StatusConflict {
			t.Fatalf("expected 409, got %d", rec.Code)
		}
	})

	t.Run("delete produto then empresa", func(t *testing.T) {
		rec, _ := doJSON(t, env.Router, http.MethodDelete, "/api/v1/admin/products/"+productID, nil, adminToken)
		if rec.Code != http.StatusNoContent {
			t.Fatalf("expected 204 deleting product, got %d", rec.Code)
		}
		rec, _ = doJSON(t, env.Router, http.MethodDelete, "/api/v1/admin/sellers/"+sellerID, nil, adminToken)
		if rec.Code != http.StatusNoContent {
			t.Fatalf("expected 204 deleting seller, got %d", rec.Code)
		}
	})
}

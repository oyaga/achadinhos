package tests

import (
	"net/http"
	"testing"
	"time"

	"github.com/achadinhos/backend/internal/models"
)

// bannerIDs extrai os ids de {"data":[...]} na ordem retornada.
func bannerIDs(body map[string]any) []string {
	raw, _ := body["data"].([]any)
	out := make([]string, 0, len(raw))
	for _, it := range raw {
		m, _ := it.(map[string]any)
		if id, _ := m["id"].(string); id != "" {
			out = append(out, id)
		}
	}
	return out
}

func TestBannersPublicVisibilityAndSchedule(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)
	env.DB.Exec("TRUNCATE TABLE banners CASCADE")

	adminTok, _ := createUser(t, env, "admin-banner@test.com", "senha123", "Admin", models.RoleAdmin)
	sindicoTok, _ := createUser(t, env, "sindico-banner@test.com", "senha123", "Síndico", models.RoleSindico)

	// Não-admin não cria.
	rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/admin/banners",
		map[string]any{"placement": "hero", "title": "X"}, sindicoTok)
	if rec.Code != http.StatusForbidden {
		t.Fatalf("sindico create: got %d, want 403", rec.Code)
	}

	// Admin cria (sem imagem) — não aparece no público.
	rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/admin/banners",
		map[string]any{"placement": "hero", "title": "Boas-vindas"}, adminTok)
	if rec.Code != http.StatusCreated {
		t.Fatalf("create: got %d body=%v", rec.Code, body)
	}
	id, _ := body["id"].(string)

	rec, body = doJSON(t, env.Router, http.MethodGet, "/api/v1/banners?placement=hero", nil, "")
	if rec.Code != http.StatusOK || len(bannerIDs(body)) != 0 {
		t.Fatalf("public sem imagem: got %d ids=%v, want vazio", rec.Code, bannerIDs(body))
	}

	// Com imagem aparece.
	if err := env.DB.Model(&models.Banner{}).Where("id = ?", id).
		Update("image_url", "/uploads/banners/x.jpg").Error; err != nil {
		t.Fatalf("set image: %v", err)
	}
	rec, body = doJSON(t, env.Router, http.MethodGet, "/api/v1/banners?placement=hero", nil, "")
	if got := bannerIDs(body); rec.Code != http.StatusOK || len(got) != 1 || got[0] != id {
		t.Fatalf("public com imagem: got %d ids=%v", rec.Code, got)
	}

	// Placement inválido → 400.
	rec, _ = doJSON(t, env.Router, http.MethodGet, "/api/v1/banners?placement=xyz", nil, "")
	if rec.Code != http.StatusBadRequest {
		t.Fatalf("placement inválido: got %d, want 400", rec.Code)
	}

	// Agendado no passado some; período aberto no futuro volta.
	past := time.Now().AddDate(0, 0, -10).Format("2006-01-02")
	pastEnd := time.Now().AddDate(0, 0, -5).Format("2006-01-02")
	rec, _ = doJSON(t, env.Router, http.MethodPatch, "/api/v1/admin/banners/"+id,
		map[string]any{"starts_at": past, "ends_at": pastEnd}, adminTok)
	if rec.Code != http.StatusOK {
		t.Fatalf("patch schedule: got %d", rec.Code)
	}
	rec, body = doJSON(t, env.Router, http.MethodGet, "/api/v1/banners?placement=hero", nil, "")
	if len(bannerIDs(body)) != 0 {
		t.Fatalf("fora do período deveria sumir; ids=%v", bannerIDs(body))
	}
	future := time.Now().AddDate(0, 0, 5).Format("2006-01-02")
	rec, _ = doJSON(t, env.Router, http.MethodPatch, "/api/v1/admin/banners/"+id,
		map[string]any{"starts_at": "", "ends_at": future}, adminTok)
	if rec.Code != http.StatusOK {
		t.Fatalf("patch clear starts: got %d", rec.Code)
	}
	rec, body = doJSON(t, env.Router, http.MethodGet, "/api/v1/banners?placement=hero", nil, "")
	if len(bannerIDs(body)) != 1 {
		t.Fatalf("dentro do período deveria voltar; ids=%v", bannerIDs(body))
	}

	// Pausado some do público mas segue no admin.
	rec, _ = doJSON(t, env.Router, http.MethodPatch, "/api/v1/admin/banners/"+id,
		map[string]any{"active": false}, adminTok)
	if rec.Code != http.StatusOK {
		t.Fatalf("patch active: got %d", rec.Code)
	}
	_, body = doJSON(t, env.Router, http.MethodGet, "/api/v1/banners?placement=hero", nil, "")
	if len(bannerIDs(body)) != 0 {
		t.Fatalf("pausado deveria sumir do público")
	}
	_, body = doJSON(t, env.Router, http.MethodGet, "/api/v1/admin/banners", nil, adminTok)
	if len(bannerIDs(body)) != 1 {
		t.Fatalf("pausado deveria continuar no admin")
	}
}

func TestBannersReorder(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)
	env.DB.Exec("TRUNCATE TABLE banners CASCADE")

	adminTok, _ := createUser(t, env, "admin-reorder@test.com", "senha123", "Admin", models.RoleAdmin)

	ids := make([]string, 0, 3)
	for _, title := range []string{"A", "B", "C"} {
		rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/admin/banners",
			map[string]any{"placement": "eventos", "title": title}, adminTok)
		if rec.Code != http.StatusCreated {
			t.Fatalf("create %s: got %d", title, rec.Code)
		}
		id, _ := body["id"].(string)
		ids = append(ids, id)
	}

	// Inverte a ordem: C, B, A.
	rec, _ := doJSON(t, env.Router, http.MethodPut, "/api/v1/admin/banners/reorder",
		map[string]any{"ids": []string{ids[2], ids[1], ids[0]}}, adminTok)
	if rec.Code != http.StatusNoContent {
		t.Fatalf("reorder: got %d, want 204", rec.Code)
	}

	_, body := doJSON(t, env.Router, http.MethodGet, "/api/v1/admin/banners", nil, adminTok)
	got := bannerIDs(body)
	want := []string{ids[2], ids[1], ids[0]}
	for i := range want {
		if got[i] != want[i] {
			t.Fatalf("ordem após reorder: got %v, want %v", got, want)
		}
	}
}

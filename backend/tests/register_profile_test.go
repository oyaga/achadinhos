package tests

import (
	"net/http"
	"testing"

	"github.com/achadinhos/backend/internal/models"
)

// validSindicoBody returns a fresh, valid request body for register/sindico.
func validSindicoBody() map[string]any {
	return map[string]any{
		"name":     "Carlos Mendes",
		"email":    "carlos.sindico@test.com",
		"password": "senha12345",
		"cpf":      "123.456.789-09",
		"phone":    "(11) 98765-4321",
		"address": map[string]any{
			"cep":          "01310-100",
			"street":       "Av. Paulista",
			"number":       "1000",
			"complement":   "ap 42",
			"neighborhood": "Bela Vista",
			"city":         "São Paulo",
			"state":        "SP",
		},
		"condo_name": "Edifício Aurora",
		"condo_role": "morador",
	}
}

func TestRegisterSindico(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)

	t.Run("success persists profile", func(t *testing.T) {
		rec, body := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/sindico", validSindicoBody(), "")
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d body=%v", rec.Code, body)
		}
		access, _ := body["access_token"].(string)
		if access == "" || body["refresh_token"] == "" {
			t.Fatalf("missing tokens: %v", body)
		}
		user, _ := body["user"].(map[string]any)
		if user == nil {
			t.Fatalf("expected user in response, got %v", body)
		}
		if user["email"] != "carlos.sindico@test.com" {
			t.Errorf("expected email persisted, got %v", user["email"])
		}
		if user["role"] != "sindico" {
			t.Errorf("expected role=sindico, got %v", user["role"])
		}
		if user["cpf"] != "12345678909" {
			t.Errorf("expected stripped cpf 12345678909, got %v", user["cpf"])
		}
		if user["condo_role"] != "morador" {
			t.Errorf("expected condo_role=morador, got %v", user["condo_role"])
		}
		if user["condo_name"] != "Edifício Aurora" {
			t.Errorf("expected condo_name persisted, got %v", user["condo_name"])
		}
		if user["state"] != "SP" {
			t.Errorf("expected state=SP, got %v", user["state"])
		}
		if user["cep"] != "01310100" {
			t.Errorf("expected stripped cep, got %v", user["cep"])
		}
		if user["phone"] != "11987654321" {
			t.Errorf("expected stripped phone, got %v", user["phone"])
		}

		// /me returns the full profile.
		recMe, bodyMe := doJSON(t, env.Router, http.MethodGet, "/api/v1/me", nil, access)
		if recMe.Code != http.StatusOK {
			t.Fatalf("expected /me 200, got %d", recMe.Code)
		}
		if bodyMe["condo_name"] != "Edifício Aurora" {
			t.Errorf("expected /me to include condo_name, got %v", bodyMe["condo_name"])
		}

		// Login subsequente funciona.
		recLog, bodyLog := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/login", map[string]any{
			"email":    "carlos.sindico@test.com",
			"password": "senha12345",
		}, "")
		if recLog.Code != http.StatusOK {
			t.Fatalf("expected login 200, got %d body=%v", recLog.Code, bodyLog)
		}

		// Verify directly in DB.
		var u models.User
		if err := env.DB.Where("email = ?", "carlos.sindico@test.com").First(&u).Error; err != nil {
			t.Fatalf("user not found in db: %v", err)
		}
		if u.CPF != "12345678909" {
			t.Errorf("db cpf = %q, want stripped digits", u.CPF)
		}
		if u.CondoRole != "morador" {
			t.Errorf("db condo_role = %q", u.CondoRole)
		}
		if u.Street != "Av. Paulista" || u.Number != "1000" || u.Neighborhood != "Bela Vista" {
			t.Errorf("address not fully persisted: %+v", u)
		}
	})

	t.Run("invalid cpf -> 422", func(t *testing.T) {
		body := validSindicoBody()
		body["email"] = "another@test.com"
		body["cpf"] = "111.111.111-11" // repeated digits
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/sindico", body, "")
		if rec.Code != http.StatusUnprocessableEntity {
			t.Fatalf("expected 422, got %d body=%v", rec.Code, resp)
		}
		if resp["error"] != "validation_error" {
			t.Errorf("expected validation_error, got %v", resp["error"])
		}
	})

	t.Run("invalid condo_role -> 400 from binding", func(t *testing.T) {
		body := validSindicoBody()
		body["email"] = "yet-another@test.com"
		body["condo_role"] = "bombeiro"
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/sindico", body, "")
		// validator's oneof rule rejects with 400 (binding-level).
		if rec.Code != http.StatusBadRequest {
			t.Fatalf("expected 400 from oneof validator, got %d", rec.Code)
		}
	})

	t.Run("invalid cep -> 422", func(t *testing.T) {
		body := validSindicoBody()
		body["email"] = "cep-bad@test.com"
		addr := body["address"].(map[string]any)
		addr["cep"] = "ABC-XYZ"
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/sindico", body, "")
		if rec.Code != http.StatusUnprocessableEntity {
			t.Fatalf("expected 422 for bad cep, got %d body=%v", rec.Code, resp)
		}
	})

	t.Run("duplicate email -> 409", func(t *testing.T) {
		// Reuse email from successful first run.
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/sindico", validSindicoBody(), "")
		if rec.Code != http.StatusConflict {
			t.Fatalf("expected 409, got %d body=%v", rec.Code, resp)
		}
		if resp["error"] != "email_taken" {
			t.Errorf("expected error=email_taken, got %v", resp["error"])
		}
	})

	t.Run("duplicate cpf -> 409", func(t *testing.T) {
		body := validSindicoBody()
		body["email"] = "novo-email@test.com" // different email, same CPF
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/sindico", body, "")
		if rec.Code != http.StatusConflict {
			t.Fatalf("expected 409, got %d body=%v", rec.Code, resp)
		}
		if resp["error"] != "cpf_taken" {
			t.Errorf("expected error=cpf_taken, got %v", resp["error"])
		}
	})

	t.Run("missing required field -> 400", func(t *testing.T) {
		body := validSindicoBody()
		delete(body, "name")
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/sindico", body, "")
		if rec.Code != http.StatusBadRequest {
			t.Fatalf("expected 400, got %d", rec.Code)
		}
	})
}

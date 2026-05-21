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

// validPrestadorBody returns a fresh, valid request body for register/prestador.
func validPrestadorBody(docType, doc string) map[string]any {
	return map[string]any{
		"name":          "João Eletricista",
		"email":         "joao@alphaeletrica.test",
		"password":      "senha12345",
		"whatsapp":      "11987654321",
		"document_type": docType,
		"document":      doc,
		"company_name":  "Alpha Elétrica Ltda",
		"address": map[string]any{
			"cep":          "01310-100",
			"street":       "Av. Paulista",
			"number":       "200",
			"complement":   "",
			"neighborhood": "Bela Vista",
			"city":         "São Paulo",
			"state":        "SP",
		},
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

func TestRegisterPrestador(t *testing.T) {
	env := SetupTestEnv(t)
	TruncateAll(t, env.DB)

	t.Run("success with cnpj", func(t *testing.T) {
		body := validPrestadorBody("cnpj", "11.222.333/0001-81")
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/prestador", body, "")
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d body=%v", rec.Code, resp)
		}
		user, _ := resp["user"].(map[string]any)
		if user == nil {
			t.Fatalf("missing user in response: %v", resp)
		}
		if user["role"] != "prestador" {
			t.Errorf("expected role=prestador, got %v", user["role"])
		}
		if user["document_type"] != "cnpj" {
			t.Errorf("expected document_type=cnpj, got %v", user["document_type"])
		}
		if user["document"] != "11222333000181" {
			t.Errorf("expected stripped cnpj, got %v", user["document"])
		}
		if user["company_name"] != "Alpha Elétrica Ltda" {
			t.Errorf("expected company_name persisted, got %v", user["company_name"])
		}

		var u models.User
		if err := env.DB.Where("email = ?", "joao@alphaeletrica.test").First(&u).Error; err != nil {
			t.Fatalf("user not found: %v", err)
		}
		if u.Document != "11222333000181" {
			t.Errorf("db document = %q", u.Document)
		}
		if u.Whatsapp != "11987654321" {
			t.Errorf("db whatsapp = %q", u.Whatsapp)
		}
	})

	t.Run("success with cpf", func(t *testing.T) {
		body := validPrestadorBody("cpf", "529.982.247-25")
		body["email"] = "freelancer@test.com"
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/prestador", body, "")
		if rec.Code != http.StatusCreated {
			t.Fatalf("expected 201, got %d body=%v", rec.Code, resp)
		}
		user, _ := resp["user"].(map[string]any)
		if user["document_type"] != "cpf" {
			t.Errorf("expected document_type=cpf, got %v", user["document_type"])
		}
		if user["document"] != "52998224725" {
			t.Errorf("expected stripped cpf, got %v", user["document"])
		}
		if user["cpf"] != "52998224725" {
			t.Errorf("expected mirrored cpf, got %v", user["cpf"])
		}
	})

	t.Run("invalid cpf -> 422", func(t *testing.T) {
		body := validPrestadorBody("cpf", "111.111.111-11")
		body["email"] = "fake-cpf@test.com"
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/prestador", body, "")
		if rec.Code != http.StatusUnprocessableEntity {
			t.Fatalf("expected 422, got %d body=%v", rec.Code, resp)
		}
	})

	t.Run("invalid cnpj -> 422", func(t *testing.T) {
		body := validPrestadorBody("cnpj", "11.222.333/0001-82")
		body["email"] = "fake-cnpj@test.com"
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/prestador", body, "")
		if rec.Code != http.StatusUnprocessableEntity {
			t.Fatalf("expected 422, got %d body=%v", rec.Code, resp)
		}
	})

	t.Run("duplicate email -> 409", func(t *testing.T) {
		body := validPrestadorBody("cnpj", "04.252.011/0001-10")
		// reuse the first email already taken
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/prestador", body, "")
		if rec.Code != http.StatusConflict {
			t.Fatalf("expected 409, got %d body=%v", rec.Code, resp)
		}
		if resp["error"] != "email_taken" {
			t.Errorf("expected error=email_taken, got %v", resp["error"])
		}
	})

	t.Run("duplicate document -> 409", func(t *testing.T) {
		body := validPrestadorBody("cnpj", "11.222.333/0001-81")
		body["email"] = "another-email@test.com"
		rec, resp := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/prestador", body, "")
		if rec.Code != http.StatusConflict {
			t.Fatalf("expected 409, got %d body=%v", rec.Code, resp)
		}
		if resp["error"] != "document_taken" {
			t.Errorf("expected error=document_taken, got %v", resp["error"])
		}
	})

	t.Run("invalid document_type -> 400 oneof", func(t *testing.T) {
		body := validPrestadorBody("rg", "12345678")
		body["email"] = "rg-test@test.com"
		rec, _ := doJSON(t, env.Router, http.MethodPost, "/api/v1/auth/register/prestador", body, "")
		if rec.Code != http.StatusBadRequest {
			t.Fatalf("expected 400, got %d", rec.Code)
		}
	})
}

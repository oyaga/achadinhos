package auth

import "testing"

func TestStripDocument(t *testing.T) {
	cases := map[string]string{
		"123.456.789-09":      "12345678909",
		" 123.456.789-09 ":    "12345678909",
		"12.345.678/0001-90":  "12345678000190",
		"12345678000190":      "12345678000190",
		"":                    "",
		"abc.123":             "abc123",
	}
	for in, want := range cases {
		got := StripDocument(in)
		if got != want {
			t.Errorf("StripDocument(%q) = %q, want %q", in, got, want)
		}
	}
}

func TestIsValidCPF(t *testing.T) {
	valid := []string{
		"123.456.789-09",
		"12345678909",
		"529.982.247-25",
		"52998224725",
	}
	for _, v := range valid {
		if !IsValidCPF(v) {
			t.Errorf("expected valid CPF: %q", v)
		}
	}

	invalid := []string{
		"",
		"123",
		"12345678900",        // wrong check digit
		"11111111111",        // all repeated
		"00000000000",        // all repeated zeros
		"99999999999",        // all repeated nines
		"abcdefghijk",        // non-digits
		"529.982.247-26",     // wrong check digit
		"123456789090",       // too long
	}
	for _, v := range invalid {
		if IsValidCPF(v) {
			t.Errorf("expected invalid CPF: %q", v)
		}
	}
}

func TestIsValidCNPJ(t *testing.T) {
	valid := []string{
		"11.222.333/0001-81",
		"11222333000181",
		"04.252.011/0001-10",
	}
	for _, v := range valid {
		if !IsValidCNPJ(v) {
			t.Errorf("expected valid CNPJ: %q", v)
		}
	}

	invalid := []string{
		"",
		"123",
		"00000000000000",         // all zeros
		"11111111111111",         // all repeated
		"11.222.333/0001-82",     // wrong check digit
		"abcdefghijklmn",         // non-digits
		"11222333000182",         // wrong check digit
		"112223330001811",        // too long
	}
	for _, v := range invalid {
		if IsValidCNPJ(v) {
			t.Errorf("expected invalid CNPJ: %q", v)
		}
	}
}

func TestValidateDocument(t *testing.T) {
	if err := ValidateDocument("cpf", "123.456.789-09"); err != nil {
		t.Errorf("expected nil for valid cpf, got %v", err)
	}
	if err := ValidateDocument("CPF", "123.456.789-09"); err != nil {
		t.Errorf("expected case-insensitive cpf, got %v", err)
	}
	if err := ValidateDocument("cnpj", "11.222.333/0001-81"); err != nil {
		t.Errorf("expected nil for valid cnpj, got %v", err)
	}
	if err := ValidateDocument("cpf", "11111111111"); err == nil {
		t.Errorf("expected error for repeated-digit cpf")
	}
	if err := ValidateDocument("cnpj", "11.222.333/0001-82"); err == nil {
		t.Errorf("expected error for invalid cnpj")
	}
	if err := ValidateDocument("rg", "anything"); err == nil {
		t.Errorf("expected error for unknown doc type")
	}
}

func TestStripCEP(t *testing.T) {
	cases := map[string]string{
		"01310-100":  "01310100",
		" 01310100 ": "01310100",
		"":           "",
		"01.310-100": "01310100",
	}
	for in, want := range cases {
		got := StripCEP(in)
		if got != want {
			t.Errorf("StripCEP(%q) = %q, want %q", in, got, want)
		}
	}
}

func TestIsValidCEP(t *testing.T) {
	valid := []string{
		"01310-100",
		"01310100",
		"00000-000",
		"00000000",
	}
	for _, v := range valid {
		if !IsValidCEP(v) {
			t.Errorf("expected valid CEP: %q", v)
		}
	}

	invalid := []string{
		"",
		"1234567",   // too short
		"123456789", // too long
		"abcdefgh",  // non-digits
		"01310-10A", // contains letter
	}
	for _, v := range invalid {
		if IsValidCEP(v) {
			t.Errorf("expected invalid CEP: %q", v)
		}
	}
}

func TestFormatCEP(t *testing.T) {
	if got := FormatCEP("01310100"); got != "01310-100" {
		t.Errorf("FormatCEP(\"01310100\") = %q, want %q", got, "01310-100")
	}
	if got := FormatCEP("01310-100"); got != "01310-100" {
		t.Errorf("FormatCEP idempotent: got %q", got)
	}
	if got := FormatCEP("123"); got != "123" {
		t.Errorf("FormatCEP short input: got %q", got)
	}
}

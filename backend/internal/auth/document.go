package auth

import (
	"errors"
	"strings"
)

// Document validation errors.
var (
	ErrInvalidDocumentType = errors.New("invalid document_type, expected cpf or cnpj")
	ErrInvalidCPF          = errors.New("invalid cpf")
	ErrInvalidCNPJ         = errors.New("invalid cnpj")
)

// StripDocument removes formatting characters commonly found in CPF/CNPJ strings.
// Accepts dots, dashes, slashes and ASCII whitespace.
func StripDocument(s string) string {
	s = strings.TrimSpace(s)
	out := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		c := s[i]
		if c == '.' || c == '-' || c == '/' || c == ' ' || c == '\t' {
			continue
		}
		out = append(out, c)
	}
	return string(out)
}

// IsValidCPF validates a Brazilian CPF using the official two-digit verification.
// Accepts both stripped (11 digits) and formatted (with dots/dashes) input.
func IsValidCPF(s string) bool {
	s = StripDocument(s)
	if len(s) != 11 {
		return false
	}
	// Reject if all digits are equal (e.g., 00000000000) — passes the math but is invalid.
	allEqual := true
	digits := make([]int, 11)
	for i := 0; i < 11; i++ {
		c := s[i]
		if c < '0' || c > '9' {
			return false
		}
		digits[i] = int(c - '0')
		if digits[i] != digits[0] {
			allEqual = false
		}
	}
	if allEqual {
		return false
	}

	// First check digit.
	sum := 0
	for i := 0; i < 9; i++ {
		sum += digits[i] * (10 - i)
	}
	r := (sum * 10) % 11
	if r == 10 {
		r = 0
	}
	if r != digits[9] {
		return false
	}

	// Second check digit.
	sum = 0
	for i := 0; i < 10; i++ {
		sum += digits[i] * (11 - i)
	}
	r = (sum * 10) % 11
	if r == 10 {
		r = 0
	}
	return r == digits[10]
}

// IsValidCNPJ validates a Brazilian CNPJ using the official two-digit verification.
func IsValidCNPJ(s string) bool {
	s = StripDocument(s)
	if len(s) != 14 {
		return false
	}
	allEqual := true
	digits := make([]int, 14)
	for i := 0; i < 14; i++ {
		c := s[i]
		if c < '0' || c > '9' {
			return false
		}
		digits[i] = int(c - '0')
		if digits[i] != digits[0] {
			allEqual = false
		}
	}
	if allEqual {
		return false
	}

	weights1 := []int{5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2}
	weights2 := []int{6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2}

	// First check digit.
	sum := 0
	for i := 0; i < 12; i++ {
		sum += digits[i] * weights1[i]
	}
	r := sum % 11
	d1 := 0
	if r >= 2 {
		d1 = 11 - r
	}
	if d1 != digits[12] {
		return false
	}

	// Second check digit.
	sum = 0
	for i := 0; i < 13; i++ {
		sum += digits[i] * weights2[i]
	}
	r = sum % 11
	d2 := 0
	if r >= 2 {
		d2 = 11 - r
	}
	return d2 == digits[13]
}

// ValidateDocument dispatches to the right validator based on docType.
// Returns nil when the document is valid.
func ValidateDocument(docType, doc string) error {
	switch strings.ToLower(strings.TrimSpace(docType)) {
	case "cpf":
		if !IsValidCPF(doc) {
			return ErrInvalidCPF
		}
		return nil
	case "cnpj":
		if !IsValidCNPJ(doc) {
			return ErrInvalidCNPJ
		}
		return nil
	default:
		return ErrInvalidDocumentType
	}
}

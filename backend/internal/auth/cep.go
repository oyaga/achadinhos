package auth

import (
	"errors"
	"strings"
)

// ErrInvalidCEP indicates a malformed Brazilian postal code.
var ErrInvalidCEP = errors.New("invalid cep")

// StripCEP removes hyphens, dots and whitespace from a CEP string.
func StripCEP(s string) string {
	s = strings.TrimSpace(s)
	out := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		c := s[i]
		if c == '-' || c == '.' || c == ' ' || c == '\t' {
			continue
		}
		out = append(out, c)
	}
	return string(out)
}

// IsValidCEP returns true when s reduces to exactly 8 numeric digits.
// Backend only validates format — geographic lookup happens client-side via ViaCEP.
func IsValidCEP(s string) bool {
	s = StripCEP(s)
	if len(s) != 8 {
		return false
	}
	for i := 0; i < 8; i++ {
		if s[i] < '0' || s[i] > '9' {
			return false
		}
	}
	return true
}

// ValidateCEP returns nil when the CEP is valid, ErrInvalidCEP otherwise.
func ValidateCEP(s string) error {
	if !IsValidCEP(s) {
		return ErrInvalidCEP
	}
	return nil
}

// FormatCEP turns a stripped CEP back into "00000-000" format.
// If the input is not exactly 8 digits, the original string is returned.
func FormatCEP(s string) string {
	s = StripCEP(s)
	if len(s) != 8 {
		return s
	}
	return s[:5] + "-" + s[5:]
}

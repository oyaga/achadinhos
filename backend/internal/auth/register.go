package auth

import (
	"context"
	"errors"
	"log/slog"
	"strings"
	"time"

	"github.com/achadinhos/backend/internal/models"
	"gorm.io/gorm"
)

// Profile-specific service errors.
var (
	ErrCPFTaken            = errors.New("cpf already registered")
	ErrCNPJTaken           = errors.New("cnpj already registered")
	ErrInvalidRole         = errors.New("invalid condo_role")
	ErrInvalidAccountType  = errors.New("invalid account_type")
	ErrCompanyNameRequired = errors.New("company_name required for empresa")
	ErrCondoNameRequired   = errors.New("condo_name required")
)

// SindicoProfile carries the validated, normalized payload for RegisterSindico.
// All digit fields must already be stripped by the caller.
type SindicoProfile struct {
	AccountType string // pessoa | empresa (defaults to pessoa)
	Email       string
	Password    string
	Name        string
	CPF         string // 11 digits (pessoa)
	CNPJ        string // 14 digits (empresa)
	CompanyName string // razão social (empresa)
	Phone       string // digits only
	CondoName   string
	CondoRole   string // morador | sindico | conselho (pessoa)

	CEP          string // 8 digits
	Street       string
	Number       string
	Complement   string
	Neighborhood string
	City         string
	State        string
}

// stripDigits keeps only ASCII digit characters.
func stripDigits(s string) string {
	out := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		if s[i] >= '0' && s[i] <= '9' {
			out = append(out, s[i])
		}
	}
	return string(out)
}

// RegisterSindico creates a User with role=sindico — the only public sign-up
// flow — and persists the morador/sindico/conselho profile + address.
func (s *Service) RegisterSindico(ctx context.Context, p SindicoProfile) (*models.User, *TokenPair, error) {
	email := strings.ToLower(strings.TrimSpace(p.Email))

	accountType := strings.ToLower(strings.TrimSpace(p.AccountType))
	if accountType == "" {
		accountType = string(models.AccountPessoa)
	}

	cep := StripCEP(p.CEP)
	if !IsValidCEP(cep) {
		return nil, nil, ErrInvalidCEP
	}

	// Resolve the type-specific identity fields.
	var (
		cpf         string
		documentTyp string
		document    string
		companyName string
		condoRole   string
	)
	switch accountType {
	case string(models.AccountEmpresa):
		cnpj := stripDigits(p.CNPJ)
		if !IsValidCNPJ(cnpj) {
			return nil, nil, ErrInvalidCNPJ
		}
		companyName = strings.TrimSpace(p.CompanyName)
		if companyName == "" {
			return nil, nil, ErrCompanyNameRequired
		}
		documentTyp = string(models.DocCNPJ)
		document = cnpj
		condoRole = string(models.CondoRoleAdministradora)
	case string(models.AccountPessoa):
		cpf = stripDigits(p.CPF)
		if !IsValidCPF(cpf) {
			return nil, nil, ErrInvalidCPF
		}
		switch models.CondoRole(p.CondoRole) {
		case models.CondoRoleMorador, models.CondoRoleSindico, models.CondoRoleConselho:
		default:
			return nil, nil, ErrInvalidRole
		}
		if strings.TrimSpace(p.CondoName) == "" {
			return nil, nil, ErrCondoNameRequired
		}
		documentTyp = string(models.DocCPF)
		document = cpf
		condoRole = p.CondoRole
	default:
		return nil, nil, ErrInvalidAccountType
	}

	// Uniqueness checks (email always; document scoped to its type).
	var existing models.User
	if err := s.db.WithContext(ctx).Where("email = ?", email).First(&existing).Error; err == nil {
		return nil, nil, ErrEmailTaken
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil, err
	}
	if err := s.db.WithContext(ctx).Where("document = ?", document).First(&existing).Error; err == nil {
		if accountType == string(models.AccountEmpresa) {
			return nil, nil, ErrCNPJTaken
		}
		return nil, nil, ErrCPFTaken
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil, err
	}

	hash, err := HashPassword(p.Password)
	if err != nil {
		return nil, nil, err
	}

	u := &models.User{
		Email:        email,
		PasswordHash: hash,
		Name:         strings.TrimSpace(p.Name),
		Role:         models.RoleSindico,
		Phone:        stripDigits(p.Phone),
		AccountType:  accountType,
		CPF:          cpf,
		DocumentType: documentTyp,
		Document:     document,
		CompanyName:  companyName,
		CondoName:    strings.TrimSpace(p.CondoName),
		CondoRole:    condoRole,
		CEP:          cep,
		Street:       strings.TrimSpace(p.Street),
		Number:       strings.TrimSpace(p.Number),
		Complement:   strings.TrimSpace(p.Complement),
		Neighborhood: strings.TrimSpace(p.Neighborhood),
		City:         strings.TrimSpace(p.City),
		State:        strings.ToUpper(strings.TrimSpace(p.State)),
	}
	if err := s.db.WithContext(ctx).Create(u).Error; err != nil {
		return nil, nil, err
	}

	// Fire-and-forget welcome email. The mailer is a no-op when RESEND_API_KEY
	// / MAIL_FROM aren't configured, so this is safe in dev/test too.
	if s.mailer.Enabled() {
		go func(addr, name string) {
			ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
			defer cancel()
			if err := s.mailer.SendWelcome(ctx, addr, name); err != nil {
				slog.Warn("welcome email failed", "err", err, "to", addr)
			}
		}(u.Email, u.Name)
	}

	pair, err := s.issueTokens(ctx, u)
	if err != nil {
		return nil, nil, err
	}
	return u, pair, nil
}

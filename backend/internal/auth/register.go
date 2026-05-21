package auth

import (
	"context"
	"errors"
	"strings"

	"github.com/achadinhos/backend/internal/models"
	"gorm.io/gorm"
)

// Profile-specific service errors.
var (
	ErrCPFTaken      = errors.New("cpf already registered")
	ErrDocumentTaken = errors.New("document already registered")
	ErrInvalidRole   = errors.New("invalid condo_role")
)

// SindicoProfile carries the validated, normalized payload for RegisterSindico.
// All digit fields must already be stripped by the caller.
type SindicoProfile struct {
	Email     string
	Password  string
	Name      string
	CPF       string // 11 digits
	Phone     string // digits only
	CondoName string
	CondoRole string // morador | sindico | conselho

	CEP          string // 8 digits
	Street       string
	Number       string
	Complement   string
	Neighborhood string
	City         string
	State        string
}

// PrestadorProfile carries the validated, normalized payload for RegisterPrestador.
type PrestadorProfile struct {
	Email        string
	Password     string
	Name         string
	Whatsapp     string // digits only
	DocumentType string // cpf | cnpj
	Document     string // digits only
	CompanyName  string

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

// RegisterSindico creates a User with role=sindico (platform-level)
// and persists the morador/sindico/conselho profile + address.
func (s *Service) RegisterSindico(ctx context.Context, p SindicoProfile) (*models.User, *TokenPair, error) {
	email := strings.ToLower(strings.TrimSpace(p.Email))

	cpf := stripDigits(p.CPF)
	if !IsValidCPF(cpf) {
		return nil, nil, ErrInvalidCPF
	}
	cep := StripCEP(p.CEP)
	if !IsValidCEP(cep) {
		return nil, nil, ErrInvalidCEP
	}
	switch models.CondoRole(p.CondoRole) {
	case models.CondoRoleMorador, models.CondoRoleSindico, models.CondoRoleConselho:
	default:
		return nil, nil, ErrInvalidRole
	}

	// Uniqueness checks (email + cpf).
	var existing models.User
	if err := s.db.WithContext(ctx).Where("email = ?", email).First(&existing).Error; err == nil {
		return nil, nil, ErrEmailTaken
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil, err
	}
	if err := s.db.WithContext(ctx).Where("cpf = ?", cpf).First(&existing).Error; err == nil {
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
		CPF:          cpf,
		DocumentType: string(models.DocCPF),
		Document:     cpf,
		CondoName:    strings.TrimSpace(p.CondoName),
		CondoRole:    p.CondoRole,
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

	pair, err := s.issueTokens(ctx, u)
	if err != nil {
		return nil, nil, err
	}
	return u, pair, nil
}

// SellerProfile carries the validated, normalized payload for RegisterSeller.
type SellerProfile struct {
	Email        string
	Password     string
	Name         string
	Whatsapp     string // digits only
	DocumentType string // cpf | cnpj
	Document     string // digits only
	CompanyName  string
	Description  string
	Categories   []string // product category slugs the seller operates in

	CEP          string // 8 digits
	Street       string
	Number       string
	Complement   string
	Neighborhood string
	City         string
	State        string
}

// RegisterSeller creates a User with role=seller, a linked Seller record,
// and persists company + address + document info.
func (s *Service) RegisterSeller(ctx context.Context, p SellerProfile) (*models.User, *TokenPair, error) {
	email := strings.ToLower(strings.TrimSpace(p.Email))

	docType := strings.ToLower(strings.TrimSpace(p.DocumentType))
	if docType != string(models.DocCPF) && docType != string(models.DocCNPJ) {
		return nil, nil, ErrInvalidDocumentType
	}
	doc := stripDigits(p.Document)
	if err := ValidateDocument(docType, doc); err != nil {
		return nil, nil, err
	}
	cep := StripCEP(p.CEP)
	if !IsValidCEP(cep) {
		return nil, nil, ErrInvalidCEP
	}

	// Uniqueness checks (email + document).
	var existing models.User
	if err := s.db.WithContext(ctx).Where("email = ?", email).First(&existing).Error; err == nil {
		return nil, nil, ErrEmailTaken
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil, err
	}
	if err := s.db.WithContext(ctx).Where("document = ?", doc).First(&existing).Error; err == nil {
		return nil, nil, ErrDocumentTaken
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil, err
	}

	hash, err := HashPassword(p.Password)
	if err != nil {
		return nil, nil, err
	}

	companyName := strings.TrimSpace(p.CompanyName)
	avatar := ""
	if len([]rune(companyName)) > 0 {
		avatar = string([]rune(companyName)[0])
	}

	seller := &models.Seller{
		Name:        companyName,
		Avatar:      avatar,
		WhatsApp:    stripDigits(p.Whatsapp),
		Description: strings.TrimSpace(p.Description),
		Partner:     false,
	}
	if err := s.db.WithContext(ctx).Create(seller).Error; err != nil {
		return nil, nil, err
	}

	u := &models.User{
		Email:        email,
		PasswordHash: hash,
		Name:         strings.TrimSpace(p.Name),
		Role:         models.RoleSeller,
		Whatsapp:     stripDigits(p.Whatsapp),
		DocumentType: docType,
		Document:     doc,
		CompanyName:  companyName,
		SellerID:     &seller.ID,
		CEP:          cep,
		Street:       strings.TrimSpace(p.Street),
		Number:       strings.TrimSpace(p.Number),
		Complement:   strings.TrimSpace(p.Complement),
		Neighborhood: strings.TrimSpace(p.Neighborhood),
		City:         strings.TrimSpace(p.City),
		State:        strings.ToUpper(strings.TrimSpace(p.State)),
	}
	if docType == string(models.DocCPF) {
		u.CPF = doc
	}
	if err := s.db.WithContext(ctx).Create(u).Error; err != nil {
		return nil, nil, err
	}

	pair, err := s.issueTokens(ctx, u)
	if err != nil {
		return nil, nil, err
	}
	return u, pair, nil
}

// RegisterPrestador creates a User with role=prestador and persists
// company + address + document info.
func (s *Service) RegisterPrestador(ctx context.Context, p PrestadorProfile) (*models.User, *TokenPair, error) {
	email := strings.ToLower(strings.TrimSpace(p.Email))

	docType := strings.ToLower(strings.TrimSpace(p.DocumentType))
	if docType != string(models.DocCPF) && docType != string(models.DocCNPJ) {
		return nil, nil, ErrInvalidDocumentType
	}
	doc := stripDigits(p.Document)
	if err := ValidateDocument(docType, doc); err != nil {
		return nil, nil, err
	}
	cep := StripCEP(p.CEP)
	if !IsValidCEP(cep) {
		return nil, nil, ErrInvalidCEP
	}

	// Uniqueness checks (email + document).
	var existing models.User
	if err := s.db.WithContext(ctx).Where("email = ?", email).First(&existing).Error; err == nil {
		return nil, nil, ErrEmailTaken
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil, err
	}
	if err := s.db.WithContext(ctx).Where("document = ?", doc).First(&existing).Error; err == nil {
		return nil, nil, ErrDocumentTaken
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
		Role:         models.RolePrestador,
		Whatsapp:     stripDigits(p.Whatsapp),
		DocumentType: docType,
		Document:     doc,
		CompanyName:  strings.TrimSpace(p.CompanyName),
		CEP:          cep,
		Street:       strings.TrimSpace(p.Street),
		Number:       strings.TrimSpace(p.Number),
		Complement:   strings.TrimSpace(p.Complement),
		Neighborhood: strings.TrimSpace(p.Neighborhood),
		City:         strings.TrimSpace(p.City),
		State:        strings.ToUpper(strings.TrimSpace(p.State)),
	}
	// If the prestador used a CPF as their document, mirror it onto User.CPF
	// so the field is consistent across user types.
	if docType == string(models.DocCPF) {
		u.CPF = doc
	}
	if err := s.db.WithContext(ctx).Create(u).Error; err != nil {
		return nil, nil, err
	}

	pair, err := s.issueTokens(ctx, u)
	if err != nil {
		return nil, nil, err
	}
	return u, pair, nil
}

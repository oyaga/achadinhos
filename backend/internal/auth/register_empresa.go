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

// Erros do autocadastro de empresa free.
var (
	ErrCompanyNameTaken  = errors.New("company name already registered")
	ErrCompanyDocTaken   = errors.New("company document already registered")
	ErrInvalidDocument   = errors.New("invalid document")
	ErrInvalidCategories = errors.New("invalid categories")
)

// ReservedCategory reporta as categorias que a empresa free não escolhe: "loja"
// classifica internamente os negócios do Shopping e "destaque" é a vitrine
// "Destaque do dia" — só o admin atribui (ver db.CanonicalCategories).
func ReservedCategory(id string) bool {
	return id == "loja" || id == "destaque"
}

// MaxEmpresaCategories limita as categorias de uma empresa (igual ao admin).
const MaxEmpresaCategories = 10

// EmpresaProfile carrega o autocadastro de uma empresa free: a conta de login
// (responsável) e os dados públicos da empresa.
type EmpresaProfile struct {
	Name     string // responsável
	Email    string
	Password string

	CompanyName  string
	CategoryIDs  []string // a primeira é a principal
	WhatsApp     string
	DocumentType string // cpf | cnpj
	Document     string
	Description  string
	Link         string
	Instagram    string
	Facebook     string
	TikTok       string
	YouTube      string
}

// RegisterEmpresa cria, numa transação, a conta role=empresa e a empresa
// (Seller) que ela administra. A empresa entra no site na hora, sem selo:
// cert_tier vazio, partner e highlight falsos — só o admin muda isso.
func (s *Service) RegisterEmpresa(ctx context.Context, p EmpresaProfile) (*models.User, *models.Seller, *TokenPair, error) {
	email := strings.ToLower(strings.TrimSpace(p.Email))
	companyName := strings.TrimSpace(p.CompanyName)

	docType := strings.ToLower(strings.TrimSpace(p.DocumentType))
	doc := StripDocument(p.Document)
	if err := ValidateDocument(docType, doc); err != nil {
		return nil, nil, nil, ErrInvalidDocument
	}

	cats, err := s.resolveEmpresaCategories(ctx, p.CategoryIDs)
	if err != nil {
		return nil, nil, nil, err
	}

	db := s.db.WithContext(ctx)
	var n int64
	if err := db.Model(&models.User{}).Where("email = ?", email).Count(&n).Error; err != nil {
		return nil, nil, nil, err
	} else if n > 0 {
		return nil, nil, nil, ErrEmailTaken
	}
	if err := db.Model(&models.Seller{}).Where("LOWER(name) = LOWER(?)", companyName).Count(&n).Error; err != nil {
		return nil, nil, nil, err
	} else if n > 0 {
		return nil, nil, nil, ErrCompanyNameTaken
	}
	if err := db.Model(&models.Seller{}).Where("document = ?", doc).Count(&n).Error; err != nil {
		return nil, nil, nil, err
	} else if n > 0 {
		return nil, nil, nil, ErrCompanyDocTaken
	}

	hash, err := HashPassword(p.Password)
	if err != nil {
		return nil, nil, nil, err
	}
	u := &models.User{
		Email:        email,
		PasswordHash: hash,
		Name:         strings.TrimSpace(p.Name),
		Role:         models.RoleEmpresa,
		Phone:        stripDigits(p.WhatsApp),
		AccountType:  string(models.AccountEmpresa),
		CompanyName:  companyName,
	}
	seller := &models.Seller{
		Name:           companyName,
		CategoryID:     cats[0].ID,
		Avatar:         firstRune(companyName),
		Description:    strings.TrimSpace(p.Description),
		WhatsApp:       strings.TrimSpace(p.WhatsApp),
		Link:           strings.TrimSpace(p.Link),
		Instagram:      strings.TrimSpace(p.Instagram),
		Facebook:       strings.TrimSpace(p.Facebook),
		TikTok:         strings.TrimSpace(p.TikTok),
		YouTube:        strings.TrimSpace(p.YouTube),
		DocumentType:   docType,
		Document:       doc,
		SelfRegistered: true,
		Categories:     cats,
	}
	err = db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(u).Error; err != nil {
			return err
		}
		seller.OwnerUserID = &u.ID
		if err := tx.Create(seller).Error; err != nil {
			// Corrida com outro cadastro do mesmo nome (índice único).
			return ErrCompanyNameTaken
		}
		return nil
	})
	if err != nil {
		return nil, nil, nil, err
	}

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
		return nil, nil, nil, err
	}
	return u, seller, pair, nil
}

// resolveEmpresaCategories valida as categorias escolhidas (existentes, sem a
// interna "loja", até MaxEmpresaCategories) e as devolve na ordem enviada.
func (s *Service) resolveEmpresaCategories(ctx context.Context, ids []string) ([]models.Category, error) {
	seen := map[string]bool{}
	ordered := make([]string, 0, len(ids))
	for _, id := range ids {
		id = strings.TrimSpace(id)
		if id == "" || seen[id] {
			continue
		}
		if ReservedCategory(id) {
			return nil, ErrInvalidCategories
		}
		seen[id] = true
		ordered = append(ordered, id)
	}
	if len(ordered) == 0 || len(ordered) > MaxEmpresaCategories {
		return nil, ErrInvalidCategories
	}
	var cats []models.Category
	if err := s.db.WithContext(ctx).Where("id IN ?", ordered).Find(&cats).Error; err != nil {
		return nil, err
	}
	byID := make(map[string]models.Category, len(cats))
	for _, c := range cats {
		byID[c.ID] = c
	}
	out := make([]models.Category, 0, len(ordered))
	for _, id := range ordered {
		c, ok := byID[id]
		if !ok {
			return nil, ErrInvalidCategories
		}
		out = append(out, c)
	}
	return out, nil
}

func firstRune(s string) string {
	for _, r := range s {
		return string(r)
	}
	return ""
}

package db

import (
	"context"

	"github.com/achadinhos/backend/internal/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// CanonicalCategories is the full reference list of categories shown in the
// app. Idempotently upserted on app startup (EnsureCategories) so new
// categories rolled out via deploy appear automatically in production without
// running migrations or re-seeding.
var CanonicalCategories = []models.Category{
	// ── Originais ──────────────────────────────────────────────
	{ID: "destaque", Label: "Destaque do dia", Short: "Destaque\ndo dia", Icon: "CatHighlight", Badge: "TOP", Description: "Os melhores prestadores em destaque hoje", SortOrder: 1},
	{ID: "shopping", Label: "Shopping condomínio", Short: "Shopping\ncondomínio", Icon: "CatShopping", Badge: "NOVO", Description: "Produtos para o condomínio com link direto da revenda", SortOrder: 2},
	// "parceiros" (Parceiros homologados) foi removida — migration 0019.
	{ID: "loja", Label: "Loja", Short: "Loja", Icon: "CatShopping", Description: "Lojas parceiras com produtos e ofertas para o condomínio", SortOrder: 3},
	{ID: "seguranca", Label: "Segurança eletrônica", Short: "Segurança\neletrônica", Icon: "CatSecurity", Description: "CFTV, alarmes, controle de acesso e monitoramento", SortOrder: 4},
	{ID: "terceirizacao", Label: "Terceirização", Short: "Tercei-\nrização", Icon: "CatOutsource", Description: "Equipes terceirizadas: portaria, limpeza, manutenção", SortOrder: 5},
	{ID: "portaria", Label: "Portaria virtual", Short: "Portaria\nvirtual", Icon: "CatPortaria", Description: "Portaria remota 24h com economia de até 60%", SortOrder: 6},
	{ID: "facilities", Label: "Facilities", Short: "Facilities", Icon: "CatFacilities", Description: "Gestão integrada de serviços prediais", SortOrder: 7},
	{ID: "manutencao", Label: "Manutenção geral", Short: "Manutenção\ngeral", Icon: "CatMaintenance", Description: "Hidráulica, elétrica, pintura, marcenaria e mais", SortOrder: 8},
	{ID: "dedetizacao", Label: "Dedetizadora", Short: "Dedeti-\nzadora", Icon: "CatPest", Description: "Controle de pragas com certificado sanitário", SortOrder: 9},
	{ID: "armarios", Label: "Armário inteligente", Short: "Armário\ninteligente", Icon: "CatLocker", Description: "Lockers para entregas e correspondências", SortOrder: 10},
	{ID: "limpeza", Label: "Limpeza", Short: "Limpeza", Icon: "CatCleaning", Description: "Diaristas, faxina geral, pós-obra", SortOrder: 11},
	{ID: "hidraulica", Label: "Hidráulica", Short: "Hidráulica", Icon: "CatPlumbing", SortOrder: 12},
	{ID: "eletrica", Label: "Elétrica", Short: "Elétrica", Icon: "CatElectric", SortOrder: 13},

	// ── Novos segmentos do ecossistema ─────────────────────────

	{ID: "poste-monitoramento", Label: "Poste de monitoramento", Short: "Poste\nmonitoramento", Icon: "CatSecurity", SortOrder: 102},
	{ID: "sindico-interior", Label: "Síndico profissional (interior)", Short: "Síndico\ninterior", Icon: "CatPartners", SortOrder: 103},
	{ID: "sindico-grandesp", Label: "Síndicos profissionais (Grande SP)", Short: "Síndicos\nGrande SP", Icon: "CatPartners", SortOrder: 104},
	{ID: "antenistas", Label: "Antenistas", Short: "Antenistas", Icon: "CatElectric", SortOrder: 105},
	{ID: "cabeamento-internet", Label: "Cabeamento e internet", Short: "Cabeamento\ninternet", Icon: "CatElectric", SortOrder: 106},
	{ID: "manutencao-elevadores", Label: "Manutenção de elevadores", Short: "Manutenção\nelevadores", Icon: "CatMaintenance", SortOrder: 107},
	{ID: "engenharia", Label: "Engenharia", Short: "Engenharia", Icon: "CatPartners", SortOrder: 108},
	{ID: "treinamento-brigada", Label: "Treinamento de brigada", Short: "Treinamento\nbrigada", Icon: "CatSecurity", SortOrder: 109},
	{ID: "portaria-terceirizada", Label: "Portaria terceirizada", Short: "Portaria\nterceirizada", Icon: "CatPortaria", SortOrder: 110},
	{ID: "facilities-terceirizada", Label: "Facilities", Short: "Facilities", Icon: "CatFacilities", SortOrder: 111},
	{ID: "limpeza-profissional", Label: "Limpeza profissional", Short: "Limpeza\nprofissional", Icon: "CatCleaning", SortOrder: 112},
	{ID: "vigilancia-armada", Label: "Vigilância armada", Short: "Vigilância\narmada", Icon: "CatSecurity", SortOrder: 113},
	{ID: "telhadista", Label: "Telhadista", Short: "Telhadista", Icon: "CatMaintenance", SortOrder: 114},
	{ID: "pintura-predial", Label: "Pintura predial", Short: "Pintura\npredial", Icon: "CatMaintenance", SortOrder: 115},
	{ID: "cobertura-garagem", Label: "Cobertura de garagem", Short: "Cobertura\ngaragem", Icon: "CatMaintenance", SortOrder: 116},
	{ID: "armarios-inteligentes", Label: "Armários inteligentes", Short: "Armários\ninteligentes", Icon: "CatLocker", SortOrder: 117},
	{ID: "projetos-seguranca-eletronica", Label: "Projetos de segurança eletrônica", Short: "Projetos\nsegurança", Icon: "CatSecurity", SortOrder: 118},
	{ID: "chaveiro", Label: "Chaveiro", Short: "Chaveiro", Icon: "CatMaintenance", SortOrder: 119},
	{ID: "dedetizacao-extra", Label: "Dedetização", Short: "Dedetização", Icon: "CatPest", SortOrder: 120},
	{ID: "limpeza-caixa-dagua", Label: "Limpeza de caixa d'água", Short: "Caixa\nd'água", Icon: "CatCleaning", SortOrder: 121},
	{ID: "auditoria-financeira", Label: "Auditoria financeira", Short: "Auditoria\nfinanceira", Icon: "CatPartners", SortOrder: 122},
	{ID: "vidracaria", Label: "Vidraçaria", Short: "Vidraçaria", Icon: "CatMaintenance", SortOrder: 123},
	{ID: "mercadinhos", Label: "Mercadinhos", Short: "Mercadinhos", Icon: "CatShopping", SortOrder: 124},
	{ID: "manutencao-bombas", Label: "Manutenção de bombas", Short: "Manutenção\nbombas", Icon: "CatPlumbing", SortOrder: 125},
	{ID: "seguros-garantidoras", Label: "Seguros e garantidoras", Short: "Seguros e\ngarantidoras", Icon: "CatPartners", SortOrder: 126},
	{ID: "financiamentos-projetos", Label: "Financiamentos para projetos", Short: "Financia-\nmentos", Icon: "CatPartners", SortOrder: 127},
	{ID: "manutencao-geral", Label: "Manutenção em geral", Short: "Manutenção\ngeral", Icon: "CatMaintenance", SortOrder: 128},
	{ID: "caca-vazamentos", Label: "Caça vazamentos", Short: "Caça\nvazamentos", Icon: "CatPlumbing", SortOrder: 129},
	{ID: "marcenaria", Label: "Marcenaria", Short: "Marcenaria", Icon: "CatMaintenance", SortOrder: 130},
	{ID: "presentes-corporativos", Label: "Presentes corporativos", Short: "Presentes\ncorporativos", Icon: "CatShopping", SortOrder: 131},
	{ID: "tecnologia", Label: "Tecnologia", Short: "Tecnologia", Icon: "CatElectric", SortOrder: 132},
	{ID: "analise-risco", Label: "Projetos de análise de risco", Short: "Análise\nde risco", Icon: "CatSecurity", SortOrder: 133},
	{ID: "avcb", Label: "AVCB", Short: "AVCB", Icon: "CatSecurity", SortOrder: 134},
	{ID: "treinamentos-brigada", Label: "Treinamentos de brigada de incêndio", Short: "Treinamento\nincêndio", Icon: "CatSecurity", SortOrder: 135},
	{ID: "piscineiro", Label: "Piscineiro", Short: "Piscineiro", Icon: "CatMaintenance", SortOrder: 136},
	{ID: "projetos-arquitetura", Label: "Projetos de arquitetura", Short: "Projetos\narquitetura", Icon: "CatPartners", SortOrder: 137},
	{ID: "brinquedos-playground", Label: "Brinquedos para playground", Short: "Brinquedos\nplayground", Icon: "CatShopping", SortOrder: 138},
	{ID: "jardinagem", Label: "Jardinagem", Short: "Jardinagem", Icon: "CatOutsource", SortOrder: 139},

	{ID: "iluminacao", Label: "Iluminação", Short: "Iluminação", Icon: "CatElectric", SortOrder: 141},
	{ID: "treinamento-funcionarios", Label: "Treinamento para funcionários próprios", Short: "Treinamento\nfuncionários", Icon: "CatPartners", SortOrder: 142},
	{ID: "administracao-condominios", Label: "Administração de condomínios", Short: "Administração\ncondomínios", Icon: "CatPartners", SortOrder: 143},
	{ID: "escritorio-advocacia", Label: "Escritório de Advocacia", Short: "Escritório\nadvocacia", Icon: "CatPartners", SortOrder: 144},
}

// EnsureCategories upserts the canonical category list. Existing categories
// are LEFT UNCHANGED (ON CONFLICT DO NOTHING) — only new categories are
// inserted, so admin or seed edits to labels/icons persist across deploys.
func EnsureCategories(ctx context.Context, gdb *gorm.DB) error {
	for i := range CanonicalCategories {
		if err := gdb.WithContext(ctx).
			Clauses(clause.OnConflict{UpdateAll: true}).
			Create(&CanonicalCategories[i]).Error; err != nil {
			return err
		}
	}
	return nil
}

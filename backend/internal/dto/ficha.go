package dto

// ── Fichas de cadastro ───────────────────────────────────────────────────────

// AdminFichaCreateRequest is the body for POST /admin/fichas. The admin only
// provides the responsável's name and e-mail; the system mails a unique link.
type AdminFichaCreateRequest struct {
	ResponsavelNome  string `json:"responsavel_nome" binding:"required,min=2,max=255"`
	ResponsavelEmail string `json:"responsavel_email" binding:"required,email,max=255"`
}

// FichaFillRequest is the public body for POST /fichas/:token — the responsável
// fills the whole form in one shot. Every field is optional (the form may be
// saved partially), bounded by the column sizes.
type FichaFillRequest struct {
	RespCPF        string `json:"resp_cpf" binding:"max=32"`
	RespNascimento string `json:"resp_nascimento" binding:"max=32"`
	RespEndereco   string `json:"resp_endereco" binding:"max=500"`
	RespTelefone   string `json:"resp_telefone" binding:"max=32"`
	RespCargo      string `json:"resp_cargo" binding:"max=255"`

	RazaoSocial           string `json:"razao_social" binding:"max=255"`
	CNPJ                  string `json:"cnpj" binding:"max=32"`
	EmpresaEndereco       string `json:"empresa_endereco" binding:"max=500"`
	Instagram             string `json:"instagram" binding:"max=255"`
	Facebook              string `json:"facebook" binding:"max=255"`
	LinkedIn              string `json:"linkedin" binding:"max=255"`
	Site                  string `json:"site" binding:"max=255"`
	ContratoInicio        string `json:"contrato_inicio" binding:"max=32"`
	ContratoVigenciaMeses string `json:"contrato_vigencia_meses" binding:"max=32"`
	ValorMensal           string `json:"valor_mensal" binding:"max=64"`
	ValorAnual            string `json:"valor_anual" binding:"max=64"`
	Observacoes           string `json:"observacoes" binding:"max=4000"`
}

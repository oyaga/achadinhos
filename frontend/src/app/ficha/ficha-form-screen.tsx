"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  fichasApi,
  ApiError,
  type FichaCadastro,
  type FichaFillPayload,
} from "@/lib/api";
import { BrandLockup } from "@/components/auth/brand-lockup";
import { Icon } from "@/components/icons";

type Status = "loading" | "ready" | "done" | "invalid";

const EMPTY: FichaFillPayload = {
  resp_cpf: "",
  resp_nascimento: "",
  resp_endereco: "",
  resp_telefone: "",
  resp_cargo: "",
  razao_social: "",
  cnpj: "",
  empresa_endereco: "",
  instagram: "",
  facebook: "",
  linkedin: "",
  site: "",
  contrato_inicio: "",
  contrato_vigencia_meses: "",
  valor_mensal: "",
  valor_anual: "",
  observacoes: "",
};

export function FichaFormScreen() {
  const [status, setStatus] = useState<Status>("loading");
  const [token, setToken] = useState<string>("");
  const [ficha, setFicha] = useState<FichaCadastro | null>(null);
  const [form, setForm] = useState<FichaFillPayload>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token") ?? "";
    setToken(t);
    if (!t) {
      setStatus("invalid");
      return;
    }
    let alive = true;
    (async () => {
      try {
        const f = await fichasApi.getByToken(t);
        if (!alive) return;
        setFicha(f);
        setStatus(f.status === "concluido" ? "done" : "ready");
      } catch {
        if (alive) setStatus("invalid");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  function update<K extends keyof FichaFillPayload>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await fichasApi.submit(token, form);
      setStatus("done");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Não foi possível enviar a ficha.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-shell-inner">
        <div className="auth-topbar">
          <Link href="/" className="auth-back" aria-label="Voltar para o início">
            <Icon.ChevLeft size={16} />
          </Link>
          <div className="auth-topbar-right">
            <Link href="/" className="auth-tertiary-link">
              Início
            </Link>
          </div>
        </div>

        <BrandLockup sub="Ficha de cadastro" />

        {status === "loading" && (
          <div className="auth-card">
            <p className="auth-subtitle">Carregando ficha…</p>
          </div>
        )}

        {status === "invalid" && (
          <div className="auth-card">
            <div className="ficha-state">
              <Icon.Lock size={28} />
              <h1 className="auth-title">Link inválido</h1>
              <p className="auth-subtitle">
                Este link de cadastro não é válido ou expirou. Peça um novo link
                ao administrador.
              </p>
            </div>
          </div>
        )}

        {status === "done" && (
          <div className="auth-card">
            <div className="ficha-state">
              <span className="ficha-state-check">
                <Icon.Check size={26} />
              </span>
              <h1 className="auth-title">Cadastro concluído!</h1>
              <p className="auth-subtitle">
                Recebemos os dados da sua empresa. Obrigado{ficha?.responsavel_nome ? `, ${ficha.responsavel_nome.split(" ")[0]}` : ""}!
              </p>
            </div>
          </div>
        )}

        {status === "ready" && ficha && (
          <div className="auth-card">
            <div className="auth-eyebrow">Achadinhos do Condomínio</div>
            <h1 className="auth-title">
              Ficha de <em>cadastro</em>
            </h1>
            <p className="auth-subtitle">
              Olá{ficha.responsavel_nome ? `, ${ficha.responsavel_nome.split(" ")[0]}` : ""}! Complete os dados do responsável e
              da sua empresa.
            </p>

            {error && (
              <div className="auth-error" role="alert">
                <Icon.Sparkle size={14} />
                <span>{error}</span>
              </div>
            )}

            <form className="ficha-form" onSubmit={handleSubmit}>
              <div className="ficha-form-section">Dados do responsável do contato</div>

              <div className="prof-field">
                <label className="prof-label">Nome</label>
                <input className="prof-input" type="text" value={ficha.responsavel_nome} readOnly />
              </div>
              <div className="prof-field">
                <label className="prof-label">E-mail do responsável</label>
                <input className="prof-input" type="email" value={ficha.responsavel_email} readOnly />
              </div>
              <div className="prof-field">
                <label className="prof-label">CPF</label>
                <input
                  className="prof-input"
                  type="text"
                  inputMode="numeric"
                  value={form.resp_cpf}
                  onChange={(e) => update("resp_cpf", e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Data de aniversário</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.resp_nascimento}
                  onChange={(e) => update("resp_nascimento", e.target.value)}
                  placeholder="DD/MM/AAAA"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Endereço</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.resp_endereco}
                  onChange={(e) => update("resp_endereco", e.target.value)}
                  placeholder="Rua, número, bairro, cidade"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Telefone</label>
                <input
                  className="prof-input"
                  type="text"
                  inputMode="tel"
                  value={form.resp_telefone}
                  onChange={(e) => update("resp_telefone", e.target.value)}
                  placeholder="(11) 99999-0000"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Cargo / Função</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.resp_cargo}
                  onChange={(e) => update("resp_cargo", e.target.value)}
                  placeholder="Ex: Diretor comercial"
                />
              </div>

              <div className="ficha-form-section">Dados da empresa</div>

              <div className="prof-field">
                <label className="prof-label">Razão social</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.razao_social}
                  onChange={(e) => update("razao_social", e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">CNPJ</label>
                <input
                  className="prof-input"
                  type="text"
                  inputMode="numeric"
                  value={form.cnpj}
                  onChange={(e) => update("cnpj", e.target.value)}
                  placeholder="00.000.000/0001-00"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Endereço</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.empresa_endereco}
                  onChange={(e) => update("empresa_endereco", e.target.value)}
                  placeholder="Endereço da empresa"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Instagram</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.instagram}
                  onChange={(e) => update("instagram", e.target.value)}
                  placeholder="@suaempresa"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Facebook</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.facebook}
                  onChange={(e) => update("facebook", e.target.value)}
                  placeholder="facebook.com/suaempresa"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">LinkedIn</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.linkedin}
                  onChange={(e) => update("linkedin", e.target.value)}
                  placeholder="linkedin.com/company/suaempresa"
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Site</label>
                <input
                  className="prof-input"
                  type="text"
                  value={form.site}
                  onChange={(e) => update("site", e.target.value)}
                  placeholder="www.suaempresa.com.br"
                />
              </div>
              <div className="prof-row-fields">
                <div className="prof-field">
                  <label className="prof-label">Início do contrato</label>
                  <input
                    className="prof-input"
                    type="text"
                    value={form.contrato_inicio}
                    onChange={(e) => update("contrato_inicio", e.target.value)}
                    placeholder="DD/MM/AAAA"
                  />
                </div>
                <div className="prof-field">
                  <label className="prof-label">Vigência (meses)</label>
                  <input
                    className="prof-input"
                    type="text"
                    inputMode="numeric"
                    value={form.contrato_vigencia_meses}
                    onChange={(e) => update("contrato_vigencia_meses", e.target.value)}
                    placeholder="12"
                  />
                </div>
              </div>
              <div className="prof-row-fields">
                <div className="prof-field">
                  <label className="prof-label">Valor total mensal</label>
                  <input
                    className="prof-input"
                    type="text"
                    inputMode="numeric"
                    value={form.valor_mensal}
                    onChange={(e) => update("valor_mensal", e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </div>
                <div className="prof-field">
                  <label className="prof-label">Valor total anual</label>
                  <input
                    className="prof-input"
                    type="text"
                    inputMode="numeric"
                    value={form.valor_anual}
                    onChange={(e) => update("valor_anual", e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </div>
              </div>

              <div className="ficha-form-section">Observações</div>
              <div className="prof-field">
                <textarea
                  className="prof-textarea"
                  rows={4}
                  value={form.observacoes}
                  onChange={(e) => update("observacoes", e.target.value)}
                  placeholder="Informações adicionais (opcional)"
                />
              </div>

              <button type="submit" className="auth-cta" disabled={submitting}>
                {submitting ? "Enviando…" : "Enviar cadastro"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

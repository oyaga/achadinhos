"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  type FichaCadastro,
} from "@/lib/api";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Mode = "list" | "create" | "view";

export function CadastroEmpresasSection() {
  const [fichas, setFichas] = useState<FichaCadastro[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [mode, setMode] = useState<Mode>("list");
  const [selected, setSelected] = useState<FichaCadastro | null>(null);

  // form de criação
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setFichas(await adminApi.listFichas());
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  function openCreate() {
    setNome("");
    setEmail("");
    setFormError(null);
    setCreatedLink(null);
    setCopied(false);
    setMode("create");
  }

  function openView(f: FichaCadastro) {
    setSelected(f);
    setMode("view");
  }

  function backToList() {
    setMode("list");
    setSelected(null);
    setCreatedLink(null);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const n = nome.trim();
    const m = email.trim();
    if (n.length < 2) {
      setFormError("Informe o nome do responsável.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)) {
      setFormError("Informe um e-mail válido.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await adminApi.createFicha({
        responsavel_nome: n,
        responsavel_email: m,
      });
      setCreatedLink(res.link);
      setEmailEnabled(res.email_enabled);
      setCopied(false);
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível criar a ficha.");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copie o link:", link);
    }
  }

  async function handleResend(f: FichaCadastro) {
    try {
      const res = await adminApi.resendFicha(f.id);
      if (res.email_enabled) {
        window.alert("E-mail reenviado para " + f.responsavel_email);
      } else {
        await copyLink(res.link);
        window.alert("Envio de e-mail desativado. O link foi copiado para a área de transferência.");
      }
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível reenviar.");
    }
  }

  async function handleDelete(f: FichaCadastro) {
    if (!window.confirm(`Excluir a ficha de "${f.responsavel_nome}"?`)) return;
    try {
      await adminApi.deleteFicha(f.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    }
  }

  // ── View: ficha preenchida ──────────────────────────────────────────────
  if (mode === "view" && selected) {
    return <FichaDetail ficha={selected} onBack={backToList} />;
  }

  // ── Create ──────────────────────────────────────────────────────────────
  if (mode === "create") {
    return (
      <section className="admin-section">
        <div className="admin-section-head">
          <div>
            <h2 className="admin-section-title">Nova ficha de cadastro</h2>
            <p className="admin-section-sub">Envie o formulário por e-mail ao responsável</p>
          </div>
          <button type="button" className="admin-new-btn ghost" onClick={backToList}>
            <Icon.ChevLeft size={16} />
            Voltar
          </button>
        </div>

        {createdLink ? (
          <div className="admin-form">
            <div className="ficha-success">
              <Icon.Check size={20} />
              <div>
                <strong>Ficha criada!</strong>
                <p>
                  {emailEnabled
                    ? "Um e-mail com o link do formulário foi enviado ao responsável."
                    : "O envio de e-mail está desativado — copie o link abaixo e envie manualmente."}
                </p>
              </div>
            </div>
            <div className="prof-field">
              <label className="prof-label">Link do formulário</label>
              <div className="ficha-link-row">
                <input className="prof-input" type="text" value={createdLink} readOnly />
                <button
                  type="button"
                  className="admin-new-btn"
                  onClick={() => copyLink(createdLink)}
                >
                  {copied ? <Icon.Check size={16} /> : <Icon.Share size={16} />}
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>
            </div>
            <div className="admin-form-actions">
              <button type="button" className="admin-new-btn ghost" onClick={openCreate}>
                <Icon.Plus size={16} />
                Criar outra
              </button>
              <button type="button" className="admin-new-btn" onClick={backToList}>
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <form className="admin-form" onSubmit={handleCreate}>
            <div className="admin-form-title">Dados do responsável</div>
            {formError && <div className="prof-alert error">{formError}</div>}
            <div className="prof-field">
              <label className="prof-label">Nome do responsável</label>
              <input
                className="prof-input"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Maria Silva"
                autoFocus
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">E-mail do responsável</label>
              <input
                className="prof-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="responsavel@empresa.com.br"
                inputMode="email"
              />
            </div>
            <div className="admin-hint">
              O responsável vai receber um link único para preencher a ficha completa.
            </div>
            <div className="admin-form-actions">
              <button type="button" className="admin-new-btn ghost" onClick={backToList}>
                Cancelar
              </button>
              <button type="submit" className="admin-new-btn" disabled={submitting}>
                <Icon.Send size={16} />
                {submitting ? "Enviando…" : "Criar e enviar"}
              </button>
            </div>
          </form>
        )}
      </section>
    );
  }

  // ── List ────────────────────────────────────────────────────────────────
  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Cadastro de empresas</h2>
          <p className="admin-section-sub">{fichas.length} ficha(s)</p>
        </div>
        <button type="button" className="admin-new-btn" onClick={openCreate}>
          <Icon.Plus size={16} />
          Nova ficha
        </button>
      </div>

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error">{loadError}</div>
      ) : fichas.length === 0 ? (
        <div className="admin-empty">Nenhuma ficha criada ainda.</div>
      ) : (
        <div className="admin-list">
          {fichas.map((f) => {
            const done = f.status === "concluido";
            const title = done && f.razao_social ? f.razao_social : f.responsavel_nome;
            return (
              <div key={f.id} className="admin-row">
                <div className="admin-row-avatar">
                  <Icon.Building size={18} />
                </div>
                <div className="admin-row-main">
                  <div className="admin-row-name">
                    {title}
                    <span className={cn("admin-chip", done ? "green" : "amber")}>
                      {done ? "Concluído" : "Pendente"}
                    </span>
                  </div>
                  <div className="admin-row-meta">{f.responsavel_email}</div>
                </div>
                <div className="admin-row-actions">
                  {done ? (
                    <button
                      type="button"
                      className="admin-icon-btn"
                      onClick={() => openView(f)}
                      aria-label={`Ver ficha de ${title}`}
                    >
                      <Icon.Eye size={15} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="admin-icon-btn"
                      onClick={() => handleResend(f)}
                      aria-label={`Reenviar para ${f.responsavel_email}`}
                    >
                      <Icon.Send size={15} />
                    </button>
                  )}
                  <button
                    type="button"
                    className={cn("admin-icon-btn", "danger")}
                    onClick={() => handleDelete(f)}
                    aria-label={`Excluir ficha de ${title}`}
                  >
                    <Icon.Trash size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// Renderização da ficha preenchida para o admin.
function FichaDetail({ ficha, onBack }: { ficha: FichaCadastro; onBack: () => void }) {
  const resp: Array<[string, string]> = [
    ["Nome", ficha.responsavel_nome],
    ["CPF", ficha.resp_cpf],
    ["Data de aniversário", ficha.resp_nascimento],
    ["Endereço", ficha.resp_endereco],
    ["Telefone", ficha.resp_telefone],
    ["Cargo/Função", ficha.resp_cargo],
    ["E-mail", ficha.responsavel_email],
  ];
  const empresa: Array<[string, string]> = [
    ["Razão social", ficha.razao_social],
    ["CNPJ", ficha.cnpj],
    ["Endereço", ficha.empresa_endereco],
    ["Instagram", ficha.instagram],
    ["Facebook", ficha.facebook],
    ["LinkedIn", ficha.linkedin],
    ["Site", ficha.site],
    ["Início do contrato", ficha.contrato_inicio],
    ["Vigência (meses)", ficha.contrato_vigencia_meses],
    ["Valor total mensal", ficha.valor_mensal],
    ["Valor total anual", ficha.valor_anual],
  ];
  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">{ficha.razao_social || ficha.responsavel_nome}</h2>
          <p className="admin-section-sub">Ficha de cadastro · Concluída</p>
        </div>
        <button type="button" className="admin-new-btn ghost" onClick={onBack}>
          <Icon.ChevLeft size={16} />
          Voltar
        </button>
      </div>

      <div className="ficha-detail">
        <div className="ficha-detail-block">
          <div className="ficha-detail-block-title">Dados do responsável</div>
          {resp.map(([k, v]) => (
            <div className="ficha-detail-row" key={k}>
              <span className="ficha-detail-key">{k}</span>
              <span className="ficha-detail-val">{v || "—"}</span>
            </div>
          ))}
        </div>

        <div className="ficha-detail-block">
          <div className="ficha-detail-block-title">Dados da empresa</div>
          {empresa.map(([k, v]) => (
            <div className="ficha-detail-row" key={k}>
              <span className="ficha-detail-key">{k}</span>
              <span className="ficha-detail-val">{v || "—"}</span>
            </div>
          ))}
        </div>

        {ficha.observacoes.trim() && (
          <div className="ficha-detail-block">
            <div className="ficha-detail-block-title">Observações</div>
            <p className="ficha-detail-obs">{ficha.observacoes}</p>
          </div>
        )}
      </div>
    </section>
  );
}

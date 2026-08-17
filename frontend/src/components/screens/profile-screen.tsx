"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import {
  me as meApi,
  ApiError,
  type ChangePasswordPayload,
  type User,
} from "@/lib/api";
import { formatDocument } from "@/lib/document";
import { Icon } from "../icons";
import { cn } from "@/lib/utils";

// ─── ViaCEP ──────────────────────────────────────────────────────────────────

async function fetchCep(cep: string) {
  const clean = cep.replace(/\D/g, "");
  if (clean.length !== 8) return null;
  try {
    const r = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    if (!r.ok) return null;
    const d = (await r.json()) as Record<string, string>;
    if (d.erro) return null;
    return d;
  } catch {
    return null;
  }
}

// ─── Masks ───────────────────────────────────────────────────────────────────

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
}

function maskCep(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.replace(/(\d{5})(\d{0,3})/, "$1-$2").replace(/-$/, "");
}

// ─── Address state ───────────────────────────────────────────────────────────

interface AddressState {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const EMPTY_ADDRESS: AddressState = {
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
};

type CondoRoleValue = "morador" | "sindico" | "conselho" | "administradora";

// ─── Props ───────────────────────────────────────────────────────────────────

interface ProfileScreenProps {
  onBack: () => void;
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const { user, logout, updateUser } = useAuth();

  const isEmpresa = (user?.account_type ?? "pessoa") === "empresa";

  // ── Basic user fields
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(maskPhone(user?.phone ?? ""));
  const [companyName, setCompanyName] = useState(user?.company_name ?? "");

  // ── Address
  const [address, setAddress] = useState<AddressState>(EMPTY_ADDRESS);
  const [cepLoading, setCepLoading] = useState(false);

  // ── Condomínio
  const [condoName, setCondoName] = useState(user?.condo_name ?? "");
  const [condoRole, setCondoRole] = useState<CondoRoleValue>(
    (user?.condo_role as CondoRoleValue) || (isEmpresa ? "administradora" : "morador"),
  );

  // ── Password change
  const [pwdOpen, setPwdOpen] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);

  // ── UI state
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Hydrate from the backend user (single source of truth)
  useEffect(() => {
    if (!user) return;
    setName(user.name ?? "");
    setPhone(maskPhone(user.phone ?? ""));
    setCompanyName(user.company_name ?? "");
    setCondoName(user.condo_name ?? "");
    setCondoRole(
      (user.condo_role as CondoRoleValue) ||
        (user.account_type === "empresa" ? "administradora" : "morador"),
    );
    setAddress({
      cep: maskCep(user.cep ?? ""),
      street: user.street ?? "",
      number: user.number ?? "",
      complement: user.complement ?? "",
      neighborhood: user.neighborhood ?? "",
      city: user.city ?? "",
      state: user.state ?? "",
    });
  }, [user]);

  // ── CEP auto-fill
  async function handleCepBlur() {
    const clean = address.cep.replace(/\D/g, "");
    if (clean.length !== 8) return;
    setCepLoading(true);
    const data = await fetchCep(clean);
    setCepLoading(false);
    if (!data) return;
    setAddress((prev) => ({
      ...prev,
      street: data.logradouro ?? prev.street,
      neighborhood: data.bairro ?? prev.neighborhood,
      city: data.localidade ?? prev.city,
      state: data.uf ?? prev.state,
    }));
  }

  // ── Save
  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const patch: Partial<User> = {
        name: name.trim(),
        phone: phone.replace(/\D/g, ""),
        condo_name: condoName.trim(),
        cep: address.cep.replace(/\D/g, ""),
        street: address.street.trim(),
        number: address.number.trim(),
        complement: address.complement.trim(),
        neighborhood: address.neighborhood.trim(),
        city: address.city.trim(),
        state: address.state.trim().toUpperCase(),
      };
      if (isEmpresa) {
        patch.company_name = companyName.trim();
      } else {
        patch.condo_role = condoRole;
      }
      const updated = await meApi.update(patch);
      updateUser(updated);

      setSaveSuccess(true);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      successTimerRef.current = setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  // ── Password change
  async function handlePwdSave(e: FormEvent) {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(false);
    if (!newPwd) { setPwdError("Digite a nova senha."); return; }
    if (newPwd.length < 6) { setPwdError("Mínimo 6 caracteres."); return; }
    if (newPwd !== confirmPwd) { setPwdError("Senhas não coincidem."); return; }
    setPwdSaving(true);
    try {
      const payload: ChangePasswordPayload = { current_password: currentPwd, new_password: newPwd };
      await meApi.changePassword(payload);
      setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
      setPwdSuccess(true);
      setTimeout(() => setPwdSuccess(false), 3000);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setPwdError("Senha atual incorreta.");
      } else {
        setPwdError("Não foi possível alterar a senha.");
      }
    } finally {
      setPwdSaving(false);
    }
  }

  // ── Avatar initials
  const initials = (user?.name ?? "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const roleLabel =
    user?.role === "admin"
      ? "Admin"
      : isEmpresa
        ? "Administradora"
        : { morador: "Morador", sindico: "Síndico", conselho: "Conselho", administradora: "Administradora" }[
            condoRole
          ];

  // ── Documento (somente leitura — definido no cadastro)
  const docType = (user?.document_type as "cpf" | "cnpj") ?? (isEmpresa ? "cnpj" : "cpf");
  const docRaw = user?.document ?? user?.cpf ?? "";
  const docLabel = docType === "cnpj" ? "CNPJ" : "CPF";
  const docFormatted = docRaw ? formatDocument(docRaw, docType) : "—";

  return (
    <div className="screen">
      {/* Header */}
      <div className="screen-header">
        <button type="button" className="screen-back" onClick={onBack} aria-label="Voltar">
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Meu Perfil</div>
        <div className="screen-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={logout}
            aria-label="Sair"
            title="Sair da conta"
          >
            <Icon.LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="screen-body">
        <form onSubmit={handleSave}>
          {/* Avatar + name hero */}
          <div className="prof-hero">
            <div className="prof-avatar">
              <span className="prof-avatar-initials">{initials}</span>
            </div>
            <div className="prof-hero-info">
              <div className="prof-hero-name">
                {isEmpresa ? user?.company_name || user?.name : user?.name || "Usuário"}
              </div>
              <span className="prof-role-chip">{roleLabel}</span>
            </div>
          </div>

          {/* Admin: atalho para o painel */}
          {user?.role === "admin" && (
            <Link href="/admin" className="prof-admin-link">
              <span className="prof-admin-link-icon">
                <Icon.Crown size={18} />
              </span>
              <span className="prof-admin-link-text">
                <strong>Painel administrativo</strong>
                <span>Gerenciar produtos, empresas e afiliados</span>
              </span>
              <Icon.ChevRight size={16} />
            </Link>
          )}

          {/* Save feedback */}
          {saveError && (
            <div className="prof-alert error" role="alert">{saveError}</div>
          )}
          {saveSuccess && (
            <div className="prof-alert success" role="status">Perfil salvo com sucesso!</div>
          )}

          {/* ── Dados ── */}
          <div className="prof-section">
            <div className="prof-section-title">{isEmpresa ? "Dados da empresa" : "Dados pessoais"}</div>

            {isEmpresa && (
              <div className="prof-field">
                <label className="prof-label">Razão social</label>
                <input
                  className="prof-input"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Razão social da administradora"
                />
              </div>
            )}

            <div className="prof-field">
              <label className="prof-label">{isEmpresa ? "Responsável" : "Nome completo"}</label>
              <input
                className="prof-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isEmpresa ? "Nome do responsável" : "Seu nome"}
              />
            </div>

            <div className="prof-field">
              <label className="prof-label">{docLabel}</label>
              <input className="prof-input" type="text" value={docFormatted} disabled readOnly />
              <span className="prof-help">O documento é definido no cadastro e não pode ser alterado aqui.</span>
            </div>

            <div className="prof-field">
              <label className="prof-label">E-mail</label>
              <input className="prof-input" type="email" value={user?.email ?? ""} disabled readOnly />
            </div>

            <div className="prof-field">
              <label className="prof-label">Telefone</label>
              <input
                className="prof-input"
                type="text"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
                placeholder="(11) 99999-0000"
              />
            </div>
          </div>

          {/* ── Endereço ── */}
          <div className="prof-section">
            <div className="prof-section-title">Endereço</div>

            <div className="prof-field">
              <label className="prof-label">CEP</label>
              <div className="prof-input-row">
                <input
                  className="prof-input"
                  type="text"
                  inputMode="numeric"
                  value={address.cep}
                  onChange={(e) => setAddress((a) => ({ ...a, cep: maskCep(e.target.value) }))}
                  onBlur={handleCepBlur}
                  placeholder="00000-000"
                  maxLength={9}
                />
                {cepLoading && <span className="prof-cep-spin" aria-hidden />}
              </div>
            </div>

            <div className="prof-row-fields">
              <div className="prof-field" style={{ flex: 3 }}>
                <label className="prof-label">Rua / Av.</label>
                <input
                  className="prof-input"
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                  placeholder="Nome da rua"
                />
              </div>
              <div className="prof-field" style={{ flex: 1 }}>
                <label className="prof-label">Nº</label>
                <input
                  className="prof-input"
                  type="text"
                  value={address.number}
                  onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))}
                  placeholder="123"
                />
              </div>
            </div>

            <div className="prof-row-fields">
              <div className="prof-field">
                <label className="prof-label">Complemento</label>
                <input
                  className="prof-input"
                  type="text"
                  value={address.complement}
                  onChange={(e) => setAddress((a) => ({ ...a, complement: e.target.value }))}
                  placeholder="Apto, bloco..."
                />
              </div>
              <div className="prof-field">
                <label className="prof-label">Bairro</label>
                <input
                  className="prof-input"
                  type="text"
                  value={address.neighborhood}
                  onChange={(e) => setAddress((a) => ({ ...a, neighborhood: e.target.value }))}
                  placeholder="Bairro"
                />
              </div>
            </div>

            <div className="prof-row-fields">
              <div className="prof-field" style={{ flex: 3 }}>
                <label className="prof-label">Cidade</label>
                <input
                  className="prof-input"
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                  placeholder="São Paulo"
                />
              </div>
              <div className="prof-field" style={{ flex: 1 }}>
                <label className="prof-label">UF</label>
                <input
                  className="prof-input"
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value.toUpperCase().slice(0, 2) }))}
                  placeholder="SP"
                  maxLength={2}
                />
              </div>
            </div>
          </div>

          {/* ── Condomínio ── */}
          <div className="prof-section">
            <div className="prof-section-title">Condomínio</div>

            <div className="prof-field">
              <label className="prof-label">
                {isEmpresa ? "Condomínio que administra" : "Nome do condomínio"}
              </label>
              <input
                className="prof-input"
                type="text"
                value={condoName}
                onChange={(e) => setCondoName(e.target.value)}
                placeholder={isEmpresa ? "Opcional" : "Ex: Residencial Aurora"}
              />
            </div>

            {!isEmpresa && (
              <div className="prof-field">
                <label className="prof-label">Você é</label>
                <div className="auth-seg-group">
                  {(
                    [
                      { v: "morador", l: "Morador" },
                      { v: "sindico", l: "Síndico" },
                      { v: "conselho", l: "Conselho" },
                    ] as const
                  ).map(({ v, l }) => (
                    <button
                      key={v}
                      type="button"
                      className={cn("auth-seg-btn", condoRole === v && "active")}
                      onClick={() => setCondoRole(v)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Alterar senha ── */}
          <div className="prof-section">
            <button
              type="button"
              className="prof-section-toggle"
              onClick={() => setPwdOpen((v) => !v)}
            >
              <span className="prof-section-title" style={{ marginBottom: 0 }}>Alterar senha</span>
              <Icon.ChevDown size={16} style={{ transform: pwdOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>

            {pwdOpen && (
              <div className="prof-pwd-form">
                {pwdError && <div className="prof-alert error" role="alert">{pwdError}</div>}
                {pwdSuccess && <div className="prof-alert success">Senha alterada com sucesso!</div>}

                <div className="prof-field">
                  <label className="prof-label">Senha atual</label>
                  <div className="prof-input-row">
                    <input
                      className="prof-input"
                      type={showCurrentPwd ? "text" : "password"}
                      value={currentPwd}
                      onChange={(e) => setCurrentPwd(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      className="prof-eye-btn"
                      onClick={() => setShowCurrentPwd((v) => !v)}
                      aria-label={showCurrentPwd ? "Ocultar senha atual" : "Mostrar senha atual"}
                    >
                      {showCurrentPwd ? <Icon.EyeOff size={16} /> : <Icon.Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="prof-field">
                  <label className="prof-label">Nova senha</label>
                  <div className="prof-input-row">
                    <input
                      className="prof-input"
                      type={showNewPwd ? "text" : "password"}
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      autoComplete="new-password"
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      className="prof-eye-btn"
                      onClick={() => setShowNewPwd((v) => !v)}
                      aria-label={showNewPwd ? "Ocultar nova senha" : "Mostrar nova senha"}
                    >
                      {showNewPwd ? <Icon.EyeOff size={16} /> : <Icon.Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="prof-field">
                  <label className="prof-label">Confirmar nova senha</label>
                  <input
                    className="prof-input"
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    placeholder="Repita a nova senha"
                    autoComplete="new-password"
                  />
                </div>

                <button
                  type="button"
                  className="prof-pwd-btn"
                  onClick={(e) => { void handlePwdSave(e as unknown as FormEvent); }}
                  disabled={pwdSaving}
                >
                  {pwdSaving ? "Salvando…" : "Salvar nova senha"}
                </button>
              </div>
            )}
          </div>

          {/* Save button */}
          <button type="submit" className="prof-save-btn" disabled={saving}>
            {saving ? (
              <><span className="auth-spinner" aria-hidden />Salvando…</>
            ) : (
              <><Icon.Check size={16} />Salvar alterações</>
            )}
          </button>

          {/* Logout */}
          <button type="button" className="prof-logout-btn" onClick={logout}>
            <Icon.LogOut size={16} />
            Sair da conta
          </button>

          {/* CTA: certificação */}
          <Link href="/certificacao" className="cert-profile-cta">
            <span className="cert-profile-cta-icon">
              <Icon.Award size={20} />
            </span>
            <span>
              <span className="cert-profile-cta-title">Certificação Achadinhos</span>
              <span className="cert-profile-cta-sub">
              Conheça os selos Blue, Top e Black e como avaliamos cada perfil.
              </span>
            </span>
            <Icon.ChevRight size={16} style={{ marginLeft: "auto", opacity: 0.7 }} />
          </Link>
        </form>
      </div>
    </div>
  );
}

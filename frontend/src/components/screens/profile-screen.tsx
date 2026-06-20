"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { me as meApi, ApiError, type ChangePasswordPayload } from "@/lib/api";
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

// ─── Local storage for extended profile (until backend covers it) ────────────

type LocalProfile = {
  condo_name?: string;
  condo_role?: "morador" | "sindico" | "conselho";
  address?: AddressState;
};

function loadLocal(userId: string): LocalProfile {
  try {
    const raw = localStorage.getItem(`achadinhos.profile.${userId}`);
    return raw ? (JSON.parse(raw) as LocalProfile) : {};
  } catch {
    return {};
  }
}

function saveLocal(userId: string, data: Partial<LocalProfile>) {
  try {
    const existing = loadLocal(userId);
    localStorage.setItem(
      `achadinhos.profile.${userId}`,
      JSON.stringify({ ...existing, ...data })
    );
  } catch {
    // ignore
  }
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

// ─── Props ───────────────────────────────────────────────────────────────────

interface ProfileScreenProps {
  onBack: () => void;
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const { user, logout, updateUser } = useAuth();

  // ── Basic user fields
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(maskPhone(user?.phone ?? ""));

  // ── Address
  const [address, setAddress] = useState<AddressState>(EMPTY_ADDRESS);
  const [cepLoading, setCepLoading] = useState(false);

  // ── Condomínio
  const [condoName, setCondoName] = useState(user?.condo_name ?? "");
  const [condoRole, setCondoRole] = useState<"morador" | "sindico" | "conselho">("morador");

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

  // ── Load local profile on mount
  useEffect(() => {
    if (!user?.id) return;
    const local = loadLocal(user.id);
    if (local.address) setAddress(local.address);
    if (local.condo_name) setCondoName(local.condo_name);
    if (local.condo_role) setCondoRole(local.condo_role);
  }, [user?.id]);

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
      const updated = await meApi.update({ name, phone: phone.replace(/\D/g, "") });
      updateUser(updated);
      saveLocal(user.id, { address, condo_name: condoName, condo_role: condoRole });

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

  const roleLabel = {
    sindico: "Síndico",
    morador: "Morador",
    conselho: "Conselho",
    admin: "Admin",
  }[user?.role === "admin" ? "admin" : condoRole];

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

      <div className="screen-body" style={{ paddingBottom: 100 }}>
        <form onSubmit={handleSave}>
          {/* Avatar + name hero */}
          <div className="prof-hero">
            <div className="prof-avatar">
              <span className="prof-avatar-initials">{initials}</span>
            </div>
            <div className="prof-hero-info">
              <div className="prof-hero-name">{user?.name ?? "Usuário"}</div>
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

          {/* ── Dados pessoais ── */}
          <div className="prof-section">
            <div className="prof-section-title">Dados pessoais</div>

            <div className="prof-field">
              <label className="prof-label">Nome completo</label>
              <input
                className="prof-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>

            <div className="prof-field">
              <label className="prof-label">E-mail</label>
              <input
                className="prof-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
              />
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
              <label className="prof-label">Nome do condomínio</label>
              <input
                className="prof-input"
                type="text"
                value={condoName}
                onChange={(e) => setCondoName(e.target.value)}
                placeholder="Ex: Residencial Aurora"
              />
            </div>

            <div className="prof-field">
              <label className="prof-label">Meu papel</label>
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
                {pwdError && <div className="prof-alert error">{pwdError}</div>}
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
                    <button type="button" className="prof-eye-btn" onClick={() => setShowCurrentPwd((v) => !v)}>
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
                    <button type="button" className="prof-eye-btn" onClick={() => setShowNewPwd((v) => !v)}>
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
        </form>
      </div>
    </div>
  );
}

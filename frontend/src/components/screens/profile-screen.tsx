"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  me as meApi,
  providers as providersApi,
  ApiError,
  type ProviderProfile,
  type ChangePasswordPayload,
} from "@/lib/api";
import { REVIEWS, CATEGORIES_FULL } from "@/lib/data";
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

// ─── Masks ────────────────────────────────────────────────────────────────────

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
}

function maskCep(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.replace(/(\d{5})(\d{0,3})/, "$1-$2").replace(/-$/, "");
}

function maskCpf(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskCnpj(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 14);
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

// ─── Local storage for extended profile (until backend covers it) ─────────────

type LocalProfile = {
  condo_name?: string;
  condo_role?: "morador" | "sindico" | "conselho";
  address?: AddressState;
  company_name?: string;
  document_type?: "cpf" | "cnpj";
  document?: string;
  whatsapp?: string;
  description?: string;
  years_active?: number;
  response_time?: string;
  services?: string[];
  categories?: string[];
  portfolio?: string[];
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

// ─── Address state ────────────────────────────────────────────────────────────

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

// ─── Service categories available ─────────────────────────────────────────────

const SERVICE_CATS = CATEGORIES_FULL.filter(
  (c) => c.id !== "destaque" && c.id !== "shopping" && c.id !== "parceiros"
).map((c) => ({ id: c.id, label: c.label }));

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfileScreenProps {
  onBack: () => void;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const { user, logout, updateUser } = useAuth();

  const isPrestador = user?.role === "prestador";
  const [tab, setTab] = useState<"info" | "reviews">("info");

  // ── Basic user fields
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(maskPhone(user?.phone ?? ""));

  // ── Address
  const [address, setAddress] = useState<AddressState>(EMPTY_ADDRESS);
  const [cepLoading, setCepLoading] = useState(false);

  // ── Morador/síndico extras
  const [condoName, setCondoName] = useState("");
  const [condoRole, setCondoRole] = useState<"morador" | "sindico" | "conselho">("morador");

  // ── Prestador extras
  const [companyName, setCompanyName] = useState("");
  const [docType, setDocType] = useState<"cpf" | "cnpj">("cnpj");
  const [document, setDocument] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");
  const [yearsActive, setYearsActive] = useState(0);
  const [responseTime, setResponseTime] = useState("2h");
  const [services, setServices] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [portfolioInput, setPortfolioInput] = useState("");
  const [providerStats, setProviderStats] = useState<Pick<ProviderProfile, "jobs_done" | "rating" | "reviews_count">>({ jobs_done: 0, rating: 0, reviews_count: 0 });

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
  const [newService, setNewService] = useState("");

  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load local profile on mount
  useEffect(() => {
    if (!user?.id) return;
    const local = loadLocal(user.id);
    if (local.address) setAddress(local.address);
    if (local.condo_name) setCondoName(local.condo_name);
    if (local.condo_role) setCondoRole(local.condo_role);
    if (local.company_name) setCompanyName(local.company_name);
    if (local.document_type) setDocType(local.document_type);
    if (local.document) setDocument(local.document);
    if (local.whatsapp) setWhatsapp(maskPhone(local.whatsapp));
    if (local.description) setDescription(local.description);
    if (local.years_active != null) setYearsActive(local.years_active);
    if (local.response_time) setResponseTime(local.response_time);
    if (local.services) setServices(local.services);
    if (local.categories) setCategories(local.categories);
    if (local.portfolio) setPortfolio(local.portfolio);
  }, [user?.id]);

  // ── Fetch provider profile stats (best-effort)
  useEffect(() => {
    if (!isPrestador) return;
    providersApi.getMyProfile().then((p) => {
      setProviderStats({ jobs_done: p.jobs_done, rating: p.rating, reviews_count: p.reviews_count });
    }).catch(() => {});
  }, [isPrestador]);

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

      const localData: Partial<LocalProfile> = { address };
      if (!isPrestador) {
        localData.condo_name = condoName;
        localData.condo_role = condoRole;
      } else {
        localData.company_name = companyName;
        localData.document_type = docType;
        localData.document = document.replace(/\D/g, "");
        localData.whatsapp = whatsapp.replace(/\D/g, "");
        localData.description = description;
        localData.years_active = yearsActive;
        localData.response_time = responseTime;
        localData.services = services;
        localData.categories = categories;
        localData.portfolio = portfolio;
      }
      saveLocal(user.id, localData);

      setSaveSuccess(true);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      successTimerRef.current = setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setSaveError(err.message);
      } else {
        setSaveError("Erro ao salvar. Tente novamente.");
      }
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

  // ── Service tag helpers
  function addService() {
    const s = newService.trim();
    if (!s || services.includes(s)) return;
    setServices((prev) => [...prev, s]);
    setNewService("");
  }
  function removeService(s: string) {
    setServices((prev) => prev.filter((x) => x !== s));
  }
  function toggleCategory(id: string) {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // ── Portfolio helpers
  function addPortfolio() {
    const u = portfolioInput.trim();
    if (!u || portfolio.includes(u)) return;
    setPortfolio((prev) => [...prev, u]);
    setPortfolioInput("");
  }
  function removePortfolio(u: string) {
    setPortfolio((prev) => prev.filter((x) => x !== u));
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
    prestador: "Prestador",
    seller: "Lojista",
    admin: "Admin",
  }[user?.role ?? "morador"];

  const reviews = REVIEWS.slice(0, 5);

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

      {/* Tabs for prestador */}
      {isPrestador && (
        <div className="prof-tabs">
          <button
            type="button"
            className={cn("prof-tab", tab === "info" && "active")}
            onClick={() => setTab("info")}
          >
            Perfil
          </button>
          <button
            type="button"
            className={cn("prof-tab", tab === "reviews" && "active")}
            onClick={() => setTab("reviews")}
          >
            Avaliações {providerStats.reviews_count > 0 && `(${providerStats.reviews_count})`}
          </button>
        </div>
      )}

      <div className="screen-body" style={{ paddingBottom: 100 }}>
        {/* ── REVIEWS TAB ── */}
        {tab === "reviews" && isPrestador && (
          <div className="prof-reviews-wrap">
            {/* Rating summary */}
            <div className="prof-rating-summary">
              <div className="prof-rating-big">{providerStats.rating > 0 ? providerStats.rating.toFixed(1) : "—"}</div>
              <div>
                <div className="prof-stars-row">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon.Star key={s} size={14} filled={s <= Math.round(providerStats.rating)} />
                  ))}
                </div>
                <div className="prof-reviews-count">{providerStats.reviews_count} avaliações</div>
              </div>
            </div>

            {reviews.length === 0 ? (
              <div className="prof-empty">Nenhuma avaliação ainda.</div>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="prof-review-card">
                  <div className="prof-review-top">
                    <div className="prof-review-user">{r.user}</div>
                    <div className="prof-review-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Icon.Star key={s} size={12} filled={s <= r.rating} />
                      ))}
                    </div>
                  </div>
                  <div className="prof-review-condo">{r.condo}</div>
                  <div className="prof-review-text">{r.text}</div>
                  {r.tags && r.tags.length > 0 && (
                    <div className="prof-review-tags">
                      {r.tags.map((t) => (
                        <span key={t} className="prof-review-tag">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="prof-review-date">{r.date}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── INFO TAB (or default for non-prestador) ── */}
        {tab === "info" && (
          <form onSubmit={handleSave}>
            {/* Avatar + name hero */}
            <div className="prof-hero">
              <div className="prof-avatar">
                <span className="prof-avatar-initials">{initials}</span>
              </div>
              <div className="prof-hero-info">
                <div className="prof-hero-name">{user?.name ?? "Usuário"}</div>
                <span className={cn("prof-role-chip", isPrestador && "gold")}>
                  {roleLabel}
                </span>
              </div>
              {isPrestador && (
                <div className="prof-stats">
                  <div className="prof-stat">
                    <span className="prof-stat-value">{providerStats.rating > 0 ? providerStats.rating.toFixed(1) : "—"}</span>
                    <span className="prof-stat-label">avaliação</span>
                  </div>
                  <div className="prof-stat-divider" />
                  <div className="prof-stat">
                    <span className="prof-stat-value">{providerStats.jobs_done}</span>
                    <span className="prof-stat-label">serviços</span>
                  </div>
                  <div className="prof-stat-divider" />
                  <div className="prof-stat">
                    <span className="prof-stat-value">{yearsActive || "—"}</span>
                    <span className="prof-stat-label">anos</span>
                  </div>
                </div>
              )}
            </div>

            {/* Save feedback */}
            {saveError && (
              <div className="prof-alert error" role="alert">{saveError}</div>
            )}
            {saveSuccess && (
              <div className="prof-alert success" role="status">Perfil salvo com sucesso!</div>
            )}

            {/* ── PRESTADOR: empresa ── */}
            {isPrestador && (
              <div className="prof-section">
                <div className="prof-section-title">Dados da empresa</div>

                <div className="prof-field">
                  <label className="prof-label">Nome da empresa</label>
                  <input
                    className="prof-input"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Razão social ou nome fantasia"
                  />
                </div>

                <div className="prof-field">
                  <label className="prof-label">Tipo de documento</label>
                  <div className="auth-seg-group">
                    {(["cnpj", "cpf"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={cn("auth-seg-btn", docType === t && "active")}
                        onClick={() => { setDocType(t); setDocument(""); }}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="prof-field">
                  <label className="prof-label">{docType === "cnpj" ? "CNPJ" : "CPF"}</label>
                  <input
                    className="prof-input"
                    type="text"
                    inputMode="numeric"
                    value={document}
                    onChange={(e) => setDocument(docType === "cnpj" ? maskCnpj(e.target.value) : maskCpf(e.target.value))}
                    placeholder={docType === "cnpj" ? "00.000.000/0001-00" : "000.000.000-00"}
                  />
                </div>

                <div className="prof-row-fields">
                  <div className="prof-field">
                    <label className="prof-label">WhatsApp</label>
                    <input
                      className="prof-input"
                      type="text"
                      inputMode="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                      placeholder="(11) 99999-0000"
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
              </div>
            )}

            {/* ── Dados pessoais ── */}
            <div className="prof-section">
              <div className="prof-section-title">
                {isPrestador ? "Dados de acesso" : "Dados pessoais"}
              </div>

              {!isPrestador && (
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
              )}

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

              {!isPrestador && (
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
              )}
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

            {/* ── Condomínio (sindico/morador) ── */}
            {!isPrestador && (
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
            )}

            {/* ── PRESTADOR: sobre + profissional ── */}
            {isPrestador && (
              <>
                <div className="prof-section">
                  <div className="prof-section-title">Sobre</div>
                  <div className="prof-field">
                    <label className="prof-label">
                      Descrição do seu negócio
                      <span className="prof-char-count">{description.length}/500</span>
                    </label>
                    <textarea
                      className="prof-textarea"
                      rows={4}
                      maxLength={500}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Conte um pouco sobre seus serviços, diferenciais e área de atuação..."
                    />
                  </div>
                </div>

                <div className="prof-section">
                  <div className="prof-section-title">Informações profissionais</div>

                  <div className="prof-row-fields">
                    <div className="prof-field">
                      <label className="prof-label">Tempo de empresa</label>
                      <div className="prof-input-row">
                        <input
                          className="prof-input"
                          type="number"
                          min={0}
                          max={99}
                          value={yearsActive || ""}
                          onChange={(e) => setYearsActive(parseInt(e.target.value) || 0)}
                          placeholder="0"
                          style={{ flex: 1 }}
                        />
                        <span className="prof-input-suffix">anos</span>
                      </div>
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Tempo de resposta</label>
                      <div className="prof-input-row">
                        <input
                          className="prof-input"
                          type="text"
                          value={responseTime}
                          onChange={(e) => setResponseTime(e.target.value)}
                          placeholder="2h"
                          style={{ flex: 1 }}
                        />
                        <span className="prof-input-suffix">resp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="prof-field">
                    <label className="prof-label">Serviços concluídos pelo app</label>
                    <div className="prof-readonly-badge">{providerStats.jobs_done} serviços</div>
                  </div>
                </div>

                {/* Serviços prestados */}
                <div className="prof-section">
                  <div className="prof-section-title">Serviços prestados</div>
                  <div className="prof-field">
                    <label className="prof-label">O que você faz?</label>
                    <div className="prof-tag-input-row">
                      <input
                        className="prof-input"
                        type="text"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        placeholder="Ex: Instalação de câmeras"
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addService(); } }}
                      />
                      <button type="button" className="prof-tag-add-btn" onClick={addService}>
                        <Icon.Plus size={16} />
                      </button>
                    </div>
                    {services.length > 0 && (
                      <div className="prof-tags">
                        {services.map((s) => (
                          <span key={s} className="prof-tag">
                            {s}
                            <button type="button" onClick={() => removeService(s)} aria-label={`Remover ${s}`}>×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Categorias */}
                <div className="prof-section">
                  <div className="prof-section-title">Categorias de atuação</div>
                  <div className="prof-cat-grid">
                    {SERVICE_CATS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={cn("prof-cat-chip", categories.includes(c.id) && "active")}
                        onClick={() => toggleCategory(c.id)}
                      >
                        {categories.includes(c.id) && <Icon.Check size={11} />}
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Portfólio */}
                <div className="prof-section">
                  <div className="prof-section-title">Portfólio</div>
                  <div className="prof-field">
                    <label className="prof-label">Links (site, Instagram, YouTube…)</label>
                    <div className="prof-tag-input-row">
                      <input
                        className="prof-input"
                        type="url"
                        inputMode="url"
                        value={portfolioInput}
                        onChange={(e) => setPortfolioInput(e.target.value)}
                        placeholder="https://..."
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addPortfolio(); } }}
                      />
                      <button type="button" className="prof-tag-add-btn" onClick={addPortfolio}>
                        <Icon.Plus size={16} />
                      </button>
                    </div>
                    {portfolio.length > 0 && (
                      <div className="prof-portfolio-list">
                        {portfolio.map((u) => (
                          <div key={u} className="prof-portfolio-item">
                            <Icon.ExternalLink size={14} />
                            <a href={u} target="_blank" rel="noopener noreferrer" className="prof-portfolio-url">
                              {u}
                            </a>
                            <button type="button" className="prof-portfolio-remove" onClick={() => removePortfolio(u)} aria-label="Remover">
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

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
        )}
      </div>
    </div>
  );
}

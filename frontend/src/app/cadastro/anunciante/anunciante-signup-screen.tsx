"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import {
  useAuth,
  type RegisterPrestadorPayload,
  type RegisterSellerPayload,
} from "@/contexts/auth-context";
import { Icon } from "@/components/icons";
import { BrandLockup } from "@/components/auth/brand-lockup";
import { cn } from "@/lib/utils";
import { formatCPF, formatCNPJ, isValidCPF, isValidCNPJ, stripDocument } from "@/lib/document";
import { formatPhone, isValidPhone, stripPhone } from "@/lib/phone";
import { formatCEP, isValidCEP, stripCEP } from "@/lib/cep";
import { useViaCEP } from "@/hooks/use-via-cep";
import { SignupWizard } from "@/components/screens/signup-wizard";

type DocumentType = "cpf" | "cnpj";
type AccountType = "prestador" | "seller";
type Phase = "type" | "credentials" | "profile" | "seller-categories";

interface CredentialsState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  documentType: DocumentType;
  document: string;
  companyName: string;
  whatsapp: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  accepted: boolean;
}

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  document?: string;
  companyName?: string;
  whatsapp?: string;
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  accepted?: string;
}

const SHOP_CATEGORIES = [
  { id: "limpeza", label: "Limpeza" },
  { id: "manutencao", label: "Manutenção" },
  { id: "epi", label: "EPI" },
  { id: "jardim", label: "Jardim" },
  { id: "piscina", label: "Piscina" },
  { id: "eletrica", label: "Elétrica" },
  { id: "escritorio", label: "Escritório" },
] as const;

export function AnuncianteSignupScreen() {
  const router = useRouter();
  const { registerPrestador, registerSeller, isAuthenticated, isLoading, user } = useAuth();

  const [phase, setPhase] = useState<Phase>("type");
  const [accountType, setAccountType] = useState<AccountType>("prestador");

  useEffect(() => {
    if (!isLoading && isAuthenticated && phase === "credentials") {
      if (accountType === "seller") {
        setPhase("seller-categories");
      } else {
        setPhase("profile");
      }
    }
  }, [isAuthenticated, isLoading, phase, accountType]);

  // Type selection step
  if (phase === "type") {
    return (
      <TypeStep
        onSelect={(type) => {
          setAccountType(type);
          setPhase("credentials");
        }}
      />
    );
  }

  // Profile step for prestador
  if (phase === "profile") {
    return (
      <ProviderProfileStep
        onCompleted={() => {
          router.replace("/?signup=ok");
        }}
        onBackToCredentials={() => setPhase("credentials")}
      />
    );
  }

  // Seller categories step
  if (phase === "seller-categories") {
    return (
      <SellerCategoriesStep
        userId={user?.id ?? ""}
        onCompleted={() => {
          router.replace("/?signup=ok");
        }}
        onBack={() => setPhase("credentials")}
      />
    );
  }

  // Credentials step
  return (
    <CredentialsStep
      mode={accountType}
      onSuccess={() => {
        if (accountType === "seller") {
          setPhase("seller-categories");
        } else {
          setPhase("profile");
        }
      }}
      onRegister={
        accountType === "seller"
          ? (d) => registerSeller(d as RegisterSellerPayload)
          : (d) => registerPrestador(d as RegisterPrestadorPayload)
      }
      onBack={() => setPhase("type")}
    />
  );
}

// =============== Step 0 — type selection ===============

interface TypeStepProps {
  onSelect: (type: AccountType) => void;
}

function TypeStep({ onSelect }: TypeStepProps) {
  return (
    <main className="auth-shell wide">
      <div className="auth-shell-inner">
        <div className="auth-topbar">
          <Link href="/cadastro" className="auth-back" aria-label="Voltar">
            <Icon.ChevLeft size={16} />
          </Link>
          <div className="auth-topbar-right">
            <Link href="/" className="auth-tertiary-link">Início</Link>
            <Link href="/login" className="auth-tertiary-link">
              Já tem conta? <strong>Entrar</strong>
            </Link>
          </div>
        </div>

        <BrandLockup />

        <div className="auth-card">
          <div className="auth-eyebrow">Anunciante</div>
          <h1 className="auth-title">
            O que você quer <em>vender</em>?
          </h1>
          <p className="auth-subtitle">
            Escolha o perfil que melhor descreve o seu negócio.
          </p>

          <div className="auth-choice-grid">
            <button
              type="button"
              className="auth-choice-card"
              onClick={() => onSelect("prestador")}
            >
              <div className="auth-choice-card-icon">
                <Icon.CatMaintenance size={24} />
              </div>
              <div className="auth-choice-card-title">Prestador de serviço</div>
              <div className="auth-choice-card-desc">
                Cadastre seus serviços, configure categorias e receba pedidos no WhatsApp.
              </div>
              <div className="auth-choice-card-cta">
                Continuar <Icon.ChevRight size={14} />
              </div>
            </button>

            <button
              type="button"
              className="auth-choice-card gold"
              onClick={() => onSelect("seller")}
            >
              <div className="auth-choice-card-icon">
                <Icon.Cart size={24} />
              </div>
              <div className="auth-choice-card-title">Lojista / Vendedor</div>
              <div className="auth-choice-card-desc">
                Venda produtos para condomínios, gerencie seu catálogo e receba pedidos no WhatsApp.
              </div>
              <div className="auth-choice-card-cta">
                Continuar <Icon.ChevRight size={14} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// =============== Step A — credentials + company info ===============

interface CredentialsStepProps {
  mode: AccountType;
  onSuccess: () => void;
  onRegister: (d: RegisterPrestadorPayload | RegisterSellerPayload) => Promise<void>;
  onBack: () => void;
}

function CredentialsStep({ mode, onSuccess, onRegister, onBack }: CredentialsStepProps) {
  const { lookup: lookupCEP, loading: cepLoading } = useViaCEP();
  const cepLookedRef = useRef<string>("");

  const [form, setForm] = useState<CredentialsState>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    documentType: "cnpj",
    document: "",
    companyName: "",
    whatsapp: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    accepted: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof CredentialsState>(k: K, v: CredentialsState[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function handleDocInput(raw: string) {
    const formatted =
      form.documentType === "cpf"
        ? formatCPF(raw)
        : formatCNPJ(raw);
    update("document", formatted);
  }

  async function handleCEPBlur() {
    const raw = stripCEP(form.cep);
    if (!isValidCEP(raw) || cepLookedRef.current === raw) return;
    cepLookedRef.current = raw;
    const result = await lookupCEP(raw);
    if (result) {
      setForm((prev) => ({
        ...prev,
        street: result.logradouro || prev.street,
        neighborhood: result.bairro || prev.neighborhood,
        city: result.localidade || prev.city,
        state: result.uf || prev.state,
        complement: result.complemento || prev.complement,
      }));
    }
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Como podemos te chamar?";
    if (!form.email.trim()) next.email = "Informe um e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "E-mail inválido.";
    if (!form.password) next.password = "Crie uma senha.";
    else if (form.password.length < 8) next.password = "Mínimo de 8 caracteres.";
    if (!form.passwordConfirm) next.passwordConfirm = "Confirme sua senha.";
    else if (form.password !== form.passwordConfirm)
      next.passwordConfirm = "As senhas não conferem.";

    const docDigits = stripDocument(form.document);
    if (!form.document) {
      next.document = `Informe o ${form.documentType.toUpperCase()}.`;
    } else if (form.documentType === "cpf" && !isValidCPF(docDigits)) {
      next.document = "CPF inválido.";
    } else if (form.documentType === "cnpj" && !isValidCNPJ(docDigits)) {
      next.document = "CNPJ inválido.";
    }

    if (!form.companyName.trim()) next.companyName = "Informe o nome da empresa.";
    if (!form.whatsapp) next.whatsapp = "Informe o WhatsApp para contato.";
    else if (!isValidPhone(stripPhone(form.whatsapp))) next.whatsapp = "Número inválido.";
    if (!form.cep) next.cep = "Informe o CEP.";
    else if (!isValidCEP(stripCEP(form.cep))) next.cep = "CEP inválido.";
    if (!form.street.trim()) next.street = "Informe a rua.";
    if (!form.number.trim()) next.number = "Informe o número.";
    if (!form.neighborhood.trim()) next.neighborhood = "Informe o bairro.";
    if (!form.city.trim()) next.city = "Informe a cidade.";
    if (!form.state.trim() || form.state.length !== 2) next.state = "UF inválida.";
    if (!form.accepted) next.accepted = "Você precisa aceitar os termos.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    const base = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      whatsapp: stripPhone(form.whatsapp),
      document_type: form.documentType,
      document: stripDocument(form.document),
      company_name: form.companyName.trim(),
      address: {
        cep: stripCEP(form.cep),
        street: form.street.trim(),
        number: form.number.trim(),
        complement: form.complement.trim(),
        neighborhood: form.neighborhood.trim(),
        city: form.city.trim(),
        state: form.state.trim().toUpperCase(),
      },
    };

    const payload: RegisterPrestadorPayload | RegisterSellerPayload =
      mode === "seller"
        ? { ...base, categories: [] }
        : base;

    setSubmitting(true);
    try {
      await onRegister(payload);
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          setServerError("Esse e-mail ou documento já tem uma conta. Tente entrar.");
        } else if (err.status === 422) {
          setServerError(err.message || "Confira os dados e tente novamente.");
        } else if (err.status === 0) {
          setServerError("Não consegui falar com o servidor. Verifique sua conexão.");
        } else {
          setServerError(err.message || "Não foi possível criar sua conta agora.");
        }
      } else {
        setServerError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const eyebrowLabel = mode === "seller" ? "Conta de lojista" : "Anunciante";

  return (
    <main className="auth-shell">
      <div className="auth-shell-inner">
        <div className="auth-topbar">
          <button
            type="button"
            className="auth-back"
            aria-label="Voltar para escolha de tipo"
            onClick={onBack}
          >
            <Icon.ChevLeft size={16} />
          </button>
          <div className="auth-topbar-right">
            <Link href="/" className="auth-tertiary-link">
              Início
            </Link>
            <Link className="auth-tertiary-link" href="/login">
              Já tem conta? <strong>Entrar</strong>
            </Link>
          </div>
        </div>

        <BrandLockup />

        <div className="auth-card">
          <div className="auth-stepper" aria-label="Progresso do cadastro">
            <span>Passo 1 de 2</span>
            <span className="auth-stepper-dots" aria-hidden>
              <span className="auth-stepper-dot active" />
              <span className="auth-stepper-dot" />
            </span>
          </div>

          <div className="auth-eyebrow">{eyebrowLabel}</div>
          <h1 className="auth-title">
            Vamos criar sua <em>conta</em>
          </h1>
          <p className="auth-subtitle">
            {mode === "seller"
              ? "Credenciais e dados da loja. Em seguida você seleciona as categorias de produtos."
              : "Credenciais e dados da empresa. Em seguida você configura as categorias e horários."}
          </p>

          {serverError && (
            <div className="auth-error" role="alert">
              <Icon.Sparkle size={14} />
              <span>{serverError}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Icon.User size={18} /></span>
                <input
                  className={cn("auth-input", errors.name && "invalid")}
                  type="text"
                  autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  aria-label="Seu nome"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  disabled={submitting}
                />
              </div>
              {errors.name && <div className="auth-field-error">{errors.name}</div>}
            </div>

            {/* Email */}
            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Icon.AtSign size={18} /></span>
                <input
                  className={cn("auth-input", errors.email && "invalid")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  aria-label="E-mail"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  disabled={submitting}
                />
              </div>
              {errors.email && <div className="auth-field-error">{errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Icon.Lock size={18} /></span>
                <input
                  className={cn("auth-input has-suffix", errors.password && "invalid")}
                  type={showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Crie uma senha (mín. 8)"
                  aria-label="Senha"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  disabled={submitting}
                />
                <button
                  type="button"
                  className="auth-input-suffix"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPwd ? <Icon.EyeOff size={18} /> : <Icon.Eye size={18} />}
                </button>
              </div>
              {errors.password && <div className="auth-field-error">{errors.password}</div>}
            </div>

            {/* Password confirm */}
            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Icon.Lock size={18} /></span>
                <input
                  className={cn("auth-input", errors.passwordConfirm && "invalid")}
                  type={showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirme sua senha"
                  aria-label="Confirmar senha"
                  value={form.passwordConfirm}
                  onChange={(e) => update("passwordConfirm", e.target.value)}
                  disabled={submitting}
                />
              </div>
              {errors.passwordConfirm && <div className="auth-field-error">{errors.passwordConfirm}</div>}
            </div>

            {/* Company name */}
            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Icon.BrandHouse size={18} /></span>
                <input
                  className={cn("auth-input", errors.companyName && "invalid")}
                  type="text"
                  placeholder={mode === "seller" ? "Nome da loja / empresa" : "Razão social / Nome da empresa"}
                  aria-label="Nome da empresa"
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  disabled={submitting}
                />
              </div>
              {errors.companyName && <div className="auth-field-error">{errors.companyName}</div>}
            </div>

            {/* Document type toggle + input */}
            <div>
              <div className="auth-label">Documento da empresa</div>
              <div className="auth-seg-group" role="group" aria-label="Tipo de documento" style={{ marginBottom: 8 }}>
                <button
                  type="button"
                  className={cn("auth-seg-btn", form.documentType === "cnpj" && "active")}
                  onClick={() => { update("documentType", "cnpj"); update("document", ""); }}
                  disabled={submitting}
                >
                  CNPJ
                </button>
                <button
                  type="button"
                  className={cn("auth-seg-btn", form.documentType === "cpf" && "active")}
                  onClick={() => { update("documentType", "cpf"); update("document", ""); }}
                  disabled={submitting}
                >
                  CPF
                </button>
              </div>
              <div className="auth-input-wrap">
                <input
                  className={cn("auth-input", errors.document && "invalid")}
                  type="text"
                  inputMode="numeric"
                  placeholder={form.documentType === "cnpj" ? "00.000.000/0001-00" : "000.000.000-00"}
                  aria-label={form.documentType.toUpperCase()}
                  value={form.document}
                  onChange={(e) => handleDocInput(e.target.value)}
                  disabled={submitting}
                  maxLength={form.documentType === "cnpj" ? 18 : 14}
                />
              </div>
              {errors.document && <div className="auth-field-error">{errors.document}</div>}
            </div>

            {/* WhatsApp */}
            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Icon.Bell size={18} /></span>
                <input
                  className={cn("auth-input", errors.whatsapp && "invalid")}
                  type="tel"
                  inputMode="tel"
                  placeholder="WhatsApp para pedidos"
                  aria-label="WhatsApp"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", formatPhone(e.target.value))}
                  disabled={submitting}
                  maxLength={16}
                />
              </div>
              {errors.whatsapp && <div className="auth-field-error">{errors.whatsapp}</div>}
            </div>

            {/* CEP */}
            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Icon.Pin size={18} /></span>
                <input
                  className={cn("auth-input has-suffix", errors.cep && "invalid")}
                  type="text"
                  inputMode="numeric"
                  placeholder="CEP (00000-000)"
                  aria-label="CEP"
                  value={form.cep}
                  onChange={(e) => update("cep", formatCEP(e.target.value))}
                  onBlur={() => { void handleCEPBlur(); }}
                  disabled={submitting}
                  maxLength={9}
                />
                {cepLoading && (
                  <span className="auth-input-suffix" style={{ pointerEvents: "none" }}>
                    <span className="auth-spinner" aria-hidden />
                  </span>
                )}
              </div>
              {errors.cep && <div className="auth-field-error">{errors.cep}</div>}
            </div>

            {/* Street + Number */}
            <div className="auth-row-fields">
              <div style={{ flex: 2 }}>
                <div className="auth-input-wrap">
                  <input
                    className={cn("auth-input", errors.street && "invalid")}
                    type="text"
                    placeholder="Rua / Avenida"
                    aria-label="Rua"
                    value={form.street}
                    onChange={(e) => update("street", e.target.value)}
                    disabled={submitting}
                  />
                </div>
                {errors.street && <div className="auth-field-error">{errors.street}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <div className="auth-input-wrap">
                  <input
                    className={cn("auth-input", errors.number && "invalid")}
                    type="text"
                    placeholder="Nº"
                    aria-label="Número"
                    value={form.number}
                    onChange={(e) => update("number", e.target.value)}
                    disabled={submitting}
                  />
                </div>
                {errors.number && <div className="auth-field-error">{errors.number}</div>}
              </div>
            </div>

            {/* Complement */}
            <div>
              <div className="auth-input-wrap">
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Complemento (opcional)"
                  aria-label="Complemento"
                  value={form.complement}
                  onChange={(e) => update("complement", e.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <div className="auth-input-wrap">
                <input
                  className={cn("auth-input", errors.neighborhood && "invalid")}
                  type="text"
                  placeholder="Bairro"
                  aria-label="Bairro"
                  value={form.neighborhood}
                  onChange={(e) => update("neighborhood", e.target.value)}
                  disabled={submitting}
                />
              </div>
              {errors.neighborhood && <div className="auth-field-error">{errors.neighborhood}</div>}
            </div>

            {/* City + State */}
            <div className="auth-row-fields">
              <div style={{ flex: 2 }}>
                <div className="auth-input-wrap">
                  <input
                    className={cn("auth-input", errors.city && "invalid")}
                    type="text"
                    placeholder="Cidade"
                    aria-label="Cidade"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    disabled={submitting}
                  />
                </div>
                {errors.city && <div className="auth-field-error">{errors.city}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <div className="auth-input-wrap">
                  <input
                    className={cn("auth-input", errors.state && "invalid")}
                    type="text"
                    placeholder="UF"
                    aria-label="Estado (UF)"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value.toUpperCase().slice(0, 2))}
                    disabled={submitting}
                    maxLength={2}
                  />
                </div>
                {errors.state && <div className="auth-field-error">{errors.state}</div>}
              </div>
            </div>

            {/* Terms */}
            <label className="auth-checkbox" style={{ marginTop: 6 }}>
              <input
                type="checkbox"
                checked={form.accepted}
                onChange={(e) => update("accepted", e.target.checked)}
              />
              <span className="auth-checkbox-box">
                {form.accepted && <Icon.Check size={12} />}
              </span>
              <span className="auth-checkbox-text">
                Aceito os <strong>termos de uso</strong> e a{" "}
                <strong>política de homologação</strong>.
              </span>
            </label>
            {errors.accepted && <div className="auth-field-error">{errors.accepted}</div>}

            <button
              type="submit"
              className="auth-cta"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? (
                <>
                  <span className="auth-spinner" aria-hidden />
                  Criando sua conta…
                </>
              ) : (
                <>Continuar para perfil</>
              )}
            </button>
          </form>

          <div className="auth-footer-line">
            Já tem conta? <Link href="/login">Entrar</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// =============== Step B — provider profile (3-step wizard) ===============

interface ProviderProfileStepProps {
  onCompleted: () => void;
  onBackToCredentials: () => void;
}

function ProviderProfileStep({
  onCompleted,
  onBackToCredentials,
}: ProviderProfileStepProps) {
  return (
    <div className="device-frame" style={{ background: "var(--bone-50)" }}>
      <div className="app">
        <div className="app-scroll">
          <SignupWizard
            onBack={onBackToCredentials}
            onComplete={onCompleted}
          />
        </div>
      </div>
    </div>
  );
}

// =============== Step C — seller categories ===============

interface SellerCategoriesStepProps {
  userId: string;
  onCompleted: () => void;
  onBack: () => void;
}

function SellerCategoriesStep({ userId, onCompleted, onBack }: SellerCategoriesStepProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setError(null);
  }

  function handleFinish() {
    if (selected.length === 0) {
      setError("Selecione pelo menos uma categoria.");
      return;
    }
    // Persist to localStorage for the seller panel to read
    try {
      const key = `achadinhos.profile.${userId}`;
      const existing = JSON.parse(localStorage.getItem(key) ?? "{}") as Record<string, unknown>;
      localStorage.setItem(key, JSON.stringify({ ...existing, categories: selected }));
    } catch {
      // ignore
    }
    onCompleted();
  }

  return (
    <main className="auth-shell">
      <div className="auth-shell-inner">
        <div className="auth-topbar">
          <button
            type="button"
            className="auth-back"
            aria-label="Voltar"
            onClick={onBack}
          >
            <Icon.ChevLeft size={16} />
          </button>
          <div className="auth-topbar-right">
            <Link href="/" className="auth-tertiary-link">Início</Link>
          </div>
        </div>

        <BrandLockup />

        <div className="auth-card">
          <div className="auth-stepper" aria-label="Progresso do cadastro">
            <span>Passo 2 de 2</span>
            <span className="auth-stepper-dots" aria-hidden>
              <span className="auth-stepper-dot" />
              <span className="auth-stepper-dot active" />
            </span>
          </div>

          <div className="auth-eyebrow">Lojista</div>
          <h1 className="auth-title">
            Quais produtos você <em>vende</em>?
          </h1>
          <p className="auth-subtitle">
            Selecione as categorias do seu catálogo.
          </p>

          {error && (
            <div className="auth-error" role="alert">
              <Icon.Sparkle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className="seller-cat-grid">
            {SHOP_CATEGORIES.map((cat) => {
              const active = selected.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={cn("seller-cat-chip", active && "active")}
                  onClick={() => toggle(cat.id)}
                  aria-pressed={active}
                >
                  {active && <Icon.Check size={13} />}
                  {cat.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="auth-cta"
            style={{ marginTop: 24 }}
            onClick={handleFinish}
          >
            Finalizar cadastro
          </button>
        </div>
      </div>
    </main>
  );
}

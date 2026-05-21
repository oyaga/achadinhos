"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { Icon } from "@/components/icons";
import { BrandLockup } from "@/components/auth/brand-lockup";
import { cn } from "@/lib/utils";

export function LoginScreen() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);

  // If already authenticated and the auth bootstrap finished, bounce home.
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  function validate(): boolean {
    let ok = true;
    setEmailError(null);
    setPwdError(null);
    if (!email.trim()) {
      setEmailError("Informe seu e-mail.");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("E-mail inválido.");
      ok = false;
    }
    if (!password) {
      setPwdError("Informe sua senha.");
      ok = false;
    }
    return ok;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      router.replace("/");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401 || err.status === 403) {
          setServerError("E-mail ou senha incorretos.");
        } else if (err.status === 0) {
          setServerError(
            "Não consegui falar com o servidor. Verifique sua conexão."
          );
        } else {
          setServerError(err.message || "Não foi possível entrar agora.");
        }
      } else {
        setServerError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-shell-inner">
        <div className="auth-topbar">
          <Link href="/" className="auth-nav-home">
            <Icon.ChevLeft size={14} />
            Início
          </Link>
          <Link href="/cadastro" className="auth-tertiary-link">
            Não tem conta? <strong>Cadastre-se</strong>
          </Link>
        </div>

        <BrandLockup />

        <div className="auth-card">
          <div className="auth-eyebrow">Acessar conta</div>
          <h1 className="auth-title">
            Bem-vindo <em>de volta</em>
          </h1>
          <p className="auth-subtitle">
            Entre com seu e-mail e senha pra continuar onde parou.
          </p>

          {serverError && (
            <div className="auth-error" role="alert">
              <Icon.Sparkle size={14} />
              <span>{serverError}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <Icon.AtSign size={18} />
                </span>
                <input
                  className={cn("auth-input", emailError && "invalid")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  aria-label="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                />
              </div>
              {emailError && <div className="auth-field-error">{emailError}</div>}
            </div>

            <div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <Icon.Lock size={18} />
                </span>
                <input
                  className={cn("auth-input has-suffix", pwdError && "invalid")}
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Sua senha"
                  aria-label="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {pwdError && <div className="auth-field-error">{pwdError}</div>}
            </div>

            <div className="auth-row">
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="auth-checkbox-box">
                  {remember && <Icon.Check size={12} />}
                </span>
                <span className="auth-checkbox-text">Lembrar de mim</span>
              </label>
              <span className="auth-link" aria-disabled>
                Esqueci minha senha
              </span>
            </div>

            <button
              type="submit"
              className="auth-cta"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? (
                <>
                  <span className="auth-spinner" aria-hidden />
                  Entrando…
                </>
              ) : (
                <>Entrar</>
              )}
            </button>
          </form>

          <div className="auth-divider">ou</div>

          <Link href="/cadastro" className="auth-cta-ghost">
            Criar uma conta
          </Link>

          <div className="auth-footer-line">
            Não tem conta? <Link href="/cadastro">Cadastre-se</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

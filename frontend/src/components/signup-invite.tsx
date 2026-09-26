"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Icon } from "./icons";

// Convite para criar conta: pop-up para o visitante sem login, assim que ele
// entra no site. Quem fecha só vê de novo depois de DISMISS_DAYS; aparece
// no máximo uma vez por sessão. Não abre nas telas de login/cadastro, nas
// áreas logadas nem nos formulários de link (ficha, agenda).
const SHOW_AFTER_MS = 0;
const DISMISS_DAYS = 7;
const DISMISSED_KEY = "achadinhos.signupInvite.dismissedAt";
const SESSION_KEY = "achadinhos.signupInvite.shown";
const HIDDEN_PREFIXES = ["/login", "/cadastro", "/admin", "/minha-empresa", "/ficha", "/agendar"];

function recentlyDismissed(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return true;
    const at = Number(localStorage.getItem(DISMISSED_KEY) ?? 0);
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    // Storage bloqueado (modo privado): melhor não insistir.
    return true;
  }
}

export function SignupInvite() {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const hiddenHere = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (isLoading || isAuthenticated || hiddenHere || recentlyDismissed()) return;
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      setOpen(true);
    }, SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, [isLoading, isAuthenticated, hiddenHere]);

  // Logou/cadastrou ou foi para uma tela onde o convite não cabe: some.
  useEffect(() => {
    if (isAuthenticated || hiddenHere) setOpen(false);
  }, [isAuthenticated, hiddenHere]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="install-sheet-backdrop signup-invite-backdrop" onClick={dismiss} role="presentation">
      <div
        className="install-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-invite-title"
      >
        <button type="button" className="install-sheet-close" onClick={dismiss} aria-label="Fechar">
          <Icon.X size={16} />
        </button>

        <div className="install-sheet-icon">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mobile-logo-achadinhos-do-condominio.png?v=3"
            alt="Achadinhos do Condomínio"
            className="signup-invite-logo"
            width={760}
            height={176}
            decoding="async"
          />
        </div>

        <div className="install-sheet-title" id="signup-invite-title">
          Faça parte do Achadinhos
        </div>
        <div className="install-sheet-sub">
          Crie sua conta grátis em menos de 2 minutos.
        </div>

        <div className="install-sheet-benefits">
          <div className="install-sheet-benefit">
            <Icon.Check size={16} /> Salve empresas e afiliados nos favoritos
          </div>
          <div className="install-sheet-benefit">
            <Icon.Check size={16} /> Avalie os serviços contratados no seu condomínio
          </div>
          <div className="install-sheet-benefit">
            <Icon.Check size={16} /> Tem uma empresa? Cadastre grátis e apareça para os condomínios
          </div>
        </div>

        <Link href="/cadastro" className="auth-cta signup-invite-cta" onClick={() => setOpen(false)}>
          Criar conta grátis
        </Link>
        <div className="signup-invite-foot">
          Já tem conta?{" "}
          <Link href="/login" onClick={() => setOpen(false)}>
            Entrar
          </Link>
          <span aria-hidden> · </span>
          <button type="button" onClick={dismiss}>
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BrandLockup } from "@/components/auth/brand-lockup";
import { SindicoSignupScreen, type AccountKind } from "./sindico-signup-screen";

// Tela de escolha do cadastro (handoff desktop): dois cards — Morador/síndico
// (navy) e Empresa/afiliado (dourado). Escolher um card abre o formulário já
// no modo certo; o "voltar" do formulário retorna pra cá.
export function CadastroScreen() {
  const [kind, setKind] = useState<AccountKind | null>(null);

  if (kind) {
    return (
      <SindicoSignupScreen
        initialAccountType={kind}
        onBack={() => setKind(null)}
      />
    );
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
            <Link className="auth-tertiary-link" href="/login">
              Já tem conta? <strong>Entrar</strong>
            </Link>
          </div>
        </div>

        <BrandLockup />

        <div className="auth-card">
          <div className="auth-eyebrow">Criar conta</div>
          <h1 className="auth-title">
            Como você quer <em>entrar?</em>
          </h1>
          <p className="auth-subtitle">
            Escolha o tipo de conta para começar seu cadastro.
          </p>

          <div className="auth-choice-grid">
            <button
              type="button"
              className="auth-choice-card"
              onClick={() => setKind("pessoa")}
            >
              <span className="auth-choice-card-icon">
                <Icon.User size={26} />
              </span>
              <span className="auth-choice-card-title">Morador ou síndico</span>
              <span className="auth-choice-card-desc">
                Para encontrar e contratar serviços para o seu condomínio.
              </span>
              <span className="auth-choice-card-cta">
                Continuar <Icon.ChevRight size={16} />
              </span>
            </button>

            <button
              type="button"
              className="auth-choice-card gold"
              onClick={() => setKind("empresa")}
            >
              <span className="auth-choice-card-icon">
                <Icon.Building size={26} />
              </span>
              <span className="auth-choice-card-title">Empresa / afiliado</span>
              <span className="auth-choice-card-desc">
                Para oferecer serviços e produtos aos condomínios parceiros.
              </span>
              <span className="auth-choice-card-cta">
                Continuar <Icon.ChevRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BrandLockup } from "@/components/auth/brand-lockup";

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Escolha como deseja usar o Achadinhos: como síndico/morador ou como anunciante.",
};

export default function CadastroChooserPage() {
  return (
    <main className="auth-shell wide">
      <div className="auth-shell-inner">
        <div className="auth-topbar">
          <Link href="/" className="auth-nav-home">
            <Icon.ChevLeft size={14} />
            Início
          </Link>
          <Link className="auth-tertiary-link" href="/login">
            Já tem conta? <strong>Entrar</strong>
          </Link>
        </div>

        <BrandLockup />

        <div className="auth-card">
          <div className="auth-eyebrow">Criar conta</div>
          <h1 className="auth-title">
            Como você quer <em>começar</em>?
          </h1>
          <p className="auth-subtitle">
            Tem dois jeitos de usar o Achadinhos. Escolhe o que faz mais sentido
            pra você.
          </p>

          <div className="auth-choice-grid">
            <Link href="/cadastro/sindico" className="auth-choice-card">
              <div className="auth-choice-card-icon">
                <Icon.Building size={24} />
              </div>
              <div className="auth-choice-card-title">
                Sou síndico ou morador
              </div>
              <div className="auth-choice-card-desc">
                Encontre prestadores verificados e produtos pro seu condomínio.
                Peça orçamentos em 1 toque.
              </div>
              <div className="auth-choice-card-cta">
                Continuar <Icon.ChevRight size={14} />
              </div>
            </Link>

            <Link href="/cadastro/anunciante" className="auth-choice-card gold">
              <div className="auth-choice-card-icon">
                <Icon.Crown size={22} />
              </div>
              <div className="auth-choice-card-title">
                Quero anunciar meus serviços
              </div>
              <div className="auth-choice-card-desc">
                Cadastre seu negócio, mostre seu portfólio e receba pedidos de
                orçamento direto no WhatsApp.
              </div>
              <div className="auth-choice-card-cta">
                Continuar <Icon.ChevRight size={14} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

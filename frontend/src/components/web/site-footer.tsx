"use client";

import Link from "next/link";
import { Icon } from "../icons";

interface SiteFooterProps {
  /** Abre a tela do Shopping (overlay por estado na home). */
  onShopping?: () => void;
  /** Abre a tela de Destaques do dia. */
  onHighlights?: () => void;
  authed?: boolean;
}

// Rodapé institucional da home: marca + navegação real do app. Colunas no
// desktop, empilhado no mobile (com respiro pra bottom nav).
export function SiteFooter({ onShopping, onHighlights, authed }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <div className="site-footer-lockup">
              <span className="site-footer-tile" aria-hidden="true">A</span>
              <span className="site-footer-name">
                Achadinhos
                <span className="site-footer-name-sub">DO CONDOMÍNIO</span>
              </span>
            </div>
            <p className="site-footer-tagline">
              Serviços, afiliados e produtos de confiança para o seu
              condomínio — com empresas verificadas pela Certificação
              Achadinhos.
            </p>
          </div>

          <nav className="site-footer-col" aria-label="Explorar">
            <div className="site-footer-col-title">Explorar</div>
            {onHighlights && (
              <button type="button" className="site-footer-link" onClick={onHighlights}>
                Destaques do dia
              </button>
            )}
            {onShopping && (
              <button type="button" className="site-footer-link" onClick={onShopping}>
                Shopping do condomínio
              </button>
            )}
            <Link href="/eventos" className="site-footer-link">
              Eventos e assembleias
            </Link>
          </nav>

          <nav className="site-footer-col" aria-label="Certificação">
            <div className="site-footer-col-title">Certificação</div>
            <Link href="/certificacao" className="site-footer-link">
              Como funciona
            </Link>
            <Link href="/verificar" className="site-footer-link">
              Verificar certificado
            </Link>
          </nav>

          <nav className="site-footer-col" aria-label="Conta">
            <div className="site-footer-col-title">Conta</div>
            {authed ? (
              <Link href="/perfil" className="site-footer-link">
                Meu perfil
              </Link>
            ) : (
              <>
                <Link href="/login" className="site-footer-link">
                  Entrar
                </Link>
                <Link href="/cadastro" className="site-footer-link">
                  Criar conta
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="site-footer-bottom">
          <span>© {year} Achadinhos do Condomínio. Todos os direitos reservados.</span>
          <span className="site-footer-legal">
            <Link href="/privacidade" className="site-footer-link">
              Privacidade
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/termos" className="site-footer-link">
              Termos
            </Link>
          </span>
          <span className="site-footer-made">
            Feito para condomínios <Icon.Sparkle size={12} />
          </span>
        </div>
      </div>
    </footer>
  );
}

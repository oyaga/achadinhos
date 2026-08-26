"use client";

import Link from "next/link";
import { Icon } from "../icons";

// Perfis oficiais do Achadinhos do Condomínio. Centralizados aqui para o
// rodapé (e futuros pontos) usarem o mesmo conjunto: Instagram, Facebook e
// TikTok — padrão pedido pelo cliente.
export const SOCIAL_LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/achadinhosdocondominio",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/achadinhosdocondominio",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@achadinhosdocondominio",
  },
] as const;

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mobile-logo-achadinhos-do-condominio.png?v=3"
                alt="Achadinhos do Condomínio"
                className="site-footer-logo"
                width={760}
                height={176}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="site-footer-tagline">
              Serviços, afiliados e produtos de confiança para o seu
              condomínio — com empresas verificadas pela Certificação
              Achadinhos.
            </p>
            <div className="site-footer-social" aria-label="Redes sociais">
              {SOCIAL_LINKS.map((s) => {
                const I =
                  s.key === "instagram"
                    ? Icon.Instagram
                    : s.key === "facebook"
                      ? Icon.Facebook
                      : Icon.TikTok;
                return (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer-social-btn"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <I size={18} />
                  </a>
                );
              })}
            </div>
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
            <Link href="/blog" className="site-footer-link">
              Blog
            </Link>
          </nav>

          <nav className="site-footer-col" aria-label="Certificação">
            <div className="site-footer-col-title">Certificação</div>
            <Link href="/certificacao" className="site-footer-link">
              Como funciona
            </Link>
            <Link href="/planos" className="site-footer-link">
              Planos Blue, Top e Black
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

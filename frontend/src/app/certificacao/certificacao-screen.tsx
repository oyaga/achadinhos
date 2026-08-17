"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { BrandLockup } from "@/components/auth/brand-lockup";

const TIERS = [
  {
    key: "blue",
    name: "Blue",
    tagline: "Requisitos mínimos",
    desc: "Atende aos requisitos mínimos do Achadinhos do Condomínio.",
    crit: "Documento (CPF/CNPJ) válido, identidade e contato confirmados, perfil completo.",
  },
  {
    key: "ouro",
    name: "Top",
    tagline: "Requisitos padrão",
    desc: "Atende aos requisitos padrão do Achadinhos do Condomínio.",
    crit: "Tudo do nível Blue + portfólio comprovado, boas avaliações de clientes, tempo de atuação e histórico sem pendências.",
  },
  {
    key: "black",
    name: "Black",
    tagline: "Avaliação rigorosa",
    desc: "Aprovado em avaliação rigorosa, conduzida diretamente pela equipe especializada do Achadinhos.",
    crit: "Tudo do nível Top + auditoria aprofundada e referências verificadas pela equipe especializada Achadinhos; excelência comprovada.",
  },
] as const;

const STEPS = [
  { t: "Cadastro e documentos", d: "O titular se cadastra e envia os documentos exigidos." },
  { t: "Verificação", d: "Conferimos a identidade e a situação do CNPJ ou CPF." },
  { t: "Análise", d: "Avaliamos o portfólio, a reputação e o histórico." },
  { t: "Definição do nível", d: "Atribuímos o selo: Blue, Top ou Black." },
  { t: "Certificado", d: "Emitimos o certificado oficial, verificável por QR code." },
] as const;

const TYPES = [
  {
    icon: "Building" as const,
    title: "Empresa",
    desc: "Empresas com CNPJ ativo que fornecem produtos e serviços para condomínios.",
  },
  {
    icon: "User" as const,
    title: "Afiliado",
    desc: "Prestadores de serviço como zeladores e síndicos, que atuam como MEI ou microempresa.",
  },
] as const;

// Selo circular desenhável (anime.js anima os traços .cert-draw).
function Seal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`cert-seal-svg ${className}`} aria-hidden>
      <circle className="cert-draw" cx="60" cy="60" r="54" fill="none" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="45" fill="none" strokeWidth="1" opacity="0.45" />
      <path
        className="cert-draw cert-shield"
        d="M60 26 L82 34 L82 58 C82 74 72 84 60 90 C48 84 38 74 38 58 L38 34 Z"
        fill="none"
        strokeWidth="2.5"
      />
      <path
        className="cert-draw cert-check"
        d="M50 59 l7 7 l15 -17"
        fill="none"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CertificacaoScreen() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Esconde os elementos a serem revelados ANTES do import (síncrono). Se o
    // import falhar, removemos a classe e o conteúdo reaparece — nunca fica
    // preso invisível.
    root.classList.add("cert-anim");
    let cancelled = false;

    (async () => {
      try {
        const { animate, stagger, svg, onScroll, utils } = await import("animejs");
        if (cancelled) {
          root.classList.remove("cert-anim");
          return;
        }

        // Desenho dos traços do certificado/selos.
        try {
          const drawables = svg.createDrawable(".cert-draw");
          utils.set(drawables, { draw: "0 0" });
          animate(drawables, {
            draw: ["0 0", "0 1"],
            duration: 1300,
            delay: stagger(90),
            ease: "inOutQuad",
            autoplay: onScroll({ target: root, enter: "bottom-=60 top" }),
          });
        } catch {
          // Se o desenho falhar, garante traços visíveis.
          utils.set(".cert-draw", { draw: "0 1" });
        }

        // Revela cada bloco ao entrar na viewport.
        const reveals = utils.$("[data-reveal]");
        reveals.forEach((el, i) => {
          animate(el, {
            opacity: [0, 1],
            translateY: [22, 0],
            duration: 650,
            delay: (i % 4) * 70,
            ease: "out(3)",
            autoplay: onScroll({ target: el, enter: "bottom-=40 top" }),
          });
        });
      } catch {
        root.classList.remove("cert-anim");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="cert-page" ref={rootRef}>
      {/* Topbar */}
      <div className="cert-topbar">
        <Link href="/" className="auth-nav-home">
          <Icon.ChevLeft size={14} />
          Início
        </Link>
        <Link href="/verificar" className="auth-tertiary-link">
          Verificar um <strong>certificado</strong>
        </Link>
      </div>

      <div className="cert-container">
        <BrandLockup />

        {/* Hero */}
        <section className="cert-hero">
          <div className="cert-hero-text" data-reveal>
            <span className="cert-eyebrow">Selo de confiança</span>
            <h1 className="cert-title">
              Certificação <em>Achadinhos</em>
            </h1>
            <p className="cert-lead">
              Avaliamos cada empresa e afiliado da plataforma e emitimos um certificado
              oficial — para você contratar com segurança, sabendo que o profissional foi
              verificado e aprovado.
            </p>
            <div className="cert-hero-cta">
              <Link href="/verificar" className="cert-btn">
                <Icon.QrCode size={16} /> Verificar certificado
              </Link>
              <a href="#niveis" className="cert-btn ghost">
                Ver os níveis
              </a>
            </div>
          </div>
          <div className="cert-hero-art" data-reveal>
            <Seal className="cert-hero-seal ouro" />
          </div>
        </section>

        {/* Níveis */}
        <section className="cert-section" id="niveis">
          <h2 className="cert-h2" data-reveal>
            Os três níveis
          </h2>
          <p className="cert-sub" data-reveal>
            Quanto mais alto o nível, mais rigorosa foi a avaliação.
          </p>
          <div className="cert-tier-grid">
            {TIERS.map((t) => (
              <div className={`cert-tier-card ${t.key}`} key={t.key} data-reveal>
                <Seal className={`cert-tier-seal ${t.key}`} />
                <span className={`cert-seal ${t.key} lg`}>{t.name}</span>
                <div className="cert-tier-tagline">{t.tagline}</div>
                <p className="cert-tier-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Como avaliamos */}
        <section className="cert-section">
          <h2 className="cert-h2" data-reveal>
            Como avaliamos
          </h2>
          <p className="cert-sub" data-reveal>
            Um processo claro, do cadastro ao certificado.
          </p>
          <ol className="cert-steps">
            {STEPS.map((s, i) => (
              <li className="cert-step" key={s.t} data-reveal>
                <span className="cert-step-num">{i + 1}</span>
                <div>
                  <div className="cert-step-title">{s.t}</div>
                  <div className="cert-step-desc">{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Critérios por nível */}
        <section className="cert-section">
          <h2 className="cert-h2" data-reveal>
            Critérios de cada nível
          </h2>
          <div className="cert-crit-list">
            {TIERS.map((t) => (
              <div className={`cert-crit ${t.key}`} key={t.key} data-reveal>
                <span className={`cert-seal ${t.key}`}>{t.name}</span>
                <p>{t.crit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tipos */}
        <section className="cert-section">
          <h2 className="cert-h2" data-reveal>
            Quem pode ser certificado
          </h2>
          <div className="cert-types">
            {TYPES.map((ty) => {
              const I = Icon[ty.icon];
              return (
                <div className="cert-type-card" key={ty.title} data-reveal>
                  <div className="cert-type-icon">
                    <I size={22} />
                  </div>
                  <div className="cert-type-title">{ty.title}</div>
                  <p className="cert-type-desc">{ty.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA verificação */}
        <section className="cert-verify-cta" data-reveal>
          <div className="cert-verify-icon">
            <Icon.QrCode size={28} />
          </div>
          <h2 className="cert-h2">Confira a autenticidade</h2>
          <p className="cert-sub">
            Todo certificado tem um QR code e um código único. Escaneie ou abra a página de
            verificação para confirmar que ele é válido.
          </p>
          <Link href="/verificar" className="cert-btn">
            <Icon.QrCode size={16} /> Verificar um certificado
          </Link>
        </section>

        <div className="cert-foot" data-reveal>
          <Link href="/" className="auth-tertiary-link">
            Voltar para o <strong>Achadinhos do Condomínio</strong>
          </Link>
        </div>
      </div>
    </main>
  );
}

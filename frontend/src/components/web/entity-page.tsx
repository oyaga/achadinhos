"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";
import { TopNav } from "./top-nav";
import { SiteFooter } from "./site-footer";

export interface Crumb {
  label: string;
  href?: string;
}

// Casca das páginas de entidade no desktop (/empresa/[id], /produto/[id]):
// top-nav, breadcrumb, container de 1280px e rodapé institucional. Fica
// escondida <768px (CSS .entity-desktop) — no mobile as rotas montam o
// overlay antigo.
export function EntityPageShell({
  crumbs,
  children,
}: {
  crumbs: Crumb[];
  children: ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  return (
    <div className="entity-desktop">
      <TopNav
        onSearchClick={() => router.push("/")}
        onProfile={() => router.push("/perfil")}
      />
      <nav className="entity-crumbs" aria-label="Você está em">
        <div className="entity-crumbs-inner">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <span key={`${c.label}-${i}`} className="entity-crumb">
                {i > 0 && (
                  <span className="entity-crumb-sep" aria-hidden>
                    <Icon.ChevRight size={12} />
                  </span>
                )}
                {last || !c.href ? (
                  <span className={cn(last && "entity-crumb-current")} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href}>{c.label}</Link>
                )}
              </span>
            );
          })}
        </div>
      </nav>
      <div className="entity-container">{children}</div>
      <SiteFooter
        authed={isAuthenticated}
        onShopping={() => router.push("/")}
        onHighlights={() => router.push("/")}
      />
    </div>
  );
}

export function SectionHead({
  title,
  aside,
}: {
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="entity-section-head">
      <h2>{title}</h2>
      <span className="entity-section-rule" aria-hidden />
      {aside != null && <span className="entity-section-aside">{aside}</span>}
    </div>
  );
}

// Fileira de 5 estrelas. `value` arredondado preenche; sem valor fica só o
// contorno (estado "sem avaliações").
export function Stars({
  value,
  size = 13,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const filledCount = Math.round(value);
  return (
    <span className={cn("entity-stars", filledCount === 0 && "empty", className)} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon.Star key={i} size={size} filled={i <= filledCount} />
      ))}
    </span>
  );
}

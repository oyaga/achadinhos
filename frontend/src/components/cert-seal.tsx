"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { cn, tierLabel } from "@/lib/utils";

interface CertSealProps {
  tier?: string | null;
  // Quando true (padrão) o selo é um link para /certificacao. Dentro de cards
  // clicáveis o clique não propaga (não dispara o onClick do card).
  linked?: boolean;
  size?: "lg";
  prefix?: string;
  className?: string;
  style?: CSSProperties;
}

// Selo de nível do certificado (Verificado/Blue/Black). Renderiza nada quando não há
// nível. Centraliza rótulo + classes e leva o usuário à página de certificação.
export function CertSeal({ tier, linked = true, size, prefix, className, style }: CertSealProps) {
  const label = tierLabel(tier);
  if (!label) return null;
  const cls = cn("cert-seal", tier, size === "lg" && "lg", className);
  const text = `${prefix ?? ""}${label}`;
  if (!linked) {
    return (
      <span className={cls} style={style}>
        {text}
      </span>
    );
  }
  return (
    <Link
      href="/certificacao"
      className={cls}
      style={style}
      onClick={(e) => e.stopPropagation()}
      aria-label={`Nível ${label} — saber mais sobre a certificação Achadinhos`}
    >
      {text}
    </Link>
  );
}

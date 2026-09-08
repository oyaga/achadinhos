"use client";

import { useAuth } from "@/contexts/auth-context";
import { Icon } from "../icons";

interface HeaderProps {
  onSearchClick: () => void;
}

function firstName(name: string | undefined | null): string {
  if (!name) return "síndico";
  const trimmed = name.trim();
  if (!trimmed) return "síndico";
  return trimmed.split(/\s+/)[0];
}

export function Header({ onSearchClick }: HeaderProps) {
  const { user } = useAuth();
  const greetingTarget = firstName(user?.name);

  return (
    <header className="header home-mobile-header">
      <div className="header-top">
        <img
          src="/mobile-logo-achadinhos-do-condominio.png?v=3"
          alt="Achadinhos do Condomínio"
          className="brand-logo"
          width={760}
          height={176}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="greeting">
        <div className="greeting-hi">
          <Icon.Sparkle size={12} /> Boa tarde, {greetingTarget}
        </div>
        <div className="greeting-q">
          Encontre. Compare.
          <br />
          Escolha <em>com segurança</em>.
        </div>
      </div>

      <div className="search-wrap">
        <button
          type="button"
          className="search"
          onClick={onSearchClick}
          aria-label="Abrir busca"
        >
          <Icon.Search size={18} />
          <span className="search-ph">Buscar serviços, afiliados…</span>
          <Icon.Filter size={16} />
        </button>
      </div>
    </header>
  );
}

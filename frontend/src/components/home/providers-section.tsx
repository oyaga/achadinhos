"use client";

import { useEffect, useRef, useState } from "react";
import type { Provider } from "@/lib/types";
import { getImageUrl, type AdminSeller } from "@/lib/api";
import { badgeLabel, cn } from "@/lib/utils";
import { Icon } from "../icons";
import { CertSeal } from "../cert-seal";
import { CompanyCard } from "./featured-companies";
import { FILTERS, type FilterId } from "../web/category-sidebar";

interface ProvidersSectionProps {
  providers: Provider[];
  isFav: (id: number | string) => boolean;
  onToggleFav: (id: string) => void;
  onProvider: (p: Provider) => void;
  onQuote?: (p: Provider) => void;
  sellers?: AdminSeller[];
  onSeller?: (s: AdminSeller) => void;
  onToggleSellerFav?: (id: string) => void;
  title?: string;
  showSeeAll?: boolean;
  /** Quando presentes, o botão "Filtrar" abre um popover funcional com os
      mesmos filtros da sidebar desktop. */
  filters?: Set<FilterId>;
  onToggleFilter?: (id: FilterId) => void;
  /** Chips exibidos no popover (default: todos). */
  filterOptions?: typeof FILTERS;
}

export function ProvidersSection({
  providers,
  isFav,
  onToggleFav,
  onProvider,
  onQuote,
  sellers = [],
  onSeller,
  onToggleSellerFav,
  title = "Recomendados pra você",
  showSeeAll = true,
  filters,
  onToggleFilter,
  filterOptions = FILTERS,
}: ProvidersSectionProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const empty = providers.length === 0 && sellers.length === 0;
  const filterable = !!filters && !!onToggleFilter;

  // Fecha o popover ao clicar/tocar fora dele ou apertar Esc.
  useEffect(() => {
    if (!filterOpen) return;
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFilterOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [filterOpen]);

  return (
    <div className="section">
      <div className="section-title">
        <h2>{title}</h2>
        {showSeeAll && (
          <div className="filter-menu-wrap" ref={menuRef}>
            <button
              type="button"
              className="see-all"
              onClick={filterable ? () => setFilterOpen((o) => !o) : undefined}
              aria-expanded={filterOpen}
            >
              Filtrar{filters && filters.size > 0 ? ` (${filters.size})` : ""}{" "}
              <Icon.Filter size={12} />
            </button>
            {filterable && filterOpen && (
              <div className="filter-pop">
                {filterOptions.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={cn("side-chip", filters!.has(f.id) && "active")}
                    onClick={() => onToggleFilter!(f.id)}
                    aria-pressed={filters!.has(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="providers">
        {providers.map((p, i) => (
          <ProviderCard
            key={p.id}
            provider={p}
            index={i}
            isFav={isFav(p.id)}
            onClick={() => onProvider(p)}
            onToggleFav={() => onToggleFav(p.id)}
            onQuote={onQuote ? () => onQuote(p) : undefined}
          />
        ))}
        {sellers.map((s) => (
          <CompanyCard
            key={s.id}
            company={s}
            onClick={() => onSeller?.(s)}
            isFav={isFav(s.id)}
            onToggleFav={() => onToggleSellerFav?.(s.id)}
          />
        ))}
        {empty && (
          <div
            style={{
              textAlign: "center",
              padding: "30px 0",
              color: "var(--ink-500)",
              fontSize: 13,
            }}
          >
            Nada por aqui ainda.
          </div>
        )}
      </div>
    </div>
  );
}

interface ProviderCardProps {
  provider: Provider;
  index: number;
  isFav: boolean;
  onClick: () => void;
  onToggleFav: () => void;
  onQuote?: () => void;
  showCatLabel?: boolean;
  trailing?: string;
}

export function ProviderCard({
  provider,
  index,
  isFav,
  onClick,
  onToggleFav,
  onQuote,
  showCatLabel = true,
  trailing,
}: ProviderCardProps) {
  return (
    <div
      className={cn("provider fade-up", onQuote && "provider--cta")}
      onClick={onClick}
      style={{ animationDelay: `${200 + index * 40}ms` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={cn("provider-avatar", provider.verified && "verified")}>
        {provider.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImageUrl(provider.logoUrl)}
            alt={provider.name}
            className="provider-avatar-img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          provider.avatar
        )}
      </div>
      <div className="provider-info">
        <div className="provider-name">
          {provider.name}
          <CertSeal tier={provider.certTier} />
          {provider.badge && (
            <span className="provider-badge">{badgeLabel(provider.badge)}</span>
          )}
        </div>
        {showCatLabel && (
          <div className="provider-cat">{provider.catLabel}</div>
        )}
        <div className="provider-meta">
          <div className="provider-rating">
            <Icon.Star size={11} /> {provider.rating.toFixed(1).replace(".", ",")}
          </div>
          <span style={{ color: "var(--ink-300)" }}>·</span>
          <span>{trailing ?? `${provider.reviews} avaliações`}</span>
        </div>
      </div>
      <button
        type="button"
        className={cn("provider-fav", isFav && "active")}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav();
        }}
        aria-label="Favoritar"
      >
        <Icon.Heart size={18} filled={isFav} />
      </button>
      {onQuote && (
        <button
          type="button"
          className="provider-quote"
          onClick={(e) => {
            e.stopPropagation();
            onQuote();
          }}
        >
          <Icon.Whatsapp size={15} /> Pedir orçamento
        </button>
      )}
    </div>
  );
}

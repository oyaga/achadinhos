"use client";

import type { Provider } from "@/lib/types";
import { getImageUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";

interface ProvidersSectionProps {
  providers: Provider[];
  isFav: (id: number | string) => boolean;
  onToggleFav: (id: string) => void;
  onProvider: (p: Provider) => void;
  title?: string;
  showSeeAll?: boolean;
}

export function ProvidersSection({
  providers,
  isFav,
  onToggleFav,
  onProvider,
  title = "Recomendados pra você",
  showSeeAll = true,
}: ProvidersSectionProps) {
  return (
    <div className="section">
      <div className="section-title">
        <h2>{title}</h2>
        {showSeeAll && (
          <button type="button" className="see-all">
            Filtrar <Icon.Filter size={12} />
          </button>
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
          />
        ))}
        {providers.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "30px 0",
              color: "var(--ink-500)",
              fontSize: 13,
            }}
          >
            Nenhum prestador encontrado.
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
  showCatLabel?: boolean;
  trailing?: string;
}

export function ProviderCard({
  provider,
  index,
  isFav,
  onClick,
  onToggleFav,
  showCatLabel = true,
  trailing,
}: ProviderCardProps) {
  return (
    <div
      className="provider fade-up"
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
          />
        ) : (
          provider.avatar
        )}
      </div>
      <div className="provider-info">
        <div className="provider-name">
          {provider.name}
          {provider.badge && (
            <span className="provider-badge">{provider.badge}</span>
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
    </div>
  );
}

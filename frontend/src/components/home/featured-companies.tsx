"use client";

import { useEffect, useState } from "react";
import { sellersApi, getImageUrl, type AdminSeller } from "@/lib/api";
import { cn, tierLabel } from "@/lib/utils";
import { Icon } from "../icons";

interface FeaturedCompaniesProps {
  onSeller: (s: AdminSeller) => void;
  isFav: (id: number | string) => boolean;
  onToggleFav: (id: string) => void;
}

// FeaturedCompanies renders the home "Empresas em destaque" strip — the
// empresas (sellers) flagged with highlight=true in the admin panel. Renders
// nothing when there are none.
export function FeaturedCompanies({ onSeller, isFav, onToggleFav }: FeaturedCompaniesProps) {
  const [companies, setCompanies] = useState<AdminSeller[]>([]);

  useEffect(() => {
    void sellersApi
      .list({ highlight: true })
      .then(setCompanies)
      .catch(() => {});
  }, []);

  if (companies.length === 0) return null;

  return (
    <div className="section">
      <div className="section-title">
        <h2>Empresas em destaque</h2>
      </div>
      <div className="providers">
        {companies.map((c) => (
          <CompanyCard
            key={c.id}
            company={c}
            onClick={() => onSeller(c)}
            isFav={isFav(c.id)}
            onToggleFav={() => onToggleFav(c.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface CompanyCardProps {
  company: AdminSeller;
  onClick: () => void;
  isFav: boolean;
  onToggleFav: () => void;
}

// CompanyCard is the list-row card for an empresa, reused on the home destaque
// strip, the category screen and the favorites screen.
export function CompanyCard({ company: c, onClick, isFav, onToggleFav }: CompanyCardProps) {
  return (
    <div
      className="provider"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="provider-avatar">
        {c.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImageUrl(c.logo_url)}
            alt={c.name}
            className="provider-avatar-img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          c.name.charAt(0).toUpperCase()
        )}
      </div>
      <div className="provider-info">
        <div className="provider-name">
          {c.name}
          {c.cert_tier && (
            <span className={cn("cert-seal", c.cert_tier)}>{tierLabel(c.cert_tier)}</span>
          )}
          {c.partner && <span className="provider-badge">Parceira</span>}
        </div>
        <div
          className="provider-cat"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {c.description?.trim() || "Empresa"}
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

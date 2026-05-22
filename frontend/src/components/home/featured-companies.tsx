"use client";

import { useEffect, useState } from "react";
import { sellersApi, getImageUrl, type AdminSeller } from "@/lib/api";
import { Icon } from "../icons";

interface FeaturedCompaniesProps {
  onSeller: (s: AdminSeller) => void;
}

// FeaturedCompanies renders the home "Empresas em destaque" strip — the
// empresas (sellers) flagged with highlight=true in the admin panel. Renders
// nothing when there are none.
export function FeaturedCompanies({ onSeller }: FeaturedCompaniesProps) {
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
          <CompanyCard key={c.id} company={c} onClick={() => onSeller(c)} />
        ))}
      </div>
    </div>
  );
}

interface CompanyCardProps {
  company: AdminSeller;
  onClick: () => void;
}

// CompanyCard is the list-row card for an empresa, reused on the home destaque
// strip and in the category screen.
export function CompanyCard({ company: c, onClick }: CompanyCardProps) {
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
          />
        ) : (
          c.name.charAt(0).toUpperCase()
        )}
      </div>
      <div className="provider-info">
        <div className="provider-name">
          {c.name}
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
        className="provider-fav"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label={`Ver ${c.name}`}
      >
        <Icon.ChevRight size={18} />
      </button>
    </div>
  );
}

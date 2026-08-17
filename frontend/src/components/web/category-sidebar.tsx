"use client";

import { useEffect, useState } from "react";
import { categoriesApi, type ApiCategory } from "@/lib/api";
import type { CategoryId } from "@/lib/types";
import { cn, isPublicCategory } from "@/lib/utils";

export type FilterId = "verified" | "rating45" | "now" | "homologado";

// Exportado também para o popover "Filtrar" da seção Recomendados (mobile).
export const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "verified", label: "Verificado" },
  { id: "rating45", label: "Nota 4,5+" },
  { id: "now", label: "Atende agora" },
  { id: "homologado", label: "Homologado" },
];

interface CategorySidebarProps {
  activeCat: CategoryId;
  onSelectCat: (id: CategoryId) => void;
  filters: Set<FilterId>;
  onToggleFilter: (id: FilterId) => void;
}

// Desktop-only left rail (handoff M1): "Explorar" (navegação por categoria) +
// "Filtros" (chips que refiltram a lista de prestadores). Escondido < 768px.
export function CategorySidebar({
  activeCat,
  onSelectCat,
  filters,
  onToggleFilter,
}: CategorySidebarProps) {
  const [cats, setCats] = useState<ApiCategory[]>([]);

  useEffect(() => {
    void categoriesApi
      .list()
      .then((cats) => setCats(cats.filter(isPublicCategory)))
      .catch(() => {});
  }, []);

  // O backend também lista "destaque" como categoria; filtramos para não
  // duplicar o item fixo do topo.
  const items: Array<{ id: string; label: string; count?: number }> = [
    { id: "destaque", label: "Destaque do dia" },
    ...cats
      .filter((c) => c.id !== "destaque")
      .map((c) => ({ id: c.id, label: c.label, count: c.count })),
  ];

  return (
    <div className="side-cards">
      <div className="side-card">
        <div className="side-eyebrow">Explorar</div>
        <nav className="side-nav">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              className={cn("side-nav-item", activeCat === it.id && "active")}
              onClick={() => onSelectCat(it.id as CategoryId)}
            >
              <span className="side-nav-label">{it.label}</span>
              {typeof it.count === "number" && it.count > 0 && (
                <span className="side-nav-count">{it.count}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="side-card">
        <div className="side-eyebrow">Filtros</div>
        <div className="side-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={cn("side-chip", filters.has(f.id) && "active")}
              onClick={() => onToggleFilter(f.id)}
              aria-pressed={filters.has(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

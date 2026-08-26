"use client";

import { useMemo, useState, useEffect } from "react";
import { providersApi, categoriesApi, sellersApi, type AdminSeller } from "@/lib/api";
import { adaptProvider } from "@/lib/adapters";
import type { CategoryId, Provider } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";
import { ProviderCard } from "../home/providers-section";
import { CompanyCard } from "../home/featured-companies";

interface CategoryScreenProps {
  categoryId: CategoryId;
  isFav: (id: number | string) => boolean;
  onBack: () => void;
  onProvider: (p: Provider) => void;
  onSeller: (s: AdminSeller) => void;
  onToggleFav: (id: string) => void;
  onToggleSellerFav: (id: string) => void;
  onQuote?: (p: Provider) => void;
}

type FilterId = "all" | "verified" | "gold" | "near" | "cheap";
type SortId = "relevance" | "rating" | "distance";

const FILTERS: Array<{ id: FilterId; label: string; icon?: keyof typeof Icon }> =
  [
    { id: "all", label: "Todos" },
    { id: "verified", label: "Verificados", icon: "Check" },
    { id: "gold", label: "Top", icon: "Crown" },
    { id: "near", label: "Mais próximos", icon: "Pin" },
    { id: "cheap", label: "Mais baratos" },
  ];

function parseKm(distance: string): number {
  return parseFloat(distance.replace(",", "."));
}

export function CategoryScreen({
  categoryId,
  isFav,
  onBack,
  onProvider,
  onSeller,
  onToggleFav,
  onToggleSellerFav,
  onQuote,
}: CategoryScreenProps) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [sort, setSort] = useState<SortId>("relevance");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [sellers, setSellers] = useState<AdminSeller[]>([]);
  const [catLabel, setCatLabel] = useState<string>(categoryId);
  const [catDesc, setCatDesc] = useState<string | undefined>(undefined);
  const [catIcon, setCatIcon] = useState<string>("CatHighlight");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void providersApi.list({ category: categoryId }).then((res) => {
      setProviders(res.data.map(adaptProvider));
    }).catch(() => {}).finally(() => setLoading(false));
  }, [categoryId]);

  useEffect(() => {
    void sellersApi.list({ category: categoryId }).then(setSellers).catch(() => {});
  }, [categoryId]);

  useEffect(() => {
    void categoriesApi.list().then((cats) => {
      const cat = cats.find((c) => c.id === categoryId);
      if (cat) {
        setCatLabel(cat.label);
        setCatDesc(cat.desc);
        setCatIcon(cat.icon);
      }
    }).catch(() => {});
  }, [categoryId]);

  const filtered = useMemo(() => {
    let list = [...providers];
    if (filter === "verified") list = list.filter((p) => p.verified);
    if (filter === "gold")
      list = list.filter((p) => p.badge === "Ouro" || p.certTier === "ouro");
    if (filter === "near")
      list = list.sort((a, b) => parseKm(a.distance) - parseKm(b.distance));
    if (filter === "cheap")
      list = list.sort((a, b) => a.price.length - b.price.length);

    if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);
    if (sort === "distance")
      list = list.sort((a, b) => parseKm(a.distance) - parseKm(b.distance));
    return list;
  }, [providers, filter, sort]);

  // Empresas passam pelos mesmos chips: "Verificados" = tem certificado,
  // "Top" = certificado nível ouro. "Mais próximos"/"Mais baratos" e a
  // ordenação por distância não se aplicam (empresa não tem distância/preço),
  // então nesses casos a lista de empresas fica como está.
  const filteredSellers = useMemo(() => {
    let list = [...sellers];
    if (filter === "verified") list = list.filter((s) => !!s.cert_tier);
    if (filter === "gold") list = list.filter((s) => s.cert_tier === "ouro");
    if (sort === "rating") list = list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [sellers, filter, sort]);

  // Estatísticas reais do cabeçalho (antes eram valores fixos do protótipo).
  const totalCount = providers.length + sellers.length;
  const ratings = [
    ...providers.map((p) => p.rating),
    ...sellers.map((s) => s.rating ?? 0),
  ].filter((r) => r > 0);
  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1).replace(".", ",")
      : null;
  const nearestKm = providers
    .map((p) => parseKm(p.distance || ""))
    .filter((km) => Number.isFinite(km))
    .reduce<number | null>((min, km) => (min === null || km < min ? km : min), null);

  const iconKey = catIcon as keyof typeof Icon;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconCmp = Icon[iconKey] as ((props: { size?: number }) => any) | undefined;

  return (
    <div className="screen category-screen">
      <div className="screen-header gold-tint">
        <button
          type="button"
          className="screen-back"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">{catLabel}</div>
        <div className="screen-actions">
          <button type="button" className="icon-btn" aria-label="Buscar">
            <Icon.Search size={16} />
          </button>
        </div>
      </div>

      <div className="screen-body">
        <div className="cat-hero">
          <div className="cat-hero-icon">
            {IconCmp ? <IconCmp /> : null}
          </div>
          <h1>{catLabel}</h1>
          <p>{catDesc ?? "Encontre os melhores afiliados desta categoria"}</p>
          <div className="cat-stats">
            {/* Conta empresas + afiliados — mesmo total do contador da sidebar. */}
            <div className="cat-stat">
              <strong>{totalCount}</strong> {totalCount === 1 ? "negócio" : "negócios"}
            </div>
            {avgRating && (
              <div className="cat-stat">
                ⭐ <strong>{avgRating}</strong> média
              </div>
            )}
            {nearestKm !== null && (
              <div className="cat-stat">
                📍 <strong>{nearestKm.toFixed(1).replace(".", ",")}</strong>km mais próximo
              </div>
            )}
          </div>
        </div>

        <div className="filter-bar">
          {FILTERS.map((f) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const I = f.icon ? Icon[f.icon] as ((props: { size?: number }) => any) | undefined : null;
            return (
              <button
                type="button"
                key={f.id}
                className={cn("filter-chip", filter === f.id && "active")}
                onClick={() => setFilter(f.id)}
              >
                {I && <I size={11} />}
                {f.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 12, color: "var(--ink-500)" }}>
            <strong style={{ color: "var(--navy-900)" }}>
              {filtered.length + filteredSellers.length}
            </strong>{" "}
            resultados
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--navy-900)",
              cursor: "pointer",
            }}
          >
            <option value="relevance">Relevância</option>
            <option value="rating">Melhor avaliação</option>
            <option value="distance">Mais próximo</option>
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 32, color: "var(--ink-500)", fontSize: 13 }}>
            Carregando…
          </div>
        ) : (
          <div className="providers">
            {filteredSellers.map((s) => (
              <CompanyCard
                key={s.id}
                company={s}
                onClick={() => onSeller(s)}
                isFav={isFav(s.id)}
                onToggleFav={() => onToggleSellerFav(s.id)}
              />
            ))}
            {filtered.map((p, i) => (
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
            {filtered.length === 0 && filteredSellers.length === 0 && (
              <div className="empty-state">
                <Icon.Search size={42} />
                <div className="empty-state-title">
                  {totalCount > 0 ? "Nenhum resultado com esse filtro" : "Nada nesta categoria"}
                </div>
                <div className="empty-state-sub">
                  {totalCount > 0 ? "Tente outro filtro" : "Tente outra categoria"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

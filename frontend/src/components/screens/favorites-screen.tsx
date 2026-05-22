"use client";

import { useEffect, useState } from "react";
import { favoritesApi, providersApi, sellersApi, type AdminSeller } from "@/lib/api";
import { adaptProvider } from "@/lib/adapters";
import { useAuth } from "@/contexts/auth-context";
import type { Provider } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";
import { ProviderCard } from "../home/providers-section";
import { CompanyCard } from "../home/featured-companies";

interface FavoritesScreenProps {
  isFav: (id: number | string) => boolean;
  onBack: () => void;
  onProvider: (p: Provider) => void;
  onSeller: (s: AdminSeller) => void;
  onToggleFav: (id: string) => void;
  onToggleSellerFav: (id: string) => void;
}

type Tab = "prestadores" | "empresas";
const TABS: Array<{ id: Tab; label: string }> = [
  { id: "prestadores", label: "Prestadores" },
  { id: "empresas", label: "Empresas" },
];

export function FavoritesScreen({
  isFav,
  onBack,
  onProvider,
  onSeller,
  onToggleFav,
  onToggleSellerFav,
}: FavoritesScreenProps) {
  const { isAuthenticated } = useAuth();
  const [tab, setTab] = useState<Tab>("prestadores");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [sellers, setSellers] = useState<AdminSeller[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    void (async () => {
      try {
        const [provFavs, sellerFavs] = await Promise.all([
          favoritesApi.list("provider"),
          favoritesApi.list("seller"),
        ]);
        if (provFavs.length > 0) {
          const favIds = new Set(provFavs.map((f) => f.target_id));
          const allRes = await providersApi.list({ limit: 100 });
          setProviders(
            allRes.data.filter((p) => favIds.has(p.id)).map(adaptProvider)
          );
        } else {
          setProviders([]);
        }
        if (sellerFavs.length > 0) {
          const favIds = new Set(sellerFavs.map((f) => f.target_id));
          const allSellers = await sellersApi.list();
          setSellers(allSellers.filter((s) => favIds.has(s.id)));
        } else {
          setSellers([]);
        }
      } catch {
        setProviders([]);
        setSellers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated]);

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button
          type="button"
          className="screen-back"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Favoritos</div>
      </div>
      <div className="screen-body">
        <div className="tabs">
          {TABS.map((t) => (
            <button
              type="button"
              key={t.id}
              className={cn("tab", tab === t.id && "active")}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {!isAuthenticated ? (
          <div className="empty-state">
            <Icon.Heart size={50} />
            <div className="empty-state-title">
              Faça login para ver seus favoritos
            </div>
            <div className="empty-state-sub">
              Entre na sua conta para salvar prestadores e empresas
            </div>
          </div>
        ) : loading ? (
          <div
            style={{
              textAlign: "center",
              padding: 32,
              color: "var(--ink-500)",
              fontSize: 13,
            }}
          >
            Carregando…
          </div>
        ) : tab === "prestadores" ? (
          providers.length === 0 ? (
            <div className="empty-state">
              <Icon.Heart size={50} />
              <div className="empty-state-title">Nenhum prestador favorito</div>
              <div className="empty-state-sub">
                Toque no ❤️ pra salvar prestadores
              </div>
            </div>
          ) : (
            <div className="providers">
              {providers.map((p, i) => (
                <ProviderCard
                  key={p.id}
                  provider={p}
                  index={i}
                  isFav={isFav(p.id)}
                  onClick={() => onProvider(p)}
                  onToggleFav={() => onToggleFav(p.id)}
                  trailing={p.distance}
                />
              ))}
            </div>
          )
        ) : sellers.length === 0 ? (
          <div className="empty-state">
            <Icon.Heart size={50} />
            <div className="empty-state-title">Nenhuma empresa favorita</div>
            <div className="empty-state-sub">
              Toque no ❤️ pra salvar empresas
            </div>
          </div>
        ) : (
          <div className="providers">
            {sellers.map((s) => (
              <CompanyCard
                key={s.id}
                company={s}
                onClick={() => onSeller(s)}
                isFav={isFav(s.id)}
                onToggleFav={() => onToggleSellerFav(s.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

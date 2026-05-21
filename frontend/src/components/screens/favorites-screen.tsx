"use client";

import { useEffect, useState } from "react";
import { favoritesApi, providersApi } from "@/lib/api";
import { adaptProvider } from "@/lib/adapters";
import { useAuth } from "@/contexts/auth-context";
import type { Provider } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";
import { ProviderCard } from "../home/providers-section";

interface FavoritesScreenProps {
  isFav: (id: number | string) => boolean;
  onBack: () => void;
  onProvider: (p: Provider) => void;
  onToggleFav: (id: string) => void;
}

type Tab = "prestadores" | "categorias" | "pedidos";
const TABS: Tab[] = ["prestadores", "categorias", "pedidos"];

export function FavoritesScreen({
  isFav,
  onBack,
  onProvider,
  onToggleFav,
}: FavoritesScreenProps) {
  const { isAuthenticated } = useAuth();
  const [tab, setTab] = useState<Tab>("prestadores");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    void (async () => {
      try {
        const favs = await favoritesApi.list("provider");
        if (favs.length === 0) {
          setProviders([]);
          return;
        }
        const allRes = await providersApi.list({ limit: 100 });
        const favIds = new Set(favs.map((f) => f.target_id));
        setProviders(allRes.data.filter((p) => favIds.has(p.id)).map(adaptProvider));
      } catch {
        setProviders([]);
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
              key={t}
              className={cn("tab", tab === t && "active")}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "prestadores" && (
          !isAuthenticated ? (
            <div className="empty-state">
              <Icon.Heart size={50} />
              <div className="empty-state-title">Faça login para ver seus favoritos</div>
              <div className="empty-state-sub">
                Entre na sua conta para salvar prestadores
              </div>
            </div>
          ) : loading ? (
            <div style={{ textAlign: "center", padding: 32, color: "var(--ink-500)", fontSize: 13 }}>
              Carregando…
            </div>
          ) : providers.length === 0 ? (
            <div className="empty-state">
              <Icon.Heart size={50} />
              <div className="empty-state-title">Nenhum favorito ainda</div>
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
        )}

        {tab === "categorias" && (
          <div className="empty-state">
            <Icon.Building />
            <div className="empty-state-title">Categorias salvas</div>
            <div className="empty-state-sub">
              Em breve: salve categorias inteiras
            </div>
          </div>
        )}

        {tab === "pedidos" && (
          <div className="empty-state">
            <Icon.Box />
            <div className="empty-state-title">Sem pedidos</div>
            <div className="empty-state-sub">Seu histórico aparece aqui</div>
          </div>
        )}
      </div>
    </div>
  );
}

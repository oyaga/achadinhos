"use client";

import { useEffect, useRef, useState } from "react";
import { POPULAR_TAGS } from "@/lib/data";
import { providersApi, productsApi } from "@/lib/api";
import { adaptProvider, adaptProduct } from "@/lib/adapters";
import type { Provider, Product } from "@/lib/types";
import { cn, formatBRL } from "@/lib/utils";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { Icon } from "../icons";

interface SearchOverlayProps {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
}

const RECENT = ["Elétrica 24h", "Limpeza pós-obra", "Dedetização"];

export function SearchOverlay({
  open,
  query,
  onQueryChange,
  onClose,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { canInstall, promptInstall } = useInstallPrompt();
  const [searchProviders, setSearchProviders] = useState<Provider[]>([]);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      // Defer focus until after the slide-in animation kicks off.
      const id = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!query.trim()) {
      setSearchProviders([]);
      setSearchProducts([]);
      setSearching(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const [provRes, prodRes] = await Promise.all([
          providersApi.list({ q: query, limit: 5 }),
          productsApi.list({ q: query, limit: 5 }),
        ]);
        setSearchProviders(provRes.data.map(adaptProvider));
        setSearchProducts(prodRes.data.map(adaptProduct));
      } catch {
        // silent
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, open]);

  const hasResults = searchProviders.length > 0 || searchProducts.length > 0;

  return (
    <div className={cn("search-overlay", open && "show")}>
      <div className="search-overlay-header">
        <div className="search-overlay-input">
          <Icon.Search size={16} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar serviços…"
            aria-label="Buscar serviços"
          />
        </div>
        <button
          type="button"
          className="search-overlay-cancel"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>

      <div className="search-overlay-body">
        {canInstall && (
          <button
            type="button"
            className="install-cta"
            onClick={promptInstall}
            style={{ marginBottom: 16 }}
          >
            <Icon.Plus size={12} /> Instalar app
          </button>
        )}

        {query.trim() ? (
          searching ? (
            <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-500)", fontSize: 13 }}>
              Buscando…
            </div>
          ) : hasResults ? (
            <>
              {searchProviders.length > 0 && (
                <>
                  <div className="search-section-label">Prestadores</div>
                  {searchProviders.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      className="suggest-row"
                      style={{ width: "100%", textAlign: "left", background: "transparent" }}
                    >
                      <div className="suggest-icon">
                        <Icon.Star size={14} />
                      </div>
                      <div className="suggest-text">
                        <div className="suggest-title">{p.name}</div>
                        <div className="suggest-sub">{p.catLabel} · {p.distance}</div>
                      </div>
                      <Icon.ChevRight size={14} />
                    </button>
                  ))}
                </>
              )}
              {searchProducts.length > 0 && (
                <>
                  <div className="search-section-label">Produtos</div>
                  {searchProducts.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      className="suggest-row"
                      style={{ width: "100%", textAlign: "left", background: "transparent" }}
                    >
                      <div className="suggest-icon">
                        <Icon.Cart size={14} />
                      </div>
                      <div className="suggest-text">
                        <div className="suggest-title">{p.name}</div>
                        <div className="suggest-sub">{p.seller}{p.price > 0 && ` · ${formatBRL(p.price)}`}</div>
                      </div>
                      <Icon.ChevRight size={14} />
                    </button>
                  ))}
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-500)", fontSize: 13 }}>
              Nenhum resultado para "{query}"
            </div>
          )
        ) : (
          <>
            <div className="search-section-label">Serviços populares</div>
            <div className="tag-cloud">
              {POPULAR_TAGS.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={cn("tag", query === t && "active")}
                  onClick={() => onQueryChange(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="search-section-label">Buscas recentes</div>
            {RECENT.map((r) => (
              <button
                type="button"
                key={r}
                className="suggest-row"
                onClick={() => onQueryChange(r)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                }}
              >
                <div className="suggest-icon">
                  <Icon.Search size={14} />
                </div>
                <div className="suggest-text">
                  <div className="suggest-title">{r}</div>
                  <div className="suggest-sub">Buscado há 2 dias</div>
                </div>
                <Icon.ChevRight size={14} />
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

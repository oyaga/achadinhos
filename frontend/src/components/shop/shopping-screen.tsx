"use client";

import { useEffect, useMemo, useState } from "react";
import { productsApi } from "@/lib/api";
import { adaptProduct } from "@/lib/adapters";
import type { Product, ShopCategory, ShopCategoryId } from "@/lib/types";
import { cn, discountPct, formatBRL } from "@/lib/utils";
import { Icon } from "../icons";

interface ShoppingScreenProps {
  isFav: (id: number | string) => boolean;
  onBack: () => void;
  onProduct: (p: Product) => void;
  onToggleFav: (id: string) => void;
}

type Sort = "relevance" | "price-asc" | "price-desc" | "rating";

// Static shop category tabs — no API endpoint for product categories.
const SHOP_CATEGORIES: ShopCategory[] = [
  { id: "all", label: "Tudo", count: 0 },
  { id: "limpeza", label: "Limpeza", count: 0 },
  { id: "manutencao", label: "Manutenção", count: 0 },
  { id: "epi", label: "EPI", count: 0 },
  { id: "jardim", label: "Jardim", count: 0 },
  { id: "piscina", label: "Piscina", count: 0 },
  { id: "eletrica", label: "Elétrica", count: 0 },
  { id: "escritorio", label: "Escritório", count: 0 },
];

export function ShoppingScreen({
  isFav,
  onBack,
  onProduct,
  onToggleFav,
}: ShoppingScreenProps) {
  const [activeCat, setActiveCat] = useState<ShopCategoryId>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("relevance");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void productsApi.list({ category: activeCat === "all" ? undefined : activeCat }).then((res) => {
      setProducts(res.data.map(adaptProduct));
    }).catch(() => {}).finally(() => setLoading(false));
  }, [activeCat]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (q) {
      const ql = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.seller.toLowerCase().includes(ql)
      );
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, q, sort]);

  const offers = products.filter((p) => p.badge === "OFERTA").slice(0, 3);
  const activeLabel =
    activeCat === "all"
      ? "Todos os produtos"
      : SHOP_CATEGORIES.find((c) => c.id === activeCat)?.label;

  return (
    <div className="screen shop-screen">
      <div className="screen-header shop-header">
        <button
          type="button"
          className="screen-back"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">
          <div className="screen-title-main">Shopping</div>
          <div className="screen-title-sub">Produtos para o condomínio</div>
        </div>
        <div className="screen-actions">
          <button type="button" className="icon-btn" aria-label="Carrinho">
            <Icon.Cart size={16} />
          </button>
        </div>
      </div>

      <div className="shop-search-wrap">
        <div className="shop-search">
          <Icon.Search size={15} />
          <input
            type="text"
            placeholder="Buscar produto, marca, revenda…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="shop-cats-strip">
        {SHOP_CATEGORIES.map((c) => (
          <button
            type="button"
            key={c.id}
            className={cn("shop-cat-chip", activeCat === c.id && "active")}
            onClick={() => setActiveCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="screen-body" style={{ padding: 0 }}>
        {!loading && activeCat === "all" && !q && offers.length > 0 && (
          <div className="shop-section">
            <div className="shop-section-head">
              <div>
                <div className="shop-section-eyebrow">Ofertas da semana</div>
                <div className="shop-section-title">
                  Compre direto da revenda
                </div>
              </div>
            </div>
            <div className="offers-row">
              {offers.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  className="offer-card"
                  onClick={() => onProduct(p)}
                  style={{ textAlign: "left", display: "block" }}
                >
                  <div className="offer-thumb">
                    {p.oldPrice && (
                      <div className="offer-badge">
                        {discountPct(p.price, p.oldPrice)}% OFF
                      </div>
                    )}
                    <div className="offer-thumb-bg" data-cat={p.cat}>
                      {p.name.charAt(0)}
                    </div>
                  </div>
                  <div className="offer-name">{p.name}</div>
                  <div className="offer-prices">
                    <span className="offer-price">{formatBRL(p.price)}</span>
                    {p.oldPrice && (
                      <span className="offer-old">{formatBRL(p.oldPrice)}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="shop-section">
          <div className="shop-section-head">
            <div className="shop-section-title">
              {activeLabel}
              <span className="shop-section-count"> · {filtered.length}</span>
            </div>
            <div className="shop-sort">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="relevance">Relevantes</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="rating">Melhor avaliados</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--ink-500)", fontSize: 13 }}>
              Carregando…
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p) => {
                const fav = isFav(p.id);
                return (
                  <div
                    key={p.id}
                    className="product-card"
                    onClick={() => onProduct(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onProduct(p);
                      }
                    }}
                  >
                    <div className="product-thumb" data-cat={p.cat}>
                      {p.badge && <div className="product-badge">{p.badge}</div>}
                      <button
                        type="button"
                        className={cn("product-fav", fav && "active")}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFav(p.id);
                        }}
                        aria-label="Favoritar"
                      >
                        <Icon.Heart size={14} filled={fav} />
                      </button>
                      <div className="product-thumb-letter">
                        {p.name.charAt(0)}
                      </div>
                    </div>
                    <div className="product-info">
                      {p.tag && <div className="product-tag">{p.tag}</div>}
                      <div className="product-name">{p.name}</div>
                      <div className="product-seller">{p.seller}</div>
                      <div className="product-price-row">
                        <div className="product-prices">
                          <span className="product-price">
                            {formatBRL(p.price)}
                          </span>
                          {p.oldPrice && (
                            <span className="product-old">
                              {formatBRL(p.oldPrice)}
                            </span>
                          )}
                        </div>
                        <div className="product-rating">
                          <Icon.Star size={11} filled />{" "}
                          {p.rating.toFixed(1).replace(".", ",")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "var(--ink-500)",
                fontSize: 13,
              }}
            >
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Achadinhos — Shopping screens */
const { useState: shS } = React;

// ========== SHOPPING SCREEN ==========
function ShoppingScreen({ onBack, onProduct, favorites, onFav }) {
  const [activeCat, setActiveCat] = shS('all');
  const [q, setQ] = shS('');
  const [sort, setSort] = shS('relevance');

  let products = window.PRODUCTS_DB.filter(p => activeCat === 'all' || p.cat === activeCat);
  if (q) products = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.seller.toLowerCase().includes(q.toLowerCase()));
  if (sort === 'price-asc') products = [...products].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') products = [...products].sort((a, b) => b.price - a.price);
  if (sort === 'rating') products = [...products].sort((a, b) => b.rating - a.rating);

  const offers = window.PRODUCTS_DB.filter(p => p.badge === 'OFERTA').slice(0, 3);

  return (
    <div className="screen shop-screen">
      <div className="screen-header shop-header">
        <button className="screen-back" onClick={onBack}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div className="screen-title">
          <div className="screen-title-main">Shopping</div>
          <div className="screen-title-sub">Produtos para o condomínio</div>
        </div>
        <div className="screen-actions"><button className="icon-btn" aria-label="Carrinho"><Icon.Cart size={16} /></button></div>
      </div>

      <div className="shop-search-wrap">
        <div className="shop-search">
          <Icon.Search size={15} />
          <input
            type="text"
            placeholder="Buscar produto, marca, revenda…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="shop-cats-strip">
        {window.SHOP_CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`shop-cat-chip ${activeCat === c.id ? 'active' : ''}`}
            onClick={() => setActiveCat(c.id)}
          >
            {c.label}
            <span className="shop-cat-count">{c.count}</span>
          </button>
        ))}
      </div>

      <div className="screen-body">
        {activeCat === 'all' && !q && (
          <div className="shop-section">
            <div className="shop-section-head">
              <div>
                <div className="shop-section-eyebrow">Ofertas da semana</div>
                <div className="shop-section-title">Compre direto da revenda</div>
              </div>
            </div>
            <div className="offers-row">
              {offers.map(p => (
                <div key={p.id} className="offer-card" onClick={() => onProduct(p)}>
                  <div className="offer-thumb">
                    <div className="offer-badge">{Math.round((1 - p.price / p.oldPrice) * 100)}% OFF</div>
                    <div className="offer-thumb-bg" data-cat={p.cat}>{p.name.charAt(0)}</div>
                  </div>
                  <div className="offer-name">{p.name}</div>
                  <div className="offer-prices">
                    <span className="offer-price">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                    <span className="offer-old">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="shop-section">
          <div className="shop-section-head">
            <div className="shop-section-title">
              {activeCat === 'all' ? 'Todos os produtos' : window.SHOP_CATEGORIES.find(c => c.id === activeCat)?.label}
              <span className="shop-section-count"> · {products.length}</span>
            </div>
            <div className="shop-sort">
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="relevance">Relevantes</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="rating">Melhor avaliados</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {products.map(p => (
              <div key={p.id} className="product-card" onClick={() => onProduct(p)}>
                <div className="product-thumb" data-cat={p.cat}>
                  {p.badge && <div className="product-badge">{p.badge}</div>}
                  <button
                    className="product-fav"
                    onClick={e => { e.stopPropagation(); onFav(p.id); }}
                    aria-label="Favoritar"
                  >
                    <Icon.Heart size={14} filled={favorites.has(p.id)} />
                  </button>
                  <div className="product-thumb-letter">{p.name.charAt(0)}</div>
                </div>
                <div className="product-info">
                  {p.tag && <div className="product-tag">{p.tag}</div>}
                  <div className="product-name">{p.name}</div>
                  <div className="product-seller">{p.seller}</div>
                  <div className="product-price-row">
                    <div className="product-prices">
                      <span className="product-price">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                      {p.oldPrice && <span className="product-old">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</span>}
                    </div>
                    <div className="product-rating">
                      <Icon.Star size={11} filled /> {p.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)', fontSize: 13 }}>
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========== PRODUCT DETAIL ==========
function ProductDetail({ product, onBack, favorites, onFav }) {
  const [qty, setQty] = shS(1);
  const total = (product.price * qty).toFixed(2).replace('.', ',');
  const isFav = favorites.has(product.id);

  // Encontra produtos relacionados (mesma categoria)
  const related = window.PRODUCTS_DB.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  const openWhatsapp = () => {
    const msg = encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name} — R$ ${product.price.toFixed(2).replace('.', ',')} (qtd: ${qty}). Total: R$ ${total}.`);
    const url = `https://wa.me/55${product.whatsapp}?text=${msg}`;
    alert(`Abrindo WhatsApp da revenda…\n\n${product.seller}\nwa.me/55${product.whatsapp}\n\nMensagem pré-preenchida com o produto e quantidade.`);
  };
  const openLink = () => {
    alert(`Abrindo link da revenda…\n\n${product.seller}\n${product.link}\n\n(em produção, abre em nova aba)`);
  };

  return (
    <div className="screen product-detail-screen">
      <div className="screen-header transparent-header">
        <button className="screen-back floating" onClick={onBack}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div style={{ flex: 1 }} />
        <button className="icon-btn floating" onClick={() => onFav(product.id)} aria-label="Favoritar">
          <Icon.Heart size={16} filled={isFav} />
        </button>
        <button className="icon-btn floating" aria-label="Compartilhar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </svg>
        </button>
      </div>

      <div className="screen-body" style={{ paddingTop: 0 }}>
        <div className="pd-hero" data-cat={product.cat}>
          <div className="pd-hero-letter">{product.name.charAt(0)}</div>
          {product.badge && <div className="pd-hero-badge">{product.badge}</div>}
        </div>

        <div className="pd-section product-detail-info">
          {product.tag && <div className="product-tag big">{product.tag}</div>}
          <h2 className="pd-name">{product.name}</h2>
          <div className="pd-seller-row">
            <div className="pd-seller-avatar">{product.seller.charAt(0)}</div>
            <div>
              <div className="pd-seller-name">{product.seller}</div>
              <div className="pd-seller-meta">Revenda parceira · {product.stock}</div>
            </div>
            <div className="pd-rating-pill">
              <Icon.Star size={11} filled /> {product.rating.toFixed(1)}
              <span className="pd-rating-count">({product.reviews})</span>
            </div>
          </div>

          <div className="pd-price-block">
            {product.oldPrice && <div className="pd-old-price">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</div>}
            <div className="pd-price">R$ {product.price.toFixed(2).replace('.', ',')}</div>
            {product.oldPrice && (
              <div className="pd-discount">
                <Icon.Tag size={11} /> {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF · economia de R$ {(product.oldPrice - product.price).toFixed(2).replace('.', ',')}
              </div>
            )}
          </div>

          <div className="pd-qty-row">
            <span className="pd-qty-label">Quantidade</span>
            <div className="pd-qty-stepper">
              <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>–</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <span className="pd-total">Total <strong>R$ {total}</strong></span>
          </div>
        </div>

        <div className="pd-section">
          <h3>Sobre o produto</h3>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)' }}>
            {product.name}. Vendido e enviado por {product.seller}, parceira homologada.
            Pagamento, frete e garantia tratados diretamente com a revenda. Use os botões abaixo para
            ir ao link do produto ou conversar no WhatsApp com o vendedor.
          </p>
          <div className="pd-features">
            <div className="pd-feature"><Icon.Check size={12} /> Vendedor verificado</div>
            <div className="pd-feature"><Icon.Check size={12} /> Nota fiscal emitida</div>
            <div className="pd-feature"><Icon.Check size={12} /> Frete sob consulta</div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pd-section">
            <h3>Itens relacionados</h3>
            <div className="related-row">
              {related.map(r => (
                <div key={r.id} className="related-card">
                  <div className="related-thumb" data-cat={r.cat}>{r.name.charAt(0)}</div>
                  <div className="related-name">{r.name}</div>
                  <div className="related-price">R$ {r.price.toFixed(2).replace('.', ',')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: 120 }} />
      </div>

      <div className="sticky-cta product-cta">
        <button className="btn-secondary product-btn-link" onClick={openLink}>
          <Icon.ExternalLink size={14} /> Ver na revenda
        </button>
        <button className="btn-whatsapp" onClick={openWhatsapp}>
          <Icon.Whatsapp size={16} /> Comprar no WhatsApp
        </button>
      </div>
    </div>
  );
}

window.ShoppingScreen = ShoppingScreen;
window.ProductDetail = ProductDetail;

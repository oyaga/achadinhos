/* Achadinhos — Home page React app */

const { useState, useEffect, useRef } = React;

// ============== DATA ==============
const CATEGORIES = [
  { id: 'destaque', label: 'Destaque\ndo dia', icon: 'CatHighlight', badge: 'TOP' },
  { id: 'shopping', label: 'Shopping\ncondomínio', icon: 'CatShopping', badge: 'NOVO' },
  { id: 'parceiros', label: 'Parceiros\nhomologados', icon: 'CatPartners' },
  { id: 'seguranca', label: 'Segurança\neletrônica', icon: 'CatSecurity' },
  { id: 'terceirizacao', label: 'Tercei-\nrização', icon: 'CatOutsource' },
  { id: 'portaria', label: 'Portaria\nvirtual', icon: 'CatPortaria' },
  { id: 'facilities', label: 'Facilities', icon: 'CatFacilities' },
  { id: 'manutencao', label: 'Manutenção\ngeral', icon: 'CatMaintenance' },
  { id: 'dedetizacao', label: 'Dedeti-\nzadora', icon: 'CatPest' },
  { id: 'armarios', label: 'Armário\ninteligente', icon: 'CatLocker' },
  { id: 'limpeza', label: 'Limpeza', icon: 'CatCleaning' },
  { id: 'hidraulica', label: 'Hidráulica', icon: 'CatPlumbing' },
  { id: 'eletrica', label: 'Elétrica', icon: 'CatElectric' },
];

const PROVIDERS = [
  { id: 1, name: 'TurboElev Manutenção', cat: 'Elevadores · 1.2km', avatar: 'T', rating: 4.9, reviews: 128, badge: 'Ouro', verified: true, distance: '1,2km' },
  { id: 2, name: 'Alpha Elétrica 24h', cat: 'Elétrica · Atende agora', avatar: 'A', rating: 4.8, reviews: 96, badge: 'Verificado', verified: true, distance: '0,8km' },
  { id: 3, name: 'Home Solutions', cat: 'Manutenção geral', avatar: 'H', rating: 4.7, reviews: 214, badge: 'Top', verified: true, distance: '2,1km' },
  { id: 4, name: 'CleanPro Condomínios', cat: 'Limpeza · Diarista', avatar: 'C', rating: 4.9, reviews: 342, badge: 'Ouro', verified: true, distance: '0,5km' },
  { id: 5, name: 'Guardião Segurança', cat: 'Portaria 24h · CFTV', avatar: 'G', rating: 4.6, reviews: 78, verified: false, distance: '3,4km' },
];

const TAGS = ['Elétrica', 'Hidráulica', 'Limpeza', 'Pintura', 'Jardinagem', 'Pragas', 'Elevador', 'CFTV'];

// ============== TWEAK DEFAULTS ==============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryHue": 222,
  "accentHue": 42,
  "radius": 18,
  "density": 1.0,
  "shadowStyle": "soft",
  "fontDisplay": "Fraunces",
  "fontUI": "Inter"
}/*EDITMODE-END*/;

// ============== APP ==============
function AchadinhosApp() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [activeCat, setActiveCat] = useState('destaque');
  const [favorites, setFavorites] = useState(new Set([1, 4]));
  const [activeNav, setActiveNav] = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [sheetProvider, setSheetProvider] = useState(null);
  const [toast, setToast] = useState(null);
  const [budgetSent, setBudgetSent] = useState(false);

  // Navigation stack
  const [route, setRoute] = useState({ name: 'home' });
  const navigate = (name, params = {}) => setRoute({ name, ...params });
  const back = () => setRoute({ name: 'home' });

  // Apply tweaks as CSS variables
  useEffect(() => {
    const root = document.documentElement;
    // Recompute navy/gold from hue
    const nh = tweaks.primaryHue, ah = tweaks.accentHue;
    root.style.setProperty('--navy-950', `oklch(0.16 0.07 ${nh})`);
    root.style.setProperty('--navy-900', `oklch(0.22 0.09 ${nh})`);
    root.style.setProperty('--navy-800', `oklch(0.28 0.10 ${nh})`);
    root.style.setProperty('--navy-700', `oklch(0.36 0.11 ${nh})`);
    root.style.setProperty('--navy-600', `oklch(0.46 0.11 ${nh})`);
    root.style.setProperty('--navy-300', `oklch(0.72 0.06 ${nh})`);
    root.style.setProperty('--gold-500', `oklch(0.74 0.10 ${ah})`);
    root.style.setProperty('--gold-400', `oklch(0.80 0.09 ${ah})`);
    root.style.setProperty('--gold-300', `oklch(0.85 0.08 ${ah})`);
    root.style.setProperty('--gold-200', `oklch(0.91 0.06 ${ah})`);
    root.style.setProperty('--gold-100', `oklch(0.96 0.04 ${ah})`);
    root.style.setProperty('--radius', `${tweaks.radius}px`);
    root.style.setProperty('--radius-sm', `${Math.max(8, tweaks.radius - 6)}px`);
    root.style.setProperty('--radius-lg', `${tweaks.radius + 6}px`);
    root.style.setProperty('--density', tweaks.density);
    root.style.setProperty('--font-display', `'${tweaks.fontDisplay}', Georgia, serif`);
    root.style.setProperty('--font-ui', `'${tweaks.fontUI}', -apple-system, sans-serif`);

    if (tweaks.shadowStyle === 'flat') {
      root.style.setProperty('--shadow-card', '0 0 0 1px rgba(11,27,59,0.06)');
      root.style.setProperty('--shadow-elev', '0 0 0 1px rgba(11,27,59,0.10)');
    } else if (tweaks.shadowStyle === 'strong') {
      root.style.setProperty('--shadow-card', '0 4px 14px rgba(11,27,59,0.10), 0 12px 32px rgba(11,27,59,0.10)');
      root.style.setProperty('--shadow-elev', '0 8px 22px rgba(11,27,59,0.18), 0 24px 50px rgba(11,27,59,0.16)');
    } else {
      root.style.setProperty('--shadow-card', '0 1px 2px rgba(11,27,59,0.04), 0 8px 20px rgba(11,27,59,0.06)');
      root.style.setProperty('--shadow-elev', '0 4px 12px rgba(11,27,59,0.08), 0 16px 32px rgba(11,27,59,0.10)');
    }
  }, [tweaks]);

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removido dos favoritos');
      } else {
        next.add(id);
        showToast('Salvo nos favoritos ✦');
      }
      return next;
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const filteredProviders = PROVIDERS.filter(p => {
    if (!searchQ) return true;
    const q = searchQ.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q);
  });

  const openBudget = (provider) => {
    setSheetProvider(provider);
    setBudgetSent(false);
  };

  const sendBudget = () => {
    setBudgetSent(true);
    setTimeout(() => {
      setSheetProvider(null);
      showToast('Pedido enviado! 3 prestadores vão te responder.');
    }, 900);
  };

  const goCategory = (catId) => {
    const cat = window.CATEGORIES_FULL.find(c => c.id === catId);
    if (cat && cat.id === 'destaque') navigate('highlights');
    else if (cat && cat.id === 'shopping') navigate('shopping');
    else navigate('category', { categoryId: catId });
  };
  const goProvider = (provider) => navigate('provider', { provider });
  const goRate = (provider) => navigate('rate', { provider });

  // Use real providers from DB
  const homeProviders = window.PROVIDERS_DB.slice(0, 5);

  return (
    <div className="app">
      <div className="app-scroll">
        <Header onSearchClick={() => setSearchOpen(true)} />
        <LocationBar />
        <Hero onClick={() => goProvider(window.PROVIDERS_DB[0])} />
        <CategoriesSection active={activeCat} setActive={(id) => { setActiveCat(id); goCategory(id); }} onSeeAll={() => navigate('allcats')} />
        <PromoBanner onClick={() => openBudget(null)} />
        <ProvidersSection
          providers={homeProviders}
          favorites={favorites}
          onFav={toggleFav}
          onClick={goProvider}
        />
        <div className="bottom-spacer" />
      </div>

      <BottomNav
        active={activeNav}
        setActive={(id) => {
          setActiveNav(id);
          if (id === 'fav') navigate('favorites');
          else if (id === 'home') navigate('home');
          else if (id === 'orders') navigate('favorites');
          else if (id === 'profile') navigate('home');
        }}
        onAddClick={() => navigate('signup')}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => { setSearchOpen(false); setSearchQ(''); }}
        query={searchQ}
        setQuery={setSearchQ}
      />

      <BudgetSheet
        provider={sheetProvider}
        sent={budgetSent}
        onClose={() => setSheetProvider(null)}
        onSend={sendBudget}
      />

      {/* Routed screens (overlay) */}
      {route.name === 'provider' && (
        <window.ProviderDetail
          provider={route.provider}
          onBack={back}
          onRate={() => goRate(route.provider)}
          favorites={favorites}
          onFav={toggleFav}
        />
      )}
      {route.name === 'category' && (
        <window.CategoryScreen
          category={route.categoryId}
          onBack={back}
          onProvider={goProvider}
          favorites={favorites}
          onFav={toggleFav}
        />
      )}
      {route.name === 'allcats' && (
        <window.AllCategoriesScreen onBack={back} onCategory={goCategory} />
      )}
      {route.name === 'highlights' && (
        <window.HighlightsScreen onBack={back} onProvider={goProvider} />
      )}
      {route.name === 'signup' && (
        <window.SignupWizard onBack={back} onComplete={() => { back(); showToast('Cadastro recebido!'); }} />
      )}
      {route.name === 'rate' && (
        <window.RateScreen
          provider={route.provider}
          onBack={() => navigate('provider', { provider: route.provider })}
          onSent={() => { navigate('provider', { provider: route.provider }); showToast('Avaliação publicada ✦'); }}
        />
      )}
      {route.name === 'favorites' && (
        <window.FavoritesScreen
          favorites={favorites}
          onBack={() => { setActiveNav('home'); back(); }}
          onProvider={goProvider}
          onFav={toggleFav}
        />
      )}
      {route.name === 'shopping' && (
        <window.ShoppingScreen
          onBack={back}
          onProduct={(p) => navigate('product', { product: p })}
          favorites={favorites}
          onFav={toggleFav}
        />
      )}
      {route.name === 'product' && (
        <window.ProductDetail
          product={route.product}
          onBack={() => navigate('shopping')}
          favorites={favorites}
          onFav={toggleFav}
        />
      )}

      <div className={`toast ${toast ? 'show' : ''}`}>
        <Icon.Sparkle />
        {toast}
      </div>
    </div>
  );
}

// ============== HEADER ==============
function Header({ onSearchClick }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="brand">
          <div className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--navy-900)' }}>
              <path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="brand-text">
            <div className="brand-name">Achadinhos</div>
            <div className="brand-sub">do condomínio</div>
          </div>
        </div>
        <div className="header-icons">
          <button className="icon-btn" aria-label="Mensagens">
            <Icon.Mail />
            <span className="badge">2</span>
          </button>
          <button className="icon-btn" aria-label="Notificações">
            <Icon.Bell />
          </button>
        </div>
      </div>

      <div className="greeting">
        <div className="greeting-hi">
          <Icon.Sparkle size={12} /> Boa tarde, síndico
        </div>
        <div className="greeting-q">
          O que você precisa <em>resolver</em><br />no Edifício Aurora hoje?
        </div>
      </div>

      <div className="search-wrap">
        <div className="search" onClick={onSearchClick}>
          <Icon.Search size={18} />
          <input
            placeholder="Buscar serviços, prestadores…"
            readOnly
            style={{ pointerEvents: 'none' }}
          />
          <Icon.Filter size={16} />
        </div>
        <button className="search-action" aria-label="Pedir orçamento rápido">
          <Icon.Sparkle size={18} />
        </button>
      </div>
    </header>
  );
}

// ============== LOCATION ==============
function LocationBar() {
  return (
    <div className="location-bar">
      <span className="pin"><Icon.Pin /></span>
      <span>Atendendo em torno de <strong>Edifício Aurora</strong></span>
      <Icon.ChevDown />
    </div>
  );
}

// ============== HERO ==============
function Hero({ onClick }) {
  return (
    <div className="section">
      <div className="hero fade-up" onClick={onClick} style={{ animationDelay: '60ms' }}>
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <div className="hero-tag">
            <Icon.Crown size={11} /> Destaque do dia
          </div>
          <div className="hero-title">TurboElev<br />Manutenção 24h</div>
          <div className="hero-meta">
            <div className="hero-rating">
              <Icon.Star size={11} /> 4,9
            </div>
            <span className="hero-divider"></span>
            <span>128 contratos</span>
            <span className="hero-divider"></span>
            <span>1,2 km</span>
          </div>
        </div>
        <div className="hero-pic"></div>
      </div>
    </div>
  );
}

// ============== CATEGORIES ==============
function CategoriesSection({ active, setActive, onSeeAll }) {
  return (
    <div className="section">
      <div className="section-title">
        <h2>Categorias</h2>
        <button className="see-all" onClick={onSeeAll}>Ver todas <Icon.ChevRight /></button>
      </div>
      <div className="cats">
        {CATEGORIES.slice(0, 8).map((c, i) => {
          const IconCmp = Icon[c.icon];
          return (
            <button
              key={c.id}
              className={`cat fade-up ${active === c.id ? 'active' : ''}`}
              onClick={() => setActive(c.id)}
              style={{ animationDelay: `${100 + i * 30}ms` }}
            >
              {c.badge && <span className="cat-badge">{c.badge}</span>}
              <span className="cat-icon"><IconCmp /></span>
              <span className="cat-label" style={{ whiteSpace: 'pre-line' }}>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============== PROMO ==============
function PromoBanner({ onClick }) {
  return (
    <div className="section">
      <div className="promo" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div className="promo-icon"><Icon.Tag /></div>
        <div className="promo-text">
          <div className="promo-title">3 orçamentos em 1 toque</div>
          <div className="promo-sub">Conte o problema, a gente cota.</div>
        </div>
        <Icon.ChevRight size={18} />
      </div>
    </div>
  );
}

// ============== PROVIDERS ==============
function ProvidersSection({ providers, favorites, onFav, onClick }) {
  return (
    <div className="section">
      <div className="section-title">
        <h2>Recomendados pra você</h2>
        <button className="see-all">Filtrar <Icon.Filter size={12} /></button>
      </div>
      <div className="providers">
        {providers.map((p, i) => (
          <div
            key={p.id}
            className="provider fade-up"
            onClick={() => onClick(p)}
            style={{ animationDelay: `${200 + i * 40}ms` }}
          >
            <div className={`provider-avatar ${p.verified ? 'verified' : ''}`}>
              {p.avatar}
            </div>
            <div className="provider-info">
              <div className="provider-name">
                {p.name}
                {p.badge && <span className="provider-badge">{p.badge}</span>}
              </div>
              <div className="provider-cat">{p.catLabel || p.cat}</div>
              <div className="provider-meta">
                <div className="provider-rating">
                  <Icon.Star size={11} /> {p.rating.toFixed(1)}
                </div>
                <span style={{ color: 'var(--ink-300)' }}>·</span>
                <span>{p.reviews} avaliações</span>
              </div>
            </div>
            <button
              className={`provider-fav ${favorites.has(p.id) ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onFav(p.id); }}
              aria-label="Favoritar"
            >
              <Icon.Heart size={18} filled={favorites.has(p.id)} />
            </button>
          </div>
        ))}
        {providers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--ink-500)', fontSize: 13 }}>
            Nenhum prestador encontrado.
          </div>
        )}
      </div>
    </div>
  );
}

// ============== BOTTOM NAV ==============
function BottomNav({ active, setActive, onAddClick }) {
  const items = [
    { id: 'home', label: 'Início', icon: 'Home' },
    { id: 'orders', label: 'Pedidos', icon: 'Box' },
    { id: 'fav', label: 'Favoritos', icon: 'Heart' },
    { id: 'profile', label: 'Perfil', icon: 'User' },
  ];
  return (
    <nav className="bottom-nav">
      {items.slice(0, 2).map(it => {
        const I = Icon[it.icon];
        return (
          <button
            key={it.id}
            className={`nav-item ${active === it.id ? 'active' : ''}`}
            onClick={() => setActive(it.id)}
          >
            <I size={20} filled={active === it.id} />
            <span>{it.label}</span>
            <span className="nav-dot" />
          </button>
        );
      })}
      <button className="nav-fab" onClick={onAddClick} aria-label="Pedir orçamento">
        <Icon.Plus size={24} />
      </button>
      {items.slice(2).map(it => {
        const I = Icon[it.icon];
        return (
          <button
            key={it.id}
            className={`nav-item ${active === it.id ? 'active' : ''}`}
            onClick={() => setActive(it.id)}
          >
            <I size={20} filled={active === it.id} />
            <span>{it.label}</span>
            <span className="nav-dot" />
          </button>
        );
      })}
    </nav>
  );
}

// ============== SEARCH OVERLAY ==============
function SearchOverlay({ open, onClose, query, setQuery }) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const recent = ['Elétrica 24h', 'Limpeza pós-obra', 'Dedetização'];

  return (
    <div className={`search-overlay ${open ? 'show' : ''}`}>
      <div className="search-overlay-header">
        <div className="search-overlay-input">
          <Icon.Search size={16} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar serviços…"
          />
        </div>
        <button className="search-overlay-cancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
      <div className="search-overlay-body">
        <div className="search-section-label">Serviços populares</div>
        <div className="tag-cloud">
          {TAGS.map(t => (
            <span key={t} className="tag" onClick={() => setQuery(t)}>{t}</span>
          ))}
        </div>

        <div className="search-section-label">Buscas recentes</div>
        {recent.map((r, i) => (
          <div key={i} className="suggest-row" onClick={() => setQuery(r)}>
            <div className="suggest-icon"><Icon.Search size={14} /></div>
            <div className="suggest-text">
              <div className="suggest-title">{r}</div>
              <div className="suggest-sub">Buscado há 2 dias</div>
            </div>
            <Icon.ChevRight size={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== BUDGET SHEET ==============
function BudgetSheet({ provider, sent, onClose, onSend }) {
  const [desc, setDesc] = useState('');
  const [urgency, setUrgency] = useState('normal');
  useEffect(() => {
    if (provider) { setDesc(''); setUrgency('normal'); }
  }, [provider]);

  return (
    <>
      <div className={`sheet-backdrop ${provider ? 'show' : ''}`} onClick={onClose} />
      <div className={`sheet ${provider ? 'show' : ''}`}>
        <div className="sheet-handle"></div>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '30px 10px 10px' }}>
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: 'linear-gradient(140deg, var(--gold-400), var(--gold-500))',
              color: 'var(--navy-900)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 14px',
              boxShadow: '0 8px 22px rgba(201,169,97,0.4)'
            }}>
              <Icon.Check size={28} />
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 22, color: 'var(--navy-900)', fontWeight: 600
            }}>Pedido enviado!</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 6 }}>
              Você recebe respostas em até 30 min.
            </div>
          </div>
        ) : (
          <>
            <div className="sheet-title">
              {provider ? `Falar com ${provider.name.split(' ')[0]}` : 'Pedir orçamento'}
            </div>
            <div className="sheet-sub">
              {provider
                ? 'Conta o problema. Eles te respondem direto.'
                : 'Descreve o serviço e a gente cota com 3 prestadores.'}
            </div>

            <div className="field">
              <div className="field-label">O que precisa?</div>
              <textarea
                className="field-input"
                placeholder="Ex: vazamento na cobertura, motor do elevador fazendo barulho…"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="field">
              <div className="field-label">Urgência</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { id: 'urgent', label: 'Agora', emoji: '🚨' },
                  { id: 'normal', label: 'Esta semana', emoji: '🗓️' },
                  { id: 'flexible', label: 'Sem pressa', emoji: '☕' },
                ].map(o => (
                  <button
                    key={o.id}
                    onClick={() => setUrgency(o.id)}
                    style={{
                      flex: 1, padding: '11px 6px', borderRadius: 12,
                      background: urgency === o.id ? 'var(--navy-900)' : 'white',
                      color: urgency === o.id ? 'white' : 'var(--navy-900)',
                      border: `1px solid ${urgency === o.id ? 'var(--gold-500)' : 'var(--bone-300)'}`,
                      fontSize: 12, fontWeight: 600, transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 2 }}>{o.emoji}</div>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={onSend}
              disabled={desc.trim().length < 5}
              style={{ opacity: desc.trim().length < 5 ? 0.5 : 1 }}
            >
              <Icon.Send /> Enviar pedido
            </button>

            {provider && (
              <button
                style={{
                  width: '100%', marginTop: 10, padding: 13,
                  background: 'transparent', color: 'var(--success)',
                  border: '1px solid var(--success)', borderRadius: 14,
                  fontSize: 13, fontWeight: 600, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: 8
                }}
                onClick={onSend}
              >
                <Icon.Whatsapp /> Falar no WhatsApp
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

// ============== TWEAKS PANEL ==============
function TweaksUI() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  return (
    <window.TweaksPanel title="Tweaks">
      <window.TweakSection label="Cores" />
      <window.TweakSlider label="Tom primário" min={0} max={360} step={1} unit="°"
        value={tweaks.primaryHue} onChange={(v) => setTweak('primaryHue', v)} />
      <window.TweakSlider label="Tom accent" min={0} max={360} step={1} unit="°"
        value={tweaks.accentHue} onChange={(v) => setTweak('accentHue', v)} />

      <window.TweakSection label="Forma" />
      <window.TweakSlider label="Cantos" min={0} max={32} step={2} unit="px"
        value={tweaks.radius} onChange={(v) => setTweak('radius', v)} />
      <window.TweakSlider label="Densidade" min={0.7} max={1.3} step={0.05}
        value={tweaks.density} onChange={(v) => setTweak('density', v)} />
      <window.TweakRadio label="Sombras" value={tweaks.shadowStyle}
        onChange={(v) => setTweak('shadowStyle', v)}
        options={[
          { value: 'flat', label: 'Plano' },
          { value: 'soft', label: 'Suave' },
          { value: 'strong', label: 'Forte' },
        ]} />

      <window.TweakSection label="Tipografia" />
      <window.TweakSelect label="Display" value={tweaks.fontDisplay}
        onChange={(v) => setTweak('fontDisplay', v)}
        options={[
          { value: 'Fraunces', label: 'Fraunces' },
          { value: 'Playfair Display', label: 'Playfair' },
          { value: 'DM Serif Display', label: 'DM Serif' },
          { value: 'Inter', label: 'Inter' },
        ]} />
      <window.TweakSelect label="UI" value={tweaks.fontUI}
        onChange={(v) => setTweak('fontUI', v)}
        options={[
          { value: 'Inter', label: 'Inter' },
          { value: 'Manrope', label: 'Manrope' },
          { value: 'DM Sans', label: 'DM Sans' },
          { value: 'IBM Plex Sans', label: 'IBM Plex' },
        ]} />
    </window.TweaksPanel>
  );
}

window.AchadinhosApp = AchadinhosApp;
window.TweaksUI = TweaksUI;

/* Achadinhos — Screens (Detail, Category, Signup, Rate, Favorites, etc) */

const { useState: uS, useEffect: uE, useRef: uR } = React;

// ========== PROVIDER DETAIL ==========
function ProviderDetail({ provider, onBack, onRate, favorites, onFav }) {
  const reviews = window.REVIEWS.filter(r => r.providerId === provider.id);
  const dist = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ];
  const isFav = favorites.has(provider.id);

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button className="screen-back" onClick={onBack}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div className="screen-title">Prestador</div>
        <div className="screen-actions">
          <button className="icon-btn" onClick={() => onFav(provider.id)} aria-label="Favoritar">
            <Icon.Heart size={18} filled={isFav} />
          </button>
        </div>
      </div>

      <div className="screen-body" style={{ paddingBottom: 100 }}>
        <div className="pd-hero">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--gold-300)', textTransform: 'uppercase' }}>
              {provider.catLabel}
            </div>
          </div>
        </div>

        <div className="pd-card">
          <div className="pd-top">
            <div className={`pd-avatar ${provider.verified ? 'verified' : ''}`}>{provider.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="pd-name">{provider.name}</div>
              <div className="pd-cat">{provider.distance} · responde em {provider.responseTime}</div>
              <div className="pd-rating-row">
                <Icon.Star size={12} />
                <strong>{provider.rating.toFixed(1)}</strong>
                <span>· {provider.reviews} avaliações</span>
              </div>
            </div>
          </div>
          <div className="pd-stats">
            <div className="pd-stat">
              <div className="pd-stat-num">{provider.yearsActive}</div>
              <div className="pd-stat-label">Anos</div>
            </div>
            <div className="pd-stat">
              <div className="pd-stat-num">{provider.jobsDone}</div>
              <div className="pd-stat-label">Serviços</div>
            </div>
            <div className="pd-stat">
              <div className="pd-stat-num">{provider.responseTime}</div>
              <div className="pd-stat-label">Resposta</div>
            </div>
          </div>
        </div>

        <div className="pd-section">
          <h3>Sobre</h3>
          <div className="pd-desc">{provider.desc}</div>
        </div>

        <div className="pd-section">
          <h3>Serviços</h3>
          <div className="pd-services">
            {provider.services.map(s => (
              <div key={s} className="pd-service">
                <Icon.Check size={12} /> {s}
              </div>
            ))}
          </div>
        </div>

        <div className="pd-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ margin: 0 }}>Avaliações <span style={{ color: 'var(--ink-400)', fontWeight: 400, fontSize: 13 }}>({reviews.length})</span></h3>
            <button className="btn-mini" onClick={onRate}>Avaliar</button>
          </div>
          <div className="rating-summary" style={{ marginBottom: 14 }}>
            <div className="rating-big">
              <div className="rating-big-num">{provider.rating.toFixed(1)}</div>
              <div className="rating-big-stars">
                {[1,2,3,4,5].map(i => <Icon.Star key={i} size={11} filled={i <= Math.round(provider.rating)} />)}
              </div>
              <div className="rating-big-count">{provider.reviews} avaliações</div>
            </div>
            <div className="rating-bars">
              {dist.map(d => (
                <div key={d.stars} className="rating-bar-row">
                  <span>{d.stars}</span>
                  <div className="rating-bar"><div className="rating-bar-fill" style={{ width: `${d.pct}%` }} /></div>
                  <span style={{ width: 22, textAlign: 'right' }}>{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          {reviews.map(r => (
            <div key={r.id} className="review">
              <div className="review-head">
                <div className="review-avatar">{r.user.charAt(0)}</div>
                <div className="review-user-info">
                  <div className="review-user">
                    {r.user}
                    {r.verified && <Icon.Check size={11} />}
                  </div>
                  <div className="review-meta">{r.condo} · {r.date}</div>
                </div>
                <div className="review-stars">
                  {[1,2,3,4,5].map(i => <Icon.Star key={i} size={11} filled={i <= r.rating} />)}
                </div>
              </div>
              <div className="review-text">{r.text}</div>
              {r.tags && r.tags.length > 0 && (
                <div className="review-tags">
                  {r.tags.map(t => <span key={t} className="review-tag">{t}</span>)}
                </div>
              )}
              <div className="review-actions">
                <span className="review-action">👍 Útil ({r.helpful})</span>
                <span className="review-action">Responder</span>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--ink-500)', fontSize: 13 }}>
              Seja o primeiro a avaliar este prestador.
            </div>
          )}
        </div>
      </div>

      <div className="sticky-cta">
        <button className="btn-secondary" onClick={onRate}>
          <Icon.Star size={14} /> Avaliar
        </button>
        <button className="btn-whatsapp" onClick={() => alert(`Abrindo WhatsApp...\nwa.me/55${provider.whatsapp}`)}>
          <Icon.Whatsapp size={16} /> Falar no WhatsApp
        </button>
      </div>
    </div>
  );
}

// ========== CATEGORY SCREEN ==========
function CategoryScreen({ category, onBack, onProvider, favorites, onFav }) {
  const [filter, setFilter] = uS('all');
  const [sort, setSort] = uS('relevance');
  const cat = window.CATEGORIES_FULL.find(c => c.id === category);
  const IconCmp = window.Icon[cat.icon];
  const providers = window.PROVIDERS_DB.filter(p =>
    cat.id === 'destaque' ? p.highlight :
    cat.id === 'parceiros' ? p.cat === 'parceiros' :
    p.cat === cat.id
  );
  const sorted = [...providers].sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });
  const filtered = sorted.filter(p =>
    filter === 'all' ? true :
    filter === 'verified' ? p.verified :
    filter === 'gold' ? p.badge === 'Ouro' :
    true
  );

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button className="screen-back" onClick={onBack}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div className="screen-title">{cat.label}</div>
        <div className="screen-actions">
          <button className="icon-btn" aria-label="Buscar"><Icon.Search size={16} /></button>
        </div>
      </div>

      <div className="screen-body">
        <div className="cat-hero">
          <div className="cat-hero-icon"><IconCmp /></div>
          <h1>{cat.label}</h1>
          <p>{cat.desc || 'Encontre os melhores prestadores desta categoria'}</p>
          <div className="cat-stats">
            <div className="cat-stat"><strong>{providers.length}</strong> prestadores</div>
            <div className="cat-stat">⭐ <strong>4,8</strong> média</div>
            <div className="cat-stat">📍 <strong>{providers.length > 0 ? '0,5' : '-'}</strong>km mais próximo</div>
          </div>
        </div>

        <div className="filter-bar">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'verified', label: 'Verificados', icon: 'Check' },
            { id: 'gold', label: 'Ouro', icon: 'Crown' },
            { id: 'near', label: 'Mais próximos', icon: 'Pin' },
            { id: 'cheap', label: 'Mais baratos' },
          ].map(f => (
            <button
              key={f.id}
              className={`filter-chip ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.icon && window.Icon[f.icon] && React.createElement(window.Icon[f.icon], { size: 11 })}
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>
            <strong style={{ color: 'var(--navy-900)' }}>{filtered.length}</strong> resultados
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background: 'transparent', border: 'none', fontSize: 12,
              fontWeight: 600, color: 'var(--navy-900)', cursor: 'pointer'
            }}
          >
            <option value="relevance">Relevância</option>
            <option value="rating">Melhor avaliação</option>
            <option value="distance">Mais próximo</option>
          </select>
        </div>

        <div className="providers">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="provider fade-up"
              onClick={() => onProvider(p)}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className={`provider-avatar ${p.verified ? 'verified' : ''}`}>{p.avatar}</div>
              <div className="provider-info">
                <div className="provider-name">
                  {p.name}
                  {p.badge && <span className="provider-badge">{p.badge}</span>}
                </div>
                <div className="provider-cat">{p.catLabel} · {p.distance}</div>
                <div className="provider-meta">
                  <div className="provider-rating">
                    <Icon.Star size={11} /> {p.rating.toFixed(1)}
                  </div>
                  <span style={{ color: 'var(--ink-300)' }}>·</span>
                  <span>{p.price}</span>
                </div>
              </div>
              <button
                className={`provider-fav ${favorites.has(p.id) ? 'active' : ''}`}
                onClick={e => { e.stopPropagation(); onFav(p.id); }}
              >
                <Icon.Heart size={18} filled={favorites.has(p.id)} />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <Icon.Search size={42} />
              <div className="empty-state-title">Nenhum prestador</div>
              <div className="empty-state-sub">Tente outro filtro</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========== ALL CATEGORIES SCREEN ==========
function AllCategoriesScreen({ onBack, onCategory }) {
  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button className="screen-back" onClick={onBack}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div className="screen-title">Categorias</div>
      </div>
      <div className="screen-body">
        <div className="all-cats">
          {window.CATEGORIES_FULL.map(c => {
            const I = window.Icon[c.icon];
            return (
              <div key={c.id} className="all-cat" onClick={() => onCategory(c.id)}>
                <div className="all-cat-icon"><I /></div>
                <div className="all-cat-label">{c.label}</div>
                <div className="all-cat-count">{c.count} prestadores</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ========== HIGHLIGHTS SCREEN ==========
function HighlightsScreen({ onBack, onProvider }) {
  const highlights = window.PROVIDERS_DB.filter(p => p.highlight);
  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button className="screen-back" onClick={onBack}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div className="screen-title">Destaque do dia</div>
      </div>
      <div className="screen-body">
        <div style={{ marginBottom: 18, fontSize: 13, color: 'var(--ink-500)', lineHeight: 1.5 }}>
          Os <strong style={{ color: 'var(--navy-900)' }}>melhores prestadores</strong> selecionados pelo nosso algoritmo. Atualizado todo dia às 6h.
        </div>
        {highlights.map(p => (
          <div key={p.id} className="highlight-card" onClick={() => onProvider(p)}>
            <div className="highlight-pic">
              <div className="highlight-pic-tag">★ Em destaque</div>
            </div>
            <div className="highlight-body">
              <div className="highlight-name">{p.name}</div>
              <div className="highlight-meta">{p.catLabel} · {p.distance} · {p.responseTime} resposta</div>
              <div className="highlight-row">
                <div className="highlight-rating">
                  <Icon.Star size={12} /> {p.rating.toFixed(1)} · {p.reviews} avaliações
                </div>
                <div className="btn-mini">Ver perfil</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SIGNUP WIZARD ==========
function SignupWizard({ onBack, onComplete }) {
  const [step, setStep] = uS(0);
  const [data, setData] = uS({
    name: '', cnpj: '', email: '', phone: '',
    categories: [], coverage: 'bairro', radius: 5,
    portfolio: [],
    whatsapp: '', accepted: false
  });
  const [done, setDone] = uS(false);

  const steps = [
    { title: 'Dados da empresa', sub: 'Como aparece para os síndicos' },
    { title: 'Quais categorias?', sub: 'Selecione até 3 áreas de atuação' },
    { title: 'Área de atuação', sub: 'Onde você atende?' },
    { title: 'Portfólio', sub: 'Mostre seus melhores trabalhos' },
    { title: 'Contato', sub: 'Como você quer receber pedidos' },
  ];

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggleCat = (id) => {
    setData(d => {
      const cats = d.categories.includes(id)
        ? d.categories.filter(c => c !== id)
        : d.categories.length < 3 ? [...d.categories, id] : d.categories;
      return { ...d, categories: cats };
    });
  };

  const canNext = () => {
    if (step === 0) return data.name && data.cnpj && data.email;
    if (step === 1) return data.categories.length > 0;
    if (step === 2) return true;
    if (step === 3) return true;
    if (step === 4) return data.whatsapp && data.accepted;
    return false;
  };

  const next = () => {
    if (step < 4) setStep(s => s + 1);
    else { setDone(true); setTimeout(() => onComplete(), 1400); }
  };
  const prev = () => step > 0 ? setStep(s => s - 1) : onBack();

  if (done) {
    return (
      <div className="screen">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 24,
            background: 'linear-gradient(140deg, var(--gold-400), var(--gold-500))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--navy-900)', marginBottom: 20,
            boxShadow: '0 12px 30px rgba(201,169,97,0.4)'
          }}>
            <Icon.Check size={36} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 26, color: 'var(--navy-900)', textAlign: 'center', marginBottom: 8 }}>
            Cadastro enviado!
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-500)', textAlign: 'center', maxWidth: 280, lineHeight: 1.5 }}>
            Vamos analisar seus dados em até <strong style={{ color: 'var(--navy-900)' }}>48h úteis</strong>. Você recebe novidades por e-mail e WhatsApp.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button className="screen-back" onClick={prev}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div className="screen-title">Cadastrar fornecedor</div>
      </div>

      <div className="wizard-progress">
        <div className="wizard-steps">
          {steps.map((_, i) => (
            <div key={i} className={`wizard-step ${i < step ? 'done' : i === step ? 'active' : ''}`} />
          ))}
        </div>
        <div className="wizard-meta">
          <span>Etapa {step + 1} de {steps.length}</span>
          <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
        </div>
      </div>

      <div className="screen-body" style={{ paddingBottom: 100 }}>
        <div className="wizard-step-title">{steps[step].title}</div>
        <div className="wizard-step-sub">{steps[step].sub}</div>

        {step === 0 && (
          <>
            <div className="field">
              <div className="field-label">Razão social</div>
              <input className="field-input" placeholder="Ex: Alpha Elétrica Ltda" value={data.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div className="field">
              <div className="field-label">CNPJ</div>
              <input className="field-input" placeholder="00.000.000/0000-00" value={data.cnpj} onChange={e => update('cnpj', e.target.value)} />
            </div>
            <div className="field">
              <div className="field-label">E-mail</div>
              <input className="field-input" placeholder="contato@empresa.com" type="email" value={data.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div className="field">
              <div className="field-label">Telefone</div>
              <input className="field-input" placeholder="(11) 0000-0000" value={data.phone} onChange={e => update('phone', e.target.value)} />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 10 }}>
              <strong>{data.categories.length}/3</strong> selecionadas
            </div>
            <div className="cat-picker">
              {window.CATEGORIES_FULL.slice(1, 11).map(c => {
                const I = window.Icon[c.icon];
                const checked = data.categories.includes(c.id);
                return (
                  <div key={c.id} className={`cat-pick ${checked ? 'checked' : ''}`} onClick={() => toggleCat(c.id)}>
                    <div className="cat-pick-icon"><I /></div>
                    <div className="cat-pick-label">{c.label}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="field">
              <div className="field-label">Atende em quais regiões?</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { id: 'bairro', label: '🏘️ Meu bairro', radius: 3 },
                  { id: 'cidade', label: '🌆 Cidade toda', radius: 30 },
                  { id: 'regiao', label: '🗺️ Região metropolitana', radius: 80 },
                ].map(o => (
                  <button
                    key={o.id}
                    onClick={() => update('coverage', o.id)}
                    style={{
                      flex: 1, padding: '12px 8px', borderRadius: 12,
                      background: data.coverage === o.id ? 'var(--navy-900)' : 'white',
                      color: data.coverage === o.id ? 'white' : 'var(--navy-900)',
                      border: `1px solid ${data.coverage === o.id ? 'var(--gold-500)' : 'var(--bone-300)'}`,
                      fontSize: 11, fontWeight: 600, lineHeight: 1.3,
                      textAlign: 'center'
                    }}
                  >{o.label}</button>
                ))}
              </div>
            </div>
            <div className="field">
              <div className="field-label">Raio de atuação: {data.radius} km</div>
              <input
                type="range" min={1} max={100} value={data.radius}
                onChange={e => update('radius', Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gold-500)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--ink-500)', marginTop: 4 }}>
                <span>1km</span><span>50km</span><span>100km</span>
              </div>
            </div>
            <div style={{
              background: 'var(--gold-100)', border: '1px solid var(--gold-300)',
              borderRadius: 12, padding: 12, fontSize: 12, color: 'var(--ink-700)',
              lineHeight: 1.5, display: 'flex', gap: 8, alignItems: 'flex-start'
            }}>
              <Icon.Pin size={14} />
              <span>Você pode aparecer para <strong>cerca de {Math.round(data.radius * 12)}</strong> condomínios na sua área.</span>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="upload-box">
              <Icon.Plus size={28} />
              <div className="upload-box-title">Adicionar fotos</div>
              <div className="upload-box-sub">JPG ou PNG · até 10 imagens</div>
            </div>
            <div className="portfolio-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="portfolio-item"><span style={{ position:'relative', zIndex:2 }}>{i.toString().padStart(2,'0')}</span></div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <div className="field-label">Anos de mercado</div>
              <input className="field-input" placeholder="Ex: 8" type="number" />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="field">
              <div className="field-label">WhatsApp para receber pedidos</div>
              <input className="field-input" placeholder="(11) 90000-0000" value={data.whatsapp} onChange={e => update('whatsapp', e.target.value)} />
            </div>
            <div className="field">
              <div className="field-label">Horário de atendimento</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="field-input" placeholder="08:00" defaultValue="08:00" style={{ flex: 1 }} />
                <span style={{ alignSelf: 'center', color: 'var(--ink-500)' }}>até</span>
                <input className="field-input" placeholder="18:00" defaultValue="18:00" style={{ flex: 1 }} />
              </div>
            </div>
            <label style={{
              display: 'flex', gap: 10, padding: 14, marginTop: 6,
              background: data.accepted ? 'var(--gold-100)' : 'white',
              border: `1px solid ${data.accepted ? 'var(--gold-500)' : 'var(--bone-300)'}`,
              borderRadius: 12, cursor: 'pointer', alignItems: 'flex-start'
            }}>
              <div style={{
                width: 22, height: 22, flexShrink: 0, borderRadius: 6,
                background: data.accepted ? 'var(--navy-900)' : 'white',
                border: `1.5px solid ${data.accepted ? 'var(--navy-900)' : 'var(--bone-300)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold-400)', marginTop: 1
              }}>
                {data.accepted && <Icon.Check size={14} />}
              </div>
              <input
                type="checkbox" checked={data.accepted}
                onChange={e => update('accepted', e.target.checked)}
                style={{ display: 'none' }}
              />
              <div style={{ fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.5 }}>
                Aceito os <strong style={{ color: 'var(--navy-900)' }}>termos de uso</strong> e a <strong style={{ color: 'var(--navy-900)' }}>política de homologação</strong>. Estou ciente da auditoria documental.
              </div>
            </label>
          </>
        )}
      </div>

      <div className="wizard-cta">
        {step > 0 && (
          <button className="btn-back" onClick={prev}>Voltar</button>
        )}
        <button
          className="btn-primary"
          onClick={next}
          disabled={!canNext()}
          style={{ opacity: canNext() ? 1 : 0.5, marginTop: 0 }}
        >
          {step === 4 ? 'Enviar cadastro' : 'Continuar'}
          <Icon.ChevRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ========== RATE SCREEN ==========
function RateScreen({ provider, onBack, onSent }) {
  const [stars, setStars] = uS(0);
  const [text, setText] = uS('');
  const [tags, setTags] = uS([]);
  const [sent, setSent] = uS(false);

  const tagsList = ['Pontual', 'Preço justo', 'Profissional', 'Limpo', 'Atencioso', 'Resolve rápido'];
  const toggleTag = (t) => setTags(arr => arr.includes(t) ? arr.filter(x => x !== t) : [...arr, t]);

  const submit = () => {
    setSent(true);
    setTimeout(() => onSent(), 1400);
  };

  if (sent) {
    return (
      <div className="screen">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 24,
            background: 'linear-gradient(140deg, var(--gold-400), var(--gold-500))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--navy-900)', marginBottom: 20,
          }}>
            <Icon.Sparkle size={36} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 26, color: 'var(--navy-900)', textAlign: 'center', marginBottom: 8 }}>
            Obrigado!
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-500)', textAlign: 'center' }}>
            Sua avaliação ajuda outros síndicos.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button className="screen-back" onClick={onBack}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div className="screen-title">Avaliar prestador</div>
      </div>
      <div className="screen-body" style={{ paddingBottom: 100 }}>
        <div className="rate-screen">
          <div className="rate-avatar">{provider.avatar}</div>
          <div className="rate-q">Como foi sua experiência<br />com <em style={{ fontStyle: 'italic', color: 'var(--gold-500)' }}>{provider.name}</em>?</div>
          <div className="rate-sub">Sua avaliação é verificada via assinatura digital de síndico</div>
          <div className="rate-stars">
            {[1,2,3,4,5].map(n => (
              <div key={n} className={`rate-star ${stars >= n ? 'active' : ''}`} onClick={() => setStars(n)}>
                <Icon.Star size={42} filled={stars >= n} />
              </div>
            ))}
          </div>
          {stars > 0 && (
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: 'var(--navy-900)', marginBottom: 18 }}>
              {['', 'Decepcionante', 'Pode melhorar', 'Razoável', 'Muito bom!', 'Excelente!'][stars]}
            </div>
          )}
        </div>

        {stars > 0 && (
          <div style={{ animation: 'fadeUp 0.3s' }}>
            <div className="field-label">Pontos positivos</div>
            <div className="rate-tags">
              {tagsList.map(t => (
                <div key={t} className={`rate-tag ${tags.includes(t) ? 'active' : ''}`} onClick={() => toggleTag(t)}>
                  {t}
                </div>
              ))}
            </div>
            <div className="field-label">Conta o que rolou (opcional)</div>
            <textarea
              className="rate-textarea"
              placeholder="Ex: chegou no horário, resolveu o problema rapidinho, equipe educada…"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="sticky-cta" style={{ display: 'block' }}>
        <button
          className="btn-primary"
          onClick={submit}
          disabled={stars === 0}
          style={{ opacity: stars > 0 ? 1 : 0.5, marginTop: 0 }}
        >
          <Icon.Send /> Publicar avaliação
        </button>
      </div>
    </div>
  );
}

// ========== FAVORITES SCREEN ==========
function FavoritesScreen({ favorites, onBack, onProvider, onFav }) {
  const [tab, setTab] = uS('prestadores');
  const favProviders = window.PROVIDERS_DB.filter(p => favorites.has(p.id));

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button className="screen-back" onClick={onBack}><Icon.ChevRight size={16} style={{transform:'rotate(180deg)'}}/></button>
        <div className="screen-title">Favoritos</div>
      </div>
      <div className="screen-body">
        <div className="tabs">
          {['prestadores', 'categorias', 'pedidos'].map(t => (
            <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </div>
          ))}
        </div>

        {tab === 'prestadores' && (
          <>
            {favProviders.length === 0 ? (
              <div className="empty-state">
                <Icon.Heart size={50} />
                <div className="empty-state-title">Nenhum favorito ainda</div>
                <div className="empty-state-sub">Toque no ❤️ pra salvar prestadores</div>
              </div>
            ) : (
              <div className="providers">
                {favProviders.map(p => (
                  <div key={p.id} className="provider" onClick={() => onProvider(p)}>
                    <div className={`provider-avatar ${p.verified ? 'verified' : ''}`}>{p.avatar}</div>
                    <div className="provider-info">
                      <div className="provider-name">{p.name}{p.badge && <span className="provider-badge">{p.badge}</span>}</div>
                      <div className="provider-cat">{p.catLabel}</div>
                      <div className="provider-meta">
                        <div className="provider-rating"><Icon.Star size={11} /> {p.rating.toFixed(1)}</div>
                        <span style={{ color: 'var(--ink-300)' }}>·</span>
                        <span>{p.distance}</span>
                      </div>
                    </div>
                    <button className="provider-fav active" onClick={e => { e.stopPropagation(); onFav(p.id); }}>
                      <Icon.Heart size={18} filled />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'categorias' && (
          <div className="empty-state">
            <Icon.Building />
            <div className="empty-state-title">Categorias salvas</div>
            <div className="empty-state-sub">Em breve: salve categorias inteiras</div>
          </div>
        )}

        {tab === 'pedidos' && (
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

window.ProviderDetail = ProviderDetail;
window.CategoryScreen = CategoryScreen;
window.AllCategoriesScreen = AllCategoriesScreen;
window.HighlightsScreen = HighlightsScreen;
window.SignupWizard = SignupWizard;
window.RateScreen = RateScreen;
window.FavoritesScreen = FavoritesScreen;
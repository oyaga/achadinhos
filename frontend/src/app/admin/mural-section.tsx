"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  getImageUrl,
  type ApiBanner,
  type ApiEvent,
  type BannerPlacement,
} from "@/lib/api";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

// Sub-abas do Mural. "hero" e "eventos" são os placements legados dos banners;
// os rótulos exibidos são "Slide principal" e "Anúncios". A sub-aba "agenda"
// lista os eventos (fonte: aba Eventos).
type SubTab = "hero" | "anuncios" | "eventos";

interface FormState {
  title: string;
  subtitle: string;
  link_url: string;
  starts_at: string; // "AAAA-MM-DD" ou ""
  ends_at: string;   // "AAAA-MM-DD" ou ""
  active: boolean;
}

const EMPTY: FormState = {
  title: "",
  subtitle: "",
  link_url: "",
  starts_at: "",
  ends_at: "",
  active: true,
};

const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";

const MONTH_ABBR = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
] as const;

const MONTH_ABBR_UP = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
] as const;

// "AAAA-MM-DD" local de hoje (sem fuso — mesma regra do restante do app).
function todayYmd(): string {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

// "2026-07-20"/"2026-07-31" -> "20–31 jul" · meses diferentes -> "20 jul – 5 ago".
function formatPeriod(starts: string | null, ends: string | null): string | null {
  const parse = (iso: string | null) => {
    if (!iso) return null;
    const [, m, d] = iso.slice(0, 10).split("-").map(Number);
    return m && d ? { m, d } : null;
  };
  const s = parse(starts);
  const e = parse(ends);
  if (s && e) {
    if (s.m === e.m) return `${s.d}–${e.d} ${MONTH_ABBR[s.m - 1]}`;
    return `${s.d} ${MONTH_ABBR[s.m - 1]} – ${e.d} ${MONTH_ABBR[e.m - 1]}`;
  }
  if (s) return `a partir de ${s.d} ${MONTH_ABBR[s.m - 1]}`;
  if (e) return `até ${e.d} ${MONTH_ABBR[e.m - 1]}`;
  return null;
}

// Agendamento do banner em relação a hoje (comparação por string local).
function scheduleInfo(b: ApiBanner, today: string): { label: string; out: boolean } {
  const starts = b.starts_at ? b.starts_at.slice(0, 10) : null;
  const ends = b.ends_at ? b.ends_at.slice(0, 10) : null;
  if (!starts && !ends) return { label: "sem agendamento · sempre visível", out: false };
  const out = (starts !== null && today < starts) || (ends !== null && today > ends);
  return { label: `Agendado ${formatPeriod(starts, ends)}`, out };
}

// "2026-07-03" -> { month: "JUL", day: "03" } para o tile de data.
function eventDateParts(iso: string): { month: string; day: string } | null {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return null;
  return { month: MONTH_ABBR_UP[m - 1], day: String(d).padStart(2, "0") };
}

// "2026-07-03" + "19:00" -> "03 jul, 19h"
function formatEventShort(iso: string, time: string): string {
  const [, m, d] = iso.slice(0, 10).split("-").map(Number);
  const date = m && d ? `${String(d).padStart(2, "0")} ${MONTH_ABBR[m - 1]}` : iso.slice(0, 10);
  if (!time) return date;
  const [h, min] = time.split(":");
  const t = min && min !== "00" ? `${Number(h)}h${min}` : `${Number(h)}h`;
  return `${date}, ${t}`;
}

interface MuralSectionProps {
  // "＋ Novo evento" na sub-aba Eventos leva à aba Eventos do painel.
  onGoEventos?: () => void;
}

export function MuralSection({ onGoEventos }: MuralSectionProps) {
  const [banners, setBanners] = useState<ApiBanner[]>([]);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [subtab, setSubtab] = useState<SubTab>("hero");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [imageUrl, setImageUrl] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Drag-and-drop (HTML5 nativo, sem lib).
  const [dragId, setDragId] = useState<string | null>(null);
  const orderChanged = useRef(false);

  const today = todayYmd();

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [bs, evs] = await Promise.all([adminApi.listBanners(), adminApi.listEvents()]);
      setBanners([...bs].sort((a, b) => a.position - b.position));
      setEvents(evs);
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const heroBanners = useMemo(() => banners.filter((b) => b.placement === "hero"), [banners]);
  const adBanners = useMemo(() => banners.filter((b) => b.placement === "eventos"), [banners]);

  // Eventos: futuros primeiro (mais próximo no topo), passados depois.
  const sortedEvents = useMemo(() => {
    const key = (ev: ApiEvent) => `${ev.event_date.slice(0, 10)} ${ev.event_time}`;
    const future = events.filter((ev) => ev.event_date.slice(0, 10) >= today)
      .sort((a, b) => key(a).localeCompare(key(b)));
    const past = events.filter((ev) => ev.event_date.slice(0, 10) < today)
      .sort((a, b) => key(b).localeCompare(key(a)));
    return [...future, ...past];
  }, [events, today]);

  const activeList = subtab === "hero" ? heroBanners : adBanners;
  const activePlacement: BannerPlacement = subtab === "hero" ? "hero" : "eventos";

  function switchTab(next: SubTab) {
    setSubtab(next);
    setFormOpen(false);
    setDragId(null);
  }

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY);
    setImageUrl("");
    setPendingImage(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(b: ApiBanner) {
    setEditingId(b.id);
    setForm({
      title: b.title,
      subtitle: b.subtitle,
      link_url: b.link_url,
      starts_at: b.starts_at ? b.starts_at.slice(0, 10) : "",
      ends_at: b.ends_at ? b.ends_at.slice(0, 10) : "",
      active: b.active,
    });
    setImageUrl(b.image_url);
    setPendingImage(null);
    setFormError(null);
    setFormOpen(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!editingId && !pendingImage) {
      setFormError("Envie a imagem do slide.");
      return;
    }
    const link = form.link_url.trim();
    if (link && !/^https?:\/\//i.test(link) && !link.startsWith("/")) {
      setFormError("Link deve começar com https:// ou / (caminho do site).");
      return;
    }
    if (form.starts_at && form.ends_at && form.ends_at < form.starts_at) {
      setFormError("O fim do período não pode ser antes do início.");
      return;
    }
    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      link_url: link,
      placement: activePlacement,
      active: form.active,
      starts_at: form.starts_at, // "" limpa a data no PATCH
      ends_at: form.ends_at,
    };
    setSubmitting(true);
    try {
      // O upload da imagem exige o id — no CREATE sobe após criar o banner.
      let bannerId = editingId;
      if (editingId) {
        await adminApi.updateBanner(editingId, payload);
      } else {
        const created = await adminApi.createBanner({
          ...payload,
          position: activeList.length, // entra no fim da sub-aba
        });
        bannerId = created.id;
      }
      if (bannerId && pendingImage) {
        await adminApi.uploadBannerImage(bannerId, pendingImage);
      }
      setFormOpen(false);
      setPendingImage(null);
      setImageUrl("");
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(b: ApiBanner) {
    try {
      await adminApi.updateBanner(b.id, { placement: b.placement, active: !b.active });
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível atualizar.");
    }
  }

  async function handleDelete(b: ApiBanner) {
    const kind = b.placement === "hero" ? "slide" : "anúncio";
    if (!window.confirm(`Excluir o ${kind} "${b.title || "sem título"}"?`)) return;
    try {
      await adminApi.deleteBanner(b.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    }
  }

  async function toggleHighlight(ev: ApiEvent) {
    try {
      await adminApi.updateEvent(ev.id, { highlight: !ev.highlight });
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível atualizar o destaque.");
    }
  }

  // ── Drag-and-drop: reordena localmente durante o arrasto e persiste no drop ──

  function handleDragStart(e: DragEvent<HTMLDivElement>, id: string) {
    setDragId(id);
    orderChanged.current = false;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id); // exigido pelo Firefox
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>, overId: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!dragId || dragId === overId) return;
    setBanners((prev) => {
      const from = prev.findIndex((b) => b.id === dragId);
      const to = prev.findIndex((b) => b.id === overId);
      if (from < 0 || to < 0 || prev[from].placement !== prev[to].placement) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      orderChanged.current = true;
      return next;
    });
  }

  function handleDragEnd() {
    if (dragId && orderChanged.current) {
      const ids = banners
        .filter((b) => b.placement === activePlacement)
        .map((b) => b.id);
      orderChanged.current = false;
      void adminApi.reorderBanners(ids).catch((err) => {
        window.alert(err instanceof ApiError ? err.message : "Não foi possível reordenar.");
        void refresh();
      });
    }
    setDragId(null);
  }

  const newButton =
    subtab === "eventos" ? (
      <button type="button" className="admin-new-btn" onClick={() => onGoEventos?.()}>
        <Icon.Plus size={16} />
        Novo evento
      </button>
    ) : (
      <button type="button" className="admin-new-btn" onClick={openCreate}>
        <Icon.Plus size={16} />
        Novo slide
      </button>
    );

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Mural do condomínio</h2>
          <p className="admin-section-sub">
            Controle o que aparece no widget da home — slide principal, anúncios e eventos.
          </p>
        </div>
        {!formOpen && newButton}
      </div>

      <div className="mural-subtabs" role="tablist" aria-label="Fontes do mural">
        <button
          type="button"
          role="tab"
          aria-selected={subtab === "hero"}
          className={cn("mural-subtab", subtab === "hero" && "active")}
          onClick={() => switchTab("hero")}
        >
          Slide principal <span className="mural-subtab-count">({heroBanners.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subtab === "anuncios"}
          className={cn("mural-subtab", subtab === "anuncios" && "active")}
          onClick={() => switchTab("anuncios")}
        >
          Anúncios <span className="mural-subtab-count">({adBanners.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subtab === "eventos"}
          className={cn("mural-subtab", subtab === "eventos" && "active")}
          onClick={() => switchTab("eventos")}
        >
          Eventos <span className="mural-subtab-count">({events.length})</span>
        </button>
      </div>

      {formOpen && subtab !== "eventos" && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-title">
            {editingId
              ? subtab === "hero" ? "Editar slide" : "Editar anúncio"
              : subtab === "hero" ? "Novo slide principal" : "Novo anúncio"}
          </div>
          {formError && <div className="prof-alert error" role="alert">{formError}</div>}

          <div className="prof-field">
            <label className="prof-label">Título (opcional, sobreposto à imagem)</label>
            <input
              className="prof-input"
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ex: Feirão de serviços de julho"
              autoFocus
            />
          </div>

          <div className="prof-field">
            <label className="prof-label">Subtítulo (opcional)</label>
            <input
              className="prof-input"
              type="text"
              value={form.subtitle}
              onChange={(e) => update("subtitle", e.target.value)}
              placeholder="Ex: Até 30% off com afiliados certificados"
            />
          </div>

          <div className="prof-field">
            <label className="prof-label">Link ao tocar (opcional)</label>
            <input
              className="prof-input"
              type="text"
              value={form.link_url}
              onChange={(e) => update("link_url", e.target.value)}
              placeholder="https://… ou /categoria/limpeza"
            />
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Início da exibição (opcional)</label>
              <div className="prof-native">
                <input
                  className={cn("prof-input", form.starts_at && "filled")}
                  type="date"
                  value={form.starts_at}
                  onChange={(e) => update("starts_at", e.target.value)}
                />
                {!form.starts_at && <span className="prof-native-ph">dd/mm/aaaa</span>}
              </div>
            </div>
            <div className="prof-field">
              <label className="prof-label">Fim da exibição (opcional)</label>
              <div className="prof-native">
                <input
                  className={cn("prof-input", form.ends_at && "filled")}
                  type="date"
                  value={form.ends_at}
                  onChange={(e) => update("ends_at", e.target.value)}
                />
                {!form.ends_at && <span className="prof-native-ph">dd/mm/aaaa</span>}
              </div>
            </div>
          </div>

          <div className="admin-check-row">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => update("active", e.target.checked)}
              />
              <span className="auth-checkbox-box">
                {form.active && <Icon.Check size={12} />}
              </span>
              <span className="auth-checkbox-text">Ativo (visível no site)</span>
            </label>
          </div>

          <div className="prof-field">
            <label className="prof-label">Imagem</label>
            <div className="admin-photos">
              {pendingImage ? (
                <div className="admin-photo" style={{ width: 128, height: 72 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(pendingImage)} alt="Pré-visualização do slide" />
                  <button
                    type="button"
                    className="admin-photo-remove"
                    onClick={() => setPendingImage(null)}
                    aria-label="Remover imagem"
                  >
                    ×
                  </button>
                </div>
              ) : imageUrl ? (
                <div className="admin-photo" style={{ width: 128, height: 72 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={getImageUrl(imageUrl)} alt="Imagem do slide" />
                </div>
              ) : (
                <label className="admin-photo-add" style={{ width: 128, height: 72 }}>
                  <Icon.Plus size={20} />
                  <input
                    type="file"
                    accept={IMAGE_ACCEPT}
                    className="file-overlay"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setPendingImage(f);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
              {(pendingImage || imageUrl) && (
                <label className="admin-photo-add" style={{ width: 128, height: 72 }}>
                  <Icon.Pencil size={16} />
                  <input
                    type="file"
                    accept={IMAGE_ACCEPT}
                    className="file-overlay"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setPendingImage(f);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>
            <div className="admin-hint">
              Recomendado 1200×675 (16:9). O slide só aparece no site depois de ter imagem.
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="button" className="admin-new-btn ghost" onClick={() => setFormOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="admin-new-btn" disabled={submitting}>
              <Icon.Check size={16} />
              {submitting ? "Salvando…" : "Salvar"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error" role="alert">{loadError}</div>
      ) : subtab === "eventos" ? (
        sortedEvents.length === 0 ? (
          <div className="admin-empty">
            Nenhum evento cadastrado. Crie eventos na aba Eventos — os marcados
            como destaque entram no mural automaticamente.
          </div>
        ) : (
          <>
            <div className="admin-list">
              {sortedEvents.map((ev) => {
                const parts = eventDateParts(ev.event_date);
                const past = ev.event_date.slice(0, 10) < today;
                return (
                  <div key={ev.id} className={cn("mural-row", past && "dimmed")}>
                    <div className="admin-event-date" aria-hidden="true">
                      {parts ? (
                        <>
                          <span className="admin-event-date-month">{parts.month}</span>
                          <span className="admin-event-date-day">{parts.day}</span>
                        </>
                      ) : (
                        <Icon.Calendar size={18} />
                      )}
                    </div>
                    <div className="mural-row-main">
                      <div className="mural-row-title">
                        <span>{ev.title}</span>
                        {ev.highlight && <span className="mural-chip gold">Destaque</span>}
                      </div>
                      <div className="mural-row-meta">
                        Puxado de Eventos · {formatEventShort(ev.event_date, ev.event_time)} ·
                        destaque automático quando marcado
                      </div>
                    </div>
                    <div className="admin-row-actions">
                      <button
                        type="button"
                        className={cn("admin-icon-btn", ev.highlight && "active")}
                        onClick={() => toggleHighlight(ev)}
                        aria-label={
                          ev.highlight ? `Remover destaque de ${ev.title}` : `Destacar ${ev.title}`
                        }
                        title={ev.highlight ? "Remover do mural" : "Destacar no mural"}
                      >
                        <Icon.Star size={15} filled={ev.highlight} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="admin-hint">
              Para criar, editar ou excluir eventos, use a aba Eventos do painel.
            </p>
          </>
        )
      ) : activeList.length === 0 ? (
        <div className="admin-empty">
          {subtab === "hero"
            ? "Nenhum slide principal ainda. Sem slides, a home mostra o cartão de boas-vindas padrão."
            : "Nenhum anúncio ainda. Crie um para aparecer no mural da home."}
        </div>
      ) : (
        <div className="admin-list">
          {activeList.map((b, idx) => {
            const sched = scheduleInfo(b, today);
            return (
              <div
                key={b.id}
                className={cn(
                  "mural-row",
                  dragId === b.id && "dragging",
                  (!b.active || sched.out) && "dimmed",
                )}
                draggable
                onDragStart={(e) => handleDragStart(e, b.id)}
                onDragOver={(e) => handleDragOver(e, b.id)}
                onDrop={(e) => { e.preventDefault(); handleDragEnd(); }}
                onDragEnd={handleDragEnd}
              >
                <span className="mural-grip" aria-hidden="true" title="Arraste para reordenar">
                  <Icon.Grip size={16} />
                </span>
                <div className="mural-thumb" aria-hidden="true">
                  {b.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getImageUrl(b.image_url)} alt="" />
                  ) : (
                    <Icon.Tag size={18} />
                  )}
                </div>
                <div className="mural-row-main">
                  <div className="mural-row-title">
                    <span>{b.title || "(sem título)"}</span>
                    <span className="mural-chip">
                      {subtab === "hero" ? `Slide ${idx + 1}` : "Anúncio"}
                    </span>
                  </div>
                  <div className="mural-row-meta">
                    {subtab === "hero" ? "Banner principal" : "Anúncio"} · {sched.label}
                    {sched.out && <span className="off"> · fora do período de exibição</span>}
                    {!b.image_url && " · sem imagem (não aparece)"}
                  </div>
                </div>
                <label
                  className="mural-switch"
                  title={b.active ? "Visível no site — clique para pausar" : "Pausado — clique para exibir"}
                >
                  <input
                    type="checkbox"
                    checked={b.active}
                    onChange={() => toggleActive(b)}
                    aria-label={b.active ? "Pausar" : "Ativar"}
                  />
                  <span className="mural-switch-track" aria-hidden="true" />
                  <span className="mural-switch-label">{b.active ? "Ativo" : "Pausado"}</span>
                </label>
                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="admin-icon-btn"
                    onClick={() => openEdit(b)}
                    aria-label="Editar"
                  >
                    <Icon.Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn danger"
                    onClick={() => handleDelete(b)}
                    aria-label="Excluir"
                  >
                    <Icon.Trash size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mural-foot-hint">
        Arraste para reordenar. Eventos marcados como destaque entram no slide
        automaticamente. Banners recomendados em 16:9 (1200×675).
      </p>
    </section>
  );
}

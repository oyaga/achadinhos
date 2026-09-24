"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  getImageUrl,
  type ApiEvent,
} from "@/lib/api";
import { formatCEP, stripCEP } from "@/lib/cep";
import { useViaCEP } from "@/hooks/use-via-cep";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

// Um dia do evento no formulário. `id` presente = dia já salvo no backend
// (a imagem dele vive em banner_url); `pending` é a imagem escolhida agora,
// enviada depois do save (o upload precisa do id do dia).
interface DayForm {
  key: number;
  id?: string;
  day: string; // "AAAA-MM-DD"
  time: string; // "HH:MM"
  banner_url: string;
  pending: File | null;
}

interface FormState {
  title: string;
  cep: string;
  location: string;
  description: string;
  highlight: boolean;
}

const EMPTY: FormState = {
  title: "",
  cep: "",
  location: "",
  description: "",
  highlight: false,
};

let dayKeySeq = 1;
function newDay(): DayForm {
  return { key: dayKeySeq++, day: "", time: "", banner_url: "", pending: null };
}

// Formatos aceitos para o banner do evento.
const BANNER_ACCEPT = "image/jpeg,image/png,image/webp";

const MONTH_ABBR = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
] as const;

// "2026-07-03" -> { month: "JUL", day: "03" } para o tile de data.
function eventDateParts(iso: string): { month: string; day: string } | null {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return null;
  return { month: MONTH_ABBR[m - 1], day: String(d).padStart(2, "0") };
}

// "2026-06-25" -> "25 jun 2026"
function formatEventDate(iso: string): string {
  const ymd = iso.slice(0, 10);
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export function EventosSection() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [days, setDays] = useState<DayForm[]>([newDay()]);
  // Banner do destaque (carrossel): URL já salva e arquivo pendente.
  const [bannerUrl, setBannerUrl] = useState("");
  const [pendingBanner, setPendingBanner] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { lookup: lookupCep, loading: cepLoading } = useViaCEP();
  // Evita repetir a consulta do mesmo CEP a cada tecla.
  const lastCepRef = useRef("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setEvents(await adminApi.listEvents());
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY);
    setDays([newDay()]);
    setBannerUrl("");
    setPendingBanner(null);
    setFormError(null);
    lastCepRef.current = "";
    setFormOpen(true);
  }

  function openEdit(ev: ApiEvent) {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      cep: "",
      location: ev.location,
      description: ev.description,
      highlight: ev.highlight ?? false,
    });
    setDays(
      ev.days?.length
        ? ev.days.map((d) => ({
            key: dayKeySeq++,
            id: d.id,
            day: d.day.slice(0, 10),
            time: d.time,
            banner_url: d.banner_url,
            pending: null,
          }))
        : [{
            key: dayKeySeq++,
            day: ev.event_date.slice(0, 10),
            time: ev.event_time,
            banner_url: "",
            pending: null,
          }],
    );
    setBannerUrl(ev.banner_url ?? "");
    setPendingBanner(null);
    setFormError(null);
    lastCepRef.current = "";
    setFormOpen(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateDay(key: number, patch: Partial<DayForm>) {
    setDays((prev) => prev.map((d) => (d.key === key ? { ...d, ...patch } : d)));
  }

  // CEP: com 8 dígitos, busca no ViaCEP e preenche o Local com o endereço
  // (o admin completa com o nome do salão etc.).
  async function onCepChange(raw: string) {
    const formatted = formatCEP(raw);
    update("cep", formatted);
    const digits = stripCEP(formatted);
    if (digits.length !== 8 || digits === lastCepRef.current) return;
    lastCepRef.current = digits;
    const res = await lookupCep(digits);
    if (!res) return;
    const addr = [res.logradouro, res.bairro, `${res.localidade}/${res.uf}`]
      .filter(Boolean)
      .join(", ");
    if (addr) update("location", addr);
  }

  function pickBanner(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setPendingBanner(file);
  }

  // Remove o banner do destaque já salvo no backend (só em modo edição).
  async function removeExistingBanner() {
    if (!editingId) return;
    try {
      await adminApi.deleteEventBanner(editingId);
      setBannerUrl("");
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível remover o banner.");
    }
  }

  // Remove a imagem já salva de um dia (só em modo edição).
  async function removeExistingDayBanner(d: DayForm) {
    if (!editingId || !d.id) return;
    try {
      await adminApi.deleteEventDayBanner(editingId, d.id);
      updateDay(d.key, { banner_url: "" });
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível remover a imagem.");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (form.title.trim().length < 2) {
      setFormError("Informe o título do evento.");
      return;
    }
    const filledDays = days.filter((d) => d.day);
    if (filledDays.length === 0) {
      setFormError("Informe ao menos uma data.");
      return;
    }
    const seen = new Set<string>();
    for (const d of filledDays) {
      if (seen.has(d.day)) {
        setFormError("Há datas repetidas no evento.");
        return;
      }
      seen.add(d.day);
    }
    const payload = {
      title: form.title.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      highlight: form.highlight,
      days: filledDays.map((d) => ({ id: d.id, day: d.day, time: d.time })),
    };
    setSubmitting(true);
    try {
      // Uploads exigem os ids — no CREATE sobem após criar o evento.
      let saved: ApiEvent;
      if (editingId) {
        saved = await adminApi.updateEvent(editingId, payload);
      } else {
        saved = await adminApi.createEvent(payload);
      }
      if (pendingBanner) {
        await adminApi.uploadEventBanner(saved.id, pendingBanner);
      }
      // Casa cada dia do formulário com o dia salvo (por id quando existe;
      // senão por data+hora) para subir a imagem pendente daquele dia.
      const respDays = saved.days ?? [];
      const taken = new Set<string>();
      for (const d of filledDays) {
        if (!d.pending) continue;
        const match = d.id
          ? respDays.find((r) => r.id === d.id)
          : respDays.find(
              (r) =>
                !taken.has(r.id) &&
                r.day.slice(0, 10) === d.day &&
                r.time === d.time,
            );
        if (!match) continue;
        taken.add(match.id);
        await adminApi.uploadEventDayBanner(saved.id, match.id, d.pending);
      }
      setFormOpen(false);
      setPendingBanner(null);
      setBannerUrl("");
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível salvar o evento.");
    } finally {
      setSubmitting(false);
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

  async function handleDelete(ev: ApiEvent) {
    if (!window.confirm(`Excluir o evento "${ev.title}"?`)) return;
    try {
      await adminApi.deleteEvent(ev.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    }
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Eventos</h2>
          <p className="admin-section-sub">{events.length} evento(s)</p>
        </div>
        {!formOpen && (
          <button type="button" className="admin-new-btn" onClick={openCreate}>
            <Icon.Plus size={16} />
            Novo evento
          </button>
        )}
      </div>

      {formOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-title">{editingId ? "Editar evento" : "Novo evento"}</div>
          {formError && <div className="prof-alert error" role="alert">{formError}</div>}

          <div className="prof-field">
            <label className="prof-label">Título</label>
            <input
              className="prof-input"
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ex: Assembleia geral ordinária"
              autoFocus
            />
          </div>

          <div className="prof-field">
            <label className="prof-label">Datas do evento</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {days.map((d) => (
                <div
                  key={d.key}
                  style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}
                >
                  <div className="prof-native" style={{ flex: "1 1 140px" }}>
                    <input
                      className={cn("prof-input", d.day && "filled")}
                      type="date"
                      value={d.day}
                      onChange={(e) => updateDay(d.key, { day: e.target.value })}
                    />
                    {!d.day && <span className="prof-native-ph">dd/mm/aaaa</span>}
                  </div>
                  <div className="prof-native" style={{ flex: "0 1 110px" }}>
                    <input
                      className={cn("prof-input", d.time && "filled")}
                      type="time"
                      value={d.time}
                      onChange={(e) => updateDay(d.key, { time: e.target.value })}
                    />
                    {!d.time && <span className="prof-native-ph">--:--</span>}
                  </div>

                  {d.pending ? (
                    <div className="admin-photo" style={{ width: 96, height: 54 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={URL.createObjectURL(d.pending)} alt="Imagem do dia" />
                      <button
                        type="button"
                        className="admin-photo-remove"
                        onClick={() => updateDay(d.key, { pending: null })}
                        aria-label="Remover imagem do dia"
                      >
                        ×
                      </button>
                    </div>
                  ) : d.banner_url ? (
                    <div className="admin-photo" style={{ width: 96, height: 54 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getImageUrl(d.banner_url)} alt="Imagem do dia" />
                      <button
                        type="button"
                        className="admin-photo-remove"
                        onClick={() => void removeExistingDayBanner(d)}
                        aria-label="Remover imagem do dia"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label
                      className="admin-photo-add"
                      style={{ width: 96, height: 54 }}
                      title="Imagem deste dia (opcional)"
                    >
                      <Icon.Plus size={16} />
                      <input
                        type="file"
                        accept={BANNER_ACCEPT}
                        className="file-overlay"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) updateDay(d.key, { pending: f });
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}

                  {days.length > 1 && (
                    <button
                      type="button"
                      className="admin-icon-btn danger"
                      onClick={() => setDays((prev) => prev.filter((x) => x.key !== d.key))}
                      aria-label="Remover esta data"
                      title="Remover esta data"
                    >
                      <Icon.Trash size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="admin-new-btn ghost"
                style={{ alignSelf: "flex-start" }}
                onClick={() => setDays((prev) => [...prev, newDay()])}
              >
                <Icon.Plus size={14} />
                Adicionar data
              </button>
            </div>
            <div className="admin-hint">
              Cada data pode ter a própria imagem (opcional) — ela aparece no
              lugar do banner do evento naquele dia.
            </div>
          </div>

          <div className="prof-row-fields">
            <div className="prof-field" style={{ maxWidth: 160 }}>
              <label className="prof-label">CEP do local</label>
              <input
                className="prof-input"
                type="text"
                inputMode="numeric"
                value={form.cep}
                onChange={(e) => void onCepChange(e.target.value)}
                placeholder="00000-000"
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">
                Local{cepLoading ? " · buscando CEP…" : ""}
              </label>
              <input
                className="prof-input"
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Ex: Salão de festas"
              />
            </div>
          </div>
          <div className="admin-hint">
            Informe o CEP para preencher o endereço automaticamente e complete
            com o ponto de referência (ex.: salão de festas, bloco B).
          </div>

          <div className="prof-field">
            <label className="prof-label">Descrição</label>
            <textarea
              className="prof-textarea"
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Detalhes do evento (opcional)"
            />
          </div>

          <div className="admin-check-row">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={form.highlight}
                onChange={(e) => update("highlight", e.target.checked)}
              />
              <span className="auth-checkbox-box">
                {form.highlight && <Icon.Check size={12} />}
              </span>
              <span className="auth-checkbox-text">
                Em destaque (aparece no carrossel da home)
              </span>
            </label>
          </div>

          <div className="prof-field">
            <label className="prof-label">Banner</label>
            <div className="admin-photos">
              {pendingBanner ? (
                <div className="admin-photo" style={{ width: 128, height: 72 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(pendingBanner)} alt="Pré-visualização do banner" />
                  <button
                    type="button"
                    className="admin-photo-remove"
                    onClick={() => setPendingBanner(null)}
                    aria-label="Remover banner"
                  >
                    ×
                  </button>
                </div>
              ) : bannerUrl ? (
                <div className="admin-photo" style={{ width: 128, height: 72 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={getImageUrl(bannerUrl)} alt="Banner do evento" />
                  <button
                    type="button"
                    className="admin-photo-remove"
                    onClick={() => void removeExistingBanner()}
                    aria-label="Remover banner"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="admin-photo-add" style={{ width: 128, height: 72 }}>
                  <Icon.Plus size={20} />
                  <input
                    type="file"
                    accept={BANNER_ACCEPT}
                    className="file-overlay"
                    onChange={(e) => { pickBanner(e.target.files); e.target.value = ""; }}
                  />
                </label>
              )}
            </div>
            <div className="admin-hint">
              O banner aparece no destaque da home (recomendado 1200×675, 16:9)
              e nos dias sem imagem própria.
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
      ) : events.length === 0 ? (
        <div className="admin-empty">Nenhum evento cadastrado ainda.</div>
      ) : (
        <div className="admin-list">
          {events.map((ev) => {
            const parts = eventDateParts(ev.event_date);
            const dayCount = ev.days?.length ?? 1;
            return (
            <div key={ev.id} className="admin-row">
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
              <div className="admin-row-main">
                <div className="admin-row-name">{ev.title}</div>
                <div className="admin-row-meta">
                  {formatEventDate(ev.event_date)}
                  {dayCount > 1 ? ` · ${dayCount} datas` : ""}
                  {ev.event_time ? ` · ${ev.event_time}` : ""}
                  {ev.location ? ` · ${ev.location}` : ""}
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
                  title={ev.highlight ? "Remover do carrossel" : "Adicionar ao carrossel"}
                >
                  <Icon.Star size={15} filled={ev.highlight} />
                </button>
                <button
                  type="button"
                  className="admin-icon-btn"
                  onClick={() => openEdit(ev)}
                  aria-label={`Editar ${ev.title}`}
                >
                  <Icon.Pencil size={15} />
                </button>
                <button
                  type="button"
                  className="admin-icon-btn danger"
                  onClick={() => handleDelete(ev)}
                  aria-label={`Excluir ${ev.title}`}
                >
                  <Icon.Trash size={15} />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

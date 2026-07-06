"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  getImageUrl,
  type ApiEvent,
} from "@/lib/api";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface FormState {
  title: string;
  event_date: string; // "AAAA-MM-DD"
  event_time: string; // "HH:MM"
  location: string;
  description: string;
  highlight: boolean;
}

const EMPTY: FormState = {
  title: "",
  event_date: "",
  event_time: "",
  location: "",
  description: "",
  highlight: false,
};

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
  // Banner: URL já salva no backend (edição) e arquivo pendente de envio.
  const [bannerUrl, setBannerUrl] = useState("");
  const [pendingBanner, setPendingBanner] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
    setBannerUrl("");
    setPendingBanner(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(ev: ApiEvent) {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      event_date: ev.event_date.slice(0, 10),
      event_time: ev.event_time,
      location: ev.location,
      description: ev.description,
      highlight: ev.highlight ?? false,
    });
    setBannerUrl(ev.banner_url ?? "");
    setPendingBanner(null);
    setFormError(null);
    setFormOpen(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function pickBanner(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setPendingBanner(file);
  }

  // Remove o banner já salvo no backend (só existe em modo edição).
  async function removeExistingBanner() {
    if (!editingId) return;
    try {
      await adminApi.deleteEventBanner(editingId);
      setBannerUrl("");
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível remover o banner.");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (form.title.trim().length < 2) {
      setFormError("Informe o título do evento.");
      return;
    }
    if (!form.event_date) {
      setFormError("Informe a data do evento.");
      return;
    }
    const payload = {
      title: form.title.trim(),
      event_date: form.event_date,
      event_time: form.event_time,
      location: form.location.trim(),
      description: form.description.trim(),
      highlight: form.highlight,
    };
    setSubmitting(true);
    try {
      // O upload do banner exige o id — no CREATE sobe após criar o evento.
      let eventId = editingId;
      if (editingId) {
        await adminApi.updateEvent(editingId, payload);
      } else {
        const created = await adminApi.createEvent(payload);
        eventId = created.id;
      }
      if (eventId && pendingBanner) {
        await adminApi.uploadEventBanner(eventId, pendingBanner);
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

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Data</label>
              <div className="prof-native">
                <input
                  className={cn("prof-input", form.event_date && "filled")}
                  type="date"
                  value={form.event_date}
                  onChange={(e) => update("event_date", e.target.value)}
                />
                {!form.event_date && <span className="prof-native-ph">dd/mm/aaaa</span>}
              </div>
            </div>
            <div className="prof-field">
              <label className="prof-label">Hora</label>
              <div className="prof-native">
                <input
                  className={cn("prof-input", form.event_time && "filled")}
                  type="time"
                  value={form.event_time}
                  onChange={(e) => update("event_time", e.target.value)}
                />
                {!form.event_time && <span className="prof-native-ph">--:--</span>}
              </div>
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Local</label>
            <input
              className="prof-input"
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Ex: Salão de festas"
            />
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
              O banner aparece no destaque da home (recomendado 1200×675, 16:9).
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

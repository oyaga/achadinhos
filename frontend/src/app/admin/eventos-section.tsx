"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
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
}

const EMPTY: FormState = {
  title: "",
  event_date: "",
  event_time: "",
  location: "",
  description: "",
};

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
    });
    setFormError(null);
    setFormOpen(true);
  }

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
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
    };
    setSubmitting(true);
    try {
      if (editingId) await adminApi.updateEvent(editingId, payload);
      else await adminApi.createEvent(payload);
      setFormOpen(false);
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível salvar o evento.");
    } finally {
      setSubmitting(false);
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
          {events.map((ev) => (
            <div key={ev.id} className="admin-row">
              <div className="admin-row-avatar">
                <Icon.Calendar size={18} />
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
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

// Admin · Agenda — conexão com o Google Agenda e configurações do booking
// público (/agendar/[slug]).

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  type AdminAgendaBooking,
  type AgendaSettings,
  type AgendaWorkHours,
} from "@/lib/api";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

// Formata o intervalo de um agendamento no fuso da agenda, ex:
// "ter., 15 de jul. de 2026 · 14:00–15:00".
function formatBookingWhen(b: AdminAgendaBooking): string {
  const tz = b.timezone || "America/Sao_Paulo";
  const start = new Date(b.starts_at);
  const end = new Date(b.ends_at);
  const date = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: tz,
  }).format(start);
  const time = (d: Date) =>
    new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: tz,
    }).format(d);
  return `${date} · ${time(start)}–${time(end)}`;
}

const WEEKDAYS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;

interface DayWindow {
  enabled: boolean;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

interface FormState {
  display_name: string;
  title: string;
  duration_min: string;
  buffer_min: string;
  lead_time_min: string;
  horizon_days: string;
  active: boolean;
  days: DayWindow[]; // índice 0=domingo .. 6=sábado
}

const DEFAULT_WINDOW = { start: "09:00", end: "18:00" };

function daysFromWorkHours(wh: AgendaWorkHours | null | undefined): DayWindow[] {
  return Array.from({ length: 7 }, (_, d) => {
    const windows = wh?.[String(d)] ?? [];
    const first = windows[0];
    return {
      enabled: Boolean(first),
      start: first?.start ?? DEFAULT_WINDOW.start,
      end: first?.end ?? DEFAULT_WINDOW.end,
    };
  });
}

// v1: uma janela por dia — a API aceita lista, então enviamos [{start,end}].
function workHoursFromDays(days: DayWindow[]): AgendaWorkHours {
  const wh: AgendaWorkHours = {};
  days.forEach((day, d) => {
    if (day.enabled) wh[String(d)] = [{ start: day.start, end: day.end }];
  });
  return wh;
}

function settingsToForm(s: AgendaSettings): FormState {
  return {
    display_name: s.display_name ?? "",
    title: s.title ?? "",
    duration_min: String(s.duration_min ?? 60),
    buffer_min: String(s.buffer_min ?? 0),
    lead_time_min: String(s.lead_time_min ?? 0),
    horizon_days: String(s.horizon_days ?? 21),
    active: Boolean(s.active),
    days: daysFromWorkHours(s.work_hours),
  };
}

export function AgendaSection() {
  const [settings, setSettings] = useState<AgendaSettings | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveOk, setSaveOk] = useState(false);

  const [googleBusy, setGoogleBusy] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  // Aviso pós-OAuth: o callback do Google redireciona para /admin?agenda=conectada.
  const [justConnected, setJustConnected] = useState(false);

  const [bookings, setBookings] = useState<AdminAgendaBooking[]>([]);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    setBookingsError(null);
    try {
      setBookings(await adminApi.agendaBookings());
    } catch (err) {
      setBookingsError(
        err instanceof ApiError ? err.message : "Erro ao carregar os agendamentos.",
      );
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const s = await adminApi.agendaGet();
      setSettings(s);
      setForm(settingsToForm(s));
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    void loadBookings();
  }, [refresh, loadBookings]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("agenda") === "conectada") {
      setJustConnected(true);
      params.delete("agenda");
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${qs ? `?${qs}` : ""}`,
      );
    }
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    setSaveOk(false);
  }

  function updateDay(index: number, patch: Partial<DayWindow>) {
    setForm((prev) => {
      if (!prev) return prev;
      const days = prev.days.map((d, i) => (i === index ? { ...d, ...patch } : d));
      return { ...prev, days };
    });
    setSaveOk(false);
  }

  async function handleConnect() {
    setGoogleError(null);
    setGoogleBusy(true);
    try {
      const { url } = await adminApi.agendaGoogleUrl();
      window.location.href = url;
    } catch (err) {
      setGoogleError(
        err instanceof ApiError ? err.message : "Não foi possível iniciar a conexão.",
      );
      setGoogleBusy(false);
    }
  }

  async function handleDisconnect() {
    if (
      !window.confirm(
        "Desconectar o Google Agenda? A página pública de agendamento ficará indisponível até reconectar.",
      )
    ) {
      return;
    }
    setGoogleError(null);
    setGoogleBusy(true);
    try {
      await adminApi.agendaGoogleDisconnect();
      setJustConnected(false);
      await refresh();
    } catch (err) {
      setGoogleError(
        err instanceof ApiError ? err.message : "Não foi possível desconectar.",
      );
    } finally {
      setGoogleBusy(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form || !settings) return;
    setSaveError(null);
    setSaveOk(false);

    if (form.display_name.trim().length < 2) {
      setSaveError("Informe o nome exibido na página de agendamento.");
      return;
    }
    const duration = Number(form.duration_min);
    if (!Number.isFinite(duration) || duration < 5) {
      setSaveError("Duração inválida — informe os minutos de cada sessão (mín. 5).");
      return;
    }
    const buffer = Number(form.buffer_min);
    const lead = Number(form.lead_time_min);
    const horizon = Number(form.horizon_days);
    if (!Number.isFinite(buffer) || buffer < 0) {
      setSaveError("Intervalo entre sessões inválido.");
      return;
    }
    if (!Number.isFinite(lead) || lead < 0) {
      setSaveError("Antecedência mínima inválida.");
      return;
    }
    if (!Number.isFinite(horizon) || horizon < 1) {
      setSaveError("Janela de agendamento inválida (mín. 1 dia).");
      return;
    }
    for (let d = 0; d < 7; d++) {
      const day = form.days[d];
      if (day.enabled && (!day.start || !day.end || day.start >= day.end)) {
        setSaveError(`Horário inválido em ${WEEKDAYS[d]}: o início deve vir antes do fim.`);
        return;
      }
    }

    setSaving(true);
    try {
      const updated = await adminApi.agendaUpdate({
        slug: settings.slug,
        display_name: form.display_name.trim(),
        title: form.title.trim(),
        duration_min: duration,
        buffer_min: buffer,
        timezone: settings.timezone,
        work_hours: workHoursFromDays(form.days),
        active: form.active,
        lead_time_min: lead,
        horizon_days: horizon,
      });
      setSettings(updated);
      setForm(settingsToForm(updated));
      setSaveOk(true);
    } catch (err) {
      setSaveError(
        err instanceof ApiError ? err.message : "Não foi possível salvar as configurações.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="admin-section">
        <div className="admin-empty">Carregando…</div>
      </section>
    );
  }

  if (loadError || !form || !settings) {
    return (
      <section className="admin-section">
        <div className="prof-alert error" role="alert">
          {loadError ?? "Erro ao carregar."}
        </div>
        <button type="button" className="admin-new-btn ghost" onClick={() => void refresh()}>
          Tentar novamente
        </button>
      </section>
    );
  }

  const publicPath = `/agendar/${settings.slug}/`;

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Agenda</h2>
          <p className="admin-section-sub">
            Página pública:{" "}
            <a href={publicPath} target="_blank" rel="noopener noreferrer">
              {publicPath}
            </a>
          </p>
        </div>
      </div>

      {justConnected && (
        <div className="prof-alert success" role="alert">
          Google Agenda conectado com sucesso! Os horários já podem ser reservados.
        </div>
      )}

      {/* Conexão Google */}
      <div className="agd-admin-google">
        <div className="agd-admin-google-status">
          <span
            className={cn("agd-admin-dot", settings.connected ? "on" : "off")}
            aria-hidden
          />
          <div>
            <div className="agd-admin-google-title">Google Agenda</div>
            <div className="agd-admin-google-sub">
              {settings.connected
                ? "Conectado — os eventos e links do Meet são criados automaticamente."
                : "Não conectado — conecte para liberar a página de agendamento."}
            </div>
          </div>
        </div>
        {settings.connected ? (
          <button
            type="button"
            className="admin-new-btn ghost"
            onClick={() => void handleDisconnect()}
            disabled={googleBusy}
          >
            <Icon.X size={15} />
            {googleBusy ? "Desconectando…" : "Desconectar"}
          </button>
        ) : (
          <button
            type="button"
            className="admin-new-btn"
            onClick={() => void handleConnect()}
            disabled={googleBusy}
          >
            <Icon.Calendar size={15} />
            {googleBusy ? "Abrindo…" : "Conectar Google Agenda"}
          </button>
        )}
      </div>
      {googleError && (
        <div className="prof-alert error" role="alert">
          {googleError}
        </div>
      )}

      {/* Agendamentos — para conferência cruzada com o Google Agenda */}
      <div className="agd-admin-bookings">
        <div className="agd-admin-bookings-head">
          <span className="agd-admin-bookings-title">Agendamentos</span>
          <div className="agd-admin-bookings-actions">
            {bookings.length > 0 && (
              <span className="agd-admin-bookings-count">
                {bookings.length} {bookings.length === 1 ? "reserva" : "reservas"}
              </span>
            )}
            <button
              type="button"
              className="admin-new-btn ghost"
              onClick={() => void loadBookings()}
            >
              <Icon.Calendar size={14} />
              Atualizar
            </button>
          </div>
        </div>
        {bookingsError ? (
          <div className="prof-alert error" role="alert">
            {bookingsError}
          </div>
        ) : bookings.length === 0 ? (
          <div className="admin-empty">
            Nenhum agendamento ainda. As reservas feitas em {publicPath} aparecem aqui.
          </div>
        ) : (
          <div className="agd-admin-booking-list">
            {bookings.map((b) => {
              const past = new Date(b.ends_at).getTime() < Date.now();
              return (
                <div className={cn("agd-admin-booking", past && "past")} key={b.id}>
                  <div className="agd-admin-booking-top">
                    <span className="agd-admin-booking-when">{formatBookingWhen(b)}</span>
                    <span className="agd-admin-booking-name">{b.name}</span>
                  </div>
                  <div className="agd-admin-booking-meta">
                    <a href={`mailto:${b.email}`}>{b.email}</a>
                    {b.whatsapp && <span>WhatsApp: {b.whatsapp}</span>}
                    {b.meet_link && (
                      <a href={b.meet_link} target="_blank" rel="noopener noreferrer">
                        Google Meet
                      </a>
                    )}
                  </div>
                  {b.notes && <div className="agd-admin-booking-notes">{b.notes}</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Configurações */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-title">Configurações do agendamento</div>
        {saveError && (
          <div className="prof-alert error" role="alert">
            {saveError}
          </div>
        )}
        {saveOk && (
          <div className="prof-alert success" role="alert">
            Configurações salvas.
          </div>
        )}

        <div className="prof-row-fields">
          <div className="prof-field">
            <label className="prof-label" htmlFor="agd-adm-name">
              Nome exibido
            </label>
            <input
              id="agd-adm-name"
              className="prof-input"
              type="text"
              value={form.display_name}
              onChange={(e) => update("display_name", e.target.value)}
              placeholder="Ex: Lígia"
            />
          </div>
          <div className="prof-field">
            <label className="prof-label" htmlFor="agd-adm-title">
              Título / cargo
            </label>
            <input
              id="agd-adm-title"
              className="prof-input"
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ex: Consultoria para síndicos"
            />
          </div>
        </div>

        <div className="agd-admin-nums">
          <div className="prof-field">
            <label className="prof-label" htmlFor="agd-adm-duration">
              Duração (min)
            </label>
            <input
              id="agd-adm-duration"
              className="prof-input"
              type="number"
              inputMode="numeric"
              min={5}
              step={5}
              value={form.duration_min}
              onChange={(e) => update("duration_min", e.target.value)}
            />
          </div>
          <div className="prof-field">
            <label className="prof-label" htmlFor="agd-adm-buffer">
              Intervalo (min)
            </label>
            <input
              id="agd-adm-buffer"
              className="prof-input"
              type="number"
              inputMode="numeric"
              min={0}
              step={5}
              value={form.buffer_min}
              onChange={(e) => update("buffer_min", e.target.value)}
            />
          </div>
          <div className="prof-field">
            <label className="prof-label" htmlFor="agd-adm-lead">
              Antecedência (min)
            </label>
            <input
              id="agd-adm-lead"
              className="prof-input"
              type="number"
              inputMode="numeric"
              min={0}
              step={15}
              value={form.lead_time_min}
              onChange={(e) => update("lead_time_min", e.target.value)}
            />
          </div>
          <div className="prof-field">
            <label className="prof-label" htmlFor="agd-adm-horizon">
              Janela (dias)
            </label>
            <input
              id="agd-adm-horizon"
              className="prof-input"
              type="number"
              inputMode="numeric"
              min={1}
              max={90}
              value={form.horizon_days}
              onChange={(e) => update("horizon_days", e.target.value)}
            />
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
            <span className="auth-checkbox-text">
              Agenda ativa (página pública aceitando reservas)
            </span>
          </label>
        </div>

        <div className="prof-field">
          <span className="prof-label">Horários por dia da semana</span>
          <div className="agd-admin-days">
            {WEEKDAYS.map((label, d) => {
              const day = form.days[d];
              return (
                <div className={cn("agd-admin-day", !day.enabled && "off")} key={label}>
                  <label className="auth-checkbox agd-admin-day-check">
                    <input
                      type="checkbox"
                      checked={day.enabled}
                      onChange={(e) => updateDay(d, { enabled: e.target.checked })}
                    />
                    <span className="auth-checkbox-box">
                      {day.enabled && <Icon.Check size={12} />}
                    </span>
                    <span className="auth-checkbox-text">{label}</span>
                  </label>
                  <div className="agd-admin-day-times">
                    <input
                      className="prof-input"
                      type="time"
                      value={day.start}
                      disabled={!day.enabled}
                      onChange={(e) => updateDay(d, { start: e.target.value })}
                      aria-label={`Início em ${label}`}
                    />
                    <span className="agd-admin-day-sep" aria-hidden>
                      –
                    </span>
                    <input
                      className="prof-input"
                      type="time"
                      value={day.end}
                      disabled={!day.enabled}
                      onChange={(e) => updateDay(d, { end: e.target.value })}
                      aria-label={`Fim em ${label}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-new-btn" disabled={saving}>
            <Icon.Check size={16} />
            {saving ? "Salvando…" : "Salvar configurações"}
          </button>
        </div>
      </form>
    </section>
  );
}

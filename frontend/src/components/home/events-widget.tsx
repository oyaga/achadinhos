"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { eventsApi, bannersApi, getImageUrl, type ApiEvent, type ApiBanner } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";
import { openBannerLink } from "./hero-slider";

type WSlideCalendar = { kind: "calendar" };
type WSlideEvent    = { kind: "event"; data: ApiEvent };
type WSlideAd       = { kind: "ad";    data: ApiBanner };
type WSlide = WSlideCalendar | WSlideEvent | WSlideAd;

interface EventsWidgetProps {
  onSeeAll: () => void;
}

// "AAAA-MM-DD" local de hoje (sem fuso — mesma regra do hero-slider).
function todayYmd(): string {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

// "2026-07-20" -> "dom, 20 jul"
function formatShortDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso.slice(0, 10);
  return new Date(y, m - 1, d)
    .toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })
    .replace(/\./g, "");
}

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"] as const;

// Widget da home: slide com o calendário do mês (dias com evento marcados),
// banners dos próximos eventos e anúncios do admin (placement "eventos").
export function EventsWidget({ onSeeAll }: EventsWidgetProps) {
  const router = useRouter();
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [ads, setAds] = useState<ApiBanner[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    void Promise.allSettled([eventsApi.list(), bannersApi.list("eventos")]).then(
      ([evRes, adRes]) => {
        if (evRes.status === "fulfilled") setEvents(evRes.value);
        if (adRes.status === "fulfilled") setAds(adRes.value);
        setLoaded(true);
      },
    );
  }, []);

  const today = todayYmd();

  const upcoming = useMemo(
    () =>
      events
        .filter((ev) => ev.event_date.slice(0, 10) >= today)
        .sort((a, b) =>
          `${a.event_date.slice(0, 10)} ${a.event_time}`.localeCompare(
            `${b.event_date.slice(0, 10)} ${b.event_time}`,
          ),
        ),
    [events, today],
  );

  const slides = useMemo<WSlide[]>(() => {
    const banners: WSlideEvent[] = upcoming
      .filter((ev) => ev.banner_url)
      .slice(0, 4)
      .map((ev) => ({ kind: "event", data: ev }));
    const adSlides: WSlideAd[] = ads.map((b) => ({ kind: "ad", data: b }));
    return [{ kind: "calendar" }, ...banners, ...adSlides];
  }, [upcoming, ads]);

  // Auto-advance (mesmo comportamento do hero: hover pausa, dots navegam).
  function startTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % Math.max(slides.length, 1));
    }, 5000);
  }
  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }
  function goTo(i: number) {
    stopTimer();
    const n = slides.length;
    setActive(((i % n) + n) % n);
  }

  useEffect(() => {
    if (slides.length > 1) startTimer();
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[active] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setActive(Math.round(track.scrollLeft / track.offsetWidth));
      }, 80);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); clearTimeout(timeout); };
  }, []);

  // Sem nada para mostrar (sem eventos e sem anúncios), o widget some.
  if (!loaded || (events.length === 0 && ads.length === 0)) return null;

  return (
    <div
      className="section events-widget-section"
      onMouseEnter={stopTimer}
      onMouseLeave={() => slides.length > 1 && startTimer()}
    >
      <div className="section-title">
        <h2>Agenda do condomínio</h2>
        <button type="button" className="see-all" onClick={onSeeAll}>
          Ver tudo <Icon.ChevRight size={13} />
        </button>
      </div>

      <div className="events-widget">
        <div className="events-widget-track" ref={trackRef}>
          {slides.map((slide, i) =>
            slide.kind === "calendar" ? (
              <CalendarSlide key="cal" events={events} upcoming={upcoming} today={today} onSeeAll={onSeeAll} />
            ) : slide.kind === "event" ? (
              <EventBannerSlide key={slide.data.id} event={slide.data} onClick={onSeeAll} />
            ) : (
              <WidgetAdSlide key={slide.data.id} banner={slide.data} onClick={() => openBannerLink(router, slide.data)} />
            ),
          )}
        </div>

        {slides.length > 1 && (
          <div className="events-widget-dots" aria-label="Slides da agenda">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn("events-widget-dot", i === active && "active")}
                onClick={() => goTo(i)}
                aria-label={`Ir para o slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Slide 1: calendário do mês + próximos eventos ─────────────────────────────

function CalendarSlide({
  events,
  upcoming,
  today,
  onSeeAll,
}: {
  events: ApiEvent[];
  upcoming: ApiEvent[];
  today: string;
  onSeeAll: () => void;
}) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based

  const eventDays = useMemo(() => {
    const days = new Set<number>();
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}-`;
    for (const ev of events) {
      const ymd = ev.event_date.slice(0, 10);
      if (ymd.startsWith(prefix)) days.add(Number(ymd.slice(8, 10)));
    }
    return days;
  }, [events, year, month]);

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDay = Number(today.slice(8, 10));
  const monthLabel = now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="events-widget-slide events-widget-cal" onClick={onSeeAll} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSeeAll(); } }}>
      <div className="ew-cal">
        <div className="ew-cal-month">{monthLabel}</div>
        <div className="ew-cal-grid" aria-hidden="true">
          {WEEKDAYS.map((w, i) => (
            <span key={`w${i}`} className="ew-cal-wd">{w}</span>
          ))}
          {cells.map((d, i) =>
            d === null ? (
              <span key={`e${i}`} />
            ) : (
              <span
                key={d}
                className={cn(
                  "ew-cal-day",
                  d === todayDay && "today",
                  eventDays.has(d) && "has-event",
                )}
              >
                {d}
              </span>
            ),
          )}
        </div>
      </div>
      <div className="ew-next">
        <div className="ew-next-title">Próximos eventos</div>
        {upcoming.length === 0 ? (
          <div className="ew-next-empty">Nenhum evento agendado.</div>
        ) : (
          upcoming.slice(0, 3).map((ev) => (
            <div key={ev.id} className="ew-next-item">
              <span className="ew-next-date">{formatShortDate(ev.event_date)}</span>
              <span className="ew-next-name">{ev.title}</span>
              {ev.event_time && <span className="ew-next-time">{ev.event_time}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── Slides de banner de evento e anúncio ──────────────────────────────────────

function EventBannerSlide({ event: ev, onClick }: { event: ApiEvent; onClick: () => void }) {
  return (
    <div className="events-widget-slide events-widget-banner" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={getImageUrl(ev.banner_url)} alt={ev.title} className="ew-banner-img" loading="lazy" decoding="async" />
      <div className="ew-banner-overlay">
        <div className="ew-banner-date">
          <Icon.Calendar size={11} /> {formatShortDate(ev.event_date)}
          {ev.event_time ? ` · ${ev.event_time}` : ""}
        </div>
        <div className="ew-banner-title">{ev.title}</div>
      </div>
    </div>
  );
}

function WidgetAdSlide({ banner: b, onClick }: { banner: ApiBanner; onClick: () => void }) {
  const clickable = b.link_url.trim() !== "";
  return (
    <div
      className={cn("events-widget-slide events-widget-banner", clickable && "clickable")}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => { if (clickable && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onClick(); } }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={getImageUrl(b.image_url)} alt={b.title || "Anúncio"} className="ew-banner-img" loading="lazy" decoding="async" />
      <span className="ew-ad-tag">Publicidade</span>
      {(b.title.trim() || b.subtitle.trim()) && (
        <div className="ew-banner-overlay">
          {b.title.trim() && <div className="ew-banner-title">{b.title}</div>}
          {b.subtitle.trim() && <div className="ew-banner-sub">{b.subtitle}</div>}
        </div>
      )}
    </div>
  );
}

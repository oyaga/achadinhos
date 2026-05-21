"use client";

import { useState } from "react";
import { CATEGORIES_FULL } from "@/lib/data";
import type { CategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";

// Data collected by the 3-step profile wizard (post-credentials).
export interface ProviderProfileData {
  categories: CategoryId[];
  coverage: "bairro" | "cidade" | "regiao";
  radius: number;
  yearsActive: string;
  hourStart: string;
  hourEnd: string;
}

// Backwards-compatible alias used in the home-screen flow (FAB signup).
export type ProviderSignupData = ProviderProfileData;

interface SignupWizardProps {
  onBack: () => void;
  onComplete: () => void;
  onSubmit?: (data: ProviderProfileData) => Promise<void>;
}

const STEPS = [
  { title: "Quais categorias?", sub: "Selecione até 3 áreas de atuação" },
  { title: "Área de atuação", sub: "Onde você atende?" },
  { title: "Disponibilidade", sub: "Quando você está disponível?" },
] as const;

const COVERAGE_OPTIONS: Array<{
  id: ProviderProfileData["coverage"];
  label: string;
}> = [
  { id: "bairro", label: "🏘️ Meu bairro" },
  { id: "cidade", label: "🌆 Cidade toda" },
  { id: "regiao", label: "🗺️ Região metropolitana" },
];

export function SignupWizard({ onBack, onComplete, onSubmit }: SignupWizardProps) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [data, setData] = useState<ProviderProfileData>({
    categories: [],
    coverage: "bairro",
    radius: 5,
    yearsActive: "",
    hourStart: "08:00",
    hourEnd: "18:00",
  });

  const update = <K extends keyof ProviderProfileData>(k: K, v: ProviderProfileData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleCat = (id: CategoryId) =>
    setData((d) => {
      const has = d.categories.includes(id);
      const cats = has
        ? d.categories.filter((c) => c !== id)
        : d.categories.length < 3
          ? [...d.categories, id]
          : d.categories;
      return { ...d, categories: cats };
    });

  const canNext = () => {
    if (step === 0) return data.categories.length > 0;
    if (step === 1) return true;
    if (step === 2) return true;
    return false;
  };

  const next = async () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    if (onSubmit) {
      setSubmitError(null);
      setSubmitting(true);
      try {
        await onSubmit(data);
        setDone(true);
        window.setTimeout(() => onComplete(), 1400);
      } catch (err) {
        setSubmitError(
          err instanceof Error
            ? err.message
            : "Não foi possível enviar agora. Tente novamente."
        );
      } finally {
        setSubmitting(false);
      }
    } else {
      setDone(true);
      window.setTimeout(() => onComplete(), 1400);
    }
  };

  const prev = () => (step > 0 ? setStep((s) => s - 1) : onBack());

  if (done) {
    return (
      <div className="screen">
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              background: "linear-gradient(140deg, var(--gold-400), var(--gold-500))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--navy-900)",
              marginBottom: 20,
              boxShadow: "0 12px 30px rgba(201,169,97,0.4)",
            }}
          >
            <Icon.Check size={36} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 26,
              color: "var(--navy-900)",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Cadastro enviado!
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--ink-500)",
              textAlign: "center",
              maxWidth: 280,
              lineHeight: 1.5,
            }}
          >
            Vamos analisar seus dados em até{" "}
            <strong style={{ color: "var(--navy-900)" }}>48h úteis</strong>. Você
            recebe novidades por e-mail e WhatsApp.
          </div>
        </div>
      </div>
    );
  }

  const meta = STEPS[step];

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button
          type="button"
          className="screen-back"
          onClick={prev}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Perfil do prestador</div>
      </div>

      <div className="wizard-progress">
        <div className="wizard-steps">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "wizard-step",
                i < step && "done",
                i === step && "active"
              )}
            />
          ))}
        </div>
        <div className="wizard-meta">
          <span>
            Etapa {step + 1} de {STEPS.length}
          </span>
          <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
        </div>
      </div>

      <div className="screen-body" style={{ paddingBottom: 100 }}>
        <div className="wizard-step-title">{meta.title}</div>
        <div className="wizard-step-sub">{meta.sub}</div>

        {/* Step 0 — Categories */}
        {step === 0 && (
          <>
            <div style={{ fontSize: 12, color: "var(--ink-500)", marginBottom: 10 }}>
              <strong>{data.categories.length}/3</strong> selecionadas
            </div>
            <div className="cat-picker">
              {CATEGORIES_FULL.slice(1, 11).map((c) => {
                const I = Icon[c.icon];
                const checked = data.categories.includes(c.id);
                return (
                  <button
                    type="button"
                    key={c.id}
                    className={cn("cat-pick", checked && "checked")}
                    onClick={() => toggleCat(c.id)}
                  >
                    <div className="cat-pick-icon">
                      <I />
                    </div>
                    <div className="cat-pick-label">{c.label}</div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Step 1 — Coverage */}
        {step === 1 && (
          <>
            <div className="field">
              <div className="field-label">Atende em quais regiões?</div>
              <div style={{ display: "flex", gap: 8 }}>
                {COVERAGE_OPTIONS.map((o) => {
                  const isActive = data.coverage === o.id;
                  return (
                    <button
                      type="button"
                      key={o.id}
                      onClick={() => update("coverage", o.id)}
                      style={{
                        flex: 1,
                        padding: "12px 8px",
                        borderRadius: 12,
                        background: isActive ? "var(--navy-900)" : "white",
                        color: isActive ? "white" : "var(--navy-900)",
                        border: `1px solid ${isActive ? "var(--gold-500)" : "var(--bone-300)"}`,
                        fontSize: 11,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        textAlign: "center",
                      }}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="field">
              <div className="field-label">Raio de atuação: {data.radius} km</div>
              <input
                type="range"
                min={1}
                max={100}
                value={data.radius}
                onChange={(e) => update("radius", Number(e.target.value))}
                className="range-gold"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: "var(--ink-500)",
                  marginTop: 4,
                }}
              >
                <span>1km</span>
                <span>50km</span>
                <span>100km</span>
              </div>
            </div>
            <div
              style={{
                background: "var(--gold-100)",
                border: "1px solid var(--gold-300)",
                borderRadius: 12,
                padding: 12,
                fontSize: 12,
                color: "var(--ink-700)",
                lineHeight: 1.5,
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              <Icon.Pin size={14} />
              <span>
                Você pode aparecer para{" "}
                <strong>cerca de {Math.round(data.radius * 12)}</strong>{" "}
                condomínios na sua área.
              </span>
            </div>
          </>
        )}

        {/* Step 2 — Availability */}
        {step === 2 && (
          <>
            <div className="field">
              <div className="field-label">Horário de atendimento</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="field-input"
                  type="time"
                  value={data.hourStart}
                  onChange={(e) => update("hourStart", e.target.value)}
                  style={{ flex: 1 }}
                  aria-label="Início do atendimento"
                />
                <span style={{ alignSelf: "center", color: "var(--ink-500)" }}>até</span>
                <input
                  className="field-input"
                  type="time"
                  value={data.hourEnd}
                  onChange={(e) => update("hourEnd", e.target.value)}
                  style={{ flex: 1 }}
                  aria-label="Fim do atendimento"
                />
              </div>
            </div>
            <div className="field">
              <div className="field-label">Anos de mercado (opcional)</div>
              <input
                className="field-input"
                placeholder="Ex: 8"
                type="number"
                min={0}
                max={100}
                value={data.yearsActive}
                onChange={(e) => update("yearsActive", e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          style={{
            margin: "0 22px 12px",
            background: "rgba(194, 69, 58, 0.08)",
            border: "1px solid rgba(194, 69, 58, 0.32)",
            color: "var(--danger)",
            padding: "10px 12px",
            borderRadius: 12,
            fontSize: 12.5,
            fontWeight: 500,
            lineHeight: 1.45,
          }}
        >
          {submitError}
        </div>
      )}

      <div className="wizard-cta">
        {step > 0 && (
          <button
            type="button"
            className="btn-back"
            onClick={prev}
            disabled={submitting}
          >
            Voltar
          </button>
        )}
        <button
          type="button"
          className="btn-primary"
          onClick={() => { void next(); }}
          disabled={!canNext() || submitting}
          style={{ opacity: !canNext() || submitting ? 0.5 : 1, marginTop: 0 }}
        >
          {submitting
            ? "Enviando…"
            : step === STEPS.length - 1
              ? "Enviar cadastro"
              : "Continuar"}
          {!submitting && <Icon.ChevRight size={14} />}
        </button>
      </div>
    </div>
  );
}

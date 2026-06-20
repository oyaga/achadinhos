"use client";

import { useState } from "react";
import { providersApi, ApiError } from "@/lib/api";
import type { Provider } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";

interface RateScreenProps {
  provider: Provider;
  onBack: () => void;
  onSent: () => void;
}

const TAGS_LIST = [
  "Pontual",
  "Preço justo",
  "Profissional",
  "Limpo",
  "Atencioso",
  "Resolve rápido",
];

const STAR_LABELS = [
  "",
  "Decepcionante",
  "Pode melhorar",
  "Razoável",
  "Muito bom!",
  "Excelente!",
];

export function RateScreen({ provider, onBack, onSent }: RateScreenProps) {
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTag = (t: string) =>
    setTags((arr) => (arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]));

  const submit = async () => {
    setSaving(true);
    setError(null);
    try {
      await providersApi.createReview(provider.id, {
        rating: stars,
        text: text || undefined,
        tags,
      });
      setSent(true);
      window.setTimeout(() => onSent(), 1400);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Erro ao enviar avaliação";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (sent) {
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
              background:
                "linear-gradient(140deg, var(--gold-400), var(--gold-500))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--navy-900)",
              marginBottom: 20,
            }}
          >
            <Icon.Sparkle size={36} />
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
            Obrigado!
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--ink-500)",
              textAlign: "center",
            }}
          >
            Sua avaliação ajuda outros síndicos.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button type="button" className="screen-back" onClick={onBack} aria-label="Voltar">
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Avaliar afiliado</div>
      </div>
      <div className="screen-body" style={{ paddingBottom: 100 }}>
        <div className="rate-screen">
          <div className="rate-avatar">{provider.avatar}</div>
          <div className="rate-q">
            Como foi sua experiência
            <br />
            com{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold-500)" }}>
              {provider.name}
            </em>
            ?
          </div>
          <div className="rate-sub">
            Sua avaliação é verificada via assinatura digital de síndico
          </div>
          <div className="rate-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                className={cn("rate-star", stars >= n && "active")}
                onClick={() => setStars(n)}
                aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
              >
                <Icon.Star size={42} filled={stars >= n} />
              </button>
            ))}
          </div>
          {stars > 0 && (
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 16,
                color: "var(--navy-900)",
                marginBottom: 18,
              }}
            >
              {STAR_LABELS[stars]}
            </div>
          )}
        </div>

        {stars > 0 && (
          <div style={{ animation: "fadeUp 0.3s" }}>
            <div className="field-label">Pontos positivos</div>
            <div className="rate-tags">
              {TAGS_LIST.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={cn("rate-tag", tags.includes(t) && "active")}
                  onClick={() => toggleTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="field-label">Conta o que rolou (opcional)</div>
            <textarea
              className="rate-textarea"
              placeholder="Ex: chegou no horário, resolveu o problema rapidinho, equipe educada…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: 12,
              padding: "10px 14px",
              background: "var(--red-50, #fef2f2)",
              border: "1px solid var(--red-200, #fecaca)",
              borderRadius: 8,
              color: "var(--red-700, #b91c1c)",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}
      </div>
      <div className="sticky-cta" style={{ display: "block" }}>
        <button
          type="button"
          className="btn-primary"
          onClick={() => void submit()}
          disabled={stars === 0 || saving}
          style={{ opacity: stars > 0 && !saving ? 1 : 0.5, marginTop: 0 }}
        >
          {saving ? (
            "Enviando…"
          ) : (
            <><Icon.Send /> Publicar avaliação</>
          )}
        </button>
      </div>
    </div>
  );
}

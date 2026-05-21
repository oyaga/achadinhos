"use client";

import { useEffect, useState } from "react";
import { providersApi } from "@/lib/api";
import { adaptProvider } from "@/lib/adapters";
import type { Provider } from "@/lib/types";
import { Icon } from "../icons";

interface HighlightsScreenProps {
  onBack: () => void;
  onProvider: (p: Provider) => void;
}

export function HighlightsScreen({
  onBack,
  onProvider,
}: HighlightsScreenProps) {
  const [highlights, setHighlights] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void providersApi.list({ highlight: true }).then((res) => {
      setHighlights(res.data.map(adaptProvider));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button
          type="button"
          className="screen-back"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Destaque do dia</div>
      </div>
      <div className="screen-body">
        <div
          style={{
            marginBottom: 18,
            fontSize: 13,
            color: "var(--ink-500)",
            lineHeight: 1.5,
          }}
        >
          Os{" "}
          <strong style={{ color: "var(--navy-900)" }}>
            melhores prestadores
          </strong>{" "}
          selecionados pelo nosso algoritmo. Atualizado todo dia às 6h.
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: 32, color: "var(--ink-500)", fontSize: 13 }}>
            Carregando…
          </div>
        ) : highlights.length === 0 ? (
          <div className="empty-state">
            <Icon.Star size={42} />
            <div className="empty-state-title">Nenhum destaque hoje</div>
            <div className="empty-state-sub">Volte mais tarde</div>
          </div>
        ) : (
          highlights.map((p) => (
            <button
              type="button"
              key={p.id}
              className="highlight-card"
              onClick={() => onProvider(p)}
              style={{ width: "100%", textAlign: "left", display: "block" }}
            >
              <div className="highlight-pic">
                <div className="highlight-pic-tag">★ Em destaque</div>
              </div>
              <div className="highlight-body">
                <div className="highlight-name">{p.name}</div>
                <div className="highlight-meta">
                  {p.catLabel} · {p.distance} · {p.responseTime} resposta
                </div>
                <div className="highlight-row">
                  <div className="highlight-rating">
                    <Icon.Star size={12} /> {p.rating.toFixed(1).replace(".", ",")} ·{" "}
                    {p.reviews} avaliações
                  </div>
                  <div className="btn-mini">Ver perfil</div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

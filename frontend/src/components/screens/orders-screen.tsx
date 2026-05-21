"use client";

import type { WhatsappEntry } from "@/hooks/use-whatsapp-history";
import { Icon } from "../icons";

interface OrdersScreenProps {
  history: WhatsappEntry[];
  onBack: () => void;
  onClear: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Agora mesmo";
  if (mins < 60) return `${mins} min atrás`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Ontem";
  if (days < 7) return `${days} dias atrás`;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function openWhatsapp(whatsapp: string, name: string) {
  const msg = encodeURIComponent(
    `Olá! Encontrei vocês no Achadinhos do Condomínio. Posso pedir um orçamento?`
  );
  window.open(`https://wa.me/55${whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
}

export function OrdersScreen({ history, onBack, onClear }: OrdersScreenProps) {
  return (
    <div className="screen">
      <div className="screen-header">
        <button type="button" className="screen-back" onClick={onBack} aria-label="Voltar">
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Pedidos</div>
        <div className="screen-actions">
          {history.length > 0 && (
            <button
              type="button"
              className="icon-btn"
              onClick={onClear}
              aria-label="Limpar histórico"
              title="Limpar histórico"
            >
              <Icon.Trash size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="screen-body">
        {history.length === 0 ? (
          <div className="empty-state">
            <Icon.Box size={42} />
            <div className="empty-state-title">Nenhum contato ainda</div>
            <div className="empty-state-sub">
              Quando você chamar um prestador no WhatsApp, ele aparece aqui.
            </div>
          </div>
        ) : (
          <div className="orders-list">
            {history.map((entry) => (
              <div key={entry.id} className="order-card">
                <div className="order-avatar">{entry.providerAvatar}</div>
                <div className="order-info">
                  <div className="order-name">{entry.providerName}</div>
                  <div className="order-meta">
                    <span className="order-cat">{entry.providerCatLabel}</span>
                    <span className="order-dot" />
                    <span className="order-date">{formatDate(entry.date)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="order-whatsapp-btn"
                  onClick={() => openWhatsapp(entry.whatsapp, entry.providerName)}
                  aria-label={`Chamar ${entry.providerName} no WhatsApp`}
                >
                  <Icon.Whatsapp size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

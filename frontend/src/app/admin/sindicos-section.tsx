"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { adminApi, ApiError, type AdminSindico } from "@/lib/api";
import { formatPhone } from "@/lib/phone";
import { formatCEP } from "@/lib/cep";
import { Icon } from "@/components/icons";

function formatAddress(s: AdminSindico): string {
  const parts: string[] = [];
  if (s.street) {
    const num = s.number ? `, ${s.number}` : "";
    const comp = s.complement ? ` (${s.complement})` : "";
    parts.push(`${s.street}${num}${comp}`);
  }
  if (s.neighborhood) parts.push(s.neighborhood);
  const cityState = [s.city, s.state].filter(Boolean).join("/");
  if (cityState) parts.push(cityState);
  if (s.cep) parts.push(`CEP ${formatCEP(s.cep)}`);
  return parts.join(" · ") || "—";
}

const ROLE_LABEL: Record<string, string> = {
  morador: "Morador",
  sindico: "Síndico",
  conselho: "Conselho",
};

export function SindicosSection() {
  const [items, setItems] = useState<AdminSindico[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setItems(await adminApi.listSindicos());
    } catch (err) {
      setLoadError(
        err instanceof ApiError ? err.message : "Erro ao carregar síndicos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((s) =>
      [s.name, s.email, s.condo_name, s.city, s.neighborhood]
        .filter((v): v is string => Boolean(v))
        .some((v) => v.toLowerCase().includes(q)),
    );
  }, [items, query]);

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Síndicos</h2>
          <p className="admin-section-sub">
            {items.length} cadastrado(s)
            {query && filtered.length !== items.length
              ? ` · ${filtered.length} filtrado(s)`
              : ""}
          </p>
        </div>
      </div>

      <div className="prof-field" style={{ marginBottom: 12 }}>
        <input
          className="prof-input"
          type="search"
          placeholder="Buscar por nome, e-mail ou condomínio…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error">{loadError}</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          {query
            ? "Nenhum síndico encontrado para essa busca."
            : "Nenhum síndico cadastrado ainda."}
        </div>
      ) : (
        <div className="admin-list">
          {filtered.map((s) => (
            <div key={s.id} className="admin-sindico-card">
              <div className="admin-row-avatar">
                {(s.name || "?").charAt(0).toUpperCase()}
              </div>
              <div className="admin-sindico-info">
                <div className="admin-row-name">{s.name}</div>
                <div className="admin-sindico-line">
                  <Icon.AtSign size={12} /> {s.email}
                </div>
                {s.phone && (
                  <div className="admin-sindico-line">
                    <Icon.Bell size={12} /> {formatPhone(s.phone)}
                  </div>
                )}
                {(s.condo_name || s.condo_role) && (
                  <div className="admin-sindico-line">
                    <Icon.BrandHouse size={12} />{" "}
                    <span>
                      {s.condo_name || "—"}
                      {s.condo_role
                        ? ` · ${ROLE_LABEL[s.condo_role] ?? s.condo_role}`
                        : ""}
                    </span>
                  </div>
                )}
                <div className="admin-sindico-line">
                  <Icon.Pin size={12} /> <span>{formatAddress(s)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

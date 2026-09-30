"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { adminApi, ApiError, type AdminSindico } from "@/lib/api";
import { formatPhone } from "@/lib/phone";
import { formatCEP } from "@/lib/cep";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { downloadCSV, formatLeadDate, todayStamp } from "./leads-csv";

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
  administradora: "Administradora",
};

// Filtro por perfil: cada lead é trabalhado de um jeito, então o admin
// separa síndicos de conselho, moradores e administradoras.
const ROLE_FILTERS: Array<{ id: string; label: string }> = [
  { id: "", label: "Todos" },
  { id: "sindico", label: "Síndicos" },
  { id: "conselho", label: "Conselho" },
  { id: "morador", label: "Moradores" },
  { id: "administradora", label: "Administradoras" },
];

const ROLE_CHIP: Record<string, string> = {
  sindico: "role-sindico",
  conselho: "role-conselho",
  morador: "role-morador",
};

// "Marcos Oliveira" -> "MO" (primeiro + último nome)
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${last}`.toUpperCase();
}

export function SindicosSection() {
  const [items, setItems] = useState<AdminSindico[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");

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
    return items.filter(
      (s) =>
        (!role || s.condo_role === role) &&
        (!q ||
          [s.name, s.email, s.condo_name, s.company_name, s.city, s.neighborhood]
            .filter((v): v is string => Boolean(v))
            .some((v) => v.toLowerCase().includes(q))),
    );
  }, [items, query, role]);

  const countByRole = useMemo(() => {
    const m: Record<string, number> = { "": items.length };
    for (const s of items) if (s.condo_role) m[s.condo_role] = (m[s.condo_role] ?? 0) + 1;
    return m;
  }, [items]);

  function exportCSV() {
    downloadCSV(
      `leads-sindicos-${role || "todos"}-${todayStamp()}.csv`,
      ["Nome", "Perfil", "E-mail", "Telefone", "Condomínio", "Empresa", "Endereço", "Cadastro em"],
      filtered.map((s) => [
        s.name,
        ROLE_LABEL[s.condo_role ?? ""] ?? s.condo_role ?? "",
        s.email,
        s.phone ? formatPhone(s.phone) : "",
        s.condo_name ?? "",
        s.company_name ?? "",
        formatAddress(s),
        formatLeadDate(s.created_at),
      ]),
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Síndicos e condomínios</h2>
          <p className="admin-section-sub">
            {items.length} cadastrado(s)
            {filtered.length !== items.length
              ? ` · ${filtered.length} filtrado(s)`
              : ""}
          </p>
        </div>
        <button
          type="button"
          className="admin-new-btn ghost"
          onClick={exportCSV}
          disabled={filtered.length === 0}
        >
          <Icon.Download size={16} />
          Exportar planilha
        </button>
      </div>

      <div className="admin-lead-filters" role="group" aria-label="Filtrar por perfil">
        {ROLE_FILTERS.map((f) => (
          <button
            key={f.id || "todos"}
            type="button"
            className={cn("side-chip", role === f.id && "active")}
            onClick={() => setRole(f.id)}
          >
            {f.label} ({countByRole[f.id] ?? 0})
          </button>
        ))}
      </div>

      <div className="prof-field admin-search-wrap" style={{ marginBottom: 12 }}>
        <span className="admin-search-icon" aria-hidden="true">
          <Icon.Search size={18} />
        </span>
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
        <div className="prof-alert error" role="alert">{loadError}</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          {query || role
            ? "Nenhum cadastro encontrado com esses filtros."
            : "Nenhum síndico cadastrado ainda."}
        </div>
      ) : (
        <div className="admin-list">
          {filtered.map((s) => (
            <div key={s.id} className="admin-sindico-card">
              <div className="admin-sindico-avatar">{initials(s.name || "?")}</div>
              <div className="admin-sindico-info">
                <div className="admin-row-name">
                  {s.name}
                  {s.condo_role && (
                    <span
                      className={`admin-chip ${ROLE_CHIP[s.condo_role] ?? "role-morador"}`}
                    >
                      {ROLE_LABEL[s.condo_role] ?? s.condo_role}
                    </span>
                  )}
                </div>
                <div className="admin-sindico-line">
                  <Icon.AtSign size={12} /> {s.email}
                </div>
                {s.phone && (
                  <div className="admin-sindico-line">
                    <Icon.Bell size={12} /> {formatPhone(s.phone)}
                  </div>
                )}
                {s.company_name && (
                  <div className="admin-sindico-line">
                    <Icon.Building size={12} /> <span>{s.company_name}</span>
                  </div>
                )}
                {s.condo_name && (
                  <div className="admin-sindico-line">
                    <Icon.BrandHouse size={12} /> <span>{s.condo_name}</span>
                  </div>
                )}
                <div className="admin-sindico-line">
                  <Icon.Pin size={12} /> <span>{formatAddress(s)}</span>
                </div>
                {s.created_at && (
                  <div className="admin-sindico-line">
                    <Icon.Calendar size={12} /> Cadastro em {formatLeadDate(s.created_at)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

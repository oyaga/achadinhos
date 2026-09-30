"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { adminApi, ApiError, type AdminSeller } from "@/lib/api";
import { formatPhone } from "@/lib/phone";
import { formatCPF, formatCNPJ } from "@/lib/document";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SindicosSection } from "./sindicos-section";
import { downloadCSV, formatLeadDate, todayStamp } from "./leads-csv";

type LeadKind = "sindicos" | "afiliados";

// Aba Leads: os cadastros que chegam pelo site, separados por perfil —
// síndicos/condomínios (/cadastro/sindico) e empresas/fornecedores que se
// cadastraram como afiliados (/cadastro/afiliado, empresa free).
export function LeadsSection() {
  const [kind, setKind] = useState<LeadKind>("sindicos");

  return (
    <>
      <div className="auth-seg-group admin-lead-kind" role="tablist" aria-label="Perfil do lead">
        {(
          [
            { id: "sindicos", label: "Síndicos" },
            { id: "afiliados", label: "Afiliados" },
          ] as const
        ).map((k) => (
          <button
            key={k.id}
            type="button"
            role="tab"
            aria-selected={kind === k.id}
            className={cn("auth-seg-btn", kind === k.id && "active")}
            onClick={() => setKind(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>
      {kind === "sindicos" ? <SindicosSection /> : <AfiliadosLeads />}
    </>
  );
}

function formatDoc(s: AdminSeller): string {
  if (!s.document) return "";
  return s.document_type === "cpf" ? formatCPF(s.document) : formatCNPJ(s.document);
}

function categoryNames(s: AdminSeller): string {
  const cats = s.categories?.length ? s.categories : s.category ? [s.category] : [];
  return cats.map((c) => c.label).join(", ");
}

function AfiliadosLeads() {
  const [items, setItems] = useState<AdminSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const all = await adminApi.listSellers();
      setItems(
        all
          .filter((s) => s.self_registered)
          .sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? "")),
      );
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar afiliados.");
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
      [s.name, categoryNames(s), s.whatsapp, s.document]
        .filter((v): v is string => Boolean(v))
        .some((v) => v.toLowerCase().includes(q)),
    );
  }, [items, query]);

  function exportCSV() {
    downloadCSV(
      `leads-afiliados-${todayStamp()}.csv`,
      ["Empresa", "Categorias", "WhatsApp", "Documento", "Site", "Instagram", "Certificada", "Cadastro em"],
      filtered.map((s) => [
        s.name,
        categoryNames(s),
        s.whatsapp ? formatPhone(s.whatsapp) : "",
        formatDoc(s),
        s.link ?? "",
        s.instagram ?? "",
        s.cert_tier ? "Sim" : "Não",
        formatLeadDate(s.created_at),
      ]),
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Afiliados (empresas e fornecedores)</h2>
          <p className="admin-section-sub">
            {items.length} cadastrado(s) pelo site
            {filtered.length !== items.length ? ` · ${filtered.length} filtrado(s)` : ""}
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

      <div className="prof-field admin-search-wrap" style={{ marginBottom: 12 }}>
        <span className="admin-search-icon" aria-hidden="true">
          <Icon.Search size={18} />
        </span>
        <input
          className="prof-input"
          type="search"
          placeholder="Buscar por empresa, categoria ou WhatsApp…"
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
          {query
            ? "Nenhum afiliado encontrado para essa busca."
            : "Nenhuma empresa se cadastrou pelo site ainda."}
        </div>
      ) : (
        <div className="admin-list">
          {filtered.map((s) => (
            <div key={s.id} className="admin-sindico-card">
              <div className="admin-sindico-avatar">
                {s.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.logo_url} alt="" className="admin-lead-logo" />
                ) : (
                  (s.name || "?").charAt(0).toUpperCase()
                )}
              </div>
              <div className="admin-sindico-info">
                <div className="admin-row-name">
                  {s.name}
                  <span className="admin-chip biz-free">
                    {s.cert_tier ? "Certificada" : "Autocadastro"}
                  </span>
                </div>
                {categoryNames(s) && (
                  <div className="admin-sindico-line">
                    <Icon.Tag size={12} /> <span>{categoryNames(s)}</span>
                  </div>
                )}
                {s.whatsapp && (
                  <div className="admin-sindico-line">
                    <Icon.Whatsapp size={12} />{" "}
                    <a
                      href={`https://wa.me/55${s.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatPhone(s.whatsapp)}
                    </a>
                  </div>
                )}
                {formatDoc(s) && (
                  <div className="admin-sindico-line">
                    <Icon.Building size={12} /> <span>{formatDoc(s)}</span>
                  </div>
                )}
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

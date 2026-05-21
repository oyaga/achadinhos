"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  categoriesApi,
  ApiError,
  type ApiProvider,
  type ApiCategory,
  type AdminProviderPayload,
} from "@/lib/api";
import { formatPhone, stripPhone } from "@/lib/phone";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Coverage = "bairro" | "cidade" | "regiao";

const COVERAGE_OPTIONS: Array<{ id: Coverage; label: string }> = [
  { id: "bairro", label: "Bairro" },
  { id: "cidade", label: "Cidade" },
  { id: "regiao", label: "Região" },
];

const BADGE_OPTIONS = ["", "Ouro", "Verificado", "Top"];

interface FormState {
  name: string;
  categoryId: string;
  description: string;
  whatsapp: string;
  services: string[];
  yearsActive: string;
  jobsDone: string;
  priceLabel: string;
  responseTimeLabel: string;
  coverage: Coverage;
  badge: string;
  verified: boolean;
  highlight: boolean;
}

const EMPTY_FORM: FormState = {
  name: "",
  categoryId: "",
  description: "",
  whatsapp: "",
  services: [],
  yearsActive: "",
  jobsDone: "",
  priceLabel: "",
  responseTimeLabel: "",
  coverage: "cidade",
  badge: "",
  verified: false,
  highlight: false,
};

export function PrestadoresSection() {
  const [items, setItems] = useState<ApiProvider[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [serviceInput, setServiceInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [provs, cats] = await Promise.all([
        adminApi.listProviders(),
        categoriesApi.list(),
      ]);
      setItems(provs);
      setCategories(cats);
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar prestadores.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setServiceInput("");
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(p: ApiProvider) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      categoryId: p.category_id,
      description: p.description ?? "",
      whatsapp: formatPhone(p.whatsapp ?? ""),
      services: p.services ?? [],
      yearsActive: p.years_active ? String(p.years_active) : "",
      jobsDone: p.jobs_done ? String(p.jobs_done) : "",
      priceLabel: p.price_label ?? "",
      responseTimeLabel: p.response_time_label ?? "",
      coverage: "cidade",
      badge: p.badge ?? "",
      verified: p.verified,
      highlight: p.highlight,
    });
    setServiceInput("");
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setServiceInput("");
    setFormError(null);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addService() {
    const s = serviceInput.trim();
    if (!s || form.services.includes(s)) return;
    setForm((prev) => ({ ...prev, services: [...prev.services, s] }));
    setServiceInput("");
  }

  function removeService(s: string) {
    setForm((prev) => ({ ...prev, services: prev.services.filter((x) => x !== s) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (form.name.trim().length < 2) {
      setFormError("Informe o nome do prestador.");
      return;
    }
    if (!form.categoryId) {
      setFormError("Selecione uma categoria.");
      return;
    }
    if (form.description.trim().length < 10) {
      setFormError("A descrição precisa de pelo menos 10 caracteres.");
      return;
    }
    const whatsappDigits = stripPhone(form.whatsapp);
    if (whatsappDigits.length < 8) {
      setFormError("Informe um WhatsApp válido.");
      return;
    }
    const payload: AdminProviderPayload = {
      name: form.name.trim(),
      category_id: form.categoryId,
      description: form.description.trim(),
      services: form.services,
      whatsapp: whatsappDigits,
      years_active: Number(form.yearsActive) || 0,
      jobs_done: Number(form.jobsDone) || 0,
      price_label: form.priceLabel.trim(),
      response_time_label: form.responseTimeLabel.trim(),
      coverage: form.coverage,
      badge: form.badge,
      verified: form.verified,
      highlight: form.highlight,
    };
    setSubmitting(true);
    try {
      if (editingId) {
        await adminApi.updateProvider(editingId, payload);
      } else {
        await adminApi.createProvider(payload);
      }
      closeForm();
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(p: ApiProvider) {
    if (!window.confirm(`Excluir o prestador "${p.name}"?`)) return;
    try {
      await adminApi.deleteProvider(p.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    }
  }

  function categoryLabel(id: string): string {
    return categories.find((c) => c.id === id)?.label ?? id;
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Prestadores de serviços</h2>
          <p className="admin-section-sub">{items.length} prestador(es) cadastrado(s)</p>
        </div>
        {!formOpen && (
          <button type="button" className="admin-new-btn" onClick={openCreate}>
            <Icon.Plus size={16} />
            Novo prestador
          </button>
        )}
      </div>

      {formOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-title">
            {editingId ? "Editar prestador" : "Novo prestador"}
          </div>
          {formError && <div className="prof-alert error">{formError}</div>}

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Nome</label>
              <input
                className="prof-input"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ex: TurboElev Manutenção"
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">Categoria</label>
              <select
                className="prof-input"
                value={form.categoryId}
                onChange={(e) => update("categoryId", e.target.value)}
              >
                <option value="">Selecione…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Descrição</label>
            <textarea
              className="prof-textarea"
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Sobre o prestador, especialidades e diferenciais…"
            />
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">WhatsApp</label>
              <input
                className="prof-input"
                type="text"
                inputMode="tel"
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", formatPhone(e.target.value))}
                placeholder="(11) 99999-0000"
                maxLength={16}
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">Abrangência</label>
              <div className="auth-seg-group">
                {COVERAGE_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className={cn("auth-seg-btn", form.coverage === o.id && "active")}
                    onClick={() => update("coverage", o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Serviços oferecidos</label>
            <div className="prof-tag-input-row">
              <input
                className="prof-input"
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                placeholder="Ex: Manutenção preventiva"
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addService(); } }}
              />
              <button type="button" className="prof-tag-add-btn" onClick={addService}>
                <Icon.Plus size={16} />
              </button>
            </div>
            {form.services.length > 0 && (
              <div className="prof-tags">
                {form.services.map((s) => (
                  <span key={s} className="prof-tag">
                    {s}
                    <button type="button" onClick={() => removeService(s)} aria-label={`Remover ${s}`}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Anos de atuação</label>
              <input
                className="prof-input"
                type="number"
                min={0}
                max={99}
                value={form.yearsActive}
                onChange={(e) => update("yearsActive", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">Serviços concluídos</label>
              <input
                className="prof-input"
                type="number"
                min={0}
                value={form.jobsDone}
                onChange={(e) => update("jobsDone", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Faixa de preço</label>
              <input
                className="prof-input"
                type="text"
                value={form.priceLabel}
                onChange={(e) => update("priceLabel", e.target.value)}
                placeholder="Ex: R$ 180/visita"
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">Tempo de resposta</label>
              <input
                className="prof-input"
                type="text"
                value={form.responseTimeLabel}
                onChange={(e) => update("responseTimeLabel", e.target.value)}
                placeholder="Ex: 15min"
              />
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Selo</label>
            <select
              className="prof-input"
              value={form.badge}
              onChange={(e) => update("badge", e.target.value)}
            >
              {BADGE_OPTIONS.map((b) => (
                <option key={b} value={b}>{b || "Nenhum"}</option>
              ))}
            </select>
          </div>

          <div className="admin-check-row">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={form.verified}
                onChange={(e) => update("verified", e.target.checked)}
              />
              <span className="auth-checkbox-box">
                {form.verified && <Icon.Check size={12} />}
              </span>
              <span className="auth-checkbox-text">Verificado</span>
            </label>
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={form.highlight}
                onChange={(e) => update("highlight", e.target.checked)}
              />
              <span className="auth-checkbox-box">
                {form.highlight && <Icon.Check size={12} />}
              </span>
              <span className="auth-checkbox-text">Destaque na home</span>
            </label>
          </div>

          <div className="admin-form-actions">
            <button type="button" className="admin-btn-ghost" onClick={closeForm} disabled={submitting}>
              Cancelar
            </button>
            <button type="submit" className="admin-btn-primary" disabled={submitting}>
              {submitting ? "Salvando…" : editingId ? "Salvar alterações" : "Cadastrar prestador"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error">{loadError}</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">Nenhum prestador cadastrado ainda.</div>
      ) : (
        <div className="admin-list">
          {items.map((p) => (
            <div key={p.id} className="admin-row">
              <div className="admin-row-avatar">{p.avatar || p.name.charAt(0)}</div>
              <div className="admin-row-main">
                <div className="admin-row-name">
                  {p.name}
                  {p.verified && <span className="admin-chip">Verificado</span>}
                  {p.highlight && <span className="admin-chip gold">Destaque</span>}
                </div>
                <div className="admin-row-meta">
                  {categoryLabel(p.category_id)}
                  {p.whatsapp && ` · ${formatPhone(p.whatsapp)}`}
                </div>
              </div>
              <div className="admin-row-actions">
                <button
                  type="button"
                  className="admin-icon-btn"
                  onClick={() => openEdit(p)}
                  aria-label={`Editar ${p.name}`}
                >
                  <Icon.Pencil size={15} />
                </button>
                <button
                  type="button"
                  className={cn("admin-icon-btn", "danger")}
                  onClick={() => handleDelete(p)}
                  aria-label={`Excluir ${p.name}`}
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

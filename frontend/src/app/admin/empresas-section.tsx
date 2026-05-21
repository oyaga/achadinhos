"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  type AdminSeller,
  type AdminSellerPayload,
} from "@/lib/api";
import { formatPhone, stripPhone } from "@/lib/phone";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  description: string;
  whatsapp: string;
  link: string;
  partner: boolean;
}

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  whatsapp: "",
  link: "",
  partner: false,
};

export function EmpresasSection() {
  const [items, setItems] = useState<AdminSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setItems(await adminApi.listSellers());
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar empresas.");
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
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(s: AdminSeller) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      description: s.description ?? "",
      whatsapp: formatPhone(s.whatsapp ?? ""),
      link: s.link ?? "",
      partner: s.partner,
    });
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (form.name.trim().length < 2) {
      setFormError("Informe o nome da empresa.");
      return;
    }
    const whatsappDigits = stripPhone(form.whatsapp);
    if (whatsappDigits.length < 8) {
      setFormError("Informe um WhatsApp válido.");
      return;
    }
    const payload: AdminSellerPayload = {
      name: form.name.trim(),
      description: form.description.trim(),
      whatsapp: whatsappDigits,
      link: form.link.trim(),
      partner: form.partner,
    };
    setSubmitting(true);
    try {
      if (editingId) {
        await adminApi.updateSeller(editingId, payload);
      } else {
        await adminApi.createSeller(payload);
      }
      closeForm();
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(s: AdminSeller) {
    if (!window.confirm(`Excluir a empresa "${s.name}"?`)) return;
    try {
      await adminApi.deleteSeller(s.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    }
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Empresas</h2>
          <p className="admin-section-sub">{items.length} empresa(s) cadastrada(s)</p>
        </div>
        {!formOpen && (
          <button type="button" className="admin-new-btn" onClick={openCreate}>
            <Icon.Plus size={16} />
            Nova empresa
          </button>
        )}
      </div>

      {formOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-title">
            {editingId ? "Editar empresa" : "Nova empresa"}
          </div>
          {formError && <div className="prof-alert error">{formError}</div>}

          <div className="prof-field">
            <label className="prof-label">Nome da empresa</label>
            <input
              className="prof-input"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ex: Distribuidora Higicond"
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
              <label className="prof-label">Link (site / loja)</label>
              <input
                className="prof-input"
                type="url"
                inputMode="url"
                value={form.link}
                onChange={(e) => update("link", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Descrição</label>
            <textarea
              className="prof-textarea"
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Sobre a empresa, produtos que vende, diferenciais…"
            />
          </div>

          <label className="auth-checkbox" style={{ marginTop: 2 }}>
            <input
              type="checkbox"
              checked={form.partner}
              onChange={(e) => update("partner", e.target.checked)}
            />
            <span className="auth-checkbox-box">
              {form.partner && <Icon.Check size={12} />}
            </span>
            <span className="auth-checkbox-text">Empresa parceira homologada</span>
          </label>

          <div className="admin-form-actions">
            <button type="button" className="admin-btn-ghost" onClick={closeForm} disabled={submitting}>
              Cancelar
            </button>
            <button type="submit" className="admin-btn-primary" disabled={submitting}>
              {submitting ? "Salvando…" : editingId ? "Salvar alterações" : "Cadastrar empresa"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error">{loadError}</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">Nenhuma empresa cadastrada ainda.</div>
      ) : (
        <div className="admin-list">
          {items.map((s) => (
            <div key={s.id} className="admin-row">
              <div className="admin-row-avatar">{s.avatar || s.name.charAt(0)}</div>
              <div className="admin-row-main">
                <div className="admin-row-name">
                  {s.name}
                  {s.partner && <span className="admin-chip gold">Parceira</span>}
                </div>
                <div className="admin-row-meta">
                  {s.whatsapp ? formatPhone(s.whatsapp) : "sem WhatsApp"}
                  {s.link && " · com link"}
                </div>
              </div>
              <div className="admin-row-actions">
                <button
                  type="button"
                  className="admin-icon-btn"
                  onClick={() => openEdit(s)}
                  aria-label={`Editar ${s.name}`}
                >
                  <Icon.Pencil size={15} />
                </button>
                <button
                  type="button"
                  className={cn("admin-icon-btn", "danger")}
                  onClick={() => handleDelete(s)}
                  aria-label={`Excluir ${s.name}`}
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

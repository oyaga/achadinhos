"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  getImageUrl,
  type ApiBanner,
  type BannerPlacement,
} from "@/lib/api";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface FormState {
  title: string;
  subtitle: string;
  link_url: string;
  placement: BannerPlacement;
  position: string; // texto do input; convertido ao salvar
  active: boolean;
}

const EMPTY: FormState = {
  title: "",
  subtitle: "",
  link_url: "",
  placement: "hero",
  position: "0",
  active: true,
};

const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";

const PLACEMENT_LABEL: Record<BannerPlacement, string> = {
  hero: "Slide principal",
  eventos: "Widget de eventos",
};

export function BannersSection() {
  const [banners, setBanners] = useState<ApiBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [imageUrl, setImageUrl] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setBanners(await adminApi.listBanners());
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY);
    setImageUrl("");
    setPendingImage(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(b: ApiBanner) {
    setEditingId(b.id);
    setForm({
      title: b.title,
      subtitle: b.subtitle,
      link_url: b.link_url,
      placement: b.placement,
      position: String(b.position),
      active: b.active,
    });
    setImageUrl(b.image_url);
    setPendingImage(null);
    setFormError(null);
    setFormOpen(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!editingId && !pendingImage) {
      setFormError("Envie a imagem do anúncio.");
      return;
    }
    const link = form.link_url.trim();
    if (link && !/^https?:\/\//i.test(link) && !link.startsWith("/")) {
      setFormError("Link deve começar com https:// ou / (caminho do site).");
      return;
    }
    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      link_url: link,
      placement: form.placement,
      position: Number(form.position) || 0,
      active: form.active,
    };
    setSubmitting(true);
    try {
      // O upload da imagem exige o id — no CREATE sobe após criar o anúncio.
      let bannerId = editingId;
      if (editingId) {
        await adminApi.updateBanner(editingId, payload);
      } else {
        const created = await adminApi.createBanner(payload);
        bannerId = created.id;
      }
      if (bannerId && pendingImage) {
        await adminApi.uploadBannerImage(bannerId, pendingImage);
      }
      setFormOpen(false);
      setPendingImage(null);
      setImageUrl("");
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível salvar o anúncio.");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(b: ApiBanner) {
    try {
      await adminApi.updateBanner(b.id, { placement: b.placement, active: !b.active });
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível atualizar.");
    }
  }

  async function handleDelete(b: ApiBanner) {
    if (!window.confirm(`Excluir o anúncio "${b.title || "sem título"}"?`)) return;
    try {
      await adminApi.deleteBanner(b.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    }
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Anúncios</h2>
          <p className="admin-section-sub">
            {banners.length} anúncio(s) · slide principal e widget de eventos
          </p>
        </div>
        {!formOpen && (
          <button type="button" className="admin-new-btn" onClick={openCreate}>
            <Icon.Plus size={16} />
            Novo anúncio
          </button>
        )}
      </div>

      {formOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-title">{editingId ? "Editar anúncio" : "Novo anúncio"}</div>
          {formError && <div className="prof-alert error" role="alert">{formError}</div>}

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Onde aparece</label>
              <select
                className="prof-input"
                value={form.placement}
                onChange={(e) => update("placement", e.target.value as BannerPlacement)}
              >
                <option value="hero">Slide principal da home</option>
                <option value="eventos">Widget de eventos/calendário</option>
              </select>
            </div>
            <div className="prof-field">
              <label className="prof-label">Posição (ordem)</label>
              <input
                className="prof-input"
                type="number"
                min={0}
                value={form.position}
                onChange={(e) => update("position", e.target.value)}
              />
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Título (opcional, sobreposto à imagem)</label>
            <input
              className="prof-input"
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ex: Semana da limpeza — 20% off"
            />
          </div>

          <div className="prof-field">
            <label className="prof-label">Subtítulo (opcional)</label>
            <input
              className="prof-input"
              type="text"
              value={form.subtitle}
              onChange={(e) => update("subtitle", e.target.value)}
              placeholder="Ex: Só nesta semana, para todos os condomínios"
            />
          </div>

          <div className="prof-field">
            <label className="prof-label">Link ao tocar (opcional)</label>
            <input
              className="prof-input"
              type="text"
              value={form.link_url}
              onChange={(e) => update("link_url", e.target.value)}
              placeholder="https://… ou /categoria/limpeza"
            />
          </div>

          <div className="admin-check-row">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => update("active", e.target.checked)}
              />
              <span className="auth-checkbox-box">
                {form.active && <Icon.Check size={12} />}
              </span>
              <span className="auth-checkbox-text">Ativo (visível no site)</span>
            </label>
          </div>

          <div className="prof-field">
            <label className="prof-label">Imagem</label>
            <div className="admin-photos">
              {pendingImage ? (
                <div className="admin-photo" style={{ width: 128, height: 72 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(pendingImage)} alt="Pré-visualização do anúncio" />
                  <button
                    type="button"
                    className="admin-photo-remove"
                    onClick={() => setPendingImage(null)}
                    aria-label="Remover imagem"
                  >
                    ×
                  </button>
                </div>
              ) : imageUrl ? (
                <div className="admin-photo" style={{ width: 128, height: 72 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={getImageUrl(imageUrl)} alt="Imagem do anúncio" />
                </div>
              ) : (
                <label className="admin-photo-add" style={{ width: 128, height: 72 }}>
                  <Icon.Plus size={20} />
                  <input
                    type="file"
                    accept={IMAGE_ACCEPT}
                    className="file-overlay"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setPendingImage(f);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
              {(pendingImage || imageUrl) && (
                <label className="admin-photo-add" style={{ width: 128, height: 72 }}>
                  <Icon.Pencil size={16} />
                  <input
                    type="file"
                    accept={IMAGE_ACCEPT}
                    className="file-overlay"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setPendingImage(f);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>
            <div className="admin-hint">
              Recomendado 1200×675 (16:9). O anúncio só aparece no site depois de ter imagem.
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="button" className="admin-new-btn ghost" onClick={() => setFormOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="admin-new-btn" disabled={submitting}>
              <Icon.Check size={16} />
              {submitting ? "Salvando…" : "Salvar"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error" role="alert">{loadError}</div>
      ) : banners.length === 0 ? (
        <div className="admin-empty">
          Nenhum anúncio ainda. Crie um para controlar o slide principal da home
          ou o widget de eventos.
        </div>
      ) : (
        <div className="admin-list">
          {banners.map((b) => (
            <div key={b.id} className={cn("admin-row", !b.active && "inactive")}>
              <div className="admin-banner-thumb" aria-hidden="true">
                {b.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getImageUrl(b.image_url)} alt="" />
                ) : (
                  <Icon.Tag size={18} />
                )}
              </div>
              <div className="admin-row-main">
                <div className="admin-row-name">{b.title || "(sem título)"}</div>
                <div className="admin-row-meta">
                  {PLACEMENT_LABEL[b.placement]} · posição {b.position}
                  {!b.image_url && " · sem imagem (não aparece)"}
                  {b.link_url && ` · ${b.link_url}`}
                </div>
              </div>
              <div className="admin-row-actions">
                <button
                  type="button"
                  className={cn("admin-icon-btn", b.active && "active")}
                  onClick={() => toggleActive(b)}
                  aria-label={b.active ? "Desativar anúncio" : "Ativar anúncio"}
                  title={b.active ? "Visível no site — clique para ocultar" : "Oculto — clique para exibir"}
                >
                  {b.active ? <Icon.Eye size={15} /> : <Icon.EyeOff size={15} />}
                </button>
                <button
                  type="button"
                  className="admin-icon-btn"
                  onClick={() => openEdit(b)}
                  aria-label="Editar anúncio"
                >
                  <Icon.Pencil size={15} />
                </button>
                <button
                  type="button"
                  className="admin-icon-btn danger"
                  onClick={() => handleDelete(b)}
                  aria-label="Excluir anúncio"
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

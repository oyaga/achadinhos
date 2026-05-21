"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  getImageUrl,
  type ApiProduct,
  type AdminSeller,
  type AdminProductPayload,
  type ProductPhoto,
} from "@/lib/api";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const PRODUCT_CATEGORIES: Array<{ id: string; label: string }> = [
  { id: "limpeza", label: "Limpeza" },
  { id: "manutencao", label: "Manutenção" },
  { id: "epi", label: "EPI / Segurança" },
  { id: "jardim", label: "Jardim" },
  { id: "piscina", label: "Piscina" },
  { id: "eletrica", label: "Elétrica" },
  { id: "escritorio", label: "Escritório" },
];

const BADGE_OPTIONS = ["", "OFERTA"];

function categoryLabel(id: string): string {
  return PRODUCT_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

function formatPrice(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface FormState {
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  sellerId: string;
  manufacturer: string;
  tag: string;
  badge: string;
  stock: string;
  link: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  category: "",
  price: "",
  oldPrice: "",
  sellerId: "",
  manufacturer: "",
  tag: "",
  badge: "",
  stock: "",
  link: "",
};

export function ProdutosSection() {
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [sellers, setSellers] = useState<AdminSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [existingPhotos, setExistingPhotos] = useState<ProductPhoto[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [products, sellerList] = await Promise.all([
        adminApi.listProducts(),
        adminApi.listSellers(),
      ]);
      setItems(products);
      setSellers(sellerList);
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar produtos.");
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
    setExistingPhotos([]);
    setPendingFiles([]);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(p: ApiProduct) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      oldPrice: p.old_price != null ? String(p.old_price) : "",
      sellerId: p.seller_id,
      manufacturer: p.manufacturer ?? "",
      tag: p.tag ?? "",
      badge: p.badge ?? "",
      stock: p.stock ?? "",
      link: p.link_override ?? "",
    });
    setExistingPhotos(p.photos ?? []);
    setPendingFiles([]);
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setExistingPhotos([]);
    setPendingFiles([]);
    setFormError(null);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    const room = 5 - existingPhotos.length - pendingFiles.length;
    if (room <= 0) return;
    setPendingFiles((prev) => [...prev, ...Array.from(files).slice(0, room)]);
  }

  async function removeExistingPhoto(photoId: string) {
    if (!editingId) return;
    try {
      await adminApi.deleteProductPhoto(editingId, photoId);
      setExistingPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível remover a foto.");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (form.name.trim().length < 2) {
      setFormError("Informe o nome do produto.");
      return;
    }
    if (!form.category) {
      setFormError("Selecione uma categoria.");
      return;
    }
    if (!form.sellerId) {
      setFormError("Selecione a empresa vendedora.");
      return;
    }
    const price = Number(form.price.replace(",", "."));
    if (!price || price <= 0) {
      setFormError("Informe um preço válido.");
      return;
    }
    const oldPriceNum = form.oldPrice ? Number(form.oldPrice.replace(",", ".")) : null;
    const payload: AdminProductPayload = {
      name: form.name.trim(),
      category: form.category,
      price,
      old_price: oldPriceNum && oldPriceNum > 0 ? oldPriceNum : null,
      seller_id: form.sellerId,
      manufacturer: form.manufacturer.trim(),
      tag: form.tag.trim(),
      badge: form.badge,
      stock: form.stock.trim(),
      link: form.link.trim(),
    };
    setSubmitting(true);
    try {
      let productId = editingId;
      if (editingId) {
        await adminApi.updateProduct(editingId, payload);
      } else {
        const created = await adminApi.createProduct(payload);
        productId = created.id;
      }
      if (productId && pendingFiles.length > 0) {
        for (const file of pendingFiles) {
          await adminApi.uploadProductPhoto(productId, file);
        }
      }
      closeForm();
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(p: ApiProduct) {
    if (!window.confirm(`Excluir o produto "${p.name}"?`)) return;
    try {
      await adminApi.deleteProduct(p.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    }
  }

  function sellerName(id: string): string {
    return sellers.find((s) => s.id === id)?.name ?? "—";
  }

  const photoSlotsLeft = 5 - existingPhotos.length - pendingFiles.length;

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Produtos</h2>
          <p className="admin-section-sub">{items.length} produto(s) cadastrado(s)</p>
        </div>
        {!formOpen && (
          <button
            type="button"
            className="admin-new-btn"
            onClick={openCreate}
            disabled={sellers.length === 0}
            title={sellers.length === 0 ? "Cadastre uma empresa primeiro" : undefined}
          >
            <Icon.Plus size={16} />
            Novo produto
          </button>
        )}
      </div>

      {sellers.length === 0 && !loading && (
        <div className="admin-empty">
          Cadastre uma empresa na aba <strong>Empresas</strong> antes de adicionar produtos.
        </div>
      )}

      {formOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-title">
            {editingId ? "Editar produto" : "Novo produto"}
          </div>
          {formError && <div className="prof-alert error">{formError}</div>}

          <div className="prof-field">
            <label className="prof-label">Nome do produto</label>
            <input
              className="prof-input"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ex: Saco de lixo reforçado 100L"
            />
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Empresa vendedora</label>
              <select
                className="prof-input"
                value={form.sellerId}
                onChange={(e) => update("sellerId", e.target.value)}
              >
                <option value="">Selecione…</option>
                {sellers.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="prof-field">
              <label className="prof-label">Categoria</label>
              <select
                className="prof-input"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              >
                <option value="">Selecione…</option>
                {PRODUCT_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Preço (R$)</label>
              <input
                className="prof-input"
                type="text"
                inputMode="decimal"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="89.90"
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">Preço antigo (opcional)</label>
              <input
                className="prof-input"
                type="text"
                inputMode="decimal"
                value={form.oldPrice}
                onChange={(e) => update("oldPrice", e.target.value)}
                placeholder="119.90"
              />
            </div>
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Fabricante</label>
              <input
                className="prof-input"
                type="text"
                value={form.manufacturer}
                onChange={(e) => update("manufacturer", e.target.value)}
                placeholder="Ex: Bralimpia"
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">Estoque</label>
              <input
                className="prof-input"
                type="text"
                value={form.stock}
                onChange={(e) => update("stock", e.target.value)}
                placeholder="Em estoque"
              />
            </div>
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Etiqueta</label>
              <input
                className="prof-input"
                type="text"
                value={form.tag}
                onChange={(e) => update("tag", e.target.value)}
                placeholder="Ex: Mais vendido"
              />
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
          </div>

          <div className="prof-field">
            <label className="prof-label">Link de compra (opcional)</label>
            <input
              className="prof-input"
              type="url"
              inputMode="url"
              value={form.link}
              onChange={(e) => update("link", e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="prof-field">
            <label className="prof-label">Fotos ({existingPhotos.length + pendingFiles.length}/5)</label>
            <div className="admin-photos">
              {existingPhotos.map((ph) => (
                <div key={ph.id} className="admin-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={getImageUrl(ph.url)} alt="Foto do produto" />
                  <button
                    type="button"
                    className="admin-photo-remove"
                    onClick={() => removeExistingPhoto(ph.id)}
                    aria-label="Remover foto"
                  >
                    ×
                  </button>
                </div>
              ))}
              {pendingFiles.map((file, i) => (
                <div key={`${file.name}-${i}`} className="admin-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(file)} alt="Pré-visualização" />
                  <button
                    type="button"
                    className="admin-photo-remove"
                    onClick={() => setPendingFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    aria-label="Remover foto"
                  >
                    ×
                  </button>
                </div>
              ))}
              {photoSlotsLeft > 0 && (
                <label className="admin-photo-add">
                  <Icon.Plus size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="button" className="admin-btn-ghost" onClick={closeForm} disabled={submitting}>
              Cancelar
            </button>
            <button type="submit" className="admin-btn-primary" disabled={submitting}>
              {submitting ? "Salvando…" : editingId ? "Salvar alterações" : "Cadastrar produto"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error">{loadError}</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">Nenhum produto cadastrado ainda.</div>
      ) : (
        <div className="admin-list">
          {items.map((p) => (
            <div key={p.id} className="admin-row">
              <div className="admin-row-thumb">
                {p.photos && p.photos.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getImageUrl(p.photos[0].url)} alt={p.name} />
                ) : (
                  <Icon.CatShopping size={18} />
                )}
              </div>
              <div className="admin-row-main">
                <div className="admin-row-name">
                  {p.name}
                  {p.badge && <span className="admin-chip gold">{p.badge}</span>}
                </div>
                <div className="admin-row-meta">
                  {formatPrice(p.price)} · {categoryLabel(p.category)} · {sellerName(p.seller_id)}
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

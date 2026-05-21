"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";
import {
  sellerApi,
  ApiError,
  getImageUrl,
  type SellerProduct,
  type SellerProductPayload,
  type SellerProfileData,
  type ProductPhoto,
} from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { Icon } from "../icons";
import { cn } from "@/lib/utils";

// ─── Props ────────────────────────────────────────────────────────────────────

interface SellerPanelScreenProps {
  onBack: () => void;
}

// ─── Shop categories ─────────────────────────────────────────────────────────

const SHOP_CATS = [
  { id: "limpeza", label: "Limpeza" },
  { id: "manutencao", label: "Manutenção" },
  { id: "epi", label: "EPI" },
  { id: "jardim", label: "Jardim" },
  { id: "piscina", label: "Piscina" },
  { id: "eletrica", label: "Elétrica" },
  { id: "escritorio", label: "Escritório" },
] as const;

type ShopCatId = (typeof SHOP_CATS)[number]["id"];

function catLabel(id: string): string {
  return SHOP_CATS.find((c) => c.id === id)?.label ?? id;
}

// ─── Currency helper ─────────────────────────────────────────────────────────

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ─── Product form state ───────────────────────────────────────────────────────

interface ProductFormState {
  name: string;
  category: ShopCatId | "";
  price: string;
  old_price: string;
  tag: string;
  badge: "" | "OFERTA";
  stock: "Em estoque" | "Últimas unidades" | "Sem estoque";
  link: string;
  manufacturer: string;
}

const EMPTY_PRODUCT_FORM: ProductFormState = {
  name: "",
  category: "",
  price: "",
  old_price: "",
  tag: "",
  badge: "",
  stock: "Em estoque",
  link: "",
  manufacturer: "",
};

interface ProductFormErrors {
  name?: string;
  category?: string;
  price?: string;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SellerPanelScreen({ onBack }: SellerPanelScreenProps) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<SellerProfileData | null>(null);
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Product form
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<ProductFormState>(EMPTY_PRODUCT_FORM);
  const [productErrors, setProductErrors] = useState<ProductFormErrors>({});
  const [productSaving, setProductSaving] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);

  // Photo state
  const [existingPhotos, setExistingPhotos] = useState<ProductPhoto[]>([]);
  const [pendingPhotos, setPendingPhotos] = useState<{ file: File; previewUrl: string }[]>([]);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);

  // Delete — confirmDeleteId holds the product awaiting confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    void (async () => {
      try {
        const data = await sellerApi.getMe();
        if (cancelled) return;
        setSeller(data.seller);
        setProducts(data.products);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError) {
          setLoadError(err.message || "Não foi possível carregar seus dados.");
        } else {
          setLoadError("Erro ao carregar dados.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Product form helpers ──────────────────────────────────────────────────

  function updateProductForm<K extends keyof ProductFormState>(k: K, v: ProductFormState[K]) {
    setProductForm((p) => ({ ...p, [k]: v }));
  }

  function openNewProductForm() {
    setEditingId(null);
    setProductForm(EMPTY_PRODUCT_FORM);
    setProductErrors({});
    setProductError(null);
    setExistingPhotos([]);
    setPendingPhotos([]);
    setShowProductForm(true);
  }

  function openEditProductForm(p: SellerProduct) {
    setEditingId(p.id);
    setProductForm({
      name: p.name,
      category: (p.category as ShopCatId) ?? "",
      price: String(p.price),
      old_price: p.old_price != null ? String(p.old_price) : "",
      tag: p.tag ?? "",
      badge: (p.badge as "" | "OFERTA") ?? "",
      stock: (p.stock as ProductFormState["stock"]) ?? "Em estoque",
      link: p.link ?? "",
      manufacturer: p.manufacturer ?? "",
    });
    setProductErrors({});
    setProductError(null);
    setExistingPhotos(p.photos ?? []);
    setPendingPhotos([]);
    setShowProductForm(true);
  }

  function cancelProductForm() {
    setShowProductForm(false);
    setEditingId(null);
    setProductForm(EMPTY_PRODUCT_FORM);
    setProductErrors({});
    setProductError(null);
    pendingPhotos.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
    setPendingPhotos([]);
    setExistingPhotos([]);
  }

  function validateProductForm(): boolean {
    const errs: ProductFormErrors = {};
    if (!productForm.name.trim()) errs.name = "Informe o nome do produto.";
    if (!productForm.category) errs.category = "Selecione uma categoria.";
    const priceNum = parseFloat(productForm.price.replace(",", "."));
    if (!productForm.price || isNaN(priceNum) || priceNum <= 0) {
      errs.price = "Informe um preço válido.";
    }
    setProductErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleProductSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateProductForm()) return;

    const price = parseFloat(productForm.price.replace(",", "."));
    const oldPriceRaw = productForm.old_price.replace(",", ".");
    const old_price =
      oldPriceRaw && !isNaN(parseFloat(oldPriceRaw)) ? parseFloat(oldPriceRaw) : null;

    const payload: SellerProductPayload = {
      name: productForm.name.trim(),
      category: productForm.category,
      price,
      ...(old_price !== null && { old_price }),
      ...(productForm.tag.trim() && { tag: productForm.tag.trim() }),
      ...(productForm.badge && { badge: productForm.badge }),
      stock: productForm.stock,
      ...(productForm.link.trim() && { link: productForm.link.trim() }),
      ...(productForm.manufacturer.trim() && { manufacturer: productForm.manufacturer.trim() }),
    };

    setProductSaving(true);
    setProductError(null);
    try {
      let productId: string;
      if (editingId) {
        const updated = await sellerApi.updateProduct(editingId, payload);
        setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
        productId = editingId;
      } else {
        const created = await sellerApi.createProduct(payload);
        setProducts((prev) => [...prev, created]);
        productId = created.id;
      }

      // Capture pending photos before cancelProductForm() resets the state
      const photosToUpload = [...pendingPhotos];
      cancelProductForm();

      if (photosToUpload.length > 0) {
        const uploaded = await Promise.allSettled(
          photosToUpload.map(({ file }) => sellerApi.uploadPhoto(productId, file))
        );
        const newPhotos = uploaded
          .filter((r): r is PromiseFulfilledResult<ProductPhoto> => r.status === "fulfilled")
          .map((r) => r.value);
        if (newPhotos.length > 0) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id !== productId ? p : { ...p, photos: [...(p.photos ?? []), ...newPhotos] }
            )
          );
        }
        photosToUpload.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setProductError(err.message || "Erro ao salvar produto.");
      } else {
        setProductError("Erro ao salvar produto.");
      }
    } finally {
      setProductSaving(false);
    }
  }

  async function confirmAndDelete() {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    setDeletingId(id);
    try {
      await sellerApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // silently fail — user can retry
    } finally {
      setDeletingId(null);
    }
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = 5 - existingPhotos.length - pendingPhotos.length;
    const toAdd = files.slice(0, remaining).map((f) => ({
      file: f,
      previewUrl: URL.createObjectURL(f),
    }));
    setPendingPhotos((prev) => [...prev, ...toAdd]);
    e.target.value = "";
  }

  function removePendingPhoto(idx: number) {
    setPendingPhotos((prev) => {
      URL.revokeObjectURL(prev[idx].previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  }

  async function removeExistingPhoto(photoId: string) {
    if (!editingId) return;
    setDeletingPhotoId(photoId);
    try {
      await sellerApi.deletePhoto(editingId, photoId);
      setExistingPhotos((prev) => prev.filter((p) => p.id !== photoId));
      setProducts((prev) =>
        prev.map((p) =>
          p.id !== editingId
            ? p
            : { ...p, photos: (p.photos ?? []).filter((ph) => ph.id !== photoId) }
        )
      );
    } catch {
      // silent
    } finally {
      setDeletingPhotoId(null);
    }
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="screen">
      {/* Header */}
      <div className="screen-header">
        <button
          type="button"
          className="screen-back"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={20} />
        </button>
        <h1 className="screen-title" style={{ color: "white" }}>
          {seller?.name ?? user?.name ?? "Minha Loja"}
        </h1>
        <div style={{ width: 36 }} aria-hidden />
      </div>

      {/* Body */}
      <div className="screen-body" style={{ padding: 0 }}>
        {loading ? (
          <div className="seller-loading" role="status" aria-label="Carregando">
            <span className="seller-spinner" />
            <span>Carregando…</span>
          </div>
        ) : loadError ? (
          <div className="prof-alert error" style={{ margin: "20px 16px" }}>
            {loadError}
          </div>
        ) : (
          <div className="seller-tab-content">
            {products.length === 0 && !showProductForm ? (
              <div className="seller-empty">
                <Icon.Box size={36} style={{ opacity: 0.3, marginBottom: 12 }} />
                <p>Nenhum produto cadastrado.</p>
                <p>Adicione o primeiro!</p>
              </div>
            ) : (
              <div className="seller-product-list">
                {products.map((p) => (
                  <div key={p.id} className="seller-product-card">
                    {p.photos && p.photos.length > 0 && (
                      <img
                        src={getImageUrl(p.photos[0].url)}
                        alt={p.name}
                        className="seller-product-thumb"
                      />
                    )}
                    <div className="seller-product-info">
                      <div className="seller-product-name">{p.name}</div>
                      {p.manufacturer && (
                        <div className="seller-product-manufacturer">{p.manufacturer}</div>
                      )}
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
                        <span className="seller-product-cat">{catLabel(p.category)}</span>
                        {p.badge && (
                          <span
                            className="seller-product-cat"
                            style={{
                              background: "rgba(233,122,45,0.12)",
                              color: "var(--orange-500)",
                            }}
                          >
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div className="seller-product-price">
                        {formatBRL(p.price)}
                        {p.old_price != null && (
                          <span className="seller-product-old-price">
                            {formatBRL(p.old_price)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="seller-product-actions">
                      <button
                        type="button"
                        className="seller-product-edit-btn"
                        onClick={() => openEditProductForm(p)}
                        aria-label={`Editar ${p.name}`}
                      >
                        <Icon.Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="seller-product-delete-btn"
                        onClick={() => setConfirmDeleteId(p.id)}
                        disabled={deletingId === p.id}
                        aria-label={`Excluir ${p.name}`}
                      >
                        {deletingId === p.id ? (
                          <span className="seller-spinner-sm" />
                        ) : (
                          <Icon.Trash size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Product form */}
            {showProductForm && (
              <div className="seller-form">
                <div className="seller-form-title">
                  {editingId ? "Editar produto" : "Novo produto"}
                </div>

                {productError && (
                  <div className="prof-alert error">{productError}</div>
                )}

                <form onSubmit={handleProductSubmit} noValidate>
                  {/* Photos */}
                  <div className="seller-form-field">
                    <label className="seller-form-label">
                      Fotos do produto
                      <span className="seller-photo-count">
                        {existingPhotos.length + pendingPhotos.length}/5
                      </span>
                    </label>
                    <div className="seller-photo-grid">
                      {existingPhotos.map((photo) => (
                        <div key={photo.id} className="seller-photo-slot">
                          <img src={getImageUrl(photo.url)} alt="Foto" />
                          <button
                            type="button"
                            className="seller-photo-remove"
                            onClick={() => removeExistingPhoto(photo.id)}
                            disabled={deletingPhotoId === photo.id || productSaving}
                            aria-label="Remover foto"
                          >
                            {deletingPhotoId === photo.id ? "…" : "×"}
                          </button>
                        </div>
                      ))}
                      {pendingPhotos.map((p, i) => (
                        <div key={p.previewUrl} className="seller-photo-slot pending">
                          <img src={p.previewUrl} alt={`Nova foto ${i + 1}`} />
                          <button
                            type="button"
                            className="seller-photo-remove"
                            onClick={() => removePendingPhoto(i)}
                            disabled={productSaving}
                            aria-label="Remover foto"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {existingPhotos.length + pendingPhotos.length < 5 && (
                        <label className="seller-photo-add" htmlFor="sf-photos">
                          <Icon.Plus size={20} />
                          <span>Foto</span>
                          <input
                            id="sf-photos"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            style={{ display: "none" }}
                            onChange={handlePhotoSelect}
                            disabled={productSaving}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="seller-form-field">
                    <label className="seller-form-label" htmlFor="sf-name">
                      Nome do produto *
                    </label>
                    <input
                      id="sf-name"
                      className={cn("seller-form-input", productErrors.name && "invalid")}
                      type="text"
                      placeholder="Ex.: Detergente Concentrado 5L"
                      value={productForm.name}
                      onChange={(e) => updateProductForm("name", e.target.value)}
                      disabled={productSaving}
                    />
                    {productErrors.name && (
                      <div className="auth-field-error">{productErrors.name}</div>
                    )}
                  </div>

                  {/* Manufacturer */}
                  <div className="seller-form-field">
                    <label className="seller-form-label" htmlFor="sf-manufacturer">
                      Fabricante (opcional)
                    </label>
                    <input
                      id="sf-manufacturer"
                      className="seller-form-input"
                      type="text"
                      placeholder="Ex.: Unilever, 3M, Bettanin…"
                      value={productForm.manufacturer}
                      onChange={(e) => updateProductForm("manufacturer", e.target.value)}
                      disabled={productSaving}
                    />
                  </div>

                  {/* Category */}
                  <div className="seller-form-field">
                    <label className="seller-form-label" htmlFor="sf-cat">
                      Categoria *
                    </label>
                    <select
                      id="sf-cat"
                      className={cn("seller-form-select", productErrors.category && "invalid")}
                      value={productForm.category}
                      onChange={(e) => updateProductForm("category", e.target.value as ShopCatId)}
                      disabled={productSaving}
                    >
                      <option value="">Selecione…</option>
                      {SHOP_CATS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    {productErrors.category && (
                      <div className="auth-field-error">{productErrors.category}</div>
                    )}
                  </div>

                  {/* Price row */}
                  <div className="seller-form-row">
                    <div className="seller-form-field" style={{ flex: 1 }}>
                      <label className="seller-form-label" htmlFor="sf-price">
                        Preço (R$) *
                      </label>
                      <input
                        id="sf-price"
                        className={cn("seller-form-input", productErrors.price && "invalid")}
                        type="text"
                        inputMode="decimal"
                        placeholder="0,00"
                        value={productForm.price}
                        onChange={(e) => updateProductForm("price", e.target.value)}
                        disabled={productSaving}
                      />
                      {productErrors.price && (
                        <div className="auth-field-error">{productErrors.price}</div>
                      )}
                    </div>
                    <div className="seller-form-field" style={{ flex: 1 }}>
                      <label className="seller-form-label" htmlFor="sf-oldprice">
                        Preço original (opcional)
                      </label>
                      <input
                        id="sf-oldprice"
                        className="seller-form-input"
                        type="text"
                        inputMode="decimal"
                        placeholder="0,00"
                        value={productForm.old_price}
                        onChange={(e) => updateProductForm("old_price", e.target.value)}
                        disabled={productSaving}
                      />
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="seller-form-field">
                    <label className="seller-form-label" htmlFor="sf-tag">
                      Etiqueta (opcional)
                    </label>
                    <input
                      id="sf-tag"
                      className="seller-form-input"
                      type="text"
                      placeholder="Ex.: Mais vendido"
                      value={productForm.tag}
                      onChange={(e) => updateProductForm("tag", e.target.value)}
                      disabled={productSaving}
                    />
                  </div>

                  {/* Badge + Stock row */}
                  <div className="seller-form-row">
                    <div className="seller-form-field" style={{ flex: 1 }}>
                      <label className="seller-form-label" htmlFor="sf-badge">
                        Badge
                      </label>
                      <select
                        id="sf-badge"
                        className="seller-form-select"
                        value={productForm.badge}
                        onChange={(e) => updateProductForm("badge", e.target.value as "" | "OFERTA")}
                        disabled={productSaving}
                      >
                        <option value="">Nenhum</option>
                        <option value="OFERTA">OFERTA</option>
                      </select>
                    </div>
                    <div className="seller-form-field" style={{ flex: 1 }}>
                      <label className="seller-form-label" htmlFor="sf-stock">
                        Estoque
                      </label>
                      <select
                        id="sf-stock"
                        className="seller-form-select"
                        value={productForm.stock}
                        onChange={(e) =>
                          updateProductForm(
                            "stock",
                            e.target.value as ProductFormState["stock"]
                          )
                        }
                        disabled={productSaving}
                      >
                        <option value="Em estoque">Em estoque</option>
                        <option value="Últimas unidades">Últimas unidades</option>
                        <option value="Sem estoque">Sem estoque</option>
                      </select>
                    </div>
                  </div>

                  {/* Link */}
                  <div className="seller-form-field">
                    <label className="seller-form-label" htmlFor="sf-link">
                      Link do produto (opcional)
                    </label>
                    <input
                      id="sf-link"
                      className="seller-form-input"
                      type="url"
                      placeholder="https://…"
                      value={productForm.link}
                      onChange={(e) => updateProductForm("link", e.target.value)}
                      disabled={productSaving}
                    />
                  </div>

                  <div className="seller-form-actions">
                    <button
                      type="submit"
                      className="seller-form-save-btn"
                      disabled={productSaving}
                    >
                      {productSaving ? (
                        <>
                          <span className="seller-spinner-sm" /> Salvando…
                        </>
                      ) : (
                        <>{editingId ? "Salvar alterações" : "Adicionar produto"}</>
                      )}
                    </button>
                    <button
                      type="button"
                      className="seller-form-cancel-btn"
                      onClick={cancelProductForm}
                      disabled={productSaving}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* FAB */}
            {!showProductForm && (
              <button
                type="button"
                className="seller-fab"
                onClick={openNewProductForm}
                aria-label="Adicionar produto"
              >
                <Icon.Plus size={22} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation modal — portal escapes backdrop-filter containment */}
      {confirmDeleteId && typeof document !== "undefined" && createPortal(
        <div className="confirm-overlay" role="dialog" aria-modal="true">
          <div className="confirm-sheet">
            <div className="confirm-title">Excluir produto?</div>
            <div className="confirm-body">
              {(() => {
                const p = products.find((x) => x.id === confirmDeleteId);
                return p ? (
                  <span>
                    Tem certeza que deseja excluir{" "}
                    <strong>{p.name}</strong>? Esta ação não pode ser desfeita.
                  </span>
                ) : (
                  "Esta ação não pode ser desfeita."
                );
              })()}
            </div>
            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-cancel-btn"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="confirm-delete-btn"
                onClick={() => void confirmAndDelete()}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

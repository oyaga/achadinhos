"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  adminApi,
  categoriesApi,
  getImageUrl,
  isPdf,
  ApiError,
  type AdminSeller,
  type ApiProvider,
  type ApiCategory,
  type AdminSellerPayload,
  type AdminProviderPayload,
  type PortfolioPhoto,
} from "@/lib/api";
import {
  formatDocument,
  isValidDocument,
  stripDocument,
  type DocumentType,
} from "@/lib/document";
import { formatPhone, stripPhone } from "@/lib/phone";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Kind = "empresa" | "prestador";
type Coverage = "bairro" | "cidade" | "regiao";

type Business =
  | { kind: "empresa"; seller: AdminSeller }
  | { kind: "prestador"; provider: ApiProvider };

const COVERAGE_OPTIONS: Array<{ id: Coverage; label: string }> = [
  { id: "bairro", label: "Bairro" },
  { id: "cidade", label: "Cidade" },
  { id: "regiao", label: "Região" },
];
const BADGE_OPTIONS = ["", "Ouro", "Verificado", "Top"];

interface FormState {
  kind: Kind;
  name: string;
  docType: DocumentType;
  document: string;
  whatsapp: string;
  description: string;
  // empresa
  link: string;
  partner: boolean;
  // prestador
  categoryId: string;
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
  kind: "empresa",
  name: "",
  docType: "cnpj",
  document: "",
  whatsapp: "",
  description: "",
  link: "",
  partner: false,
  categoryId: "",
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

export function NegociosSection() {
  const [items, setItems] = useState<Business[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<{ kind: Kind; id: string } | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [serviceInput, setServiceInput] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [existingLogo, setExistingLogo] = useState<string>("");
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([]);
  const [existingPortfolio, setExistingPortfolio] = useState<PortfolioPhoto[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [sellers, providers, cats] = await Promise.all([
        adminApi.listSellers(),
        adminApi.listProviders(),
        categoriesApi.list(),
      ]);
      const merged: Business[] = [
        ...sellers.map((s) => ({ kind: "empresa" as const, seller: s })),
        ...providers.map((p) => ({ kind: "prestador" as const, provider: p })),
      ].sort((a, b) => businessName(a).localeCompare(businessName(b)));
      setItems(merged);
      setCategories(cats);
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
    setEditing(null);
    setForm(EMPTY_FORM);
    setServiceInput("");
    setLogoFile(null);
    setExistingLogo("");
    setPortfolioFiles([]);
    setExistingPortfolio([]);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(b: Business) {
    if (b.kind === "empresa") {
      const s = b.seller;
      setEditing({ kind: "empresa", id: s.id });
      setForm({
        ...EMPTY_FORM,
        kind: "empresa",
        name: s.name,
        categoryId: s.category_id ?? "",
        docType: (s.document_type as DocumentType) || "cnpj",
        document: s.document ? formatDocument(s.document, (s.document_type as DocumentType) || "cnpj") : "",
        whatsapp: formatPhone(s.whatsapp ?? ""),
        description: s.description ?? "",
        link: s.link ?? "",
        partner: s.partner,
        highlight: s.highlight ?? false,
      });
      setExistingLogo(s.logo_url ?? "");
      setExistingPortfolio(s.portfolio_photos ?? []);
    } else {
      const p = b.provider;
      setEditing({ kind: "prestador", id: p.id });
      setForm({
        ...EMPTY_FORM,
        kind: "prestador",
        name: p.name,
        docType: (p.document_type as DocumentType) || "cnpj",
        document: p.document ? formatDocument(p.document, (p.document_type as DocumentType) || "cnpj") : "",
        whatsapp: formatPhone(p.whatsapp ?? ""),
        description: p.description ?? "",
        categoryId: p.category_id,
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
      setExistingLogo(p.logo_url ?? "");
      setExistingPortfolio(p.portfolio_photos ?? []);
    }
    setServiceInput("");
    setLogoFile(null);
    setPortfolioFiles([]);
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setLogoFile(null);
    setExistingLogo("");
    setPortfolioFiles([]);
    setExistingPortfolio([]);
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

  function addPortfolioFiles(files: FileList | null) {
    if (!files) return;
    const room = 5 - existingPortfolio.length - portfolioFiles.length;
    if (room <= 0) return;
    setPortfolioFiles((prev) => [...prev, ...Array.from(files).slice(0, room)]);
  }

  async function removeExistingPortfolio(photoId: string) {
    if (!editing) return;
    try {
      if (editing.kind === "empresa") {
        await adminApi.deleteSellerPortfolio(editing.id, photoId);
      } else {
        await adminApi.deleteProviderPortfolio(editing.id, photoId);
      }
      setExistingPortfolio((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível remover a foto.");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (form.name.trim().length < 2) {
      setFormError("Informe o nome.");
      return;
    }
    // Documento (CPF/CNPJ): obrigatório apenas em cadastros novos. Negócios
    // antigos — criados antes do campo existir — podem ser salvos sem ele;
    // se um documento for informado, precisa ser válido.
    const documentDigits = stripDocument(form.document);
    if (!editing && documentDigits === "") {
      setFormError("Informe o CPF ou CNPJ.");
      return;
    }
    if (documentDigits !== "" && !isValidDocument(form.document, form.docType)) {
      setFormError(`${form.docType.toUpperCase()} inválido.`);
      return;
    }
    const whatsappDigits = stripPhone(form.whatsapp);
    if (whatsappDigits.length < 8) {
      setFormError("Informe um WhatsApp válido.");
      return;
    }
    if (!form.categoryId) {
      setFormError("Selecione uma categoria.");
      return;
    }
    if (form.kind === "prestador" && form.description.trim().length < 10) {
      setFormError("A descrição precisa de pelo menos 10 caracteres.");
      return;
    }

    setSubmitting(true);
    try {
      let id: string;
      let kind: Kind;

      if (form.kind === "empresa") {
        kind = "empresa";
        const payload: AdminSellerPayload = {
          name: form.name.trim(),
          category_id: form.categoryId,
          description: form.description.trim(),
          whatsapp: whatsappDigits,
          link: form.link.trim(),
          partner: form.partner,
          highlight: form.highlight,
          document_type: form.docType,
          document: stripDocument(form.document),
        };
        if (editing) {
          await adminApi.updateSeller(editing.id, payload);
          id = editing.id;
        } else {
          id = (await adminApi.createSeller(payload)).id;
        }
      } else {
        kind = "prestador";
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
          document_type: form.docType,
          document: stripDocument(form.document),
        };
        if (editing) {
          await adminApi.updateProvider(editing.id, payload);
          id = editing.id;
        } else {
          id = (await adminApi.createProvider(payload)).id;
        }
      }

      if (logoFile) {
        if (kind === "empresa") await adminApi.uploadSellerLogo(id, logoFile);
        else await adminApi.uploadProviderLogo(id, logoFile);
      }
      for (const file of portfolioFiles) {
        if (kind === "empresa") await adminApi.uploadSellerPortfolio(id, file);
        else await adminApi.uploadProviderPortfolio(id, file);
      }

      closeForm();
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(b: Business) {
    const name = businessName(b);
    if (!window.confirm(`Excluir "${name}"?`)) return;
    try {
      if (b.kind === "empresa") await adminApi.deleteSeller(b.seller.id);
      else await adminApi.deleteProvider(b.provider.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    }
  }

  function categoryLabel(id: string): string {
    if (!id) return "Sem categoria";
    return categories.find((c) => c.id === id)?.label ?? id;
  }

  const photoSlotsLeft = 5 - existingPortfolio.length - portfolioFiles.length;
  const isPrestador = form.kind === "prestador";

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Empresas e prestadores</h2>
          <p className="admin-section-sub">{items.length} cadastrado(s)</p>
        </div>
        {!formOpen && (
          <button type="button" className="admin-new-btn" onClick={openCreate}>
            <Icon.Plus size={16} />
            Novo cadastro
          </button>
        )}
      </div>

      {formOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-title">
            {editing ? "Editar cadastro" : "Novo cadastro"}
          </div>
          {formError && <div className="prof-alert error">{formError}</div>}

          {/* Tipo de negócio */}
          <div className="prof-field">
            <label className="prof-label">Tipo</label>
            <div className="auth-seg-group">
              {(
                [
                  { v: "empresa", l: "Empresa" },
                  { v: "prestador", l: "Prestador de serviço" },
                ] as const
              ).map(({ v, l }) => (
                <button
                  key={v}
                  type="button"
                  className={cn("auth-seg-btn", form.kind === v && "active")}
                  onClick={() => !editing && update("kind", v)}
                  disabled={!!editing}
                >
                  {l}
                </button>
              ))}
            </div>
            {editing && (
              <div className="admin-hint">O tipo não pode ser alterado depois de criado.</div>
            )}
          </div>

          <div className="prof-field">
            <label className="prof-label">Nome</label>
            <input
              className="prof-input"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder={isPrestador ? "Ex: TurboElev Manutenção" : "Ex: Distribuidora Higicond"}
            />
          </div>

          {/* Documento */}
          <div className="prof-row-fields">
            <div className="prof-field" style={{ flex: "0 0 130px" }}>
              <label className="prof-label">Documento</label>
              <div className="auth-seg-group">
                {(["cnpj", "cpf"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={cn("auth-seg-btn", form.docType === t && "active")}
                    onClick={() => { update("docType", t); update("document", ""); }}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="prof-field">
              <label className="prof-label">{form.docType === "cnpj" ? "CNPJ" : "CPF"}</label>
              <input
                className="prof-input"
                type="text"
                inputMode="numeric"
                value={form.document}
                onChange={(e) => update("document", formatDocument(e.target.value, form.docType))}
                placeholder={form.docType === "cnpj" ? "00.000.000/0001-00" : "000.000.000-00"}
              />
            </div>
          </div>

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

          <div className="prof-field">
            <label className="prof-label">Descrição</label>
            <textarea
              className="prof-textarea"
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Sobre o negócio, diferenciais, área de atuação…"
            />
          </div>

          {/* Logo */}
          <div className="prof-field">
            <label className="prof-label">Foto de perfil / logo</label>
            <div className="admin-logo-row">
              <div className="admin-logo-preview">
                {logoFile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={URL.createObjectURL(logoFile)} alt="Logo" />
                ) : existingLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getImageUrl(existingLogo)} alt="Logo" />
                ) : (
                  <Icon.Building size={20} />
                )}
              </div>
              <label className="admin-btn-ghost admin-upload-label">
                {logoFile || existingLogo ? "Trocar logo" : "Enviar logo"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => { setLogoFile(e.target.files?.[0] ?? null); e.target.value = ""; }}
                />
              </label>
            </div>
          </div>

          {/* Empresa-only */}
          {!isPrestador && (
            <>
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
              <div className="admin-check-row">
                <label className="auth-checkbox">
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
            </>
          )}

          {/* Prestador-only */}
          {isPrestador && (
            <>
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
            </>
          )}

          {/* Portfólio */}
          <div className="prof-field">
            <label className="prof-label">
              Portfólio ({existingPortfolio.length + portfolioFiles.length}/5)
            </label>
            <div className="admin-photos">
              {existingPortfolio.map((ph) => (
                <div key={ph.id} className="admin-photo">
                  {isPdf(ph.url) ? (
                    <a
                      href={getImageUrl(ph.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="upload-doc"
                    >
                      <strong>PDF</strong>
                    </a>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getImageUrl(ph.url)} alt="Portfólio" />
                  )}
                  <button
                    type="button"
                    className="admin-photo-remove"
                    onClick={() => removeExistingPortfolio(ph.id)}
                    aria-label="Remover foto"
                  >
                    ×
                  </button>
                </div>
              ))}
              {portfolioFiles.map((file, i) => (
                <div key={`${file.name}-${i}`} className="admin-photo">
                  {file.type === "application/pdf" ? (
                    <div className="upload-doc">
                      <strong>PDF</strong>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={URL.createObjectURL(file)} alt="Pré-visualização" />
                  )}
                  <button
                    type="button"
                    className="admin-photo-remove"
                    onClick={() => setPortfolioFiles((prev) => prev.filter((_, idx) => idx !== i))}
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
                    accept="image/*,application/pdf"
                    multiple
                    hidden
                    onChange={(e) => { addPortfolioFiles(e.target.files); e.target.value = ""; }}
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
              {submitting ? "Salvando…" : editing ? "Salvar alterações" : "Cadastrar"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error">{loadError}</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">Nenhuma empresa ou prestador cadastrado ainda.</div>
      ) : (
        <div className="admin-list">
          {items.map((b) => {
            const logo = b.kind === "empresa" ? b.seller.logo_url : b.provider.logo_url;
            const id = b.kind === "empresa" ? b.seller.id : b.provider.id;
            const name = businessName(b);
            const meta =
              b.kind === "empresa"
                ? `${categoryLabel(b.seller.category_id ?? "")} · ${b.seller.whatsapp ? formatPhone(b.seller.whatsapp) : "sem WhatsApp"}`
                : `${categoryLabel(b.provider.category_id)} · ${b.provider.whatsapp ? formatPhone(b.provider.whatsapp) : "sem WhatsApp"}`;
            return (
              <div key={`${b.kind}-${id}`} className="admin-row">
                <div className="admin-row-avatar">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getImageUrl(logo)} alt={name} />
                  ) : (
                    name.charAt(0)
                  )}
                </div>
                <div className="admin-row-main">
                  <div className="admin-row-name">
                    {name}
                    <span className={cn("admin-chip", b.kind === "prestador" && "gold")}>
                      {b.kind === "empresa" ? "Empresa" : "Prestador"}
                    </span>
                  </div>
                  <div className="admin-row-meta">{meta}</div>
                </div>
                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="admin-icon-btn"
                    onClick={() => openEdit(b)}
                    aria-label={`Editar ${name}`}
                  >
                    <Icon.Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    className={cn("admin-icon-btn", "danger")}
                    onClick={() => handleDelete(b)}
                    aria-label={`Excluir ${name}`}
                  >
                    <Icon.Trash size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function businessName(b: Business): string {
  return b.kind === "empresa" ? b.seller.name : b.provider.name;
}

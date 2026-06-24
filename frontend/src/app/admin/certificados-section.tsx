"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  adminApi,
  ApiError,
  type AdminSeller,
  type ApiCertificate,
} from "@/lib/api";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SignaturePad } from "@/components/admin/signature-pad";
import { CertificateViewer } from "@/components/certificate/certificate-viewer";

// "AAAA-MM-DD" da data de hoje (no fuso local).
function todayISO(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// hoje + 12 meses, em "AAAA-MM-DD".
function inOneYearISO(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function formatDateBR(iso: string): string {
  const ymd = (iso ?? "").slice(0, 10);
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${d}/${m}/${y}`;
}

type CertStatus = { label: string; tone: "ok" | "warn" | "danger" };

function statusOf(cert: ApiCertificate): CertStatus {
  if (cert.revoked) return { label: "Revogado", tone: "danger" };
  const today = todayISO();
  if (cert.valid_until.slice(0, 10) < today) return { label: "Vencido", tone: "warn" };
  return { label: "Ativo", tone: "ok" };
}

interface FormState {
  seller_id: string;
  responsavel_nome: string;
  responsavel_cpf: string;
  issued_at: string;
  valid_until: string;
}

function emptyForm(): FormState {
  return {
    seller_id: "",
    responsavel_nome: "",
    responsavel_cpf: "",
    issued_at: todayISO(),
    valid_until: inOneYearISO(),
  };
}

export function CertificadosSection() {
  const [certs, setCerts] = useState<ApiCertificate[]>([]);
  const [sellers, setSellers] = useState<AdminSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [signature, setSignature] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ blob: Blob; fileName: string } | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [c, s] = await Promise.all([adminApi.listCertificates(), adminApi.listSellers()]);
      setCerts(c);
      setSellers(s);
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const sellersById = useMemo(() => {
    const map = new Map<string, AdminSeller>();
    for (const s of sellers) map.set(s.id, s);
    return map;
  }, [sellers]);

  function openCreate() {
    setForm(emptyForm());
    setSignature(null);
    setFormError(null);
    setFormOpen(true);
  }

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!form.seller_id) {
      setFormError("Selecione a empresa.");
      return;
    }
    if (form.responsavel_nome.trim().length < 2) {
      setFormError("Informe o nome do responsável.");
      return;
    }
    if (!form.issued_at || !form.valid_until) {
      setFormError("Informe as datas de emissão e validade.");
      return;
    }
    if (form.valid_until < form.issued_at) {
      setFormError("A validade não pode ser anterior à emissão.");
      return;
    }
    setSubmitting(true);
    try {
      const cert = await adminApi.createCertificate({
        seller_id: form.seller_id,
        responsavel_nome: form.responsavel_nome.trim(),
        responsavel_cpf: form.responsavel_cpf.trim() || undefined,
        issued_at: form.issued_at,
        valid_until: form.valid_until,
        signature_png: signature ?? undefined,
      });
      setFormOpen(false);
      // Gera o PDF na hora (assinatura ainda em memória) e abre o preview.
      const { buildCertificateBlob, certificateFileName } = await import(
        "@/components/certificate/generate"
      );
      const blob = await buildCertificateBlob({
        empresaNome: cert.empresa_nome,
        categoria: cert.categoria,
        responsavelNome: cert.responsavel_nome,
        code: cert.code,
        issuedAt: cert.issued_at,
        validUntil: cert.valid_until,
        signatureDataUrl: signature,
      });
      setPreview({ blob, fileName: certificateFileName(cert.empresa_nome, cert.code) });
      await refresh();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível emitir o certificado.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleView(cert: ApiCertificate) {
    setBusyId(cert.id);
    try {
      const { buildCertificateBlob, certificateFileName } = await import(
        "@/components/certificate/generate"
      );
      const blob = await buildCertificateBlob({
        empresaNome: cert.empresa_nome,
        categoria: cert.categoria,
        responsavelNome: cert.responsavel_nome,
        code: cert.code,
        issuedAt: cert.issued_at,
        validUntil: cert.valid_until,
        signatureUrl: cert.signature_url || undefined,
      });
      setPreview({ blob, fileName: certificateFileName(cert.empresa_nome, cert.code) });
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Não foi possível gerar o PDF.");
    } finally {
      setBusyId(null);
    }
  }

  function handleVerify(cert: ApiCertificate) {
    window.open(`/verificar/?c=${encodeURIComponent(cert.code)}`, "_blank", "noopener");
  }

  async function handleToggleRevoke(cert: ApiCertificate) {
    const next = !cert.revoked;
    if (next && !window.confirm(`Revogar o certificado de "${cert.empresa_nome}"?`)) return;
    setBusyId(cert.id);
    try {
      await adminApi.revokeCertificate(cert.id, next);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível atualizar.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(cert: ApiCertificate) {
    if (!window.confirm(`Excluir o certificado de "${cert.empresa_nome}"? Esta ação não pode ser desfeita.`))
      return;
    setBusyId(cert.id);
    try {
      await adminApi.deleteCertificate(cert.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : "Não foi possível excluir.");
    } finally {
      setBusyId(null);
    }
  }

  const selectedSeller = form.seller_id ? sellersById.get(form.seller_id) : undefined;

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2 className="admin-section-title">Certificados</h2>
          <p className="admin-section-sub">{certs.length} certificado(s) emitido(s)</p>
        </div>
        {!formOpen && (
          <button type="button" className="admin-new-btn" onClick={openCreate}>
            <Icon.Plus size={16} />
            Emitir certificado
          </button>
        )}
      </div>

      {formOpen && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-title">Emitir certificado de empresa qualificada</div>
          {formError && <div className="prof-alert error">{formError}</div>}

          <div className="prof-field">
            <label className="prof-label">Empresa</label>
            <select
              className={cn("prof-input", form.seller_id && "filled")}
              value={form.seller_id}
              onChange={(e) => update("seller_id", e.target.value)}
            >
              <option value="">Selecione a empresa cadastrada…</option>
              {sellers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                  {s.category?.label ? ` — ${s.category.label}` : ""}
                </option>
              ))}
            </select>
            {selectedSeller?.category?.label && (
              <span className="prof-help">Categoria/segmento: {selectedSeller.category.label}</span>
            )}
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Responsável</label>
              <input
                className="prof-input"
                type="text"
                value={form.responsavel_nome}
                onChange={(e) => update("responsavel_nome", e.target.value)}
                placeholder="Nome de quem assina"
              />
            </div>
            <div className="prof-field">
              <label className="prof-label">CPF do responsável</label>
              <input
                className="prof-input"
                type="text"
                inputMode="numeric"
                maxLength={14}
                value={form.responsavel_cpf}
                onChange={(e) => update("responsavel_cpf", e.target.value)}
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          <div className="prof-row-fields">
            <div className="prof-field">
              <label className="prof-label">Data de emissão</label>
              <div className="prof-native">
                <input
                  className={cn("prof-input", form.issued_at && "filled")}
                  type="date"
                  value={form.issued_at}
                  onChange={(e) => update("issued_at", e.target.value)}
                />
                {!form.issued_at && <span className="prof-native-ph">dd/mm/aaaa</span>}
              </div>
            </div>
            <div className="prof-field">
              <label className="prof-label">Válido até</label>
              <div className="prof-native">
                <input
                  className={cn("prof-input", form.valid_until && "filled")}
                  type="date"
                  value={form.valid_until}
                  onChange={(e) => update("valid_until", e.target.value)}
                />
                {!form.valid_until && <span className="prof-native-ph">dd/mm/aaaa</span>}
              </div>
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Assinatura do responsável</label>
            <SignaturePad onChange={setSignature} />
          </div>

          <div className="admin-form-actions">
            <button type="button" className="admin-new-btn ghost" onClick={() => setFormOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="admin-new-btn" disabled={submitting}>
              <Icon.Award size={16} />
              {submitting ? "Emitindo…" : "Emitir e ver PDF"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="admin-empty">Carregando…</div>
      ) : loadError ? (
        <div className="prof-alert error">{loadError}</div>
      ) : certs.length === 0 ? (
        <div className="admin-empty">Nenhum certificado emitido ainda.</div>
      ) : (
        <div className="admin-list">
          {certs.map((cert) => {
            const st = statusOf(cert);
            const busy = busyId === cert.id;
            return (
              <div key={cert.id} className="admin-row">
                <div className="admin-row-avatar">
                  <Icon.Award size={18} />
                </div>
                <div className="admin-row-main">
                  <div className="admin-row-name">
                    {cert.empresa_nome}
                    <span className={cn("cert-badge", st.tone)}>{st.label}</span>
                  </div>
                  <div className="admin-row-meta">
                    {cert.code} · emissão {formatDateBR(cert.issued_at)} · válido até{" "}
                    {formatDateBR(cert.valid_until)}
                  </div>
                </div>
                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="admin-icon-btn"
                    onClick={() => handleView(cert)}
                    disabled={busy}
                    aria-label="Ver / baixar PDF"
                    title="Ver / baixar PDF"
                  >
                    <Icon.Download size={15} />
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn"
                    onClick={() => handleVerify(cert)}
                    aria-label="Abrir verificação"
                    title="Abrir página de verificação"
                  >
                    <Icon.QrCode size={15} />
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn"
                    onClick={() => handleToggleRevoke(cert)}
                    disabled={busy}
                    aria-label={cert.revoked ? "Reativar" : "Revogar"}
                    title={cert.revoked ? "Reativar certificado" : "Revogar certificado"}
                  >
                    {cert.revoked ? <Icon.Check size={15} /> : <Icon.Lock size={15} />}
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn danger"
                    onClick={() => handleDelete(cert)}
                    disabled={busy}
                    aria-label="Excluir"
                    title="Excluir"
                  >
                    <Icon.Trash size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {preview && (
        <CertificateViewer
          blob={preview.blob}
          fileName={preview.fileName}
          onClose={() => setPreview(null)}
        />
      )}
    </section>
  );
}

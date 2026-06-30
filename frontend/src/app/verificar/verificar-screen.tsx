"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { certificatesApi, type CertificateVerification } from "@/lib/api";
import { BrandLockup } from "@/components/auth/brand-lockup";
import { Icon } from "@/components/icons";
import { tierLabel } from "@/lib/utils";
import { CertSeal } from "@/components/cert-seal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { QrScanner } from "./qr-scanner";

// Titular genérico (empresa ou afiliado), com fallback ao campo seller antigo.
function ownerOf(cert: CertificateVerification) {
  if (cert.owner) return cert.owner;
  if (cert.seller) return { ...cert.seller, type: "seller" as const };
  return undefined;
}

// Link para o perfil do titular conforme o tipo.
function ownerHref(cert: CertificateVerification): string | null {
  const o = ownerOf(cert);
  if (!o?.id) return null;
  return o.type === "provider" ? `/prestador/${o.id}` : `/empresa/${o.id}`;
}

type Status = "loading" | "valid" | "invalid_state" | "not_found" | "no_code";

function formatDateBR(iso: string): string {
  const ymd = (iso ?? "").slice(0, 10);
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${d}/${m}/${y}`;
}

// Extrai o código de verificação de um texto lido (QR ou digitado). O QR do
// certificado contém o link /verificar/?c=CÓDIGO; aceitamos também o código puro.
function extractCertCode(text: string): string {
  const raw = (text ?? "").trim();
  if (!raw) return "";
  try {
    const url = new URL(raw, window.location.origin);
    const c = url.searchParams.get("c");
    if (c) return c.trim().toUpperCase();
  } catch {
    /* não é URL — usa o texto puro */
  }
  return raw.toUpperCase();
}

export function VerificarScreen() {
  const [status, setStatus] = useState<Status>("loading");
  const [cert, setCert] = useState<CertificateVerification | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const runVerify = useCallback(async (code: string) => {
    setStatus("loading");
    try {
      const v = await certificatesApi.verify(code);
      setCert(v);
      setStatus(v.valid ? "valid" : "invalid_state");
    } catch {
      setCert(null);
      setStatus("not_found");
    }
  }, []);

  // Verifica um código informado manualmente ou lido do QR: normaliza, atualiza
  // a URL (compartilhável) e dispara a verificação.
  const verifyCode = useCallback(
    async (rawCode: string) => {
      const code = extractCertCode(rawCode);
      if (!code) return;
      setScanError(null);
      setChecking(true);
      window.history.replaceState(null, "", `/verificar/?c=${encodeURIComponent(code)}`);
      await runVerify(code);
      setChecking(false);
    },
    [runVerify]
  );

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("c") ?? "";
    if (!code) {
      setStatus("no_code");
      return;
    }
    void runVerify(code);
  }, [runVerify]);

  // Câmera é recurso de mobile/PWA — no desktop fica só a consulta manual.
  const isMobile = useMediaQuery("(max-width: 767px)");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void verifyCode(inputCode);
  }

  // Form de consulta manual (+ botão de escanear no mobile), reutilizado nos
  // estados "sem código" e "não encontrado".
  const consultaForm = (
    <form className="verify-form" onSubmit={onSubmit}>
      <input
        className="verify-input"
        type="text"
        inputMode="text"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder="Ex: ACH-2026-XXXXXX"
        aria-label="Código do certificado"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button type="submit" className="verify-btn" disabled={checking || !inputCode.trim()}>
        {checking ? "Verificando…" : "Verificar"}
      </button>
      {isMobile && (
        <button
          type="button"
          className="verify-btn ghost verify-scan-btn"
          onClick={() => {
            setScanError(null);
            setScanning(true);
          }}
        >
          <Icon.QrCode size={16} /> Escanear QR code
        </button>
      )}
      {scanError && <p className="verify-scan-error">{scanError}</p>}
    </form>
  );

  return (
    <main className="verify-shell">
      <div className="verify-card">
        <BrandLockup />

        {status === "loading" && (
          <div className="verify-state">
            <span className="auth-spinner" aria-hidden />
            <span>Verificando certificado…</span>
          </div>
        )}

        {status === "no_code" && (
          <div className="verify-state">
            <div className="verify-icon neutral">
              <Icon.QrCode size={30} />
            </div>
            <h1 className="verify-title">Verificar certificado</h1>
            <p className="verify-text">
              Digite o código do certificado{isMobile ? " ou escaneie o QR code" : ""}. O código
              fica impresso no certificado e no link do QR.
            </p>
            {consultaForm}
          </div>
        )}

        {status === "not_found" && (
          <div className="verify-state">
            <div className="verify-icon danger">
              <Icon.X size={30} />
            </div>
            <h1 className="verify-title">Certificado não encontrado</h1>
            <p className="verify-text">
              Não localizamos nenhum certificado com este código. Confira e tente de novo.
            </p>
            {consultaForm}
          </div>
        )}

        {status === "invalid_state" && cert && (
          <div className="verify-state">
            <div className="verify-icon warn">
              <Icon.Lock size={28} />
            </div>
            <h1 className="verify-title">
              {cert.revoked ? "Certificado revogado" : "Certificado vencido"}
            </h1>
            <p className="verify-text">
              O certificado de <strong>{cert.empresa_nome}</strong>{" "}
              {cert.revoked
                ? "foi revogado e não é mais válido."
                : `expirou em ${formatDateBR(cert.valid_until)}.`}
            </p>
            <div className="verify-code">{cert.code}</div>
            {ownerHref(cert) && (
              <Link href={ownerHref(cert)!} className="verify-btn ghost">
                {cert.tipo === "afiliado" ? "Ver perfil do afiliado" : "Ver perfil da empresa"}
                <Icon.ChevRight size={15} />
              </Link>
            )}
          </div>
        )}

        {status === "valid" && cert && (
          <div className="verify-state">
            <div className="verify-icon ok">
              <Icon.CatSecurity size={34} />
            </div>
            <div className="verify-approved">
              <Icon.Check size={14} />
              {cert.tipo === "afiliado" ? "AFILIADO VERIFICADO E APROVADO" : "EMPRESA VERIFICADA E APROVADA"}
            </div>
            <h1 className="verify-title">{cert.empresa_nome}</h1>
            <CertSeal tier={cert.tier} size="lg" prefix="Nível " />
            <p className="verify-text">
              {cert.tipo === "afiliado" ? "O afiliado" : "A empresa"}{" "}
              <strong>{cert.empresa_nome}</strong> foi verificado(a) e <strong>aprovado(a)</strong>{" "}
              pelo Achadinhos do Condomínio, estando apto(a) a prestar serviços aos condomínios
              parceiros da plataforma.
            </p>

            <dl className="verify-details">
              <div className="verify-detail">
                <dt>Nível</dt>
                <dd>{tierLabel(cert.tier) || "—"}</dd>
              </div>
              {cert.categoria && (
                <div className="verify-detail">
                  <dt>Categoria</dt>
                  <dd>{cert.categoria}</dd>
                </div>
              )}
              <div className="verify-detail">
                <dt>Emissão</dt>
                <dd>{formatDateBR(cert.issued_at)}</dd>
              </div>
              <div className="verify-detail">
                <dt>Válido até</dt>
                <dd>{formatDateBR(cert.valid_until)}</dd>
              </div>
              <div className="verify-detail">
                <dt>Código</dt>
                <dd>{cert.code}</dd>
              </div>
            </dl>

            {ownerHref(cert) ? (
              <Link href={ownerHref(cert)!} className="verify-btn">
                {cert.tipo === "afiliado" ? "Ver perfil do afiliado" : "Ver perfil da empresa"}
                <Icon.ChevRight size={16} />
              </Link>
            ) : (
              <Link href="/" className="verify-btn ghost">
                Ir para o Achadinhos
                <Icon.ChevRight size={15} />
              </Link>
            )}

            <Link href="/certificacao" className="verify-learn-link">
              Saiba mais sobre a certificação
            </Link>
          </div>
        )}
      </div>

      {scanning && (
        <QrScanner
          onResult={(text) => {
            setScanning(false);
            void verifyCode(text);
          }}
          onCancel={() => setScanning(false)}
          onError={(msg) => {
            setScanning(false);
            setScanError(msg);
          }}
        />
      )}
    </main>
  );
}

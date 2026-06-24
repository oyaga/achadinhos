"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { certificatesApi, ApiError, type CertificateVerification } from "@/lib/api";
import { BrandLockup } from "@/components/auth/brand-lockup";
import { Icon } from "@/components/icons";

type Status = "loading" | "valid" | "invalid_state" | "not_found" | "no_code";

function formatDateBR(iso: string): string {
  const ymd = (iso ?? "").slice(0, 10);
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${d}/${m}/${y}`;
}

export function VerificarScreen() {
  const [status, setStatus] = useState<Status>("loading");
  const [cert, setCert] = useState<CertificateVerification | null>(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("c") ?? "";
    if (!code) {
      setStatus("no_code");
      return;
    }
    let alive = true;
    (async () => {
      try {
        const v = await certificatesApi.verify(code);
        if (!alive) return;
        setCert(v);
        setStatus(v.valid ? "valid" : "invalid_state");
      } catch (err) {
        if (!alive) return;
        setStatus(err instanceof ApiError && err.status === 404 ? "not_found" : "not_found");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

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
            <h1 className="verify-title">Código não informado</h1>
            <p className="verify-text">
              Escaneie o QR code do certificado ou abra o link completo de verificação.
            </p>
          </div>
        )}

        {status === "not_found" && (
          <div className="verify-state">
            <div className="verify-icon danger">
              <Icon.X size={30} />
            </div>
            <h1 className="verify-title">Certificado não encontrado</h1>
            <p className="verify-text">
              Não localizamos nenhum certificado com este código. Confira o código ou entre em
              contato com o Achadinhos do Condomínio.
            </p>
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
            {cert.seller?.id && (
              <Link href={`/empresa/${cert.seller.id}`} className="verify-btn ghost">
                Ver perfil da empresa
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
              EMPRESA VERIFICADA E APROVADA
            </div>
            <h1 className="verify-title">{cert.empresa_nome}</h1>
            <p className="verify-text">
              A empresa <strong>{cert.empresa_nome}</strong> foi verificada e{" "}
              <strong>aprovada</strong> pelo Achadinhos do Condomínio, estando apta a prestar
              serviços aos condomínios parceiros da plataforma.
            </p>

            <dl className="verify-details">
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

            {cert.seller?.id ? (
              <Link href={`/empresa/${cert.seller.id}`} className="verify-btn">
                Ver perfil da empresa
                <Icon.ChevRight size={16} />
              </Link>
            ) : (
              <Link href="/" className="verify-btn ghost">
                Ir para o Achadinhos
                <Icon.ChevRight size={15} />
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

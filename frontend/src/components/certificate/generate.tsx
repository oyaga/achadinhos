// Geração client-side do PDF do certificado. Este módulo importa o
// @react-pdf/renderer e o qrcode no topo, então é SEMPRE carregado via
// `import()` dinâmico (a partir da seção do admin) — assim essas libs ficam
// fora do bundle inicial e nunca rodam no prerender do export estático.
import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { getImageUrl } from "@/lib/api";
import { CertificateDocument, type CertificateDocData } from "./certificate-pdf";

// "AAAA-MM-DD" (ou ISO) -> "dd/mm/aaaa"
function formatDateBR(iso: string): string {
  const ymd = (iso ?? "").slice(0, 10);
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${d}/${m}/${y}`;
}

// URL pública da página de verificação (lida pelo QR code). Same-origin.
export function verifyUrl(code: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/verificar/?c=${encodeURIComponent(code)}`;
}

// Converte uma URL de imagem (ex.: assinatura salva em /uploads) num data URL,
// para embutir no PDF. Retorna null em caso de falha.
async function imageUrlToDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(getImageUrl(url));
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export interface BuildCertificateInput {
  empresaNome: string;
  categoria?: string;
  responsavelNome: string;
  code: string;
  issuedAt: string; // ISO / "AAAA-MM-DD"
  validUntil: string; // ISO / "AAAA-MM-DD"
  // Use signatureDataUrl quando a assinatura ainda está em memória (recém
  // desenhada); senão passe signatureUrl (/uploads/...) para buscar do servidor.
  signatureDataUrl?: string | null;
  signatureUrl?: string | null;
}

export async function buildCertificateBlob(input: BuildCertificateInput): Promise<Blob> {
  const qrDataUrl = await QRCode.toDataURL(verifyUrl(input.code), {
    margin: 1,
    width: 320,
    color: { dark: "#0b1b3b", light: "#ffffff" },
  });

  let signatureDataUrl = input.signatureDataUrl ?? null;
  if (!signatureDataUrl && input.signatureUrl) {
    signatureDataUrl = await imageUrlToDataUrl(input.signatureUrl);
  }

  const data: CertificateDocData = {
    empresaNome: input.empresaNome,
    categoria: input.categoria,
    responsavelNome: input.responsavelNome,
    code: input.code,
    issuedLabel: formatDateBR(input.issuedAt),
    validLabel: formatDateBR(input.validUntil),
    qrDataUrl,
    signatureDataUrl,
  };

  return pdf(<CertificateDocument data={data} />).toBlob();
}

// Gera e dispara o download do PDF do certificado.
export async function downloadCertificate(input: BuildCertificateInput): Promise<void> {
  const blob = await buildCertificateBlob(input);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const slug = input.empresaNome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  a.download = `certificado-${slug || "empresa"}-${input.code}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

import type { Metadata } from "next";
import { CertificacaoScreen } from "./certificacao-screen";

export const metadata: Metadata = {
  title: "Certificação Achadinhos",
  description:
    "Conheça a certificação do Achadinhos do Condomínio: os níveis Prata, Ouro e Black, os critérios de avaliação e como verificamos cada empresa e afiliado.",
  alternates: { canonical: "/certificacao" },
  openGraph: {
    title: "Certificação Achadinhos do Condomínio",
    description:
      "Níveis Prata, Ouro e Black, critérios de avaliação e verificação de certificados.",
    url: "/certificacao",
    type: "website",
  },
};

export default function CertificacaoPage() {
  return <CertificacaoScreen />;
}

import type { Metadata } from "next";
import { VerificarScreen } from "./verificar-screen";

export const metadata: Metadata = {
  title: "Verificação de certificado",
  description:
    "Verifique a autenticidade de um certificado de empresa qualificada do Achadinhos do Condomínio.",
  alternates: { canonical: "/verificar" },
  robots: { index: false, follow: false },
};

export default function VerificarPage() {
  return <VerificarScreen />;
}

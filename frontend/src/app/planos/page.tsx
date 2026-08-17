import type { Metadata } from "next";
import { PlanosScreen } from "./planos-screen";

export const metadata: Metadata = {
  title: "Planos Blue, Top e Black",
  description:
    "Compare os planos do Achadinhos do Condomínio: o que cada nível — Blue, Top e Black — inclui para empresas e afiliados da plataforma.",
  alternates: { canonical: "/planos" },
  openGraph: {
    title: "Planos Achadinhos do Condomínio",
    description:
      "O que cada plano inclui: Blue, Top e Black — benefícios, selo e destaque na plataforma.",
    url: "/planos",
    type: "website",
  },
};

export default function PlanosPage() {
  return <PlanosScreen />;
}

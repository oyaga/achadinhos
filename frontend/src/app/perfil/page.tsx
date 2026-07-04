import type { Metadata } from "next";
import { PerfilPageScreen } from "./perfil-page-screen";

export const metadata: Metadata = {
  title: "Meu perfil",
  description: "Gerencie seus dados, endereço e condomínio no Achadinhos do Condomínio.",
  alternates: { canonical: "/perfil" },
  robots: { index: false, follow: false },
};

export default function PerfilPage() {
  return <PerfilPageScreen />;
}

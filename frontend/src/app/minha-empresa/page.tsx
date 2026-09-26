import type { Metadata } from "next";
import { MinhaEmpresaScreen } from "./minha-empresa-screen";

export const metadata: Metadata = {
  title: "Minha empresa",
  robots: { index: false, follow: false },
};

export default function MinhaEmpresaPage() {
  return <MinhaEmpresaScreen />;
}

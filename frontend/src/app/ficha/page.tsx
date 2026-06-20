import type { Metadata } from "next";
import { FichaFormScreen } from "./ficha-form-screen";

export const metadata: Metadata = {
  title: "Ficha de cadastro",
  description:
    "Preencha a ficha de cadastro da sua empresa no Achadinhos do Condomínio.",
  alternates: { canonical: "/ficha" },
  robots: { index: false, follow: false },
};

export default function FichaPage() {
  return <FichaFormScreen />;
}

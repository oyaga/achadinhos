import type { Metadata } from "next";
import { CadastroScreen } from "./cadastro-screen";

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Crie sua conta de morador, síndico ou empresa no Achadinhos do Condomínio para encontrar prestadores e produtos.",
  alternates: { canonical: "/cadastro" },
  robots: { index: false, follow: true },
};

export default function CadastroPage() {
  return <CadastroScreen />;
}

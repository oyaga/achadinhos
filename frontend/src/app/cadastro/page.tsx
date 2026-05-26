import type { Metadata } from "next";
import { SindicoSignupScreen } from "./sindico-signup-screen";

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Crie sua conta de síndico ou morador no Achadinhos do Condomínio para encontrar prestadores e produtos.",
  alternates: { canonical: "/cadastro" },
  robots: { index: false, follow: true },
};

export default function CadastroPage() {
  return <SindicoSignupScreen />;
}

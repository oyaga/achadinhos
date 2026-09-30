import type { Metadata } from "next";
import { SindicoSignupScreen } from "../sindico-signup-screen";

// Caminho "Sou Síndico" da home: abre direto o cadastro de síndico, com o
// papel já marcado. O lead cai na aba Leads › Síndicos do painel admin.
export const metadata: Metadata = {
  title: "Cadastro de síndico",
  description:
    "Cadastre-se como síndico no Achadinhos do Condomínio e encontre prestadores e fornecedores para o seu condomínio.",
  alternates: { canonical: "/cadastro/sindico" },
  robots: { index: false, follow: true },
};

export default function CadastroSindicoPage() {
  return <SindicoSignupScreen initialAccountType="pessoa" initialCondoRole="sindico" />;
}

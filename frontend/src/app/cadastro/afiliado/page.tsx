import type { Metadata } from "next";
import { EmpresaSignupScreen } from "../empresa-signup-screen";

// Caminho "Quero ser Afiliado" da home: cadastro de empresas e fornecedores
// (empresa free). O lead cai na aba Leads › Afiliados do painel admin.
export const metadata: Metadata = {
  title: "Quero ser afiliado",
  description:
    "Cadastre sua empresa ou serviço no Achadinhos do Condomínio e seja encontrado pelos condomínios da sua região.",
  alternates: { canonical: "/cadastro/afiliado" },
  robots: { index: false, follow: true },
};

export default function CadastroAfiliadoPage() {
  return <EmpresaSignupScreen />;
}

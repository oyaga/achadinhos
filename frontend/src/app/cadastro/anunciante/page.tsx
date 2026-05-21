import type { Metadata } from "next";
import { AnuncianteSignupScreen } from "./anunciante-signup-screen";

export const metadata: Metadata = {
  title: "Cadastrar como anunciante",
  description:
    "Cadastre seu negócio no Achadinhos do Condomínio e receba pedidos de orçamento.",
};

export default function CadastroAnunciantePage() {
  return <AnuncianteSignupScreen />;
}

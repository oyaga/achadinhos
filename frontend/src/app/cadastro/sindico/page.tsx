import type { Metadata } from "next";
import { SindicoSignupScreen } from "./sindico-signup-screen";

export const metadata: Metadata = {
  title: "Criar conta de síndico",
  description:
    "Crie sua conta no Achadinhos do Condomínio para encontrar prestadores e produtos.",
};

export default function CadastroSindicoPage() {
  return <SindicoSignupScreen />;
}

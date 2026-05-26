import type { Metadata } from "next";
import { LoginScreen } from "./login-screen";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Acesse o Achadinhos do Condomínio com seu e-mail e senha.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginScreen />;
}

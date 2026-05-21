import type { Metadata } from "next";
import { AdminPanel } from "./admin-panel";

export const metadata: Metadata = {
  title: "Painel Admin · Achadinhos do Condomínio",
  description: "Cadastro de produtos, empresas e prestadores de serviços.",
};

export default function AdminPage() {
  return <AdminPanel />;
}

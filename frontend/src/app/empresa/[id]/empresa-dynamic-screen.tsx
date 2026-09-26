"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ApiError, sellersApi, type AdminSeller } from "@/lib/api";
import { EmpresaPageScreen } from "./empresa-page-screen";

// Página de empresa criada depois do build (ver FALLBACK_ID em page.tsx):
// pega o id da URL e busca a empresa na API, depois mostra a mesma tela das
// páginas exportadas.
export function EmpresaDynamicScreen() {
  const pathname = usePathname();
  const id = decodeURIComponent(pathname.split("/").filter(Boolean).at(-1) ?? "");
  const [seller, setSeller] = useState<AdminSeller | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || id === "_unavailable") {
      setError("Empresa não encontrada.");
      return;
    }
    setError("");
    sellersApi
      .get(id)
      .then((res) => {
        setSeller(res.seller);
        document.title = `${res.seller.name} · Achadinhos do Condomínio`;
      })
      .catch((err) =>
        setError(
          err instanceof ApiError && (err.status === 404 || err.status === 400)
            ? "Empresa não encontrada."
            : "Não foi possível carregar a empresa.",
        ),
      );
  }, [id]);

  if (seller) return <EmpresaPageScreen seller={seller} />;
  return (
    <main className="cert-page">
      <div className="cert-container">
        {error ? (
          <>
            <Link href="/">← Voltar ao início</Link>
            <div className="admin-empty" style={{ marginTop: 24 }}>{error}</div>
          </>
        ) : (
          <>
            <span className="auth-spinner" /> Carregando empresa…
          </>
        )}
      </div>
    </main>
  );
}

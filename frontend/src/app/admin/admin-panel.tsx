"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ProdutosSection } from "./produtos-section";
import { EmpresasSection } from "./empresas-section";
import { PrestadoresSection } from "./prestadores-section";

type AdminTab = "produtos" | "empresas" | "prestadores";

const TABS: Array<{ id: AdminTab; label: string; icon: keyof typeof Icon }> = [
  { id: "produtos", label: "Produtos", icon: "CatShopping" },
  { id: "empresas", label: "Empresas", icon: "CatPartners" },
  { id: "prestadores", label: "Prestadores", icon: "CatMaintenance" },
];

export function AdminPanel() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [tab, setTab] = useState<AdminTab>("produtos");

  const isAdmin = isAuthenticated && user?.role === "admin";

  // Bounce non-admins once the auth bootstrap has settled.
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.replace("/login");
    }
  }, [isLoading, isAdmin, router]);

  if (isLoading) {
    return (
      <main className="admin-shell">
        <div className="admin-gate">
          <span className="auth-spinner" aria-hidden />
          <span>Carregando painel…</span>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="admin-shell">
        <div className="admin-gate">
          <Icon.Lock size={28} />
          <span>Acesso restrito à administração.</span>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-brand">
          <div className="admin-header-mark">A</div>
          <div>
            <div className="admin-header-title">Painel Admin</div>
            <div className="admin-header-sub">Achadinhos do Condomínio</div>
          </div>
        </div>
        <div className="admin-header-user">
          <span className="admin-header-email">{user?.email}</span>
          <button type="button" className="admin-logout" onClick={logout}>
            <Icon.LogOut size={15} />
            Sair
          </button>
        </div>
      </header>

      <nav className="admin-tabs" role="tablist">
        {TABS.map((t) => {
          const I = Icon[t.icon];
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={cn("admin-tab", tab === t.id && "active")}
              onClick={() => setTab(t.id)}
            >
              <I size={16} />
              {t.label}
            </button>
          );
        })}
      </nav>

      <div className="admin-content">
        {tab === "produtos" && <ProdutosSection />}
        {tab === "empresas" && <EmpresasSection />}
        {tab === "prestadores" && <PrestadoresSection />}
      </div>
    </main>
  );
}

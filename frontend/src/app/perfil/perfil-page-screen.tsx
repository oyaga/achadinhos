"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { ProfileScreen } from "@/components/screens/profile-screen";

// /perfil — o ProfileScreen (overlay na home) promovido a página real:
// URL própria, refresh e botão voltar do navegador funcionando. O wrapper
// .route-page anula o comportamento de modal do .screen no desktop.
export function PerfilPageScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Página exige sessão: visitante vai pro login.
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <main className="route-page" aria-busy="true" />;
  }

  return (
    <main className="route-page profile-page">
      <ProfileScreen onBack={() => router.push("/")} />
    </main>
  );
}

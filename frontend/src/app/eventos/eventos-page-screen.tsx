"use client";

import { useRouter } from "next/navigation";
import { EventsScreen } from "@/components/screens/events-screen";

// /eventos — o calendário de eventos (overlay na home) promovido a página
// real, no mesmo padrão do /perfil: o wrapper .route-page anula o
// comportamento de modal do .screen no desktop.
export function EventosPageScreen() {
  const router = useRouter();

  return (
    <main className="route-page eventos-page">
      <EventsScreen onBack={() => router.push("/")} />
    </main>
  );
}

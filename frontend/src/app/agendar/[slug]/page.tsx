import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgendarScreen } from "./agendar-screen";

export const dynamic = "force-static";
export const dynamicParams = false;

// Diferente de /categoria/[id] (que lista as categorias na API em build), a
// API de agenda não expõe um endpoint de listagem — e o backend está em
// desenvolvimento paralelo. Os slugs conhecidos ficam hardcoded aqui; os
// dados reais (nome, título, slots) são buscados no cliente em runtime.
const KNOWN_SLUGS = ["ligia"] as const;

export function generateStaticParams() {
  return KNOWN_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Agende um horário",
    description:
      "Escolha o dia e o horário da sua conversa com o Achadinhos do Condomínio. A reunião acontece pelo Google Meet.",
    alternates: { canonical: `/agendar/${slug}` },
    openGraph: {
      title: "Agende um horário · Achadinhos do Condomínio",
      description:
        "Escolha o dia e o horário da sua conversa. A reunião acontece pelo Google Meet.",
      url: `/agendar/${slug}`,
      type: "website",
    },
  };
}

export default async function AgendarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!KNOWN_SLUGS.includes(slug as (typeof KNOWN_SLUGS)[number])) notFound();
  return <AgendarScreen slug={slug} />;
}

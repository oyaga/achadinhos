import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { providersApi } from "@/lib/api";
import { adaptProvider } from "@/lib/adapters";
import { App } from "@/components/app";
import { JsonLd, providerLocalBusinessSchema } from "@/components/seo/json-ld";

export const dynamic = "force-static";
export const dynamicParams = false;

const FALLBACK_ID = "_unavailable";

export async function generateStaticParams() {
  try {
    const res = await providersApi.list({ limit: 1000 });
    if (res.data.length > 0) return res.data.map((p) => ({ id: p.id }));
  } catch {
    /* swallow — fall through to placeholder */
  }
  return [{ id: FALLBACK_ID }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const provider = await providersApi.get(id);
    const desc =
      provider.description?.trim() ||
      `${provider.name} — ${provider.category?.label ?? "prestador de serviço"} no Achadinhos do Condomínio.`;
    return {
      title: provider.name,
      description: desc,
      alternates: { canonical: `/prestador/${id}` },
      openGraph: {
        title: provider.name,
        description: desc,
        url: `/prestador/${id}`,
        type: "website",
        images: provider.logo_url
          ? [{ url: provider.logo_url, alt: provider.name }]
          : undefined,
      },
    };
  } catch {
    return { title: "Prestador", robots: { index: false } };
  }
}

export default async function PrestadorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === FALLBACK_ID) notFound();
  let provider;
  let apiProvider;
  try {
    apiProvider = await providersApi.get(id);
    provider = adaptProvider(apiProvider);
  } catch {
    notFound();
  }
  return (
    <>
      <JsonLd data={providerLocalBusinessSchema(apiProvider)} />
      <App initialRoute={{ name: "provider", provider }} />
    </>
  );
}

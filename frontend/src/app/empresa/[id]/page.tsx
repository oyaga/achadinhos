import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sellersApi } from "@/lib/api";
import { JsonLd, sellerLocalBusinessSchema } from "@/components/seo/json-ld";
import { EmpresaPageScreen } from "./empresa-page-screen";

export const dynamic = "force-static";
export const dynamicParams = false;

// Sentinel ID used as a placeholder when the build can't reach the API.
// The page calls notFound() for this ID at build time so no real page is
// emitted; it only exists so Next is happy that the dynamic route has at
// least one entry under "output: export".
const FALLBACK_ID = "_unavailable";

export async function generateStaticParams() {
  try {
    const sellers = await sellersApi.list();
    if (sellers.length > 0) return sellers.map((s) => ({ id: s.id }));
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
    const { seller } = await sellersApi.get(id);
    const desc =
      (seller.description ?? "").trim() ||
      `${seller.name} — ${seller.category?.label ?? "empresa"} parceira no Achadinhos do Condomínio.`;
    return {
      title: seller.name,
      description: desc,
      alternates: { canonical: `/empresa/${id}` },
      openGraph: {
        title: seller.name,
        description: desc,
        url: `/empresa/${id}`,
        type: "website",
        images: seller.logo_url
          ? [{ url: seller.logo_url, alt: seller.name }]
          : undefined,
      },
    };
  } catch {
    return { title: "Empresa", robots: { index: false } };
  }
}

export default async function EmpresaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === FALLBACK_ID) notFound();
  let seller;
  try {
    const res = await sellersApi.get(id);
    seller = res.seller;
  } catch {
    notFound();
  }
  return (
    <>
      <JsonLd data={sellerLocalBusinessSchema(seller)} />
      <EmpresaPageScreen seller={seller} />
    </>
  );
}

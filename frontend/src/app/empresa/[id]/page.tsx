import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sellersApi } from "@/lib/api";
import { JsonLd, sellerLocalBusinessSchema } from "@/components/seo/json-ld";
import { EmpresaPageScreen } from "./empresa-page-screen";
import { EmpresaDynamicScreen } from "./empresa-dynamic-screen";

export const dynamic = "force-static";
export const dynamicParams = false;

// Casca para empresas criadas depois do build (autocadastro da empresa
// free): sempre exportada, lê o id da URL e busca a empresa no navegador. O
// servidor Go serve esta página para qualquer /empresa/<id>/ sem página
// própria (internal/static). Também cobre o build sem acesso à API.
const FALLBACK_ID = "_unavailable";

export async function generateStaticParams() {
  const params = [{ id: FALLBACK_ID }];
  try {
    const sellers = await sellersApi.list();
    params.push(...sellers.map((s) => ({ id: s.id })));
  } catch {
    /* swallow — só a casca */
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (id === FALLBACK_ID) return { title: "Empresa" };
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
  if (id === FALLBACK_ID) return <EmpresaDynamicScreen />;
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

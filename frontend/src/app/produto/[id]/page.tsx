import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsApi } from "@/lib/api";
import { adaptProduct } from "@/lib/adapters";
import { JsonLd, productSchema } from "@/components/seo/json-ld";
import { ProdutoPageScreen } from "./produto-page-screen";

export const dynamic = "force-static";
export const dynamicParams = false;

const FALLBACK_ID = "_unavailable";

export async function generateStaticParams() {
  try {
    const res = await productsApi.list({ limit: 1000 });
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
    const { product } = await productsApi.get(id);
    const desc =
      `${product.name}${product.seller?.name ? ` por ${product.seller.name}` : ""} — produto para condomínios no Achadinhos.`;
    const img = product.photos?.[0]?.url;
    return {
      title: product.name,
      description: desc,
      alternates: { canonical: `/produto/${id}` },
      openGraph: {
        title: product.name,
        description: desc,
        url: `/produto/${id}`,
        type: "website",
        images: img ? [{ url: img, alt: product.name }] : undefined,
      },
    };
  } catch {
    return { title: "Produto", robots: { index: false } };
  }
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === FALLBACK_ID) notFound();
  let apiProduct;
  let product;
  try {
    const res = await productsApi.get(id);
    apiProduct = res.product;
    product = adaptProduct(apiProduct);
  } catch {
    notFound();
  }
  return (
    <>
      <JsonLd data={productSchema(apiProduct)} />
      <ProdutoPageScreen product={product} sellerId={apiProduct.seller_id} />
    </>
  );
}

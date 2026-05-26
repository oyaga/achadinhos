import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoriesApi } from "@/lib/api";
import { App } from "@/components/app";
import { JsonLd, categoryCollectionSchema } from "@/components/seo/json-ld";

export const dynamic = "force-static";
export const dynamicParams = false;

const FALLBACK_ID = "_unavailable";

export async function generateStaticParams() {
  try {
    const cats = await categoriesApi.list();
    if (cats.length > 0) return cats.map((c) => ({ id: c.id }));
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
    const cats = await categoriesApi.list();
    const cat = cats.find((c) => c.id === id);
    if (!cat) return { title: "Categoria", robots: { index: false } };
    const desc =
      cat.desc?.trim() ||
      `Empresas e prestadores de ${cat.label.toLowerCase()} no Achadinhos do Condomínio.`;
    return {
      title: cat.label,
      description: desc,
      alternates: { canonical: `/categoria/${id}` },
      openGraph: {
        title: cat.label,
        description: desc,
        url: `/categoria/${id}`,
        type: "website",
      },
    };
  } catch {
    return { title: "Categoria", robots: { index: false } };
  }
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === FALLBACK_ID) notFound();
  let cat;
  try {
    const cats = await categoriesApi.list();
    cat = cats.find((c) => c.id === id);
    if (!cat) notFound();
  } catch {
    notFound();
  }
  return (
    <>
      <JsonLd
        data={categoryCollectionSchema({
          id: cat!.id,
          label: cat!.label,
          description: cat!.desc,
          itemCount: cat!.count,
        })}
      />
      <App initialRoute={{ name: "category", categoryId: cat!.id }} />
    </>
  );
}

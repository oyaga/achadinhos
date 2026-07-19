"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ApiBlogPost, ApiError, blogApi, getImageUrl } from "@/lib/api";
import { PdfSlides } from "@/components/blog/pdf-slides";

export function PostScreen() {
  const pathname = usePathname();
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).at(-1) ?? "");
  const [post, setPost] = useState<ApiBlogPost | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug || slug === "_unavailable") return;
    setError("");
    blogApi.get(slug).then(setPost).catch((err) =>
      setError(err instanceof ApiError ? err.message : "Não foi possível carregar a postagem."),
    );
  }, [slug]);

  if (error) return <main className="cert-page"><div className="cert-container"><Link href="/blog">← Voltar ao Blog</Link><div className="admin-empty" style={{marginTop:24}}>{error}</div></div></main>;
  if (!post) return <main className="cert-page"><div className="cert-container"><span className="auth-spinner"/> Carregando postagem…</div></main>;

  return <main className="cert-page"><article className="cert-container">
    <Link href="/blog">← Blog</Link><h1 className="cert-title">{post.title}</h1><p className="cert-lead">{post.excerpt}</p>
    {post.cover_url && <img src={getImageUrl(post.cover_url)} alt="" style={{width:"100%",maxHeight:520,objectFit:"cover",borderRadius:18,marginBottom:24}}/>}
    {post.format === "presentation" && post.pdf_url ? <PdfSlides url={post.pdf_url}/> : <div className="blog-content" dangerouslySetInnerHTML={{__html:post.content_html}}/>}
  </article></main>;
}

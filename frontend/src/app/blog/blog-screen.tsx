"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiBlogPost, blogApi, getImageUrl } from "@/lib/api";
export function BlogScreen(){
 const [posts,setPosts]=useState<ApiBlogPost[]>([]); useEffect(()=>{blogApi.list().then(setPosts)},[]);
 return <main className="cert-page"><div className="cert-container"><h1 className="cert-title">Blog <em>Achadinhos</em></h1><p className="cert-lead">Conteúdo para síndicos, moradores e profissionais de condomínios.</p>
 <div className="cert-tier-grid">{posts.map(p=><Link href={`/blog/${p.slug}`} key={p.id} className="cert-tier-card" style={{textDecoration:"none",textAlign:"left"}}>{p.cover_url&&<img src={getImageUrl(p.cover_url)} alt="" style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",borderRadius:12}}/>}<small>{p.format==="presentation"?"APRESENTAÇÃO":"ARTIGO"}</small><h2>{p.title}</h2><p>{p.excerpt}</p></Link>)}</div>
 {!posts.length&&<p>Nenhuma publicação disponível.</p>}</div></main>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { adminApi, ApiBlogPost, ApiError, BlogPostFormat, getImageUrl } from "@/lib/api";
import { Icon } from "@/components/icons";
import "./blog-section.css";

type FormState = { title:string; slug:string; excerpt:string; format:BlogPostFormat; content_html:string; published:boolean };
const EMPTY: FormState = { title:"", slug:"", excerpt:"", format:"traditional", content_html:"", published:true };

const slugify=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

export function BlogSection(){
  const [posts,setPosts]=useState<ApiBlogPost[]>([]);
  const [editing,setEditing]=useState<ApiBlogPost|null>(null);
  const [form,setForm]=useState<FormState>(EMPTY);
  const [open,setOpen]=useState(false);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const editor=useRef<HTMLDivElement>(null), cover=useRef<HTMLInputElement>(null), pdf=useRef<HTMLInputElement>(null), contentImage=useRef<HTMLInputElement>(null);

  async function load(){setLoading(true);setError("");try{setPosts(await adminApi.listBlogPosts())}catch(e){setError(e instanceof ApiError?e.message:"Não foi possível carregar as postagens.")}finally{setLoading(false)}}
  useEffect(()=>{void load()},[]);

  function showForm(post?:ApiBlogPost){
    setEditing(post??null);setError("");setSuccess("");setOpen(true);
    const next=post?{title:post.title,slug:post.slug,excerpt:post.excerpt,format:post.format,content_html:post.content_html,published:post.published}:EMPTY;
    setForm(next);setTimeout(()=>{if(editor.current)editor.current.innerHTML=next.content_html},0);
  }
  function closeForm(){setOpen(false);setEditing(null);setForm(EMPTY);setError("")}
  const update=<K extends keyof FormState>(key:K,value:FormState[K])=>setForm(f=>({...f,[key]:value}));
  const command=(name:string,value?:string)=>{document.execCommand(name,false,value);editor.current?.focus()};

  async function insertImage(){const file=contentImage.current?.files?.[0];if(!file)return;setBusy(true);try{const {url}=await adminApi.uploadBlogContentImage(file);command("insertImage",getImageUrl(url))}catch(e){setError(e instanceof ApiError?e.message:"Falha ao enviar imagem.")}finally{setBusy(false);if(contentImage.current)contentImage.current.value=""}}

  async function save(){
    setError("");setSuccess("");const content=editor.current?.innerHTML.trim()||form.content_html.trim();
    if(form.title.trim().length<3)return setError("Informe um título com pelo menos 3 caracteres.");
    if(!form.slug)return setError("Informe o endereço (slug) da postagem.");
    if(form.format==="traditional"&&!content)return setError("Escreva o conteúdo da postagem.");
    if(form.format==="presentation"&&!editing?.pdf_url&&!pdf.current?.files?.[0])return setError("Selecione o PDF da apresentação.");
    setBusy(true);
    try{
      const payload={...form,title:form.title.trim(),excerpt:form.excerpt.trim(),content_html:content};
      const post=editing?await adminApi.updateBlogPost(editing.id,payload):await adminApi.createBlogPost(payload);
      const coverFile=cover.current?.files?.[0],pdfFile=pdf.current?.files?.[0];
      if(coverFile)await adminApi.uploadBlogCover(post.id,coverFile);
      if(pdfFile)await adminApi.uploadBlogPDF(post.id,pdfFile);
      await load();closeForm();setSuccess(form.published?"Postagem publicada com sucesso.":"Rascunho salvo com sucesso.");
    }catch(e){setError(e instanceof ApiError?e.message:"Não foi possível salvar a postagem.")}finally{setBusy(false)}
  }
  async function toggle(post:ApiBlogPost){setError("");try{await adminApi.updateBlogPost(post.id,{published:!post.published});await load();setSuccess(post.published?"Postagem removida do Blog.":"Postagem publicada.")}catch(e){setError(e instanceof ApiError?e.message:"Não foi possível alterar o status.")}}
  async function remove(post:ApiBlogPost){if(!confirm(`Excluir “${post.title}”?`))return;try{await adminApi.deleteBlogPost(post.id);await load();setSuccess("Postagem excluída.")}catch(e){setError(e instanceof ApiError?e.message:"Não foi possível excluir.")}}

  return <section>
    <div className="admin-section-head"><div><h2 className="admin-section-title">Blog</h2><p className="admin-section-sub">{posts.length} postagem(ns) · artigos e apresentações</p></div><button className="admin-primary-btn" onClick={()=>showForm()}><Icon.Plus size={16}/> Nova postagem</button></div>
    {error&&<div className="auth-error" role="alert">{error}</div>}{success&&<div className="admin-success">{success}</div>}
    {open&&<div className="admin-form-card">
      <div className="admin-section-head"><div className="admin-form-title">{editing?"Editar postagem":"Criar postagem"}</div><button className="auth-tertiary-link" onClick={closeForm}>Cancelar</button></div>
      <div className="prof-field"><label className="prof-label">Formato</label><select className="prof-input" value={form.format} onChange={e=>update("format",e.target.value as BlogPostFormat)}><option value="traditional">Post tradicional</option><option value="presentation">Apresentação em PDF</option></select></div>
      <div className="prof-field"><label className="prof-label">Título</label><input className="prof-input" value={form.title} onChange={e=>{update("title",e.target.value);if(!editing)update("slug",slugify(e.target.value))}}/></div>
      <div className="prof-field"><label className="prof-label">Endereço da postagem</label><div className="prof-help">/blog/{form.slug||"titulo-da-postagem"}</div><input className="prof-input" value={form.slug} onChange={e=>update("slug",slugify(e.target.value))}/></div>
      <div className="prof-field"><label className="prof-label">Resumo</label><textarea className="prof-input" rows={3} maxLength={600} value={form.excerpt} onChange={e=>update("excerpt",e.target.value)}/></div>
      <div className="prof-field"><label className="prof-label">Imagem de capa {editing?.cover_url&&<span>· atual cadastrada</span>}</label><input ref={cover} type="file" accept="image/jpeg,image/png,image/webp"/></div>
      {form.format==="presentation"?<div className="prof-field"><label className="prof-label">Arquivo PDF {editing?.pdf_url&&<span>· atual cadastrado</span>}</label><input ref={pdf} type="file" accept="application/pdf"/><div className="prof-help">Máximo de 20 MB. Cada página será exibida como um slide.</div></div>:<div className="prof-field"><label className="prof-label">Conteúdo</label><div className="blog-editor-toolbar"><button type="button" onClick={()=>command("bold")}><b>B</b></button><button type="button" onClick={()=>command("italic")}><i>I</i></button><button type="button" onClick={()=>command("formatBlock","h2")}>Título</button><button type="button" onClick={()=>command("insertUnorderedList")}>Lista</button><label className="admin-secondary-btn">Inserir imagem<input hidden ref={contentImage} type="file" accept="image/*" onChange={()=>void insertImage()}/></label></div><div ref={editor} contentEditable suppressContentEditableWarning className="prof-input blog-editor"/></div>}
      <div className="prof-field"><label className="prof-label">Status</label><select className="prof-input" value={form.published?"published":"draft"} onChange={e=>update("published",e.target.value==="published")}><option value="published">Publicado — aparece no Blog</option><option value="draft">Rascunho — somente no admin</option></select></div>
      <div className="admin-form-actions"><button className="admin-secondary-btn" onClick={closeForm}>Cancelar</button><button className="admin-primary-btn" disabled={busy} onClick={()=>void save()}>{busy?"Salvando…":form.published?"Publicar postagem":"Salvar rascunho"}</button></div>
    </div>}
    {loading?<div className="admin-loading"><span className="auth-spinner"/> Carregando…</div>:posts.length===0?<div className="admin-empty">Nenhuma postagem criada. Clique em “Nova postagem”.</div>:<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Postagem</th><th>Formato</th><th>Status</th><th>Ações</th></tr></thead><tbody>{posts.map(p=><tr key={p.id}><td><strong>{p.title}</strong><div className="admin-cert-code">/blog/{p.slug}</div></td><td>{p.format==="presentation"?"Apresentação":"Tradicional"}</td><td><span className={`admin-status ${p.published?"active":""}`}>{p.published?"Publicado":"Rascunho"}</span></td><td><div className="admin-row-actions">{p.published&&<Link href={`/blog/${p.slug}`} target="_blank" title="Visualizar"><Icon.Eye size={16}/></Link>}<button title="Editar" onClick={()=>showForm(p)}><Icon.Pencil size={16}/></button><button title={p.published?"Despublicar":"Publicar"} onClick={()=>void toggle(p)}>{p.published?<Icon.EyeOff size={16}/>:<Icon.Eye size={16}/>}</button><button title="Excluir" onClick={()=>void remove(p)}><Icon.Trash size={16}/></button></div></td></tr>)}</tbody></table></div>}
  </section>;
}

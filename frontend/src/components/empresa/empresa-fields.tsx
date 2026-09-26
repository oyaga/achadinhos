"use client";

import { useEffect, useState } from "react";
import { categoriesApi, type ApiCategory } from "@/lib/api";
import { Icon } from "@/components/icons";
import { cn, isPublicCategory } from "@/lib/utils";
import { formatPhone } from "@/lib/phone";

// Dados públicos da empresa free — os mesmos campos que o admin preenche em
// Negócios, menos selo, "Parceira", destaque e contrato. Usado no autocadastro
// (/cadastro) e na edição (/minha-empresa).
export interface EmpresaFieldsValue {
  companyName: string;
  categoryIds: string[]; // a primeira é a principal
  whatsapp: string;
  description: string;
  link: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
}

export type EmpresaFieldsErrors = Partial<Record<"companyName" | "categoryIds" | "whatsapp", string>>;

export const EMPTY_EMPRESA_FIELDS: EmpresaFieldsValue = {
  companyName: "",
  categoryIds: [],
  whatsapp: "",
  description: "",
  link: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  youtube: "",
};

export const MAX_EMPRESA_CATEGORIES = 10;

export function EmpresaFields({
  value,
  onChange,
  errors = {},
  disabled,
}: {
  value: EmpresaFieldsValue;
  onChange: (next: EmpresaFieldsValue) => void;
  errors?: EmpresaFieldsErrors;
  disabled?: boolean;
}) {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  useEffect(() => {
    categoriesApi
      .list()
      // "Destaque do dia" é a vitrine da home (só o admin põe lá).
      .then((list) => setCategories(list.filter((c) => isPublicCategory(c) && c.id !== "destaque")))
      .catch(() => setCategories([]));
  }, []);

  function set<K extends keyof EmpresaFieldsValue>(key: K, v: EmpresaFieldsValue[K]) {
    onChange({ ...value, [key]: v });
  }

  function toggleCategory(id: string) {
    const has = value.categoryIds.includes(id);
    if (!has && value.categoryIds.length >= MAX_EMPRESA_CATEGORIES) return;
    set(
      "categoryIds",
      has ? value.categoryIds.filter((c) => c !== id) : [...value.categoryIds, id],
    );
  }

  const socials = [
    { key: "instagram", label: "Instagram", icon: <Icon.Instagram size={18} />, ph: "@suaempresa ou link" },
    { key: "facebook", label: "Facebook", icon: <Icon.Facebook size={18} />, ph: "Link do Facebook" },
    { key: "tiktok", label: "TikTok", icon: <Icon.TikTok size={18} />, ph: "@suaempresa ou link" },
    { key: "youtube", label: "YouTube", icon: <Icon.YouTube size={18} />, ph: "Link do canal" },
  ] as const;

  return (
    <>
      <div>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><Icon.Building size={18} /></span>
          <input
            className={cn("auth-input", errors.companyName && "invalid")}
            type="text"
            placeholder="Nome da empresa (como aparece no site)"
            aria-label="Nome da empresa"
            value={value.companyName}
            onChange={(e) => set("companyName", e.target.value)}
            disabled={disabled}
            maxLength={255}
          />
        </div>
        {errors.companyName && <div className="auth-field-error" role="alert">{errors.companyName}</div>}
      </div>

      <div>
        <div className="auth-label">
          Categorias{" "}
          <span className="auth-label-hint">
            ({value.categoryIds.length}/{MAX_EMPRESA_CATEGORIES} · a primeira é a principal)
          </span>
        </div>
        <div className="auth-chip-group" role="group" aria-label="Categorias">
          {categories.map((c) => {
            const idx = value.categoryIds.indexOf(c.id);
            return (
              <button
                key={c.id}
                type="button"
                className={cn("auth-chip", idx >= 0 && "active", idx === 0 && "primary")}
                aria-pressed={idx >= 0}
                onClick={() => toggleCategory(c.id)}
                disabled={disabled}
              >
                {idx >= 0 && <Icon.Check size={12} />}
                {c.label}
              </button>
            );
          })}
          {categories.length === 0 && (
            <span className="auth-label-hint">Carregando categorias…</span>
          )}
        </div>
        {errors.categoryIds && <div className="auth-field-error" role="alert">{errors.categoryIds}</div>}
      </div>

      <div>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><Icon.Whatsapp size={18} /></span>
          <input
            className={cn("auth-input", errors.whatsapp && "invalid")}
            type="tel"
            inputMode="tel"
            placeholder="WhatsApp da empresa"
            aria-label="WhatsApp da empresa"
            value={value.whatsapp}
            onChange={(e) => set("whatsapp", formatPhone(e.target.value))}
            disabled={disabled}
          />
        </div>
        {errors.whatsapp && <div className="auth-field-error" role="alert">{errors.whatsapp}</div>}
      </div>

      <div>
        <textarea
          className="auth-input auth-textarea"
          placeholder="Sobre a empresa: serviços, produtos, região que atende… (opcional)"
          aria-label="Descrição da empresa"
          value={value.description}
          onChange={(e) => set("description", e.target.value)}
          disabled={disabled}
          maxLength={2000}
          rows={4}
        />
      </div>

      <div>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><Icon.Globe size={18} /></span>
          <input
            className="auth-input"
            type="url"
            inputMode="url"
            placeholder="Site (opcional)"
            aria-label="Site"
            value={value.link}
            onChange={(e) => set("link", e.target.value)}
            disabled={disabled}
            maxLength={500}
          />
        </div>
      </div>

      {socials.map((s) => (
        <div key={s.key}>
          <div className="auth-input-wrap">
            <span className="auth-input-icon">{s.icon}</span>
            <input
              className="auth-input"
              type="text"
              placeholder={`${s.ph} (opcional)`}
              aria-label={s.label}
              value={value[s.key]}
              onChange={(e) => set(s.key, e.target.value)}
              disabled={disabled}
              maxLength={255}
            />
          </div>
        </div>
      ))}
    </>
  );
}

/** Valida os campos obrigatórios. */
export function validateEmpresaFields(v: EmpresaFieldsValue, isValidPhone: (s: string) => boolean): EmpresaFieldsErrors {
  const e: EmpresaFieldsErrors = {};
  if (v.companyName.trim().length < 2) e.companyName = "Informe o nome da empresa.";
  if (v.categoryIds.length === 0) e.categoryIds = "Escolha ao menos uma categoria.";
  if (!isValidPhone(v.whatsapp)) e.whatsapp = "Informe um WhatsApp válido com DDD.";
  return e;
}

/** Campos no formato da API (WhatsApp só com dígitos, textos aparados). */
export function empresaFieldsToPayload(v: EmpresaFieldsValue, stripPhone: (s: string) => string) {
  return {
    name: v.companyName.trim(),
    category_ids: v.categoryIds,
    whatsapp: stripPhone(v.whatsapp),
    description: v.description.trim(),
    link: v.link.trim(),
    instagram: v.instagram.trim(),
    facebook: v.facebook.trim(),
    tiktok: v.tiktok.trim(),
    youtube: v.youtube.trim(),
  };
}

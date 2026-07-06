// Concise classnames helper.
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

// Format currency in Brazilian style (R$ 89,90). Callers are expected to
// hide the field for price <= 0 (e.g. "sob consulta" products).
export function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

// Compute integer discount percent. Returns 0 when either price is missing.
export function discountPct(price: number, oldPrice: number): number {
  if (!oldPrice || oldPrice <= 0) return 0;
  if (!price || price <= 0) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

// Categorias de uso interno do admin que não aparecem nas listagens públicas
// (grid da home, sidebar, "ver todas", sitemap). "loja" classifica os
// fornecedores do Shopping — a vitrine pública deles é a seção Lojas parceiras.
export function isPublicCategory(c: { id: string }): boolean {
  return c.id !== "loja";
}

// Rótulo do nível do certificado. Os IDs internos (prata/ouro/black) são
// mantidos no banco e na API; só o nome exibido mudou:
// prata -> Verificado · ouro -> Afiliados · black -> Black.
export function tierLabel(tier: string | null | undefined): string {
  switch (tier) {
    case "prata":
      return "Verificado";
    case "ouro":
      return "Afiliados";
    case "black":
      return "Black";
    default:
      return "";
  }
}

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

// Rótulo do nível do certificado (selo Prata/Ouro/Black).
export function tierLabel(tier: string | null | undefined): string {
  switch (tier) {
    case "prata":
      return "Prata";
    case "ouro":
      return "Ouro";
    case "black":
      return "Black";
    default:
      return "";
  }
}

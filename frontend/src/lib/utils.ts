// Concise classnames helper.
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

// Format currency in Brazilian style (R$ 89,90). Zero means "ask the seller".
export function formatBRL(value: number): string {
  if (!value || value <= 0) return "Sob consulta";
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

// Compute integer discount percent. Returns 0 when either price is missing.
export function discountPct(price: number, oldPrice: number): number {
  if (!oldPrice || oldPrice <= 0) return 0;
  if (!price || price <= 0) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

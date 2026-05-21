// Concise classnames helper.
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

// Format currency in Brazilian style (R$ 89,90).
export function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

// Compute integer discount percent.
export function discountPct(price: number, oldPrice: number): number {
  if (!oldPrice || oldPrice <= 0) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

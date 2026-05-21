// CPF / CNPJ helpers (BR document handling).
// All formatting tolerates partial input — used live as the user types.
// Validation uses the official check-digit algorithm and rejects all-equal
// repeats (e.g. 111.111.111-11) which technically pass the math but are
// always invalid in practice.

export type DocumentType = "cpf" | "cnpj";

/** Strip everything except digits. Useful before sending to the backend. */
export function stripDocument(s: string): string {
  return (s ?? "").replace(/\D+/g, "");
}

/**
 * Format a CPF progressively as the user types.
 * "12345678909"      -> "123.456.789-09"
 * "12345"            -> "123.45"
 * "1234567"          -> "123.456.7"
 */
export function formatCPF(s: string): string {
  const d = stripDocument(s).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/**
 * Format a CNPJ progressively as the user types.
 * "11222333000181" -> "11.222.333/0001-81"
 */
export function formatCNPJ(s: string): string {
  const d = stripDocument(s).slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(
    8,
    12
  )}-${d.slice(12)}`;
}

export function formatDocument(value: string, type: DocumentType): string {
  return type === "cpf" ? formatCPF(value) : formatCNPJ(value);
}

/** Two-digit modulo-11 checksum used by CPF. */
function cpfCheckDigit(base: string, factorStart: number): number {
  let sum = 0;
  let factor = factorStart;
  for (let i = 0; i < base.length; i++) {
    sum += Number(base[i]) * factor;
    factor--;
  }
  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

/** Validates CPF check digits. Rejects all-equal sequences. */
export function isValidCPF(s: string): boolean {
  const d = stripDocument(s);
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false;
  const d1 = cpfCheckDigit(d.slice(0, 9), 10);
  const d2 = cpfCheckDigit(d.slice(0, 10), 11);
  return d1 === Number(d[9]) && d2 === Number(d[10]);
}

/** CNPJ check-digit weights, two passes. */
const CNPJ_W1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const CNPJ_W2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function cnpjCheckDigit(base: string, weights: number[]): number {
  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    sum += Number(base[i]) * weights[i];
  }
  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

/** Validates CNPJ check digits. Rejects all-equal sequences. */
export function isValidCNPJ(s: string): boolean {
  const d = stripDocument(s);
  if (d.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(d)) return false;
  const d1 = cnpjCheckDigit(d.slice(0, 12), CNPJ_W1);
  const d2 = cnpjCheckDigit(d.slice(0, 13), CNPJ_W2);
  return d1 === Number(d[12]) && d2 === Number(d[13]);
}

export function isValidDocument(value: string, type: DocumentType): boolean {
  return type === "cpf" ? isValidCPF(value) : isValidCNPJ(value);
}

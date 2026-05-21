// CEP helpers + ViaCEP lookup.
// ViaCEP returns 200 with `{ erro: true }` for unknown CEPs; we normalize
// that to `null` so callers can branch with a single check.

export interface ViaCEPResult {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface ViaCEPRaw {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | string;
}

export function stripCEP(s: string): string {
  return (s ?? "").replace(/\D+/g, "");
}

/** "01310100" -> "01310-100". Tolerates partial input. */
export function formatCEP(s: string): string {
  const d = stripCEP(s).slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

export function isValidCEP(s: string): boolean {
  return /^\d{8}$/.test(stripCEP(s));
}

/**
 * Look up an address by CEP via ViaCEP. Returns `null` when:
 * - CEP is malformed
 * - ViaCEP returns 404
 * - ViaCEP returns `{ erro: true }`
 * - the request fails / is aborted
 */
export async function lookupCEP(
  cep: string,
  signal?: AbortSignal
): Promise<ViaCEPResult | null> {
  const digits = stripCEP(cep);
  if (digits.length !== 8) return null;

  let res: Response;
  try {
    res = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      signal,
      // ViaCEP is plain GET — no auth, no special headers
    });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  let data: ViaCEPRaw;
  try {
    data = (await res.json()) as ViaCEPRaw;
  } catch {
    return null;
  }
  // ViaCEP returns `erro: "true"` (string in some versions, bool in others)
  if (data.erro === true || data.erro === "true") return null;
  if (!data.cep && !data.logradouro && !data.localidade) return null;

  return {
    cep: data.cep ?? "",
    logradouro: data.logradouro ?? "",
    complemento: data.complemento ?? "",
    bairro: data.bairro ?? "",
    localidade: data.localidade ?? "",
    uf: data.uf ?? "",
  };
}

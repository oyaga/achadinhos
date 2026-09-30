// Exporta os leads do painel como CSV para abrir no Excel/Google Planilhas:
// separador ";" (padrão do Excel em pt-BR) e BOM para os acentos saírem certos.
export function downloadCSV(filename: string, header: string[], rows: string[][]) {
  const esc = (v: string) => (/[";\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  const body = [header, ...rows].map((r) => r.map((v) => esc(v ?? "")).join(";")).join("\r\n");
  const blob = new Blob(["﻿" + body], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function formatLeadDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("pt-BR");
}

export function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

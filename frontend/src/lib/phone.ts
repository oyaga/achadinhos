// Brazilian phone-number helpers. Live formatting tolerates partial input.
// Cell phones are 11 digits (DDD + 9XXXX-XXXX); landlines are 10 digits.

export function stripPhone(s: string): string {
  return (s ?? "").replace(/\D+/g, "");
}

/**
 * Format BR phone progressively as user types:
 *   "11"           -> "(11"
 *   "1198"         -> "(11) 98"
 *   "11987654321"  -> "(11) 98765-4321"   (cell)
 *   "1134567890"   -> "(11) 3456-7890"    (landline)
 */
export function formatPhone(s: string): string {
  const d = stripPhone(s).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) {
    // 10-digit landline: (11) 3456-7890
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }
  // 11-digit cell: (11) 98765-4321
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function isValidPhone(s: string): boolean {
  const d = stripPhone(s);
  return d.length === 10 || d.length === 11;
}

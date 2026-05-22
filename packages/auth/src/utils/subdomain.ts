/**
 * Extracts the company slug from the current URL.
 *
 * Production:
 *   techechelons.lektus.com → 'techechelons'
 *
 * Local development:
 *   localhost / 127.0.0.1 → returns VITE_DEV_COMPANY_SLUG (if defined)
 *   company.localhost → 'company'
 *
 * Returns null if no valid slug can be resolved.
 */
export function getCompanySlug(): string | null {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  const devSlug = (import.meta as unknown as { env: Record<string, string> })
    .env?.VITE_DEV_COMPANY_SLUG;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return devSlug || null;
  }

  if (hostname.endsWith('.localhost')) {
    return parts[0] || null;
  }

  console.log('parts', parts);
  if (parts.length >= 4) {
    return parts[0] || null;
  }
  if (parts.length >= 3) {
    return parts[0] || null;
  }

  return null;
}

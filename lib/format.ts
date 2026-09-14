import type { Locale } from "./i18n/config";

const intlLocale: Record<Locale, string> = { en: "en-US", ru: "ru-RU", es: "es-ES" };

/** Formats an ISO date (YYYY-MM-DD) deterministically on the server (UTC). */
export function formatDate(iso: string, locale: Locale, opts: Intl.DateTimeFormatOptions = {}): string {
  const date = new Date(iso.length === 7 ? `${iso}-01` : iso);
  const out = new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: iso.length === 7 ? undefined : "numeric",
    ...opts,
  }).format(date);
  // ru-RU appends " г." after the year; drop it so dates read cleanly inside sentences.
  return out.replace(/\s?г\.$/, "");
}

/** "July 2026" / "июль 2026" — as the locale writes it inside a sentence. */
export function formatMonth(iso: string, locale: Locale): string {
  return formatDate(iso.slice(0, 7), locale, { month: "long", year: "numeric" });
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function shortMonth(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], { month: "short", timeZone: "UTC" })
    .format(new Date(`${iso.slice(0, 7)}-01`))
    .replace(/\.$/, "");
}

export function formatNumber(n: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale]).format(Math.round(n));
}

/**
 * "2021 – 2025", "2025 – present"; roles within one year show months: "Aug – Oct 2021", "Feb 2019".
 */
export function formatPeriod(start: string, end: string | undefined, present: string, locale: Locale = "en"): string {
  const y1 = start.slice(0, 4);
  if (!end) return `${y1} – ${present}`;
  const y2 = end.slice(0, 4);
  if (y1 !== y2) return `${y1} – ${y2}`;
  const hasMonths = start.length >= 7 && end.length >= 7;
  if (!hasMonths) return y1;
  const m1 = shortMonth(start, locale);
  const m2 = shortMonth(end, locale);
  return m1 === m2 ? `${m1} ${y1}` : `${m1} – ${m2} ${y1}`;
}

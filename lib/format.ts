import type { Locale } from "./i18n/config";

const intlLocale: Record<Locale, string> = { en: "en-US", ru: "ru-RU" };

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

/** "July 2026" / "Июль 2026" — capitalised so it can open a sentence. */
export function formatMonth(iso: string, locale: Locale): string {
  const s = formatDate(iso.slice(0, 7), locale, { month: "long", year: "numeric" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatNumber(n: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale]).format(Math.round(n));
}

/** "2021 – 2025" or "2025 – present" */
export function formatPeriod(start: string, end: string | undefined, present: string): string {
  return `${start.slice(0, 4)} – ${end ? end.slice(0, 4) : present}`;
}

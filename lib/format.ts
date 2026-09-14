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
  const p = formatPeriodParts(start, end, present, locale);
  return p.end === undefined ? p.start : `${p.start} – ${p.end}`;
}

export type PeriodParts = {
  /** Visible label of the start (or the whole period when it collapses to one label) */
  start: string;
  /** Visible label of the end; `present` for open-ended roles; undefined when the period is a single label */
  end?: string;
  /** True when `end` is the "present" word rather than a date */
  open: boolean;
};

/** Same labels as formatPeriod, split so that each half can be wrapped in its own <time>. */
export function formatPeriodParts(start: string, end: string | undefined, present: string, locale: Locale = "en"): PeriodParts {
  const y1 = start.slice(0, 4);
  if (!end) return { start: y1, end: present, open: true };
  const y2 = end.slice(0, 4);
  if (y1 !== y2) return { start: y1, end: y2, open: false };
  const hasMonths = start.length >= 7 && end.length >= 7;
  if (!hasMonths) return { start: y1, open: false };
  const m1 = shortMonth(start, locale);
  const m2 = shortMonth(end, locale);
  return m1 === m2 ? { start: `${m1} ${y1}`, open: false } : { start: m1, end: `${m2} ${y1}`, open: false };
}

export const locales = ["en", "ru", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Builds a locale-prefixed path with a trailing slash: localePath("ru", "/blog") → "/ru/blog/" */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/^\/|\/$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export const localeNames: Record<Locale, string> = { en: "English", ru: "Русский", es: "Español" };
export const ogLocales: Record<Locale, string> = { en: "en_US", ru: "ru_RU", es: "es_ES" };

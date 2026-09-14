import type { Metadata } from "next";
import { getResume } from "@/content/resume";
import { SITE_URL, site } from "./site";
import { localePath, locales, ogLocales, type Locale } from "./i18n/config";

type Args = {
  locale: Locale;
  /** Path without locale prefix, e.g. "/blog/my-post" */
  path: string;
  title?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

/** Home <title>: "Dmitrii Cherviakov — Senior iOS Developer · Swift, SwiftUI · Barcelona" (localized name + headline). */
export function homeTitle(locale: Locale): string {
  const r = getResume(locale);
  const name = r.name === site.name ? r.name : `${r.name} (${site.name})`;
  return `${name} — ${r.headline}`;
}

export function buildMetadata(a: Args): Metadata {
  const canonical = localePath(a.locale, a.path);
  const languages = Object.fromEntries(locales.map((l) => [l, localePath(l, a.path)]));
  const image = a.image ?? site.ogImage;
  const imageAlt = a.imageAlt ?? `${site.name} — ${site.jobTitle}`;
  const authorUrl = `${SITE_URL}${localePath(a.locale, "/")}`;
  return {
    title: a.title,
    description: a.description,
    authors: [{ name: site.name, url: authorUrl }],
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": localePath("en", a.path) },
      types: { "application/rss+xml": [{ url: `${localePath(a.locale, "/")}feed.xml`, title: `${site.name} — Blog (${a.locale})` }] },
    },
    openGraph: {
      type: a.type ?? "website",
      locale: ogLocales[a.locale],
      alternateLocale: locales.filter((l) => l !== a.locale).map((l) => ogLocales[l]),
      url: `${SITE_URL}${canonical}`,
      siteName: site.name,
      title: a.title,
      description: a.description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
      ...(a.type === "article"
        ? { publishedTime: a.publishedTime, modifiedTime: a.modifiedTime, authors: [authorUrl], tags: a.tags }
        : {}),
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images: [{ url: image, alt: imageAlt }] },
  };
}

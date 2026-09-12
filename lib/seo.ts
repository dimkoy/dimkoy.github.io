import type { Metadata } from "next";
import { SITE_URL, site } from "./site";
import { localePath, locales, ogLocales, type Locale } from "./i18n/config";

type Args = {
  locale: Locale;
  /** Path without locale prefix, e.g. "/blog/my-post" */
  path: string;
  title?: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

export function buildMetadata(a: Args): Metadata {
  const canonical = localePath(a.locale, a.path);
  const languages = Object.fromEntries(locales.map((l) => [l, localePath(l, a.path)]));
  const image = a.image ?? site.ogImage;
  return {
    title: a.title,
    description: a.description,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": localePath("en", a.path) },
      types: { "application/rss+xml": `${localePath(a.locale, "/")}feed.xml` },
    },
    openGraph: {
      type: a.type ?? "website",
      locale: ogLocales[a.locale],
      alternateLocale: locales.filter((l) => l !== a.locale).map((l) => ogLocales[l]),
      url: `${SITE_URL}${canonical}`,
      siteName: site.name,
      title: a.title,
      description: a.description,
      images: [{ url: image, width: 1200, height: 630 }],
      ...(a.type === "article"
        ? { publishedTime: a.publishedTime, modifiedTime: a.modifiedTime, authors: [site.name], tags: a.tags }
        : {}),
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images: [image] },
  };
}

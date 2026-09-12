import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/blog";
import { localePath, locales } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function entry(path: string, lastModified?: string, priority = 0.6): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale, path)}`,
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])) },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts("en");
  return [
    ...entry("/", undefined, 1),
    ...entry("/projects", undefined, 0.8),
    ...projects.flatMap((p) => entry(`/projects/${p.slug}`, undefined, 0.7)),
    ...entry("/blog", posts[0]?.updated ?? posts[0]?.date, 0.8),
    ...posts.flatMap((p) => entry(`/blog/${p.slug}`, p.updated ?? p.date, 0.7)),
    ...entry("/stats", undefined, 0.6),
  ];
}

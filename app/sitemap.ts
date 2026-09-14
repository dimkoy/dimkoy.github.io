import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { CONTENT_UPDATED } from "@/content/updated";
import { getAllPosts } from "@/lib/blog";
import { localePath, locales } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function entry(path: string, lastModified: string, priority = 0.6): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`]));
  return locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale, path)}`,
    lastModified: new Date(lastModified),
    priority,
    alternates: { languages: { ...languages, "x-default": `${SITE_URL}${localePath("en", path)}` } },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts("en");
  const newest = posts[0]?.updated ?? posts[0]?.date ?? CONTENT_UPDATED.resume;
  return [
    ...entry("/", CONTENT_UPDATED.resume, 1),
    ...entry("/projects", CONTENT_UPDATED.projects, 0.8),
    ...projects.flatMap((p) => entry(`/projects/${p.slug}`, p.updated ?? CONTENT_UPDATED.projects, 0.7)),
    ...entry("/blog", newest, 0.8),
    ...posts.flatMap((p) => entry(`/blog/${p.slug}`, p.updated ?? p.date, 0.7)),
    ...entry("/stats", CONTENT_UPDATED.stats, 0.6),
  ];
}

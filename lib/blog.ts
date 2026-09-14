import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { locales, type Locale } from "./i18n/config";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const Frontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(220),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  tags: z.array(z.string()).default([]),
  lang: z.enum(locales),
  draft: z.boolean().default(false),
  cover: z.string().optional(),
});
export type Frontmatter = z.infer<typeof Frontmatter>;

export type Post = Frontmatter & {
  slug: string;
  locale: Locale;
  /** raw MDX body without frontmatter */
  body: string;
  words: number;
  readingMinutes: number;
};

async function readPost(slug: string, locale: Locale): Promise<Post> {
  const file = path.join(BLOG_DIR, slug, `${locale}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    throw new Error(`Blog post "${slug}" is missing its ${locale}.mdx — every post must exist in all locales (${locales.join(", ")}).`);
  }
  const { data, content } = matter(raw);
  const parsed = Frontmatter.safeParse(data);
  if (!parsed.success) throw new Error(`Invalid frontmatter in ${file}: ${parsed.error.message}`);
  if (parsed.data.lang !== locale) throw new Error(`${file}: frontmatter lang "${parsed.data.lang}" does not match file name`);
  const words = content.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length;
  return { ...parsed.data, slug, locale, body: content, words, readingMinutes: Math.max(1, Math.round(words / 200)) };
}

export async function getPostSlugs(): Promise<string[]> {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory() && !e.name.startsWith("_")).map((e) => e.name).sort();
}

/** A single post (drafts included — they are rendered but hidden from lists and marked noindex). */
export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  const slugs = await getPostSlugs();
  if (!slugs.includes(slug)) return null;
  return readPost(slug, locale);
}

/**
 * Posts for a locale, newest first. Throws if a post lacks a translation.
 * Drafts are excluded unless `includeDrafts` is set (used only to generate their routes).
 */
export async function getAllPosts(locale: Locale, { includeDrafts = false } = {}): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      // Validate every locale so a missing translation fails the build.
      const all = await Promise.all(locales.map((l) => readPost(slug, l)));
      return all.find((p) => p.locale === locale)!;
    }),
  );
  return posts.filter((p) => includeDrafts || !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1));
}

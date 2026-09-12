import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog";
import { isLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL, site } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });
  const dict = getDictionary(locale);
  const base = `${SITE_URL}${localePath(locale, "/")}`;
  const feed = new Feed({
    id: base,
    title: `${site.name} — ${dict.blog.title}`,
    description: dict.blog.description,
    link: base,
    language: locale,
    image: `${SITE_URL}${site.ogImage}`,
    copyright: `© ${new Date().getUTCFullYear()} ${site.name}`,
    feedLinks: { rss: `${base}feed.xml` },
    author: { name: site.name, email: site.email, link: base },
  });
  for (const p of await getAllPosts(locale)) {
    const url = `${SITE_URL}${localePath(locale, `/blog/${p.slug}`)}`;
    feed.addItem({
      id: url,
      link: url,
      title: p.title,
      description: p.description,
      date: new Date(p.updated ?? p.date),
      published: new Date(p.date),
      category: p.tags.map((name) => ({ name })),
      author: [{ name: site.name, email: site.email }],
    });
  }
  return new Response(feed.rss2(), { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

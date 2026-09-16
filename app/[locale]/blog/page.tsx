import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/PostList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absUrl, breadcrumbJsonLd, graph, isoDateTime, PERSON_ID, personRef, WEBSITE_ID } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale).blog;
  return buildMetadata({ locale, path: "/blog", title: d.title, description: d.description });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const posts = await getAllPosts(locale);
  const jsonLd = graph(
    breadcrumbJsonLd(locale, [{ name: dict.nav.resume, path: "/" }, { name: dict.blog.title, path: "/blog" }]),
    {
      "@type": "Blog",
      "@id": `${absUrl(locale, "/blog")}#blog`,
      url: absUrl(locale, "/blog"),
      name: `${dict.blog.title} — ${site.name}`,
      description: dict.blog.description,
      inLanguage: locale,
      isPartOf: { "@id": WEBSITE_ID },
      author: personRef(locale),
      publisher: { "@id": PERSON_ID },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        "@id": `${absUrl(locale, `/blog/${p.slug}`)}#article`,
        url: absUrl(locale, `/blog/${p.slug}`),
        headline: p.title,
        description: p.description,
        datePublished: isoDateTime(p.date),
        dateModified: isoDateTime(p.updated ?? p.date),
        inLanguage: locale,
        author: { "@id": PERSON_ID },
      })),
    },
  );
  return (
    <main className="py-10">
      <JsonLd data={jsonLd} />
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{dict.blog.title}</h1>
        <a href={`${localePath(locale, "/")}feed.xml`} className="text-sm text-muted hover:text-ink">{dict.actions.rss}</a>
      </div>
      <p className="mt-2 text-ink2">{dict.blog.description}</p>
      <div className="mt-8 max-w-2xl"><PostList posts={posts} locale={locale} dict={dict} headingLevel="h2" /></div>
    </main>
  );
}

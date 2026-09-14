import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getResume } from "@/content/resume";
import { getAllPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { isLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/t";
import { absUrl, breadcrumbJsonLd, graph, PERSON_ID, personRef, WEBSITE_ID } from "@/lib/jsonld";
import { renderMdx } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const p of await getAllPosts(locale, { includeDrafts: true })) params.push({ locale, slug: p.slug });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPost(locale, slug);
  if (!post) return {};
  return {
    ...buildMetadata({
      locale, path: `/blog/${slug}`, title: post.title, description: post.description, type: "article",
      publishedTime: post.date, modifiedTime: post.updated ?? post.date, tags: post.tags, image: post.cover,
    }),
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = await getPost(locale, slug);
  if (!post) notFound();
  const dict = getDictionary(locale);
  const content = await renderMdx(post.body);

  const resume = getResume(locale);
  const url = absUrl(locale, `/blog/${slug}`);
  const jsonLd = graph(
    breadcrumbJsonLd(locale, [{ name: dict.nav.resume, path: "/" }, { name: dict.blog.title, path: "/blog" }, { name: post.title, path: `/blog/${slug}` }]),
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: locale,
      keywords: post.tags.join(", "),
      articleSection: post.tags,
      wordCount: post.words,
      timeRequired: `PT${post.readingMinutes}M`,
      isAccessibleForFree: true,
      image: `${SITE_URL}${post.cover ?? site.ogImage}`,
      author: personRef(locale),
      publisher: { "@id": PERSON_ID },
      isPartOf: { "@id": WEBSITE_ID },
    },
  );

  return (
    <main className="py-10">
      <JsonLd data={jsonLd} />
      <p className="text-sm"><Link href={localePath(locale, "/blog")} className="text-muted hover:text-ink">← {dict.actions.backToBlog}</Link></p>
      <article className="mx-auto mt-6 max-w-2xl">
        <header>
          <div className="flex flex-wrap gap-x-3 text-xs text-muted tnum">
            <span>{dict.blog.published} <time dateTime={post.date}>{formatDate(post.date, locale)}</time></span>
            {post.updated && <span>{dict.blog.updated} <time dateTime={post.updated}>{formatDate(post.updated, locale)}</time></span>}
            <span>{t(dict.blog.readingTime, { n: post.readingMinutes })}</span>
          </div>
          {post.draft && <p className="mt-2 inline-block rounded bg-wash px-2 py-0.5 text-xs font-medium text-accent">draft</p>}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl text-balance">{post.title}</h1>
          <p className="mt-3 text-lg text-ink2">{post.description}</p>
          <p className="mt-3 text-sm text-ink2">
            {dict.blog.by} <Link href={localePath(locale, "/")} rel="author" className="font-medium text-ink hover:text-accent">{resume.name}</Link>
            <span className="text-muted"> · {resume.title}</span>
          </p>
        </header>
        <div className="prose prose-neutral mt-8 max-w-none">{content}</div>
        {post.tags.length > 0 && (
          <footer className="mt-10 flex flex-wrap gap-1.5 border-t border-line pt-5">
            {post.tags.map((tag) => <span key={tag} className="rounded-md border border-line px-1.5 py-0.5 text-xs text-muted">#{tag}</span>)}
          </footer>
        )}
      </article>
    </main>
  );
}

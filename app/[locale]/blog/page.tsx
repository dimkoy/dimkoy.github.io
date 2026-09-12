import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/PostList";
import { getAllPosts } from "@/lib/blog";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
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
  return (
    <main className="py-10">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{dict.blog.title}</h1>
        <a href={`${localePath(locale, "/")}feed.xml`} className="text-sm text-muted hover:text-ink">{dict.actions.rss}</a>
      </div>
      <p className="mt-2 text-ink2">{dict.blog.description}</p>
      <div className="mt-8 max-w-2xl"><PostList posts={posts} locale={locale} dict={dict} /></div>
    </main>
  );
}

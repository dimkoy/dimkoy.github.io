import Link from "next/link";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/t";

export function PostList({ posts, locale, dict }: { posts: Post[]; locale: Locale; dict: Dictionary }) {
  if (!posts.length) return <p className="text-muted">{dict.blog.empty}</p>;
  return (
    <ul className="divide-y divide-line">
      {posts.map((p) => (
        <li key={p.slug} className="py-5 first:pt-0">
          <article>
            <div className="flex flex-wrap gap-x-3 text-xs text-muted tnum">
              <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
              <span>{t(dict.blog.readingTime, { n: p.readingMinutes })}</span>
              {p.draft && <span className="rounded bg-wash px-1 text-accent">draft</span>}
            </div>
            <h3 className="mt-1 text-lg font-semibold">
              <Link href={localePath(locale, `/blog/${p.slug}`)} className="hover:text-accent">{p.title}</Link>
            </h3>
            <p className="mt-1 text-sm text-ink2">{p.description}</p>
            {p.tags.length > 0 && (
              <p className="mt-2 flex flex-wrap gap-1.5">{p.tags.map((tag) => <span key={tag} className="rounded-md border border-line px-1.5 py-0.5 text-xs text-muted">#{tag}</span>)}</p>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}

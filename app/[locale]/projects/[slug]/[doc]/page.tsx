import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/content/projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/format";
import { isLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { breadcrumbJsonLd, graph } from "@/lib/jsonld";
import { getLegalDocs } from "@/lib/legal";
import { markdownToHtml } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string; doc: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const docs = getLegalDocs();
  return locales.flatMap((locale) => docs.map((d) => ({ locale, slug: d.project, doc: d.doc })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, doc } = await params;
  const legal = getLegalDocs(slug).find((d) => d.doc === doc);
  if (!isLocale(locale) || !legal) return {};
  return buildMetadata({ locale, path: legal.path, title: legal.title, description: legal.description });
}

/** A project's legal document (privacy policy, terms) — the same English text under every locale. */
export default async function LegalPage({ params }: Props) {
  const { locale, slug, doc } = await params;
  const project = getProject(slug);
  const docs = getLegalDocs(slug);
  const legal = docs.find((d) => d.doc === doc);
  if (!isLocale(locale) || !project || !legal) notFound();
  const dict = getDictionary(locale);
  const projectTitle = project.i18n[locale].title;
  const html = await markdownToHtml(legal.body);
  const siblings = docs.filter((d) => d !== legal);

  return (
    <main className="py-10">
      <JsonLd data={graph(breadcrumbJsonLd(locale, [
        { name: dict.nav.resume, path: "/" },
        { name: dict.projects.title, path: "/projects" },
        { name: projectTitle, path: `/projects/${slug}` },
        { name: legal.title, path: legal.path },
      ]))} />
      <p className="text-sm"><Link href={localePath(locale, `/projects/${slug}`)} className="text-muted hover:text-ink">← {projectTitle}</Link></p>
      <article lang="en" className="mx-auto mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{legal.title}</h1>
        <p className="mt-3 text-sm text-muted"><strong className="font-medium text-ink2">{legal.dateLabel}:</strong> <time dateTime={legal.updated}>{formatDate(legal.updated, "en")}</time></p>
        <div className="prose prose-neutral mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        {siblings.length > 0 && (
          <footer className="mt-10 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-5 text-sm">
            {siblings.map((s) => <Link key={s.doc} href={localePath(locale, s.path)} className="text-accent hover:underline">{s.title}</Link>)}
          </footer>
        )}
      </article>
    </main>
  );
}

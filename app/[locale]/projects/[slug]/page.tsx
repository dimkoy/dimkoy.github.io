import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { MediaGallery } from "@/components/projects/MediaGallery";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatPeriod } from "@/lib/format";
import { isLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const p = project.i18n[locale];
  return buildMetadata({ locale, path: `/projects/${slug}`, title: p.title, description: p.tagline });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  const dict = getDictionary(locale);
  const p = project.i18n[locale];

  const jsonLd = project.kind === "product"
    ? { "@context": "https://schema.org", "@type": "SoftwareApplication", name: p.title, applicationCategory: "MobileApplication", operatingSystem: "iOS", description: p.tagline, installUrl: project.links.find((l) => l.kind === "appstore")?.url, author: { "@id": `${SITE_URL}/#person` } }
    : project.kind === "talk"
      ? { "@context": "https://schema.org", "@type": "Event", name: p.title, startDate: project.period.start, performer: { "@id": `${SITE_URL}/#person` }, url: project.links[0]?.url }
      : { "@context": "https://schema.org", "@type": "SoftwareSourceCode", name: p.title, codeRepository: project.links.find((l) => l.kind === "github")?.url, programmingLanguage: "Swift", author: { "@id": `${SITE_URL}/#person` } };

  return (
    <main className="py-10">
      <JsonLd data={jsonLd} />
      <p className="text-sm"><Link href={localePath(locale, "/projects")} className="text-muted hover:text-ink">← {dict.actions.backToProjects}</Link></p>
      <p className="mt-6 text-xs uppercase tracking-wider text-muted">
        {dict.projects.kinds[project.kind]} · <span className="tnum">{formatPeriod(project.period.start, project.period.end, dict.home.present, locale)}</span>
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{p.title}</h1>
      <p className="mt-2 text-lg text-ink2">{p.tagline}</p>
      <div className="mt-5"><ProjectLinks links={project.links} locale={locale} dict={dict} /></div>

      {project.metrics && (
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label.en} className="rounded-xl border border-line bg-surface px-4 py-3">
              <dd className="text-2xl font-semibold tracking-tight tnum">{m.value}</dd>
              <dt className="text-xs text-muted">{m.label[locale]}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_16rem]">
        <div className="min-w-0">
          <div className="space-y-4 text-[15.5px] leading-relaxed text-ink2">
            {p.description.map((para) => <p key={para}>{para}</p>)}
          </div>
          <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted">{dict.projects.highlights}</h2>
          <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-ink2">
            {p.highlights.map((h) => <li key={h} className="flex gap-2"><span className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-axis" aria-hidden="true" />{h}</li>)}
          </ul>
          {project.media.length > 0 && (
            <>
              <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted">{dict.projects.media}</h2>
              <div className="mt-3"><MediaGallery media={project.media} locale={locale} /></div>
            </>
          )}
        </div>
        <aside className="space-y-5 text-sm">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted">{dict.projects.role}</div>
            <div className="mt-1">{p.role}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted">{dict.projects.stack}</div>
            <div className="mt-1 flex flex-wrap gap-1.5">{project.tech.map((t) => <span key={t} className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-xs">{t}</span>)}</div>
          </div>
        </aside>
      </div>
    </main>
  );
}

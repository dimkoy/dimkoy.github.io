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
import { absUrl, breadcrumbJsonLd, graph, personRef, WEBSITE_ID, type Node } from "@/lib/jsonld";
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

  const url = absUrl(locale, `/projects/${slug}`);
  const description = [p.tagline, ...p.description].join(" ");
  const me = personRef(locale);
  const images = project.media.filter((m) => m.type === "image").map((m) => `${SITE_URL}${m.src}`);
  const videos = project.media.flatMap((m) => m.type === "youtube" ? [{
    "@type": "VideoObject",
    name: p.title,
    description: p.tagline,
    thumbnailUrl: `https://img.youtube.com/vi/${m.id}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${m.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${m.id}`,
    uploadDate: m.uploadDate ?? `${project.period.start}-01`,
    inLanguage: m.language ?? "ru",
  }] : []);
  const common = { name: p.title, description, url, inLanguage: locale, keywords: project.tech.join(", "), isPartOf: { "@id": WEBSITE_ID } };
  const entity: Node = project.kind === "product"
    ? {
        "@type": "SoftwareApplication",
        "@id": `${url}#app`,
        ...common,
        applicationCategory: project.applicationCategory ?? "MobileApplication",
        operatingSystem: project.platform ?? "iOS",
        installUrl: project.links.find((l) => l.kind === "appstore")?.url,
        offers: { "@type": "Offer", price: project.price ?? "0", priceCurrency: "USD" },
        datePublished: project.released ?? `${project.period.start}-01`,
        ...(images.length ? { screenshot: images, image: images[0] } : {}),
        ...(videos.length ? { video: videos[0] } : {}),
        ...(project.awards ? { award: project.awards } : {}),
        ...(project.ownership === "contributor" ? { contributor: me } : { author: me, creator: me }),
      }
    : project.kind === "talk"
      ? {
          "@type": "Event",
          "@id": `${url}#event`,
          ...common,
          startDate: project.period.start,
          endDate: project.period.end ?? project.period.start,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: { "@type": "Place", name: "GrindConf 2019", address: { "@type": "PostalAddress", addressLocality: "Samara", addressCountry: "RU" } },
          organizer: { "@type": "Organization", name: "Samara IT Community", url: project.links.find((l) => l.kind === "talk")?.url },
          performer: me,
          ...(videos.length ? { recordedIn: videos[0] } : {}),
          ...(project.media.length ? { image: `https://img.youtube.com/vi/${(project.media[0] as { id?: string }).id}/maxresdefault.jpg` } : {}),
        }
      : {
          "@type": "SoftwareSourceCode",
          "@id": `${url}#code`,
          ...common,
          codeRepository: project.links.find((l) => l.kind === "github")?.url,
          programmingLanguage: { "@type": "ComputerLanguage", name: "Swift" },
          runtimePlatform: "iOS",
          dateCreated: `${project.period.start}-01`,
          author: me,
        };
  const jsonLd = graph(
    breadcrumbJsonLd(locale, [{ name: dict.nav.resume, path: "/" }, { name: dict.projects.title, path: "/projects" }, { name: p.title, path: `/projects/${slug}` }]),
    entity,
  );

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

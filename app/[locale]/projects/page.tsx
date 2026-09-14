import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absUrl, breadcrumbJsonLd, graph, PERSON_ID, WEBSITE_ID } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale).projects;
  return buildMetadata({ locale, path: "/projects", title: d.title, description: d.description });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const jsonLd = graph(
    breadcrumbJsonLd(locale, [{ name: dict.nav.resume, path: "/" }, { name: dict.projects.title, path: "/projects" }]),
    {
      "@type": "CollectionPage",
      "@id": absUrl(locale, "/projects"),
      url: absUrl(locale, "/projects"),
      name: dict.projects.title,
      description: dict.projects.description,
      inLanguage: locale,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.i18n[locale].title,
          description: p.i18n[locale].tagline,
          url: absUrl(locale, `/projects/${p.slug}`),
        })),
      },
    },
  );
  return (
    <main className="py-10">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-semibold tracking-tight">{dict.projects.title}</h1>
      <p className="mt-2 text-ink2">{dict.projects.description}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} locale={locale} dict={dict} headingLevel="h2" />)}
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
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
  return (
    <main className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight">{dict.projects.title}</h1>
      <p className="mt-2 text-ink2">{dict.projects.description}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} locale={locale} dict={dict} />)}
      </div>
    </main>
  );
}

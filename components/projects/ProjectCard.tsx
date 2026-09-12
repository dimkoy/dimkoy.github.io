import Link from "next/link";
import type { Project } from "@/content/types";
import { formatPeriod } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ProjectCard({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary }) {
  const p = project.i18n[locale];
  return (
    <Link href={localePath(locale, `/projects/${project.slug}`)} className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-axis">
      <div className="flex items-center justify-between gap-3 text-xs text-muted">
        <span className="uppercase tracking-wider">{dict.projects.kinds[project.kind]}</span>
        <span className="tnum">{formatPeriod(project.period.start, project.period.end, dict.home.present)}</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">{p.title}</h3>
      <p className="mt-1 text-sm text-ink2">{p.tagline}</p>
      {project.metrics && (
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label.en}>
              <dt className="sr-only">{m.label[locale]}</dt>
              <dd className="text-sm"><b className="font-semibold tnum">{m.value}</b> <span className="text-muted">{m.label[locale]}</span></dd>
            </div>
          ))}
        </dl>
      )}
      <p className="mt-auto pt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((t) => <span key={t} className="rounded-md border border-line px-1.5 py-0.5 text-xs text-ink2">{t}</span>)}
      </p>
    </Link>
  );
}

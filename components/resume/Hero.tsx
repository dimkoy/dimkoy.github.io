import type { Resume } from "@/content/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

export function Hero({ resume, dict }: { resume: Resume; dict: Dictionary }) {
  return (
    <section className="py-12 sm:py-16">
      <p className="text-xs uppercase tracking-[0.08em] text-muted">{dict.home.eyebrow}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{resume.name}</h1>
      <p className="mt-2 text-lg text-ink2">{resume.title} · Swift · SwiftUI · TCA · AI-driven workflows</p>
      <div className="mt-6 max-w-2xl space-y-3 text-[15.5px] leading-relaxed text-ink2">
        {resume.summary.map((p) => <p key={p}>{p}</p>)}
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={site.cvPath} download className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-deep">
          {dict.actions.downloadCv}
          <span aria-hidden="true">↓</span>
        </a>
        <a href={`mailto:${site.email}`} className="inline-flex items-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-axis">
          {dict.actions.email}
        </a>
        <a href={site.linkedin} target="_blank" rel="me noopener" className="inline-flex items-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-axis">LinkedIn</a>
        <a href={site.github} target="_blank" rel="me noopener" className="inline-flex items-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-axis">GitHub</a>
      </div>
    </section>
  );
}

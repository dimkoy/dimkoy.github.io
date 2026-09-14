import Image from "next/image";
import type { Resume } from "@/content/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

export function Hero({ resume, dict }: { resume: Resume; dict: Dictionary }) {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="intro-heading">
      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.08em] text-muted">{dict.home.eyebrow}</p>
          <h1 id="intro-heading" className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {resume.name}
            <span className="mt-2 block text-lg font-normal tracking-normal text-ink2 sm:text-xl">
              {resume.title} · Swift · SwiftUI · TCA · AI-driven workflows
            </span>
          </h1>
          <div className="mt-6 max-w-2xl space-y-3 text-[15.5px] leading-relaxed text-ink2">
            {resume.summary.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <Image
          src={site.photoSmall.path}
          width={site.photoSmall.width}
          height={site.photoSmall.height}
          alt={resume.photoAlt}
          priority
          className="h-28 w-28 flex-none rounded-2xl border border-line object-cover sm:h-40 sm:w-40"
        />
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
      <div className="mt-10">
        <h2 id="facts-heading" className="text-xs font-semibold uppercase tracking-wider text-muted">{dict.home.facts}</h2>
        <ul aria-labelledby="facts-heading" className="mt-3 grid gap-3 sm:grid-cols-3">
          {resume.facts.map((f) => (
            <li key={f.value} className="rounded-xl border border-line bg-surface px-4 py-3">
              <strong className="block text-xl font-semibold tracking-tight tnum">{f.value}</strong>
              <span className="mt-0.5 block text-sm text-ink2">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

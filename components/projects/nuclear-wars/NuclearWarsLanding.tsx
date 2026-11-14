import type { CSSProperties } from "react";
import Link from "next/link";
import { nuclearWarsLanding as copy } from "@/content/landings/nuclear-wars";
import type { ClipMedia, Project } from "@/content/types";
import { ImageLightbox } from "@/components/projects/ImageLightbox";
import { LoopClip } from "@/components/projects/LoopClip";
import { MediaGallery } from "@/components/projects/MediaGallery";
import { ProjectBadges } from "@/components/projects/ProjectBadges";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { formatPeriod } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { CountUp } from "./CountUp";
import { HeroVideo } from "./HeroVideo";
import { NuclearSky } from "./NuclearSky";
import { RevealObserver } from "./RevealObserver";
import { UnitIcon } from "./UnitIcon";
import { UnitShowcase } from "./UnitShowcase";

/** Clip that loops behind the hero (in project.inline). */
const HERO_CLIP = "/media/nuclear-wars/clip-explosions.mp4";
const NO_WINNERS_IMAGE = "/media/nuclear-wars/impact.webp";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Landing-style page of Nuclear Wars: full-screen hero, the iPhone and iPad version, the three match phases with gameplay clips, the
 * "no winners" hook, units, metrics, gallery, the build story and a closing call to action — over a sky of
 * missiles (`NuclearSky`). Motion lives in the `[data-project-theme="nuclear-wars"]` rules of app/globals.css.
 */
export function NuclearWarsLanding({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary }) {
  const p = project.i18n[locale];
  const clips = [...project.media, ...(project.inline ?? []).map((x) => x.clip)].filter((m): m is ClipMedia => m.type === "clip");
  const clip = (src: string) => clips.find((c) => c.src === src);
  const hero = clip(HERO_CLIP);
  // One listing for every platform: drop `?platform=` so the shared CTA opens the neutral store page.
  const appStore = project.links.find((l) => l.kind === "appstore")?.url?.split("?")[0];
  const ticker = copy.ticker[locale];

  return (
    <>
      <NuclearSky />
      <RevealObserver />

      {/* Hero */}
      <section className="nw-bleed nw-hero">
        {hero && <HeroVideo clip={hero} />}
        <div className="relative mx-auto flex min-h-[inherit] max-w-5xl flex-col px-4 pt-6 pb-16 sm:px-6">
          <p className="text-sm"><Link href={localePath(locale, "/projects")} className="text-muted hover:text-ink">← {dict.actions.backToProjects}</Link></p>
          <div className="flex flex-1 items-center py-10">
            <div className="relative z-10 max-w-2xl">
              <p className="nw-eyebrow">
                <span className="nw-live" aria-hidden="true" />
                {copy.eyebrow[locale]}
                <span className="hidden sm:inline">· <span className="tnum">{formatPeriod(project.period.start, project.period.end, dict.home.present, locale)}</span></span>
              </p>
              <p className="nw-type mt-5 text-sm font-bold tracking-[0.18em] text-accent sm:text-base">
                <span className="sr-only">{copy.slogan[locale]}</span>
                <span aria-hidden="true">
                  {[...copy.slogan[locale]].map((ch, i) => <span key={i} style={delay(i)}>{ch}</span>)}
                </span>
              </p>
              <h1 className="mt-3 text-[clamp(3rem,10vw,6.5rem)] leading-[0.95]">{p.title}</h1>
              <p className="mt-5 max-w-xl text-base text-ink2 sm:text-lg">{p.tagline}</p>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <ProjectLinks links={project.links} locale={locale} dict={dict} />
                <ProjectBadges badges={project.badges} />
              </div>
              <p className="nw-hint mt-6 text-xs uppercase tracking-wider text-muted">⌖ {copy.skyHint[locale]}</p>
            </div>
          </div>
          <p className="nw-scroll" aria-hidden="true">{copy.scroll[locale]}<span /></p>
        </div>
      </section>

      {/* Ticker */}
      <div className="nw-bleed nw-ticker">
        <ul className="sr-only">{ticker.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="nw-ticker-track" aria-hidden="true">
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} className="nw-ticker-row">
              {ticker.map((t) => <span key={t}>{t}<b>✦</b></span>)}
            </div>
          ))}
        </div>
      </div>

      {/* iPhone and iPad */}
      <section className="pt-24">
        <header data-reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{copy.mobile.kicker[locale]}</p>
          <h2 className="nw-h2 mt-3">{copy.mobile.title[locale]}</h2>
          <p className="mt-4 text-lg text-ink2">{copy.mobile.lead[locale]}</p>
        </header>
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {copy.mobile.modes.map((m, i) => (
            <li key={m.name.en} className="nw-card" data-reveal style={delay(i)}>
              <p className="font-bold text-ink">{m.name[locale]}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink2">{m.text[locale]}</p>
            </li>
          ))}
        </ul>
        <div className="nw-wide mt-6 grid gap-3 sm:grid-cols-2" data-reveal>
          <ImageLightbox images={copy.mobile.screenshots.map((s) => ({ ...s, alt: s.alt[locale] }))} labels={dict.projects.gallery} />
        </div>
      </section>

      {/* Phases */}
      <section className="pt-24">
        <header data-reveal className="max-w-2xl">
          <h2 className="nw-h2">{copy.phasesTitle[locale]}</h2>
          <p className="mt-4 text-lg text-ink2">{copy.phasesLead[locale]}</p>
        </header>
        <div className="mt-20 space-y-32">
          {copy.phases.map((phase, i) => {
            const media = clip(phase.clip);
            return (
              <article key={phase.clip} data-reveal>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">
                  <div>
                    <p className="nw-phase-code tnum">
                      {copy.phaseLabel[locale]} {String(i + 1).padStart(2, "0")} <span className="text-muted">/ {String(copy.phases.length).padStart(2, "0")}</span>
                      <span className="nw-phase-bar" aria-hidden="true"><span style={{ width: `${((i + 1) / copy.phases.length) * 100}%` }} /></span>
                    </p>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-muted">{phase.name[locale]}</p>
                    <h3 className="nw-glitch mt-2 text-4xl font-bold text-ink sm:text-5xl" data-text={phase.title[locale]}>{phase.title[locale]}</h3>
                  </div>
                  <p className="text-base leading-relaxed text-ink2 sm:text-[17px]">{phase.text[locale]}</p>
                </div>
                {media && (
                  <div className="nw-wide nw-wipe mt-10">
                    <LoopClip className="nw-clip" clip={media} locale={locale} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* No winners */}
      <section className="nw-bleed nw-nowin mt-28" style={{ "--nw-image": `url(${NO_WINNERS_IMAGE})` } as CSSProperties}>
        <div className="relative mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 sm:py-40" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{copy.noWinners.kicker[locale]}</p>
          <h2 className="nw-nowin-title mt-4 text-4xl font-bold uppercase sm:text-6xl">{copy.noWinners.title[locale]}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink2">{copy.noWinners.text[locale]}</p>
        </div>
      </section>

      {/* Units */}
      <section className="pt-24">
        <h2 className="nw-h2" data-reveal>{copy.unitsTitle[locale]}</h2>
        <div className="nw-wide mt-10" data-reveal>
          <UnitShowcase>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              {copy.units.map((u) => (
                <li key={u.kind} className="nw-card nw-unit">
                  <div data-unit-slot={u.kind} className="nw-unit-slot"><UnitIcon kind={u.kind} /></div>
                  <p className="mt-3 font-bold text-ink">{u.name[locale]}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink2">{u.text[locale]}</p>
                </li>
              ))}
            </ul>
          </UnitShowcase>
        </div>
      </section>

      {/* Metrics */}
      {project.metrics && (
        <section className="pt-24">
          <h2 className="nw-h2" data-reveal>{copy.metricsTitle[locale]}</h2>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.metrics.map((m, i) => (
              <div key={m.label.en} className="nw-card" data-reveal style={delay(i)}>
                <dd className="nw-metric tnum"><CountUp value={m.value} /></dd>
                <dt className="mt-1 text-xs text-muted">{m.label[locale]}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Gallery */}
      <section className="pt-24">
        <h2 className="nw-h2" data-reveal>{dict.projects.media}</h2>
        <div className="mt-8" data-reveal>
          <MediaGallery media={project.media.filter((m) => m.type !== "clip")} locale={locale} dict={dict} />
        </div>
      </section>

      {/* Build story */}
      <section className="pt-24">
        <h2 className="nw-h2" data-reveal>{copy.buildTitle[locale]}</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_16rem]" data-reveal>
          <div className="nw-panel min-w-0">
            <div className="space-y-4 text-[15.5px] leading-relaxed text-ink2">
              {p.description.map((para) => <p key={para}>{para}</p>)}
            </div>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted">{dict.projects.highlights}</h3>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-ink2">
              {p.highlights.map((h) => <li key={h} className="flex gap-2"><span className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-accent" aria-hidden="true" />{h}</li>)}
            </ul>
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
      </section>

      {/* Call to action */}
      <section className="nw-bleed nw-cta mt-28">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6" data-reveal>
          <h2 className="nw-cta-title text-4xl font-bold uppercase sm:text-6xl">{copy.cta.title[locale]}</h2>
          {appStore && (
            <a href={appStore} target="_blank" rel="noopener" className="nw-launch mt-10">
              {copy.cta.button[locale]} <span aria-hidden="true">↗</span>
            </a>
          )}
          <p className="mt-6 text-sm text-muted">{copy.cta.note[locale]}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2"><ProjectBadges badges={project.badges} /></div>
        </div>
      </section>
    </>
  );
}

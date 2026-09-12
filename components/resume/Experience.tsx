import Link from "next/link";
import type { Experience as Exp } from "@/content/types";
import { formatPeriod } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Experience({ items, locale, dict }: { items: Exp[]; locale: Locale; dict: Dictionary }) {
  return (
    <ol className="space-y-8">
      {items.map((e) => (
        <li key={e.company} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <div className="text-sm text-muted tnum">
            {e.roles.map((r) => (
              <div key={r.title}>{formatPeriod(r.start, r.end, dict.home.present)}</div>
            ))}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold">
              {e.roles.map((r) => r.title).join(" · ")}
            </h3>
            <p className="text-sm text-ink2">
              {e.projectSlug ? (
                <Link href={localePath(locale, `/projects/${e.projectSlug}`)} className="text-accent hover:underline">{e.company}</Link>
              ) : e.company}
              <span className="text-muted"> · {e.location}</span>
            </p>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-ink2">
              {e.highlights.map((h) => (
                <li key={h} className="flex gap-2"><span className="mt-[0.6em] h-1 w-1 flex-none rounded-full bg-axis" aria-hidden="true" />{h}</li>
              ))}
            </ul>
            {e.tech && (
              <p className="mt-3 flex flex-wrap gap-1.5">
                {e.tech.map((t) => <span key={t} className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-xs text-ink2">{t}</span>)}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

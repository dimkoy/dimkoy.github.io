import Link from "next/link";
import type { ProjectLink } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const cls = "inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink hover:border-axis";

export function ProjectLinks({ links, locale, dict }: { links: ProjectLink[]; locale: Locale; dict: Dictionary }) {
  if (!links.length) return null;
  const labelFor = (l: ProjectLink) => {
    if (l.label) return l.label[locale];
    switch (l.kind) {
      case "appstore": return l.pending ? dict.actions.appStorePending : dict.actions.appStore;
      case "github": return dict.actions.viewOnGithub;
      case "talk": return dict.actions.talkPage;
      case "stats": return dict.actions.seeStats;
      default: return dict.actions.website;
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l, i) => {
        const label = labelFor(l);
        if (l.pending || !l.url) {
          return <span key={i} className={`${cls} cursor-default text-muted hover:border-line`} aria-disabled="true">{label} <span aria-hidden="true">⏳</span></span>;
        }
        if (l.kind === "stats") {
          return <Link key={i} href={localePath(locale, l.url)} className={cls}>{label} <span aria-hidden="true">→</span></Link>;
        }
        return <a key={i} href={l.url} target="_blank" rel="noopener" className={cls}>{label} <span aria-hidden="true">↗</span></a>;
      })}
    </div>
  );
}

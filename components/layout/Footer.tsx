import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:px-6">
        <p>© {new Date().getUTCFullYear()} {site.name}. {dict.footer.built}</p>
        <nav className="flex gap-4" aria-label="Social">
          <a href={site.github} className="hover:text-ink" rel="me noopener" target="_blank">GitHub</a>
          <a href={site.linkedin} className="hover:text-ink" rel="me noopener" target="_blank">LinkedIn</a>
          <a href={`mailto:${site.email}`} className="hover:text-ink">Email</a>
          <a href={`${localePath(locale, "/")}feed.xml`} className="hover:text-ink">{dict.actions.rss}</a>
        </nav>
      </div>
    </footer>
  );
}

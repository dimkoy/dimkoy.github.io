"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}/`;
  const rest = pathname.replace(new RegExp(`^/(${locales.join("|")})(?=/|$)`), "");

  return (
    <nav aria-label="Language" className="flex items-center rounded-md border border-line text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest || "/"}`}
          hrefLang={l}
          lang={l}
          onClick={() => { try { localStorage.setItem("locale", l); } catch {} }}
          aria-current={l === current ? "true" : undefined}
          className={`px-2 py-1 uppercase tracking-wide ${l === current ? "bg-surface text-ink font-medium" : "text-muted hover:text-ink"}`}
          title={localeNames[l]}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}

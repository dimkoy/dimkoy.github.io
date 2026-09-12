import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = [
    { href: localePath(locale, "/"), label: dict.nav.resume },
    { href: localePath(locale, "/projects"), label: dict.nav.projects },
    { href: localePath(locale, "/blog"), label: dict.nav.blog },
    { href: localePath(locale, "/stats"), label: dict.nav.stats },
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-plane/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href={localePath(locale, "/")} className="font-semibold tracking-tight text-ink">
          {site.name}
        </Link>
        <nav aria-label="Main" className="order-3 flex w-full gap-4 text-sm sm:order-none sm:w-auto">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="text-ink2 hover:text-ink">
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LocaleSwitcher current={locale} />
          <ThemeToggle labels={{ ...dict.theme }} />
        </div>
      </div>
    </header>
  );
}

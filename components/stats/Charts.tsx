"use client";

import { useEffect, useRef } from "react";
import { FEATS, STATS } from "@/content/stats/growdiaries";
import type { Locale } from "@/lib/i18n/config";
import { mountDevStats, type ChartLabels } from "@/lib/stats/render";

type Props = { locale: Locale; labels: Omit<ChartLabels, "fmt" | "months" | "monthsFull">; children: React.ReactNode };

const intl: Record<Locale, string> = { en: "en-US", ru: "ru-RU", es: "es-ES" };

function monthNames(locale: Locale, style: "short" | "long") {
  const f = new Intl.DateTimeFormat(intl[locale], { month: style, timeZone: "UTC" });
  return Array.from({ length: 12 }, (_, i) => {
    const s = f.format(new Date(Date.UTC(2024, i, 1)));
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/\.$/, "");
  });
}

/** Client boundary: mounts the imperative chart renderer into the [data-chart] slots rendered by the server. */
export function Charts({ locale, labels, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const nf = new Intl.NumberFormat(intl[locale], { maximumFractionDigits: 0 });
    return mountDevStats(ref.current, STATS, FEATS, {
      ...labels,
      months: monthNames(locale, "short"),
      monthsFull: monthNames(locale, "long"),
      fmt: (n) => nf.format(Math.round(n)),
    });
    // labels are derived from the locale dictionary and never change without the locale
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
  return <div ref={ref}>{children}</div>;
}

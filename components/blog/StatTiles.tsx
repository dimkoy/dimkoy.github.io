import { formatNumber } from "@/lib/format";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { yoy } from "@/lib/stats/compute";

/** Three YoY tiles for use inside MDX: <StatTiles locale="en" /> */
export function StatTiles({ locale = "en" }: { locale?: Locale | string }) {
  const l: Locale = isLocale(locale) ? locale : "en";
  const d = getDictionary(l);
  const y = yoy();
  const rows = [
    { k: d.stats.codeOutput, sub: d.stats.codeOutputSub, d: y.codeOutput.delta, now: formatNumber(y.codeOutput.now, l), old: formatNumber(y.codeOutput.was, l) },
    { k: d.stats.deliveryCadence, sub: d.stats.deliveryCadenceSub, d: y.deliveryCadence.delta, now: y.deliveryCadence.now.toFixed(1), old: y.deliveryCadence.was.toFixed(1) },
    { k: d.stats.featureThroughput, sub: d.stats.featureThroughputSub, d: y.featureThroughput.delta, now: y.featureThroughput.now.toFixed(1), old: y.featureThroughput.was.toFixed(1) },
  ];
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
      {rows.map((r) => (
        <div key={r.k} className="rounded-xl border border-line bg-surface px-4 py-3">
          <div className="text-xs uppercase tracking-wider text-muted">{r.k}</div>
          <div className="mt-1 text-3xl font-semibold tracking-tight text-good tnum">{r.d}</div>
          <div className="mt-0.5 text-xs text-ink2 tnum">{r.now} {r.sub} · {d.home.was} {r.old}</div>
        </div>
      ))}
    </div>
  );
}

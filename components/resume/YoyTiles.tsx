import { yoy } from "@/lib/stats/compute";
import { formatNumber } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function YoyTiles({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const y = yoy();
  const s = dict.stats;
  const tiles = [
    { lbl: s.codeOutput, v: formatNumber(y.codeOutput.now, locale), d: y.codeOutput.delta, sub: `${s.codeOutputSub} · ${dict.home.was} ${formatNumber(y.codeOutput.was, locale)}` },
    { lbl: s.deliveryCadence, v: y.deliveryCadence.now.toFixed(1), d: y.deliveryCadence.delta, sub: `${s.deliveryCadenceSub} · ${dict.home.was} ${y.deliveryCadence.was.toFixed(1)}` },
    { lbl: s.featureThroughput, v: y.featureThroughput.now.toFixed(1), d: y.featureThroughput.delta, sub: `${s.featureThroughputSub} · ${dict.home.was} ${y.featureThroughput.was.toFixed(1)}` },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {tiles.map((t) => (
        <div key={t.lbl} className="rounded-xl border border-line bg-surface px-4 pb-3 pt-3.5">
          <div className="text-xs uppercase tracking-wider text-muted">{t.lbl}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight tnum">
            {t.v} <span className="ml-1 text-sm font-semibold text-good">{t.d}</span>
          </div>
          <div className="mt-0.5 text-xs text-ink2">{t.sub}</div>
        </div>
      ))}
    </div>
  );
}

import { FEATS, STATS, YOY_WINDOWS } from "@/content/stats/growdiaries";
import { capitalize, formatDate, formatMonth, formatNumber } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/t";
import { bestMonth, featureCount, roll3, yoy } from "@/lib/stats/compute";
import { Charts } from "./Charts";
import s from "./dev-stats.module.css";

const D = STATS;
const N = D.months.length;

function Tile({ lbl, val, sub, delta }: { lbl: string; val: string; sub: string; delta?: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 pb-3 pt-3.5">
      <div className="text-xs uppercase tracking-wider text-muted">{lbl}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight tnum">
        {val}{delta && <span className="ml-1.5 text-sm font-semibold text-good">{delta}</span>}
      </div>
      <div className="mt-0.5 text-xs text-ink2">{sub}</div>
    </div>
  );
}

function Card({ title, sub, chart, legend, table }: { title: string; sub: string; chart: string; legend?: React.ReactNode; table: React.ReactNode }) {
  return (
    <section className={s.card} data-card>
      <h3>{title}</h3>
      <div className={s.sub}>{sub}</div>
      {legend}
      <div className={s.chart} data-chart={chart} />
      {table}
    </section>
  );
}

function Table({ head, rows, toggle }: { head: (string | { h: string; left?: boolean })[]; rows: (string | number)[][]; toggle: string }) {
  return (
    <details className={s.details}>
      <summary>{toggle}</summary>
      <div className={s.tblwrap}>
        <table>
          <thead><tr>{head.map((h, i) => typeof h === "string" ? <th key={i}>{h}</th> : <th key={i} className={h.left ? s.left : undefined}>{h.h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={typeof head[j] === "object" && (head[j] as { left?: boolean }).left ? s.left : undefined}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </details>
  );
}

export function DevStats({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const L = dict.stats;
  const fmt = (n: number) => formatNumber(n, locale);
  const mLbl = (m: string) => formatDate(m, locale, { month: "short", year: "2-digit" });
  const mFull = (m: string) => formatMonth(m, locale);
  const y = yoy();
  const best = bestMonth();
  const r3 = roll3(D.add);
  const lastName = mLbl(D.months[N - 1]);
  const partial = D.partialLast ? " · " + t(L.partialMonth, { month: lastName }) : "";

  const chartLabels = {
    unitLines: L.unitLines, unitBuilds: L.unitBuilds, unitFiles: L.unitFiles, unitFeature: L.unitFeature,
    unitFeatures: L.unitFeatures, legendAvg: L.legendAvg, partial: L.partial,
  };

  return (
    <Charts locale={locale} labels={chartLabels}>
      <div className="flex flex-col gap-7">
        <header>
          <p className="text-xs uppercase tracking-[0.08em] text-muted">{L.eyebrow}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{L.title}</h1>
          <p className="mt-1 text-sm text-ink2 tnum">{t(L.period, { first: formatDate(D.first, locale), last: formatDate(D.last, locale), commits: D.totals.commits })}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="text-5xl font-semibold leading-none tracking-tight tnum sm:text-6xl">{fmt(D.loc)}</div>
            <div className="max-w-[34ch] text-[15px] text-ink2">{L.heroCaption}</div>
          </div>
        </header>

        <section>
          <h2 className="text-lg font-semibold tracking-tight">{L.yoyTitle}</h2>
          <p className="mt-1 max-w-[72ch] text-sm text-ink2">
            {t(L.yoyNote, { base: `${mFull(YOY_WINDOWS.base.from)} — ${mFull(YOY_WINDOWS.base.to)}`, last: `${mFull(YOY_WINDOWS.last.from)} — ${mFull(YOY_WINDOWS.last.to)}` })}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Tile lbl={L.codeOutput} val={fmt(y.codeOutput.now)} delta={y.codeOutput.delta} sub={`${L.codeOutputSub} · ${dict.home.was} ${fmt(y.codeOutput.was)}`} />
            <Tile lbl={L.deliveryCadence} val={y.deliveryCadence.now.toFixed(1)} delta={y.deliveryCadence.delta} sub={`${L.deliveryCadenceSub} · ${dict.home.was} ${y.deliveryCadence.was.toFixed(1)}`} />
            <Tile lbl={L.featureThroughput} val={y.featureThroughput.now.toFixed(1)} delta={y.featureThroughput.delta} sub={`${L.featureThroughputSub} · ${dict.home.was} ${y.featureThroughput.was.toFixed(1)}`} />
          </div>
          <p className="mt-2 max-w-[72ch] text-sm text-ink2">
            {t(L.recordNote, { month: capitalize(mFull(best.month)), lines: fmt(best.lines) })}
            {D.partialLast && " " + t(L.partialNote, { month: capitalize(mFull(D.months[N - 1])), date: formatDate(D.last, locale) })}
          </p>
        </section>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Tile lbl={L.kpiBuilds} val={fmt(D.totals.commits)} sub={L.kpiBuildsSub} />
          <Tile lbl={L.kpiAvgCommit} val={fmt(D.totals.avg_commit_size)} sub={L.kpiAvgCommitSub} />
          <Tile lbl={L.kpiBestMonth} val={capitalize(mFull(best.month))} sub={t(L.kpiBestMonthSub, { lines: fmt(best.lines) })} />
          <Tile lbl={L.kpiStreak} val={t(L.kpiStreakVal, { days: D.streak.days })} sub={t(L.kpiStreakSub, { month: mFull(D.streak.end.slice(0, 7)) })} />
        </div>

        <Card title={L.growthTitle} sub={L.growthSub} chart="growth"
          table={<Table toggle={L.showTable} head={[{ h: L.month, left: true }, L.cumulative]} rows={D.months.map((m, i) => [mLbl(m), fmt(D.cum[i])])} />} />

        <section>
          <h2 className="text-lg font-semibold tracking-tight">{L.velocityTitle}</h2>
          <p className="mt-1 max-w-[72ch] text-sm text-ink2">{L.velocityNote}</p>
        </section>
        <div className="grid gap-4 md:grid-cols-2">
          <Card title={L.linesTitle} sub={L.linesSub + partial} chart="velocity"
            legend={
              <div className={s.legend}>
                <span className={s.k}><span className={s.swatch} style={{ background: "var(--accent)" }} />{L.legendLines}</span>
                <span className={s.k}><span className={s.linekey} style={{ background: "var(--ink2)" }} />{L.legendAvg}</span>
              </div>
            }
            table={<Table toggle={L.showTable} head={[{ h: L.month, left: true }, L.added, L.deleted, L.avg3]} rows={D.months.map((m, i) => [mLbl(m), fmt(D.add[i]), fmt(D.del[i]), fmt(r3[i])])} />} />
          <Card title={L.buildsTitle} sub={L.buildsSub + partial} chart="commits"
            table={<Table toggle={L.showTable} head={[{ h: L.month, left: true }, L.builds]} rows={D.months.map((m, i) => [mLbl(m), fmt(D.com[i])])} />} />
        </div>

        <section>
          <h2 className="text-lg font-semibold tracking-tight">{L.featuresTitle}</h2>
          <p className="mt-1 max-w-[72ch] text-sm text-ink2">{t(L.featuresNote, { count: featureCount() })}</p>
        </section>
        <Card title={L.featuresChartTitle} sub={L.featuresChartSub + partial} chart="features"
          table={<Table toggle={L.showTable} head={[{ h: L.month, left: true }, { h: L.feature, left: true }, L.linesAdded]}
            rows={D.months.flatMap((m, i) => FEATS[i].slice().sort((a, b) => b[1] - a[1]).map((f) => [mLbl(m), f[0], fmt(f[1])]))} />} />

        <Card title={L.filesTitle} sub={L.filesSub} chart="files"
          table={<Table toggle={L.showTable} head={[{ h: L.month, left: true }, L.files]} rows={D.months.map((m, i) => [mLbl(m), fmt(D.files[i])])} />} />

        <footer className="max-w-[76ch] space-y-1.5 border-t border-grid pt-4 text-xs text-muted">
          {[L.footAuthor, L.footMethod, L.footBuilds, L.footFeatures, L.footProxy].map((p) => {
            const dot = p.indexOf(". ");
            return dot > 0 && dot < 20 ? <p key={p}><b>{p.slice(0, dot + 1)}</b>{p.slice(dot + 1)}</p> : <p key={p}>{p}</p>;
          })}
        </footer>
      </div>
    </Charts>
  );
}

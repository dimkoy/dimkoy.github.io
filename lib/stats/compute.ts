import { FEATS, STATS, YOY_WINDOWS, type Feature, type StatsData } from "@/content/stats/growdiaries";

export type WindowAverages = { addMo: number; comMo: number; featMo: number };

export function roll3(add: number[]): number[] {
  return add.map((_, i) => {
    const w = add.slice(Math.max(0, i - 2), i + 1);
    return w.reduce((a, b) => a + b, 0) / w.length;
  });
}

export function featTotal(feats: Feature[]): number {
  return feats.reduce((a, f) => a + f[1], 0);
}

export function featureCount(feats: Feature[][] = FEATS): number {
  return feats.reduce((a, m) => a + m.length, 0);
}

export function windowAverages(from: string, to: string, d: StatsData = STATS, feats: Feature[][] = FEATS): WindowAverages {
  const i = d.months.indexOf(from);
  const j = d.months.indexOf(to) + 1;
  if (i < 0 || j <= i) throw new Error(`Bad window ${from}..${to}`);
  const n = j - i;
  const sum = (arr: number[]) => arr.slice(i, j).reduce((a, b) => a + b, 0);
  return {
    addMo: sum(d.add) / n,
    comMo: sum(d.com) / n,
    featMo: feats.slice(i, j).reduce((a, m) => a + m.length, 0) / n,
  };
}

export const pct = (base: number, now: number) => `+${Math.round((now / base - 1) * 100)}%`;

export type YoY = {
  codeOutput: { now: number; was: number; delta: string };
  deliveryCadence: { now: number; was: number; delta: string };
  featureThroughput: { now: number; was: number; delta: string };
};

export function yoy(d: StatsData = STATS, feats: Feature[][] = FEATS): YoY {
  const base = windowAverages(YOY_WINDOWS.base.from, YOY_WINDOWS.base.to, d, feats);
  const last = windowAverages(YOY_WINDOWS.last.from, YOY_WINDOWS.last.to, d, feats);
  return {
    codeOutput: { now: last.addMo, was: base.addMo, delta: pct(base.addMo, last.addMo) },
    deliveryCadence: { now: last.comMo, was: base.comMo, delta: pct(base.comMo, last.comMo) },
    featureThroughput: { now: last.featMo, was: base.featMo, delta: pct(base.featMo, last.featMo) },
  };
}

export function bestMonth(d: StatsData = STATS): { month: string; lines: number } {
  const i = d.add.indexOf(Math.max(...d.add));
  return { month: d.months[i], lines: d.add[i] };
}

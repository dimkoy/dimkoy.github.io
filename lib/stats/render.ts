/**
 * Imperative SVG renderer for the dev-stats charts (ported from the original dev-stats.html).
 * Runs only in the browser. `mountDevStats` draws into [data-chart] containers inside `root`
 * and returns a cleanup function that removes every listener it registered.
 */
import type { Feature, StatsData } from "@/content/stats/growdiaries";
import { featTotal, roll3 } from "./compute";

export type ChartLabels = {
  months: string[]; // short month names, index 0 = January
  monthsFull: string[];
  unitLines: string;
  unitBuilds: string;
  unitFiles: string;
  unitFeature: string;
  unitFeatures: string;
  legendAvg: string;
  partial: string;
  fmt: (n: number) => string;
};

const NS = "http://www.w3.org/2000/svg";
const PAD = { l: 56, r: 14, t: 14, b: 26 };

type Attrs = Record<string, string | number>;

function el<K extends keyof SVGElementTagNameMap>(name: K, attrs: Attrs, parent?: Element): SVGElementTagNameMap[K] {
  const e = document.createElementNS(NS, name);
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  parent?.appendChild(e);
  return e;
}

function niceStep(max: number): number {
  const raw = max / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 2.5, 5, 10]) if (raw <= m * mag) return m * mag;
  return 10 * mag;
}

const linePath = (pts: [number, number][]) =>
  pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");

const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

type TipRow = { c: string; v: string; n: string };

function makeTip(card: HTMLElement) {
  const tip = document.createElement("div");
  tip.className = "tip";
  card.appendChild(tip);
  return {
    show(mx: number, my: number, title: string, rows: TipRow[]) {
      tip.innerHTML = "";
      const tt = document.createElement("div");
      tt.className = "t";
      tt.textContent = title;
      tip.appendChild(tt);
      for (const r of rows) {
        const row = document.createElement("div");
        row.className = "row";
        const lk = document.createElement("i");
        lk.className = "lk";
        lk.style.background = r.c;
        row.appendChild(lk);
        const b = document.createElement("b");
        b.textContent = r.v;
        row.appendChild(b);
        const s = document.createElement("span");
        s.textContent = r.n;
        row.appendChild(s);
        tip.appendChild(row);
      }
      tip.style.display = "block";
      const cw = card.clientWidth;
      const tw = tip.offsetWidth;
      let x = mx + 14;
      if (x + tw > cw - 8) x = mx - tw - 14;
      tip.style.left = Math.max(8, x) + "px";
      tip.style.top = Math.max(8, my - tip.offsetHeight - 12) + "px";
    },
    hide() {
      tip.style.display = "none";
    },
    destroy() {
      tip.remove();
    },
  };
}

export function mountDevStats(root: HTMLElement, D: StatsData, FEATS: Feature[][], L: ChartLabels): () => void {
  const N = D.months.length;
  const PARTIAL = D.partialLast;
  const r3 = roll3(D.add);
  const monthLabel = (m: string) => { const [y, mm] = m.split("-"); return L.months[+mm - 1] + " " + y.slice(2); };
  const monthFull = (m: string) => { const [y, mm] = m.split("-"); return L.monthsFull[+mm - 1] + " " + y; };
  const fmt = L.fmt;

  const tips: { destroy(): void }[] = [];
  const box = (name: string) => root.querySelector<HTMLElement>(`[data-chart="${name}"]`)!;
  const cardOf = (b: HTMLElement) => b.closest<HTMLElement>("[data-card]")!;

  function frame(container: HTMLElement, H: number, maxY: number, tickFmt: (v: number) => string, band = false) {
    const W = Math.max(container.clientWidth, 280);
    container.innerHTML = "";
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img" }, container);
    const iw = W - PAD.l - PAD.r;
    const ih = H - PAD.t - PAD.b;
    const step = niceStep(maxY);
    const top = Math.ceil(maxY / step) * step;
    const y = (v: number) => PAD.t + ih - (v / top) * ih;
    for (let v = 0; v <= top; v += step) {
      el("line", { x1: PAD.l, x2: W - PAD.r, y1: y(v), y2: y(v), class: v === 0 ? "axisline" : "gridline" }, svg);
      if (v > 0) el("text", { x: PAD.l - 6, y: y(v) + 4, "text-anchor": "end" }, svg).textContent = tickFmt(v);
    }
    const x = band
      ? (i: number) => PAD.l + (i + 0.5) * (iw / N)
      : (i: number) => PAD.l + (N === 1 ? 0 : (i / (N - 1)) * iw);
    const lblEvery = Math.max(1, Math.ceil(N / Math.max(1, Math.floor(iw / 52))));
    for (let i = 0; i < N; i++) {
      if (i === N - 1 || (i % lblEvery === 0 && N - 1 - i >= lblEvery)) {
        const anchor = band ? "middle" : i === N - 1 ? "end" : i === 0 ? "start" : "middle";
        el("text", { x: x(i), y: H - 8, "text-anchor": anchor }, svg).textContent = monthLabel(D.months[i]);
      }
    }
    return { svg, W, H, iw, ih, x, y, top };
  }
  type Frame = ReturnType<typeof frame>;

  function addCrosshair(card: HTMLElement, container: HTMLElement, f: Frame, rowsAt: (i: number) => TipRow[]) {
    const tip = makeTip(card);
    tips.push(tip);
    const hair = el("line", { y1: f.y(f.top), y2: f.y(0), class: "axisline", opacity: 0 }, f.svg);
    container.onpointermove = (e) => {
      const r = container.getBoundingClientRect();
      const sx = (e.clientX - r.left) * (f.W / r.width);
      const i = Math.max(0, Math.min(N - 1, Math.round((sx - PAD.l) / (f.iw / (N - 1)))));
      hair.setAttribute("x1", String(f.x(i)));
      hair.setAttribute("x2", String(f.x(i)));
      hair.setAttribute("opacity", "1");
      const cr = card.getBoundingClientRect();
      tip.show(e.clientX - cr.left, e.clientY - cr.top, monthFull(D.months[i]), rowsAt(i));
    };
    container.onpointerleave = () => { hair.setAttribute("opacity", "0"); tip.hide(); };
  }

  function drawArea(name: string, vals: number[], H: number, tickFmt: (v: number) => string, label: string, unit: string) {
    const b = box(name);
    const card = cardOf(b);
    const f = frame(b, H, Math.max(...vals) * 1.06, tickFmt);
    const base = f.y(0);
    const pts = D.months.map((_, i) => [f.x(i), f.y(vals[i])] as [number, number]);
    el("path", { d: linePath(pts) + `L${f.x(N - 1)} ${base}L${f.x(0)} ${base}Z`, fill: "var(--wash)" }, f.svg);
    el("path", { d: linePath(pts), fill: "none", stroke: "var(--accent)", "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, f.svg);
    el("circle", { cx: f.x(N - 1), cy: f.y(vals[N - 1]), r: 4.5, fill: "var(--accent)", stroke: "var(--surface)", "stroke-width": 2 }, f.svg);
    el("text", { x: f.x(N - 1) - 8, y: f.y(vals[N - 1]) - 10, "text-anchor": "end", class: "dl" }, f.svg).textContent = label;
    addCrosshair(card, b, f, (i) => [{ c: css("--accent"), v: fmt(vals[i]), n: unit }]);
  }

  function attachBarEvents(g: SVGGElement, show: (e: { clientX?: number; clientY?: number }) => void, hide: () => void) {
    g.onpointermove = show;
    g.onpointerleave = hide;
    g.onfocus = () => show({});
    g.onblur = hide;
  }

  function drawBars(name: string, vals: number[], opts: { tickFmt: (v: number) => string; unit: string; rollLine?: boolean; labelMax?: boolean; extraRow?: (i: number) => TipRow }) {
    const b = box(name);
    const card = cardOf(b);
    const maxY = Math.max(...vals);
    const f = frame(b, 260, maxY * 1.08, opts.tickFmt, true);
    const band = f.iw / N;
    const bw = Math.min(24, band - 4);
    const tip = makeTip(card);
    tips.push(tip);
    for (let i = 0; i < N; i++) {
      const cx = f.x(i);
      const isPartial = PARTIAL && i === N - 1;
      const g = el("g", { class: "bar-hit", tabindex: 0, role: "img", "aria-label": `${monthFull(D.months[i])}: ${fmt(vals[i])} ${opts.unit}` }, f.svg);
      if (isPartial) g.setAttribute("opacity", "0.45");
      el("rect", { x: cx - band / 2, y: f.y(f.top), width: band, height: f.y(0) - f.y(f.top), fill: "transparent" }, g);
      if (vals[i] > 0) el("rect", { class: "mark", x: cx - bw / 2, y: f.y(vals[i]), width: bw, height: Math.max(1, f.y(0) - f.y(vals[i])), fill: "var(--accent)", rx: 3 }, g);
      const show = (e: { clientX?: number; clientY?: number }) => {
        const cr = card.getBoundingClientRect();
        const mx = e.clientX != null ? e.clientX - cr.left : (cx / f.W) * card.clientWidth;
        const my = e.clientY != null ? e.clientY - cr.top : 40;
        const rows: TipRow[] = [{ c: css("--accent"), v: fmt(vals[i]), n: opts.unit }];
        if (opts.extraRow && !isPartial) rows.push(opts.extraRow(i));
        tip.show(mx, my, monthFull(D.months[i]) + (isPartial ? ` (${L.partial})` : ""), rows);
        g.style.opacity = isPartial ? "0.35" : "0.85";
      };
      const hide = () => { tip.hide(); g.style.opacity = isPartial ? "0.45" : "1"; };
      attachBarEvents(g, show, hide);
    }
    if (opts.rollLine) {
      const upto = PARTIAL ? N - 1 : N;
      el("path", { d: linePath(D.months.slice(0, upto).map((_, i) => [f.x(i), f.y(r3[i])] as [number, number])), fill: "none", stroke: "var(--ink2)", "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round", "pointer-events": "none" }, f.svg);
    }
    if (opts.labelMax) {
      const mi = vals.indexOf(Math.max(...vals));
      el("text", { x: f.x(mi), y: f.y(vals[mi]) - 7, "text-anchor": "end", class: "dl" }, f.svg).textContent = fmt(vals[mi]);
    }
  }

  function drawFeatures() {
    const b = box("features");
    const card = cardOf(b);
    const maxY = Math.max(...FEATS.map((m) => featTotal(m)));
    const f = frame(b, 300, maxY * 1.1, (v) => fmt(v / 1000) + "k", true);
    const band = f.iw / N;
    const bw = Math.min(26, band - 4);
    const tip = makeTip(card);
    tips.push(tip);
    const GAP = 1.5;
    for (let i = 0; i < N; i++) {
      if (!FEATS[i]?.length) continue;
      const isPartial = PARTIAL && i === N - 1;
      const g = el("g", { class: "bar-hit", tabindex: 0, role: "img", "aria-label": `${monthFull(D.months[i])}: ${FEATS[i].length} ${L.unitFeatures}, ${fmt(featTotal(FEATS[i]))} ${L.unitLines}` }, f.svg);
      if (isPartial) g.setAttribute("opacity", "0.45");
      el("rect", { x: f.x(i) - band / 2, y: f.y(f.top), width: band, height: f.y(0) - f.y(f.top), fill: "transparent" }, g);
      let yCur = f.y(0);
      const segs = FEATS[i].slice().sort((a, c) => c[1] - a[1]);
      segs.forEach((s, si) => {
        const h = Math.max(2, f.y(0) - f.y(s[1]) - (si ? GAP : 0));
        yCur -= h;
        el("rect", { class: "mark", x: f.x(i) - bw / 2, y: yCur, width: bw, height: h, fill: "var(--accent)", opacity: si % 2 ? 0.55 : 1, rx: 2 }, g);
        yCur -= GAP;
      });
      el("text", { x: f.x(i), y: yCur - 5, "text-anchor": "middle", class: "dl" }, g).textContent = String(FEATS[i].length);
      const show = (e: { clientX?: number; clientY?: number }) => {
        const cr = card.getBoundingClientRect();
        const mx = e.clientX != null ? e.clientX - cr.left : (f.x(i) / f.W) * card.clientWidth;
        const my = e.clientY != null ? e.clientY - cr.top : 40;
        const rows = segs.map((s, si) => ({ c: si % 2 ? "color-mix(in srgb, var(--accent) 55%, transparent)" : css("--accent"), v: fmt(s[1]), n: s[0] }));
        tip.show(mx, my, `${monthFull(D.months[i])}${isPartial ? ` (${L.partial})` : ""} · ${segs.length} ${segs.length === 1 ? L.unitFeature : L.unitFeatures}`, rows);
        g.style.opacity = isPartial ? "0.35" : "0.85";
      };
      const hide = () => { tip.hide(); g.style.opacity = isPartial ? "0.45" : "1"; };
      attachBarEvents(g, show, hide);
    }
  }

  function drawAll() {
    for (const t of tips.splice(0)) t.destroy();
    drawArea("growth", D.cum, 300, (v) => fmt(v / 1000) + "k", `${fmt(D.cum[N - 1])} ${L.unitLines}`, L.unitLines);
    drawBars("velocity", D.add, {
      tickFmt: (v) => fmt(v / 1000) + "k", rollLine: true, labelMax: true, unit: L.unitLines,
      extraRow: (i) => ({ c: css("--ink2"), v: fmt(r3[i]), n: L.legendAvg }),
    });
    drawBars("commits", D.com, { tickFmt: (v) => fmt(v), unit: L.unitBuilds });
    drawFeatures();
    drawArea("files", D.files, 208, (v) => fmt(v), `${D.files[N - 1]} ${L.unitFiles}`, L.unitFiles);
  }

  drawAll();
  let rt: ReturnType<typeof setTimeout> | undefined;
  const onResize = () => { clearTimeout(rt); rt = setTimeout(drawAll, 150); };
  window.addEventListener("resize", onResize);
  const mo = new MutationObserver(drawAll);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  mq?.addEventListener("change", drawAll);

  return () => {
    clearTimeout(rt);
    window.removeEventListener("resize", onResize);
    mo.disconnect();
    mq?.removeEventListener("change", drawAll);
    for (const t of tips.splice(0)) t.destroy();
    root.querySelectorAll("[data-chart]").forEach((c) => { c.innerHTML = ""; });
  };
}

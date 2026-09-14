import { STATS } from "./stats/growdiaries";

/** Last substantive content changes (ISO dates) — drive sitemap lastmod and structured-data dateModified. */
export const CONTENT_UPDATED = {
  resume: "2026-09-14",
  projects: "2026-09-14",
  stats: STATS.last,
} as const;

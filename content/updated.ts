import { STATS } from "./stats/growdiaries";

/** Last substantive content changes (ISO dates) — drive sitemap lastmod and structured-data dateModified. */
export const CONTENT_UPDATED = {
  resume: "2026-09-16",
  projects: "2026-09-16",
  stats: STATS.last,
} as const;

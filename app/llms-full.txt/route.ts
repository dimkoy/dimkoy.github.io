import { projects } from "@/content/projects";
import { resumeEn } from "@/content/resume.en";
import { FEATS, STATS, YOY_WINDOWS } from "@/content/stats/growdiaries";
import { getAllPosts } from "@/lib/blog";
import { formatPeriod } from "@/lib/format";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { mdxToMarkdown, statTilesMarkdown } from "@/lib/markdown";
import { SITE_URL, site } from "@/lib/site";
import { bestMonth, featureCount } from "@/lib/stats/compute";

export const dynamic = "force-static";

const u = (path: string) => `${SITE_URL}${localePath("en", path)}`;
const period = (start: string, end?: string) => formatPeriod(start, end, "present");

/** Everything on the site as one plain-text document (English). */
export async function GET() {
  const dict = getDictionary("en");
  const r = resumeEn;
  const posts = await getAllPosts("en");
  const out: string[] = [];
  const push = (...l: string[]) => out.push(...l);

  push(`# ${site.name} — ${r.headline}`, "", `Source: ${u("/")} · Updated: ${new Date().toISOString().slice(0, 10)}`, "", ...r.summary, "", "## Key facts", "", ...r.facts.map((f) => `- ${f.value} — ${f.label}`), "");

  push("## Experience", "");
  for (const e of r.experience) {
    const roles = e.roles.map((x) => `${x.title} (${period(x.start, x.end)})`).join("; ");
    push(`### ${e.company} — ${roles}`, "", `Location: ${e.location}${e.type ? ` · ${e.type}` : ""}${e.url ? ` · ${e.url}` : ""}${e.projectSlug ? ` · Project page: ${u(`/projects/${e.projectSlug}`)}` : ""}`);
    if (e.summary) push("", e.summary);
    push("", ...e.highlights.map((h) => `- ${h}`));
    if (e.tech) push("", `Tech: ${e.tech.join(", ")}`);
    push("");
  }

  push("## Skills", "", ...r.skills.map((g) => `- ${g.group}: ${g.items.join(", ")}`), "");
  push("## Education", "", ...r.education.map((e) => `- ${e.year} — ${e.degree}, ${e.field} — ${e.school}, ${e.place}`), "");
  push("## Languages", "", ...r.languages.map((l) => `- ${l.name}: ${l.level}`), "");

  push("## Projects", "");
  for (const p of projects) {
    const i = p.i18n.en;
    push(`### ${i.title}`, "", `${dict.projects.kinds[p.kind]} · ${i.role} · ${period(p.period.start, p.period.end)} · ${u(`/projects/${p.slug}`)}`, "", i.tagline, "", ...i.description, "");
    if (p.metrics) push(...p.metrics.map((m) => `- ${m.value} ${m.label.en}`), "");
    if (p.awards) push(...p.awards.map((a) => `- Award: ${a}`), "");
    push("Highlights:", "", ...i.highlights.map((h) => `- ${h}`), "");
    const links = p.links.filter((l) => l.url).map((l) => `- ${l.label?.en ?? l.kind}: ${l.url!.startsWith("/") ? u(l.url!) : l.url}`);
    if (links.length) push("Links:", "", ...links, "");
    push(`Tech: ${p.tech.join(", ")}`, "");
  }

  const y = statTilesMarkdown("en");
  const best = bestMonth();
  push("## Development statistics — GrowDiaries iOS app", "", `${u("/stats")} · ${dict.stats.description}`, "",
    `Period: ${STATS.first} — ${STATS.last} · ${STATS.totals.commits} commits to main · ${STATS.loc.toLocaleString("en-US")} lines of Swift today · ${STATS.nfiles} Swift files · ${featureCount()} features shipped`, "",
    `Year-over-year comparison (${YOY_WINDOWS.base.from} … ${YOY_WINDOWS.base.to} vs ${YOY_WINDOWS.last.from} … ${YOY_WINDOWS.last.to}):`, "", y, "",
    `Record month: ${best.month} — ${best.lines.toLocaleString("en-US")} lines added.`, "",
    "| Month | Lines added | Lines deleted | Builds | Features |", "|---|---:|---:|---:|---:|",
    ...STATS.months.map((m, i) => `| ${m}${STATS.partialLast && i === STATS.months.length - 1 ? " (partial)" : ""} | ${STATS.add[i]} | ${STATS.del[i]} | ${STATS.com[i]} | ${FEATS[i].length} |`), "",
    dict.stats.footMethod, "", dict.stats.footBuilds, "", dict.stats.footFeatures, "", dict.stats.footProxy, "");

  push("## Blog", "");
  for (const p of posts) {
    push(`### ${p.title}`, "", `Published: ${p.date}${p.updated ? ` · Updated: ${p.updated}` : ""} · Author: ${site.name} · ${u(`/blog/${p.slug}`)}`, "", p.description, "", mdxToMarkdown(p.body, "en").trim(), "");
  }

  push("## Contacts", "", `- Email: ${site.email}`, `- LinkedIn: ${site.linkedin}`, `- GitHub: ${site.github}`, `- CV (PDF): ${SITE_URL}${site.cvPath}`, `- Location: ${r.location}`, "");
  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

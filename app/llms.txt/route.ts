import { projects } from "@/content/projects";
import { resumeEn } from "@/content/resume.en";
import { getAllPosts } from "@/lib/blog";
import { formatPeriod } from "@/lib/format";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL, site } from "@/lib/site";

export const dynamic = "force-static";

const u = (path: string) => `${SITE_URL}${localePath("en", path)}`;

/** https://llmstxt.org — a short, link-rich index of the site for LLM agents. */
export async function GET() {
  const dict = getDictionary("en");
  const posts = await getAllPosts("en");
  const r = resumeEn;
  const employers = r.experience
    .filter((e) => !e.type)
    .map((e) => `${e.company} (${formatPeriod(e.roles[e.roles.length - 1].start, e.roles[0].end, "present")}, ${e.roles.map((x) => x.title).reverse().join(" → ")})`)
    .join("; ");
  const lines = [
    `# ${site.name}`,
    "",
    `> ${r.seoDescription}`,
    "",
    `${site.name} (Russian: Дмитрий Червяков) is a ${r.title} based in ${site.location.city}, ${site.location.country}. This site is his resume, project portfolio, blog and development statistics. Content is available in English (canonical), Russian and Spanish.`,
    "",
    "## Key facts",
    "",
    ...r.facts.map((f) => `- ${f.value} — ${f.label}`),
    "",
    "## Resume",
    "",
    `- [Resume](${u("/")}): ${r.summary[0]} Experience: ${employers}.`,
    `- [CV (PDF)](${SITE_URL}${site.cvPath}): one-page CV`,
    "",
    "## Projects",
    "",
    `- [All projects](${u("/projects")}): ${dict.projects.description}`,
    ...projects.map((p) => `- [${p.i18n.en.title}](${u(`/projects/${p.slug}`)}): ${p.i18n.en.tagline}`),
    "",
    "## Blog",
    "",
    `- [Blog](${u("/blog")}): ${dict.blog.description}`,
    ...posts.map((p) => `- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.description}`),
    `- [RSS feed](${u("/")}feed.xml): full-text feed`,
    "",
    "## Development statistics",
    "",
    `- [Development stats](${u("/stats")}): ${dict.stats.description}`,
    "",
    "## Contacts",
    "",
    `- Email: ${site.email}`,
    `- LinkedIn: ${site.linkedin}`,
    `- GitHub: ${site.github}`,
    "",
    "## Other languages",
    "",
    `- Russian: ${SITE_URL}/ru/`,
    `- Spanish: ${SITE_URL}/es/`,
    "",
    "## Optional",
    "",
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): the complete resume, project descriptions, articles and statistics in one plain-text file`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

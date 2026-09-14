import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { formatNumber } from "./format";
import type { Locale } from "./i18n/config";
import { getDictionary } from "./i18n/dictionaries";
import { SITE_URL } from "./site";
import { yoy } from "./stats/compute";

/** The three year-over-year metrics as a markdown list — used wherever <StatTiles /> cannot be rendered. */
export function statTilesMarkdown(locale: Locale): string {
  const y = yoy();
  const L = getDictionary(locale).stats;
  const was = getDictionary(locale).home.was;
  return [
    `- **${L.codeOutput}**: ${formatNumber(y.codeOutput.now, locale)} ${L.codeOutputSub} (${y.codeOutput.delta}; ${was} ${formatNumber(y.codeOutput.was, locale)})`,
    `- **${L.deliveryCadence}**: ${y.deliveryCadence.now.toFixed(1)} ${L.deliveryCadenceSub} (${y.deliveryCadence.delta}; ${was} ${y.deliveryCadence.was.toFixed(1)})`,
    `- **${L.featureThroughput}**: ${y.featureThroughput.now.toFixed(1)} ${L.featureThroughputSub} (${y.featureThroughput.delta}; ${was} ${y.featureThroughput.was.toFixed(1)})`,
  ].join("\n");
}

/** Turns an MDX body into plain markdown: JSX components replaced with text, site-relative links made absolute. */
export function mdxToMarkdown(body: string, locale: Locale): string {
  return body
    .replace(/<StatTiles[^>]*\/>/g, () => statTilesMarkdown(locale))
    .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, "")
    .replace(/\]\((\/[^)\s]*)\)/g, (_, p: string) => `](${SITE_URL}${p})`);
}

export async function markdownToHtml(md: string): Promise<string> {
  const file = await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(md);
  return String(file);
}

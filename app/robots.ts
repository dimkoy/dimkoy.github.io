import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Everything is public. AI crawlers are listed explicitly so that the intent is unambiguous:
 * search engines, answer engines and model training are all welcome to read the site.
 */
const AI_AND_SEARCH_BOTS = [
  "Googlebot", "Google-Extended", "Bingbot", "Applebot", "Applebot-Extended", "DuckDuckBot", "DuckAssistBot", "YandexBot",
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "PerplexityBot", "Perplexity-User", "CCBot", "Amazonbot", "meta-externalagent", "cohere-ai", "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

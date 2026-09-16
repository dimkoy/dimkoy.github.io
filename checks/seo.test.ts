/**
 * SEO invariants of the static export. Run after `next build` (reads ./out): `npm run check:seo`.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
const OUT = path.join(process.cwd(), "out");
const SITE = "https://dmitriicherviakov.com";
const LOCALES = ["en", "ru", "es"];

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "_next" ? [] : walk(p);
    return e.name === "index.html" ? [p] : [];
  });
}

const pages = walk(OUT).filter((p) => p !== path.join(OUT, "index.html") && !p.startsWith(path.join(OUT, "404")) && !p.startsWith(path.join(OUT, "_not-found")));
const html = (p: string) => fs.readFileSync(p, "utf8");
const urlOf = (p: string) => SITE + "/" + path.relative(OUT, path.dirname(p)).split(path.sep).join("/") + "/";
const attr = (s: string, re: RegExp) => Array.from(s.matchAll(re)).map((m) => m[1]);
const jsonLd = (s: string) => attr(s, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g).map((j) => JSON.parse(j));
const nodes = (s: string) => jsonLd(s).flatMap((d) => (Array.isArray(d["@graph"]) ? d["@graph"] : [d]));
const byType = (s: string, type: string) => nodes(s).filter((n) => n["@type"] === type);

test("export exists and contains all locales", () => {
  assert.ok(pages.length >= 30, `expected ≥30 pages, got ${pages.length}`);
  for (const l of LOCALES) assert.ok(fs.existsSync(path.join(OUT, l, "index.html")), `missing /${l}/`);
});

test("every localized page: one h1, self canonical, hreflang set, title, description, robots index", () => {
  for (const p of pages) {
    const s = html(p);
    const url = urlOf(p);
    assert.equal((s.match(/<h1[\s>]/g) ?? []).length, 1, `${url}: expected exactly one <h1>`);
    assert.equal(attr(s, /<link rel="canonical" href="([^"]+)"/g)[0], url, `${url}: canonical`);
    const hreflang = attr(s, /hrefLang="([^"]+)"/gi);
    for (const l of [...LOCALES, "x-default"]) assert.ok(hreflang.includes(l), `${url}: hreflang ${l}`);
    assert.match(s, /<title>[^<]+<\/title>/, `${url}: title`);
    assert.match(s, /<meta name="description" content="[^"]{20,}"/, `${url}: description`);
    assert.match(s, /<meta name="robots" content="index, follow[^"]*"/, `${url}: robots`);
    assert.match(s, /<meta property="og:description" content="[^"]+"/, `${url}: og:description`);
    assert.match(s, /<meta name="twitter:card" content="summary_large_image"/, `${url}: twitter card`);
    assert.match(s, /<link rel="alternate" type="application\/rss\+xml"/, `${url}: rss link`);
    for (const j of jsonLd(s)) assert.ok(j["@context"] === "https://schema.org", `${url}: json-ld context`);
  }
});

test("titles are localized (home title differs between locales)", () => {
  const titles = LOCALES.map((l) => attr(html(path.join(OUT, l, "index.html")), /<title>([^<]+)<\/title>/g)[0]);
  assert.equal(new Set(titles).size, LOCALES.length, `home titles: ${titles.join(" | ")}`);
});

test("home page: ProfilePage with full Person, WebSite, portrait, key facts", () => {
  for (const l of LOCALES) {
    const s = html(path.join(OUT, l, "index.html"));
    const [profile] = byType(s, "ProfilePage");
    assert.ok(profile, `${l}: ProfilePage`);
    assert.match(profile.dateModified, ISO_DATETIME, `${l}: ProfilePage.dateModified`);
    const person = profile.mainEntity as Record<string, unknown>;
    assert.equal(person["@type"], "Person");
    for (const k of ["description", "image", "sameAs", "worksFor", "alumniOf", "knowsAbout", "hasOccupation", "jobTitle", "knowsLanguage"]) assert.ok(person[k], `${l}: Person.${k}`);
    assert.ok((person.knowsAbout as string[]).length >= 20, `${l}: knowsAbout`);
    assert.ok(byType(s, "WebSite").length === 1, `${l}: WebSite`);
    assert.match(s, /<img[^>]+photo\/dmitrii-cherviakov-400\.jpg/, `${l}: portrait`);
    assert.match(s, /<address/, `${l}: address`);
    assert.ok((s.match(/<time dateTime=/g) ?? []).length >= 10, `${l}: <time> on experience`);
  }
});

test("blog post: BlogPosting with author/publisher/mainEntityOfPage, byline, breadcrumb", () => {
  const posts = pages.filter((p) => /\/blog\/[^/]+\/index\.html$/.test(p));
  assert.ok(posts.length >= 3);
  for (const p of posts) {
    const s = html(p);
    const [post] = byType(s, "BlogPosting");
    assert.ok(post, `${urlOf(p)}: BlogPosting`);
    for (const k of ["author", "publisher", "mainEntityOfPage", "datePublished", "dateModified", "wordCount", "timeRequired", "image", "inLanguage"]) assert.ok(post[k], `${urlOf(p)}: ${k}`);
    for (const k of ["datePublished", "dateModified"]) assert.match(post[k], ISO_DATETIME, `${urlOf(p)}: ${k} must be a full ISO 8601 date-time`);
    assert.equal((post.author as Record<string, unknown>)["@id"], `${SITE}/#person`);
    assert.ok(byType(s, "BreadcrumbList").length === 1, `${urlOf(p)}: breadcrumb`);
    assert.match(s, /rel="author"/, `${urlOf(p)}: byline`);
    assert.match(s, /<meta property="article:published_time"/);
  }
});

test("index pages: h2 cards, CollectionPage; stats: Dataset and tables with captions", () => {
  for (const l of LOCALES) {
    const blog = html(path.join(OUT, l, "blog", "index.html"));
    assert.ok(byType(blog, "Blog").length === 1, `${l}: Blog`);
    assert.doesNotMatch(blog, /<h3/, `${l}: blog index should not skip to h3`);
    const projects = html(path.join(OUT, l, "projects", "index.html"));
    const [collection] = byType(projects, "CollectionPage");
    assert.equal((collection?.mainEntity as Record<string, unknown> | undefined)?.["@type"], "ItemList", `${l}: ItemList`);
    assert.doesNotMatch(projects, /<h3/, `${l}: projects index should not skip to h3`);
    const stats = html(path.join(OUT, l, "stats", "index.html"));
    assert.ok(byType(stats, "Dataset").length === 1, `${l}: Dataset`);
    assert.match(byType(stats, "Dataset")[0].dateModified, ISO_DATETIME, `${l}: Dataset.dateModified`);
    assert.ok((stats.match(/<caption/g) ?? []).length === 5, `${l}: table captions`);
    assert.match(stats, /\+81%/, `${l}: numbers in HTML`);
  }
});

test("project pages: typed entity with breadcrumb; talk has location and video", () => {
  const talk = html(path.join(OUT, "en", "projects", "grindconf-2019", "index.html"));
  const [event] = byType(talk, "Event");
  for (const k of ["location", "endDate", "eventAttendanceMode", "eventStatus", "organizer", "performer", "recordedIn"]) assert.ok(event[k], `Event.${k}`);
  const app = html(path.join(OUT, "en", "projects", "growdiaries", "index.html"));
  const [sw] = byType(app, "SoftwareApplication");
  for (const k of ["installUrl", "offers", "author", "datePublished"]) assert.ok(sw[k], `SoftwareApplication.${k}`);
  const alfa = byType(html(path.join(OUT, "en", "projects", "alfa-bank", "index.html")), "SoftwareApplication")[0];
  assert.ok(alfa.award, "alfa-bank award");
  assert.ok(alfa.contributor && !alfa.author, "alfa-bank is a contribution, not an authored app");
  const nw = html(path.join(OUT, "en", "projects", "nuclear-wars", "index.html"));
  const [game] = byType(nw, "SoftwareApplication");
  assert.equal(game.operatingSystem, "visionOS");
  assert.equal(game.applicationCategory, "GameApplication");
  assert.equal(game.datePublished, "2026-09-08");
  assert.equal(game.offers.price, "9.99");
  assert.ok(game.author && Array.isArray(game.screenshot) && game.screenshot.length >= 5, "nuclear-wars author + screenshots");
  assert.equal(game.video?.["@type"], "VideoObject");
  assert.match(nw, /youtube-nocookie\.com\/embed\/I-g6ItBY7aM/, "trailer embed");
  assert.match(nw, /<img[^>]+src="\/media\/nuclear-wars\/03-full-exchange\.jpg"[^>]+alt="[^"]{20,}"/, "gallery image with alt");
});

test("robots.txt, sitemap.xml, llms.txt, feeds, manifest, favicon", () => {
  const robots = fs.readFileSync(path.join(OUT, "robots.txt"), "utf8");
  for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Bingbot", "Google-Extended"]) assert.match(robots, new RegExp(`User-Agent: ${bot}\\nAllow: /`), bot);
  assert.match(robots, /Sitemap: https:\/\/dmitriicherviakov\.com\/sitemap\.xml/);
  const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
  const urls = sitemap.match(/<url>/g) ?? [];
  assert.equal(urls.length, (sitemap.match(/<lastmod>/g) ?? []).length, "lastmod on every url");
  assert.equal(urls.length, (sitemap.match(/hreflang="x-default"/g) ?? []).length, "x-default on every url");
  const llms = fs.readFileSync(path.join(OUT, "llms.txt"), "utf8");
  assert.ok(llms.startsWith("# Dmitrii Cherviakov\n"), "llms.txt heading");
  assert.match(llms, /llms-full\.txt/);
  const full = fs.readFileSync(path.join(OUT, "llms-full.txt"), "utf8");
  assert.ok(full.length > 20000, `llms-full.txt size ${full.length}`);
  assert.doesNotMatch(full, /<StatTiles/, "JSX leaked into llms-full");
  for (const l of LOCALES) {
    const feed = fs.readFileSync(path.join(OUT, l, "feed.xml"), "utf8");
    assert.match(feed, /<content:encoded>/, `${l}: full-text feed`);
    assert.doesNotMatch(feed, /<StatTiles/, `${l}: JSX leaked into feed`);
  }
  assert.ok(fs.existsSync(path.join(OUT, "manifest.webmanifest")), "manifest");
  assert.ok(fs.existsSync(path.join(OUT, "favicon.ico")), "favicon.ico");
  assert.ok(fs.readdirSync(OUT).some((f) => /^[0-9a-f]{32}\.txt$/.test(f)), "IndexNow key file");
});

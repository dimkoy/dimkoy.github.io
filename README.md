# dimkoy.github.io

Personal site of Dmitrii Cherviakov — Senior iOS Developer. Resume, projects, blog and development stats, in English and Russian.

Live: https://dimkoy.github.io

## Stack

Next.js 16 (App Router, static export) · React 19 · Tailwind CSS 4 · MDX via `next-mdx-remote` · deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000/en/
npm run build      # static export → out/
npm start          # serve out/ locally
npm run lint && npm test
```

## Where things live

| What | Where |
|---|---|
| Resume text (EN / RU) | `content/resume.en.ts`, `content/resume.ru.ts` |
| Projects (links, media, metrics, texts) | `content/projects.ts` |
| Blog posts | `content/blog/<slug>/en.mdx` + `ru.mdx` (both required) |
| Stats data and charts | `content/stats/growdiaries.ts`, `lib/stats/*`, `components/stats/*` |
| UI strings | `messages/en.json`, `messages/ru.json` |
| Site constants (URL, socials) | `lib/site.ts` |
| Media (screenshots, videos) | `public/media/<project>/` |
| CV download | `public/CV-Cherviakov.pdf` |

## Writing a post

1. Create `content/blog/<slug>/en.mdx` and `content/blog/<slug>/ru.mdx`.
2. Frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `tags`, `lang` (must match the file name), optional `updated`, `cover`, `draft`.
3. `draft: true` builds the page (noindex) but hides it from lists, RSS and the sitemap. Remove it to publish.
4. Inside MDX you can use `<StatTiles locale="en" />` for the year-over-year tiles.

## Adding media to a project

Put optimized files into `public/media/<slug>/` (WebP ≤ 300 KB, MP4 ≤ 5 MB) and list them in the project's `media` array in `content/projects.ts`:

```ts
media: [
  { type: "image", src: "/media/growdiaries/diary.webp", width: 1170, height: 2532, alt: { en: "Diary screen", ru: "Экран дневника" } },
  { type: "video", src: "/media/growdiaries/demo.mp4", poster: "/media/growdiaries/demo.jpg", width: 1170, height: 2532, alt: { en: "Demo", ru: "Демо" } },
  { type: "youtube", id: "VIDEO_ID", alt: { en: "Demo", ru: "Демо" } },
]
```

## Regenerating the OG image and icons

```bash
npx tsx scripts/og.tsx
```

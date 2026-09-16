import type { Locale } from "@/lib/i18n/config";

export type Localized<T = string> = Record<Locale, T>;

export type LinkKind = "appstore" | "github" | "talk" | "web" | "stats";
export type ProjectLink = {
  kind: LinkKind;
  url?: string;
  /** Shown instead of the default label for this kind */
  label?: Localized;
  /** No URL yet — rendered as a disabled badge (e.g. "In App Store review") */
  pending?: boolean;
};

export type Media =
  | { type: "image"; src: string; alt: Localized; width: number; height: number }
  | { type: "video"; src: string; poster?: string; alt: Localized; width: number; height: number }
  | { type: "youtube"; id: string; alt: Localized; /** ISO date the video was published (VideoObject.uploadDate) */ uploadDate?: string; /** BCP-47 language of the video (VideoObject.inLanguage), defaults to "ru" */ language?: string };

export type Metric = { value: string; label: Localized; sub?: Localized };

export type ProjectKind = "product" | "opensource" | "talk";

export type Project = {
  slug: string;
  kind: ProjectKind;
  featured: boolean;
  period: { start: string; end?: string };
  /** ISO date of the last substantive edit of this project's content (sitemap lastmod) */
  updated?: string;
  tech: string[];
  links: ProjectLink[];
  media: Media[];
  metrics?: Metric[];
  /** Awards or ratings the product received (used in structured data), English */
  awards?: string[];
  /** Operating system of a product (SoftwareApplication.operatingSystem), defaults to "iOS" */
  platform?: string;
  /** schema.org application category, defaults to "MobileApplication" */
  applicationCategory?: string;
  /** Store price in USD as a string, defaults to "0" */
  price?: string;
  /** Exact ISO release date; defaults to the first day of period.start */
  released?: string;
  /** Whether the person built the product ("author", default) or worked on someone else's ("contributor") */
  ownership?: "author" | "contributor";
  i18n: Localized<{
    title: string;
    role: string;
    tagline: string;
    description: string[];
    highlights: string[];
  }>;
};

export type Experience = {
  company: string;
  roles: { title: string; start: string; end?: string }[];
  location: string;
  /** Employment type shown next to the location, e.g. "Part-time" */
  type?: string;
  projectSlug?: string;
  /** External link for the company/product */
  url?: string;
  /** One-line context about the product or project */
  summary?: string;
  highlights: string[];
  tech?: string[];
};

export type Fact = { value: string; label: string };

export type Resume = {
  name: string;
  title: string;
  /** Tail of the home <title>, e.g. "Senior iOS Developer · Swift, SwiftUI · Barcelona" */
  headline: string;
  /** Meta description of the home page (fact-dense, ~160–200 chars) */
  seoDescription: string;
  location: string;
  /** Alt text of the portrait */
  photoAlt: string;
  summary: string[];
  /** Key facts shown under the hero and repeated in structured data / llms.txt */
  facts: Fact[];
  experience: Experience[];
  skills: { group: string; items: string[] }[];
  education: { school: string; degree: string; field: string; year: string; place: string }[];
  languages: { name: string; level: string }[];
};

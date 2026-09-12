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
  | { type: "youtube"; id: string; alt: Localized };

export type Metric = { value: string; label: Localized; sub?: Localized };

export type ProjectKind = "product" | "opensource" | "talk";

export type Project = {
  slug: string;
  kind: ProjectKind;
  featured: boolean;
  period: { start: string; end?: string };
  tech: string[];
  links: ProjectLink[];
  media: Media[];
  metrics?: Metric[];
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
  projectSlug?: string;
  highlights: string[];
  tech?: string[];
};

export type Resume = {
  name: string;
  title: string;
  location: string;
  summary: string[];
  experience: Experience[];
  skills: { group: string; items: string[] }[];
  education: { school: string; degree: string; field: string; year: string; place: string }[];
  languages: { name: string; level: string }[];
};

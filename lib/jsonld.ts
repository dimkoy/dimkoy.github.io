import { resumeEn } from "@/content/resume.en";
import { getResume } from "@/content/resume";
import { CONTENT_UPDATED } from "@/content/updated";
import { localePath, locales, type Locale } from "./i18n/config";
import { SITE_URL, site } from "./site";

export type Node = Record<string, unknown>;

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const LANGUAGE_NAMES: Record<Locale, string> = { en: "English", ru: "Russian", es: "Spanish" };

/** Topics beyond the raw skill list — what the person should be associated with by search and answer engines. */
const TOPICS = [
  "iOS development", "Swift", "SwiftUI", "UIKit", "The Composable Architecture (TCA)", "Mobile app architecture",
  "Fintech and trading apps", "Social network apps", "App stability and crash-free rate", "Deep linking and navigation",
  "Unit testing and test automation", "CI/CD for iOS", "AI-assisted software development", "Agentic coding workflows",
];

/** One @context, many nodes. */
export function graph(...nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function absUrl(locale: Locale, path = "/"): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

const photo = {
  "@type": "ImageObject",
  "@id": `${SITE_URL}/#photo`,
  url: `${SITE_URL}${site.photo.path}`,
  contentUrl: `${SITE_URL}${site.photo.path}`,
  width: site.photo.width,
  height: site.photo.height,
};

/** Compact Person for author/creator/publisher fields on inner pages. */
export function personRef(locale: Locale): Node {
  const r = getResume(locale);
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: absUrl(locale),
    jobTitle: r.title,
    image: { ...photo, caption: r.photoAlt },
    sameAs: [site.github, site.linkedin],
  };
}

/** Full Person entity (home page). */
export function personJsonLd(locale: Locale): Node {
  const r = getResume(locale);
  const skills = resumeEn.skills.flatMap((g) => g.items.flatMap((i) => i.split(" / ")));
  const facts = r.facts.map((f) => `${f.value} — ${f.label}`).join("; ");
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    givenName: site.givenName,
    familyName: site.familyName,
    alternateName: ["Дмитрий Червяков", "Dima Cherviakov"],
    description: `${r.summary.join(" ")} ${facts}.`,
    jobTitle: r.title,
    url: absUrl(locale),
    image: { ...photo, caption: r.photoAlt },
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: site.location.city, addressCountry: site.location.countryCode },
    homeLocation: { "@type": "City", name: site.location.city },
    sameAs: [site.github, site.linkedin],
    knowsAbout: Array.from(new Set([...TOPICS, ...skills])),
    knowsLanguage: r.languages.map((l, i) => ({ "@type": "Language", name: LANGUAGE_NAMES[(["en", "ru", "es"] as Locale[])[i]] ?? l.name, alternateName: (["en", "ru", "es"] as Locale[])[i] })),
    worksFor: { "@type": "Organization", name: "GrowDiaries", url: absUrl(locale, "/projects/growdiaries") },
    alumniOf: r.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school, address: { "@type": "PostalAddress", addressLocality: e.place } })),
    hasCredential: r.education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: e.degree,
      name: `${e.degree} — ${e.field}`,
      recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
    })),
    hasOccupation: {
      "@type": "Occupation",
      name: r.title,
      occupationLocation: { "@type": "City", name: site.location.city },
      skills: skills.join(", "),
      description: r.summary[0],
    },
    subjectOf: { "@type": "DigitalDocument", name: `CV — ${site.name} (PDF)`, url: `${SITE_URL}${site.cvPath}`, encodingFormat: "application/pdf" },
  };
}

export function websiteJsonLd(locale: Locale): Node {
  const r = getResume(locale);
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: site.name,
    description: r.seoDescription,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: [...locales],
  };
}

/** Google's ProfilePage: the home page is about one person; mainEntity carries the full Person. */
export function profilePageJsonLd(locale: Locale): Node {
  const r = getResume(locale);
  return {
    "@type": "ProfilePage",
    "@id": `${absUrl(locale)}#profile`,
    url: absUrl(locale),
    name: `${r.name} — ${r.headline}`,
    description: r.seoDescription,
    inLanguage: locale,
    dateModified: CONTENT_UPDATED.resume,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: personJsonLd(locale),
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(locale, it.path) })),
  };
}

import { SITE_URL, site } from "./site";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: site.name,
  alternateName: "Дмитрий Червяков",
  jobTitle: site.jobTitle,
  url: `${SITE_URL}/en/`,
  email: `mailto:${site.email}`,
  image: `${SITE_URL}${site.ogImage}`,
  address: { "@type": "PostalAddress", addressLocality: site.location.city, addressCountry: "ES" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["Swift", "SwiftUI", "The Composable Architecture", "iOS architecture", "AI-driven development workflows"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: `${SITE_URL}/`,
  name: site.name,
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: ["en", "ru"],
};

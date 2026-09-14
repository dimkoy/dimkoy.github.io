import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { DevStats } from "@/components/stats/DevStats";
import { STATS } from "@/content/stats/growdiaries";
import { CONTENT_UPDATED } from "@/content/updated";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absUrl, breadcrumbJsonLd, graph, personRef, WEBSITE_ID } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale).stats;
  return buildMetadata({ locale, path: "/stats", title: d.title, description: d.description });
}

export default async function StatsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const L = dict.stats;
  const url = absUrl(locale, "/stats");
  const jsonLd = graph(
    breadcrumbJsonLd(locale, [{ name: dict.nav.resume, path: "/" }, { name: L.title, path: "/stats" }]),
    {
      "@type": "Dataset",
      "@id": `${url}#dataset`,
      url,
      name: `${L.title} — GrowDiaries iOS`,
      description: `${L.description} ${L.footMethod}`,
      inLanguage: locale,
      isPartOf: { "@id": WEBSITE_ID },
      creator: personRef(locale),
      about: { "@type": "SoftwareApplication", name: "GrowDiaries", url: absUrl(locale, "/projects/growdiaries") },
      temporalCoverage: `${STATS.first}/${STATS.last}`,
      dateModified: CONTENT_UPDATED.stats,
      isAccessibleForFree: true,
      license: "https://creativecommons.org/licenses/by/4.0/",
      keywords: ["iOS", "Swift", "SwiftUI", "TCA", "developer productivity", "AI-assisted development", "git statistics"],
      measurementTechnique: L.footMethod,
      variableMeasured: [
        { "@type": "PropertyValue", name: L.codeOutput, description: L.codeOutputSub },
        { "@type": "PropertyValue", name: L.deliveryCadence, description: L.deliveryCadenceSub },
        { "@type": "PropertyValue", name: L.featureThroughput, description: L.featureThroughputSub },
      ],
    },
  );
  return (
    <main className="py-10">
      <JsonLd data={jsonLd} />
      <DevStats locale={locale} dict={dict} />
    </main>
  );
}

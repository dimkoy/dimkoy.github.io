import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevStats } from "@/components/stats/DevStats";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
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
  return (
    <main className="py-10">
      <DevStats locale={locale} dict={getDictionary(locale)} />
    </main>
  );
}

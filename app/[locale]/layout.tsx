import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { isLocale, locales, ogLocales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "en";
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${site.name} — ${site.jobTitle}`, template: `%s · ${site.name}` },
    description: getDictionary(l).blog.description,
    openGraph: { siteName: site.name, locale: ogLocales[l], type: "website", images: [site.ogImage] },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header locale={locale} dict={dict} />
        <div className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">{children}</div>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}

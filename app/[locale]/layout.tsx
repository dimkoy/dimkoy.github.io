import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { getResume } from "@/content/resume";
import { isLocale, locales, ogLocales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { homeTitle } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "en";
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: homeTitle(l), template: `%s · ${site.name}` },
    description: getResume(l).seoDescription,
    applicationName: site.name,
    authors: [{ name: site.name, url: `${SITE_URL}/${l}/` }],
    creator: site.name,
    publisher: site.name,
    openGraph: { siteName: site.name, locale: ogLocales[l], type: "website", images: [site.ogImage] },
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
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

import Link from "next/link";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { getDictionary } from "@/lib/i18n/dictionaries";

const en = getDictionary("en").notFound;
const ru = getDictionary("ru").notFound;
const es = getDictionary("es").notFound;

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>404 · Dmitrii Cherviakov</title>
        <meta name="robots" content="noindex" />
        <ThemeScript />
      </head>
      <body className="min-h-screen flex items-center justify-center px-4">
        <main className="max-w-md text-center">
          <p className="text-7xl font-semibold tracking-tight tnum">404</p>
          <h1 className="mt-4 text-xl font-semibold">{en.title}</h1>
          <p className="mt-1 text-ink2">{en.text}</p>
          <p className="mt-6 text-sm text-muted">{ru.title}. {ru.text}</p>
          <p className="mt-1 text-sm text-muted">{es.title}. {es.text}</p>
          <div className="mt-8 flex justify-center gap-4 text-accent">
            <Link href="/en/" className="hover:underline">{en.home}</Link>
            <Link href="/ru/" className="hover:underline">{ru.home}</Link>
            <Link href="/es/" className="hover:underline">{es.home}</Link>
          </div>
        </main>
      </body>
    </html>
  );
}

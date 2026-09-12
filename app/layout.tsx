import "./globals.css";

/**
 * Passive root layout. The real <html>/<body> live in app/[locale]/layout.tsx,
 * while app/page.tsx (locale redirect) and app/not-found.tsx render their own document.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

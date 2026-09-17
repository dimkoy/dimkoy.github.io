import type { Metadata } from "next";
import { SITE_URL, site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.name,
  // No noindex here: this URL is a redirect, and Google treats an instant meta refresh as a permanent
  // redirect to the canonical English home. noindex on top of that only made Search Console flag "/".
  alternates: { canonical: `${SITE_URL}/en/` },
};

const redirectScript = `(function(){try{var s=localStorage.getItem("locale");var l=s||navigator.language||"";location.replace(/^es/i.test(l)?"/es/":/^ru/i.test(l)?"/ru/":"/en/")}catch(e){location.replace("/en/")}})();`;

/** "/" → picks a locale on the client; the instant meta refresh is the no-JS fallback and the redirect signal for crawlers. */
export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      </head>
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        {/* Plain anchors on purpose: this document must work without any client JS. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <p><a href="/en/">English</a> · <a href="/ru/">Русский</a> · <a href="/es/">Español</a></p>
      </body>
    </html>
  );
}

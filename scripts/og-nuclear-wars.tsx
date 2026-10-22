/* Generates public/og/nuclear-wars-{en,ru,es}.png — the link preview of the Nuclear Wars page. Run: npx tsx scripts/og-nuclear-wars.tsx */
import fs from "node:fs/promises";
import { ImageResponse } from "next/og";
import { nuclearWarsLanding as copy } from "../content/landings/nuclear-wars";
import { locales } from "../lib/i18n/config";
import { SITE_URL } from "../lib/site";

const accent = "#39ff14", ink2 = "#a7b5a3", muted = "#7c8a78";

async function main() {
  // A frame of the game (visionOS simulator, 4K, 1:1 crop): mushroom clouds over enemy cities.
  const [image, regular, bold] = await Promise.all(
    ["nuclear-wars-og.jpg", "JetBrainsMono-Regular.ttf", "JetBrainsMono-Bold.ttf"].map((f) => fs.readFile(`scripts/assets/${f}`)),
  );
  const bg = `data:image/jpeg;base64,${image.toString("base64")}`;
  const fonts = [
    { name: "JetBrains Mono", data: regular, weight: 400 as const },
    // Separate family name: with one name for both, satori drew the bold text in the regular face.
    { name: "JetBrains Mono Bold", data: bold, weight: 700 as const },
  ];

  for (const locale of locales) {
    const res = new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#000", fontFamily: "JetBrains Mono" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630 }} alt="" />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.86) 40%, rgba(0,0,0,0.25) 72%, rgba(0,0,0,0.1) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.7) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 14, padding: "10px 22px", border: "2px solid rgba(57,255,20,0.35)", borderRadius: 999, background: "rgba(57,255,20,0.08)", color: ink2, fontSize: 21, letterSpacing: 3, textTransform: "uppercase" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: accent, boxShadow: `0 0 12px ${accent}` }} />
            {copy.eyebrow[locale]}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: accent, fontSize: 28, fontFamily: "JetBrains Mono Bold", fontWeight: 700, letterSpacing: 5 }}>{copy.slogan[locale]}</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 14, color: accent, fontSize: 136, fontFamily: "JetBrains Mono Bold", fontWeight: 700, lineHeight: 0.95, letterSpacing: 4, textShadow: "0 0 8px rgba(57,255,20,0.8), 0 0 28px rgba(57,255,20,0.45)" }}>
              <span>NUCLEAR</span>
              <span>WARS_</span>
            </div>
          </div>
          <div style={{ display: "flex", color: muted, fontSize: 22, letterSpacing: 1 }}>{new URL(SITE_URL).host}</div>
        </div>
      </div>,
      { width: 1200, height: 630, fonts },
    );
    const file = `public/og/nuclear-wars-${locale}.png`;
    await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
    console.log("wrote", file);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });

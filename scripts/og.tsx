/* Generates public/og/default.png, app/icon.png and app/apple-icon.png. Run: npx tsx scripts/og.tsx */
import fs from "node:fs/promises";
import { ImageResponse } from "next/og";

async function render(element: React.ReactElement, width: number, height: number, file: string) {
  const res = new ImageResponse(element, { width, height });
  await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
  console.log("wrote", file);
}

const bg = "#0d0d0d", ink = "#ffffff", muted = "#c3c2b7", accent = "#3987e5";

async function main() {
await render(
  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: bg, color: ink, fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: muted, letterSpacing: 2 }}>
      <div style={{ width: 18, height: 18, borderRadius: 9, background: accent }} />
      DIMKOY.GITHUB.IO
    </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>Dmitrii Cherviakov</div>
      <div style={{ fontSize: 40, color: muted, marginTop: 18 }}>Senior iOS Developer · Barcelona</div>
    </div>
    <div style={{ display: "flex", gap: 14, fontSize: 28 }}>
      {["Swift", "SwiftUI", "TCA", "AI-driven workflows"].map((t) => (
        <div key={t} style={{ padding: "10px 22px", borderRadius: 14, border: `2px solid ${accent}`, color: ink }}>{t}</div>
      ))}
    </div>
  </div>,
  1200, 630, "public/og/default.png",
);

const Icon = ({ size }: { size: number }) => (
  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: accent, color: ink, fontFamily: "sans-serif", fontSize: size * 0.5, fontWeight: 700, letterSpacing: -size * 0.02, borderRadius: size * 0.2 }}>
    DC
  </div>
);
await render(<Icon size={512} />, 512, 512, "app/icon.png");
await render(<Icon size={180} />, 180, 180, "app/apple-icon.png");
}
main().catch((e) => { console.error(e); process.exit(1); });

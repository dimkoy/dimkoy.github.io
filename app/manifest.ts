import type { MetadataRoute } from "next";
import { resumeEn } from "@/content/resume.en";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.jobTitle}`,
    short_name: site.name,
    description: resumeEn.seoDescription,
    start_url: "/en/",
    display: "browser",
    background_color: "#f9f9f7",
    theme_color: "#2a78d6",
    lang: "en",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

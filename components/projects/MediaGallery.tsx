import type { Media } from "@/content/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { ImageLightbox } from "./ImageLightbox";
import { LoopClip } from "./LoopClip";

/** Videos first, in their order; screenshots after them as a grid that opens a full-size viewer. */
export function MediaGallery({ media, locale, dict }: { media: Media[]; locale: Locale; dict: Dictionary }) {
  if (!media.length) return null;
  const images = media.flatMap((m) => (m.type === "image" ? [{ src: m.src, alt: m.alt[locale], width: m.width, height: m.height }] : []));
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {media.map((m, i) => {
        if (m.type === "youtube") {
          return (
            <div key={i} className="col-span-2 sm:col-span-3 aspect-video overflow-hidden rounded-xl border border-line bg-surface">
              <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${m.id}`} title={m.alt[locale]} allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
            </div>
          );
        }
        if (m.type === "clip") {
          return <LoopClip key={i} className="col-span-2 sm:col-span-3" clip={m} locale={locale} />;
        }
        if (m.type === "video") {
          return (
            <video key={i} className="col-span-2 w-full rounded-xl border border-line bg-surface sm:col-span-1" controls playsInline preload="metadata" poster={m.poster} width={m.width} height={m.height} aria-label={m.alt[locale]}>
              <source src={m.src} />
            </video>
          );
        }
        return null;
      })}
      {images.length > 0 && <ImageLightbox images={images} labels={dict.projects.gallery} />}
    </div>
  );
}

import type { Media } from "@/content/types";
import type { Locale } from "@/lib/i18n/config";

export function MediaGallery({ media, locale, placeholder }: { media: Media[]; locale: Locale; placeholder: string }) {
  if (!media.length) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-axis bg-surface p-6 text-center text-sm text-muted">
        {placeholder}
      </div>
    );
  }
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
        if (m.type === "video") {
          return (
            <video key={i} className="col-span-2 w-full rounded-xl border border-line bg-surface sm:col-span-1" controls playsInline preload="metadata" poster={m.poster} width={m.width} height={m.height} aria-label={m.alt[locale]}>
              <source src={m.src} />
            </video>
          );
        }
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={m.src} alt={m.alt[locale]} width={m.width} height={m.height} loading="lazy" decoding="async" className="w-full rounded-xl border border-line bg-surface" />
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n/t";

type Image = { src: string; alt: string; width: number; height: number };
type Labels = { open: string; close: string; prev: string; next: string };

const btn = "absolute flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xl text-white hover:bg-black/80";

/**
 * Screenshot grid; a click opens the image full-size in a modal <dialog> (Esc closes it),
 * where ←/→, the side buttons or a horizontal swipe flip through the set.
 */
export function ImageLightbox({ images, labels }: { images: Image[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  // Opening goes through state; closing always through the dialog (button, backdrop, Esc),
  // and its `close` event is the one place the state resets.
  useEffect(() => {
    if (index !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [index]);

  const close = () => dialog.current?.close();
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length));

  return (
    <>
      {images.map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={() => setIndex(i)}
          aria-label={t(labels.open, { n: i + 1, total: images.length })}
          className="cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface transition hover:border-axis"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="w-full" />
        </button>
      ))}

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        }}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        {index !== null && (
          <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-14" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[index].src} alt={images[index].alt} width={images[index].width} height={images[index].height} className="max-h-full max-w-full rounded-lg object-contain" />
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white tnum">{index + 1} / {images.length}</p>
            <button type="button" onClick={close} aria-label={labels.close} className={`${btn} right-3 top-3`} autoFocus>×</button>
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className={`${btn} left-3 top-1/2 -translate-y-1/2`}>‹</button>
                <button type="button" onClick={() => step(1)} aria-label={labels.next} className={`${btn} right-3 top-1/2 -translate-y-1/2`}>›</button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

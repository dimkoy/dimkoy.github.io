"use client";

import { useRef } from "react";
import type { ClipMedia } from "@/content/types";
import type { Locale } from "@/lib/i18n/config";
import { useAutoplayInView } from "./useAutoplayInView";

/**
 * Silent looping gameplay clip, captioned with its alt text. Loads and plays only while on screen; with reduced motion it
 * never starts on its own and shows the poster with controls instead.
 */
export function LoopClip({ clip, locale, className = "" }: { clip: ClipMedia; locale: Locale; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useAutoplayInView(ref);

  return (
    <figure className={className}>
      <video
        ref={ref}
        className="w-full rounded-xl border border-line bg-surface"
        src={clip.src}
        poster={clip.poster}
        width={clip.width}
        height={clip.height}
        muted
        loop
        playsInline
        preload="none"
        controls={reduced}
      />
      <figcaption className="mt-2 text-xs text-muted">{clip.alt[locale]}</figcaption>
    </figure>
  );
}

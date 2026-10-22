"use client";

import { useEffect, useRef, useState } from "react";
import type { ClipMedia } from "@/content/types";
import type { Locale } from "@/lib/i18n/config";

/**
 * Silent looping gameplay clip, captioned with its alt text. Loads and plays only while on screen; with reduced motion it
 * never starts on its own and shows the poster with controls instead.
 */
export function LoopClip({ clip, locale, className = "" }: { clip: ClipMedia; locale: Locale; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(motion.matches);
    if (motion.matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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

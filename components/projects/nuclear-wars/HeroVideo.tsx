"use client";

import { useRef } from "react";
import type { ClipMedia } from "@/content/types";
import { useAutoplayInView } from "@/components/projects/useAutoplayInView";

/** Muted gameplay loop behind the hero, paused once scrolled away; with reduced motion only its poster is shown. */
export function HeroVideo({ clip }: { clip: ClipMedia }) {
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplayInView(ref);
  return <video ref={ref} className="nw-hero-video" src={clip.src} poster={clip.poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />;
}

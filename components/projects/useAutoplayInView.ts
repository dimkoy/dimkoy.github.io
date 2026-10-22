"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * Plays a muted looping video only while a quarter of it is on screen, pausing it off screen. With reduced motion
 * it never starts on its own; the returned flag lets the caller show controls instead.
 */
export function useAutoplayInView(ref: RefObject<HTMLVideoElement | null>): boolean {
  const reduced = useSyncExternalStore(subscribe, prefersReducedMotion, () => false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [ref, reduced]);

  return reduced;
}

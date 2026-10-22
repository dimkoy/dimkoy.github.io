"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Marks every `[data-reveal]` element of the landing with `data-inview` once it scrolls into view; the CSS of
 * the nuclear-wars theme animates the transition. Before hydration (and without JS) the elements stay visible:
 * the hidden start state applies only under `[data-reveal-ready]`, which this sets on <main>.
 */
export function RevealObserver() {
  useEffect(() => {
    const main = document.querySelector("main[data-project-theme]");
    if (!main || prefersReducedMotion()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    main.querySelectorAll("[data-reveal]").forEach((el) => {
      // Already on screen at load (the hero) — shown right away, no flash of the start state.
      if (el.getBoundingClientRect().top < window.innerHeight) el.setAttribute("data-inview", "");
      else observer.observe(el);
    });
    main.setAttribute("data-reveal-ready", "");
    return () => observer.disconnect();
  }, []);

  return null;
}

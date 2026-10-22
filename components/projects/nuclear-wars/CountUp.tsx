"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** A metric that counts up from zero when it scrolls into view; non-numeric values and reduced motion show as is. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const target = /^\d+$/.test(value) ? Number(value) : null;
    if (!el || !target || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setShown("0");
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 900 + target * 60;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setShown(String(Math.round(target * (1 - (1 - p) ** 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

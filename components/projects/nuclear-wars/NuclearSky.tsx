"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { lazyThree, rafLoop } from "./lifecycle";

/**
 * Page-wide backdrop of the Nuclear Wars landing: the game's missiles in WebGL (three/sky.ts). A click on empty
 * sky launches one there. Fixed behind the content, never takes pointer events; three.js loads only here, after
 * hydration. With reduced motion, or without WebGL, nothing is drawn.
 */
export function NuclearSky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;

    return lazyThree(() => import("./three/sky"), ({ Sky }) => {
      const sky = new Sky(canvas);
      const loop = rafLoop((dt) => sky.step(dt, window.scrollY));
      const resize = () => sky.resize(window.innerWidth, window.innerHeight);
      const onVisibility = () => (document.hidden ? loop.stop() : loop.start());
      const onClick = (e: MouseEvent) => {
        const target = e.target as Element | null;
        if (target?.closest("a, button, input, textarea, select, video, iframe, dialog, summary, label, [role=button]")) return;
        if (window.getSelection()?.toString()) return;
        sky.launchAt(e.clientX, e.clientY);
      };

      resize();
      sky.seed(window.scrollY);
      loop.start();
      canvas.dataset.active = "";
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibility);
      document.addEventListener("click", onClick);
      return () => {
        loop.stop();
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        document.removeEventListener("click", onClick);
        sky.destroy();
      };
    });
  }, []);

  return <canvas ref={ref} className="nw-sky" aria-hidden="true" />;
}

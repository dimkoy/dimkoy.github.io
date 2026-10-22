"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { lazyThree, rafLoop } from "./lifecycle";

/**
 * Wraps the unit cards and draws the game's 3D models, turning slowly, into their `[data-unit-slot="<kind>"]`
 * boxes (three/units.ts). Renders only while on screen; with reduced motion — one still frame. Until WebGL is up
 * (or without it) the slots keep their line icons; `data-active` on the canvas hides them.
 */
export function UnitShowcase({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = wrap.current;
    const canvas = ref.current;
    if (!root || !canvas) return;
    const reduced = prefersReducedMotion();

    return lazyThree(() => import("./three/units"), ({ UnitTurntable }) => {
      const turntable = new UnitTurntable(canvas, [...root.querySelectorAll<HTMLElement>("[data-unit-slot]")], !reduced);
      const loop = rafLoop((dt) => turntable.render(dt));
      let visible = false;
      const resize = () => {
        turntable.resize(root.clientWidth, root.clientHeight);
        if (reduced || !visible) turntable.render(0);
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!visible || reduced) return loop.stop();
        turntable.show();
        loop.start();
      });
      const sizer = new ResizeObserver(resize);

      resize();
      sizer.observe(root);
      observer.observe(root);
      canvas.dataset.active = "";
      return () => {
        loop.stop();
        observer.disconnect();
        sizer.disconnect();
        turntable.destroy();
      };
    });
  }, []);

  return (
    <div ref={wrap} className="nw-units">
      {children}
      <canvas ref={ref} className="nw-units-canvas" aria-hidden="true" />
    </div>
  );
}

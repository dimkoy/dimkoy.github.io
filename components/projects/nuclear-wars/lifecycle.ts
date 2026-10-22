/** Shared plumbing of the landing's WebGL canvases (NuclearSky, UnitShowcase). */

/**
 * Loads a three.js module after hydration and runs `setup` with it; returns the cleanup for a React effect.
 * A throw in `setup` — no WebGL — leaves the page with its static fallback.
 */
export function lazyThree<M>(load: () => Promise<M>, setup: (module: M) => () => void): () => void {
  let cancelled = false;
  let cleanup = () => {};
  load().then((module) => {
    if (cancelled) return;
    try {
      cleanup = setup(module);
    } catch {
      // No WebGL.
    }
  });
  return () => {
    cancelled = true;
    cleanup();
  };
}

/** requestAnimationFrame loop handing `step` the seconds since the last frame, capped so a stall isn't a jump. */
export function rafLoop(step: (dt: number) => void) {
  let frame = 0;
  let last = 0;
  const tick = (now: number) => {
    step(Math.min((now - last) / 1000, 0.05));
    last = now;
    frame = requestAnimationFrame(tick);
  };
  return {
    start() {
      cancelAnimationFrame(frame);
      last = performance.now();
      frame = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(frame);
    },
  };
}

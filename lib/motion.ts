/** The reader asked the OS for less motion. Client only (reads `window`). */
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

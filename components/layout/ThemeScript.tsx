"use client";

import { useSyncExternalStore } from "react";

const script = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

const subscribe = () => () => {};

/**
 * Applies the persisted theme before hydration to avoid a flash of the wrong theme.
 * The inline <script> is emitted only in server HTML: after hydration the component renders
 * nothing, so React never creates a raw <script> on the client (which it warns about and
 * would not execute anyway — the theme has already been applied by then).
 */
export function ThemeScript() {
  const isServerHtml = useSyncExternalStore(subscribe, () => false, () => true);
  if (!isServerHtml) return null;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

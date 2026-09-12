"use client";

import { useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
const order: Theme[] = ["system", "light", "dark"];
const EVENT = "themechange";

function read(): Theme {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  try {
    if (theme === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeToggle({ labels }: { labels: Record<Theme, string> & { label: string } }) {
  const theme = useSyncExternalStore(subscribe, read, () => "system" as Theme);
  const next = order[(order.indexOf(theme) + 1) % order.length];
  const icon = theme === "light" ? "☀︎" : theme === "dark" ? "☾" : "◐";

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-line px-2 text-sm text-ink2 hover:bg-surface hover:text-ink"
      aria-label={`${labels.label}: ${labels[theme]}`}
      title={`${labels.label}: ${labels[theme]}`}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

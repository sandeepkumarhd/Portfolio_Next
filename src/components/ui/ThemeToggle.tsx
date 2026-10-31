"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

/* The theme lives on <html data-theme>, so read it straight from the DOM. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/* Server render assumes the dark default; the inline script corrects it before paint. */
function getServerTheme(): Theme {
  return "dark";
}

/** Switches between dark (default) and light. The choice is remembered per browser. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Storage can be blocked; the toggle still works for this visit. */
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      data-cursor="hover"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}

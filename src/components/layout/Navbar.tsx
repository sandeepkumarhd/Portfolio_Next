"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, site } from "@/config/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  // Glass background once the page is scrolled.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-premium)] ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 ease-[var(--ease-premium)] sm:px-5 ${
          scrolled ? "glass border border-line shadow-[var(--shadow)]" : "border border-transparent"
        } mx-4 sm:mx-6 lg:mx-auto`}
      >
        <a
          href="#home"
          data-cursor="hover"
          className="flex items-center gap-2 font-semibold tracking-tight text-fg"
          aria-label={`${site.name} home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fg font-mono text-xs text-bg">
            SK
          </span>
          <span className="hidden text-sm sm:inline">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    data-cursor="hover"
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-surface-2 ring-1 ring-line-strong"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg md:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass fixed inset-x-4 top-20 rounded-3xl border border-line p-3 shadow-[var(--shadow)] md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 text-lg transition-colors ${
                      active === item.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

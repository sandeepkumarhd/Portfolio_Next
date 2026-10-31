"use client";

import type { ReactNode, PointerEvent as ReactPointerEvent } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card with a soft accent glow that follows the pointer.
 * The glow is driven by CSS custom properties, so there are no re-renders.
 */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  function handleMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={handleMove}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-surface transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgb(var(--accent-rgb) / 0.16), transparent 60%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

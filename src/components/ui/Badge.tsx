import type { ReactNode } from "react";

/** Small technology pill used across skills, projects and experience. */
export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface-2/60 px-3 py-1 font-mono text-[11px] tracking-wide text-muted transition-colors duration-300 hover:border-accent/50 hover:text-fg ${className}`}
    >
      {children}
    </span>
  );
}

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/effects/Magnetic";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: boolean;
  download?: boolean | string;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-fg text-bg hover:bg-accent hover:text-white shadow-[0_10px_40px_-12px_rgb(var(--accent-rgb)/0.6)]",
  secondary: "border border-line-strong text-fg hover:bg-surface-2",
};

/** Pill-shaped link styled as a button. Optionally magnetic on desktop. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = true,
  download,
  external,
  magnetic = true,
  className = "",
}: ButtonLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:)/.test(href);

  const link = (
    <a
      href={href}
      download={download}
      target={isExternal && !href.startsWith("mailto:") ? "_blank" : undefined}
      rel={isExternal && !href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
      data-cursor="hover"
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 ease-[var(--ease-premium)] ${variants[variant]} ${className}`}
    >
      {children}
      {icon && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </a>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

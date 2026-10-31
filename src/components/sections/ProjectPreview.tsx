import type { CSSProperties, ReactNode } from "react";
import type { ProjectItem } from "@/types/portfolio";

/*
 * Illustrative UI mockups built from plain elements, so no confidential
 * screenshots are used. Each variant animates on the parent card's hover.
 */

function Frame({ children }: { children: ReactNode; accent: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-bg/80 p-4">
      <div className="mb-3 flex items-center gap-1.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-subtle/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-subtle/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-subtle/25" />
      </div>
      {children}
    </div>
  );
}

function Workflow({ accent }: { accent: string }) {
  const stages = ["Submitted", "Review", "Approved"];
  return (
    <Frame accent={accent}>
      <div className="flex items-center justify-between">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center gap-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-mono"
              style={{
                borderColor: "var(--accent-local)",
                background: i < 2 ? "var(--accent-local)" : "transparent",
                color: i < 2 ? "#07070a" : "var(--accent-local)",
              }}
            >
              {i + 1}
            </span>
            <span className="text-[10px] text-muted">{s}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-3 h-px bg-line-strong">
        <div className="absolute inset-y-0 left-0 w-2/3 bg-[var(--accent-local)] transition-all duration-700 group-hover:w-full" />
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-7 rounded-lg border border-line bg-surface-2 transition-transform duration-700 group-hover:translate-x-3" />
        <div className="h-7 w-3/4 rounded-lg border border-line bg-surface-2" />
      </div>
    </Frame>
  );
}

function Dashboard({ accent }: { accent: string }) {
  const bars = [40, 62, 48, 80, 58, 90, 72];
  return (
    <Frame accent={accent}>
      <div className="grid grid-cols-3 gap-2">
        {["Evaluated", "Pending", "Approved"].map((k, i) => (
          <div key={k} className="rounded-lg border border-line bg-surface-2 p-2">
            <p className="text-[9px] text-subtle">{k}</p>
            <p className="font-mono text-sm text-fg">{[128, 42, 96][i]}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-20 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-[var(--accent-local)]/70 transition-all duration-700 group-hover:bg-[var(--accent-local)]"
            style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
    </Frame>
  );
}

function Table({ accent }: { accent: string }) {
  const rows = [
    ["Zone A", "Active"],
    ["Zone B", "Review"],
    ["Zone C", "Active"],
    ["Zone D", "Queued"],
  ];
  return (
    <Frame accent={accent}>
      <div className="mb-2 grid grid-cols-[1fr_auto] gap-2 px-1 text-[9px] uppercase tracking-wider text-subtle">
        <span>Region</span>
        <span>Status</span>
      </div>
      <div className="space-y-1.5">
        {rows.map(([name, status], i) => (
          <div
            key={name}
            className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border border-line bg-surface-2 px-2.5 py-2 transition-transform duration-500 group-hover:translate-x-1"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className="h-2 w-16 rounded bg-line-strong" aria-hidden="true" />
            <span
              className="rounded-full px-2 py-0.5 text-[9px]"
              style={{
                background: status === "Active" ? "var(--accent-local)" : "transparent",
                color: status === "Active" ? "#07070a" : "var(--subtle)",
                border: status === "Active" ? "none" : "1px solid var(--line-strong)",
              }}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Inventory({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="space-y-1.5 rounded-lg border border-line bg-surface-2 p-2.5">
          <p className="text-[9px] text-subtle">Store A</p>
          <div className="h-1.5 w-full rounded bg-line-strong" />
          <div className="h-1.5 w-2/3 rounded bg-line-strong" />
        </div>
        <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden="true" className="text-[var(--accent-local)]">
          <path d="M1 7h24m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="space-y-1.5 rounded-lg border border-line bg-surface-2 p-2.5">
          <p className="text-[9px] text-subtle">Store B</p>
          <div className="h-1.5 w-full rounded bg-line-strong" />
          <div className="h-1.5 w-1/2 rounded bg-line-strong" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-line-strong px-3 py-2 text-[10px] text-muted">
        <span>Transfer #2841</span>
        <span className="font-mono text-[var(--accent-local)] transition-transform duration-700 group-hover:translate-x-2">
          → dispatch
        </span>
      </div>
    </Frame>
  );
}

function Chat({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <div className="space-y-2">
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm border border-line bg-surface-2 px-3 py-2 text-[10px] text-muted">
          Create a leave request for next Monday.
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[var(--accent-local)] px-3 py-2 text-[10px] text-[#07070a]">
          Filled: type, dates, reason. Confirm?
        </div>
        <div className="flex w-fit items-center gap-1 rounded-full border border-line px-3 py-2">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent-local)] animate-float"
              style={{ animationDelay: `${d * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

const variants = {
  workflow: Workflow,
  dashboard: Dashboard,
  table: Table,
  inventory: Inventory,
  chat: Chat,
} as const;

export function ProjectPreview({ variant, accent }: { variant: ProjectItem["preview"]; accent: string }) {
  const Variant = variants[variant];
  return (
    <div
      aria-hidden="true"
      style={{ "--accent-local": accent } as CSSProperties}
      className="relative h-48 overflow-hidden border-b border-line bg-gradient-to-br from-surface-2 to-surface p-5 transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.02]"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-40 blur-3xl"
        style={{ background: accent }}
      />
      <div className="relative h-full">
        <Variant accent={accent} />
      </div>
    </div>
  );
}

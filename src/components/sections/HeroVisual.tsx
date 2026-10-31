"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Reveal } from "@/components/effects/Reveal";

type Token = "kw" | "fn" | "prop" | "str" | "num" | "op" | "com";

const codeLines: { indent: number; parts: [Token, string][] }[] = [
  { indent: 0, parts: [["kw", "const "], ["fn", "developer"], ["op", " = {"]] },
  { indent: 1, parts: [["prop", "name"], ["op", ": "], ["str", '"Sandeep Kumar"'], ["op", ","]] },
  { indent: 1, parts: [["prop", "role"], ["op", ": "], ["str", '"Frontend Developer"'], ["op", ","]] },
  { indent: 1, parts: [["prop", "experience"], ["op", ": "], ["str", '"3.5+ years"'], ["op", ","]] },
  {
    indent: 1,
    parts: [
      ["prop", "stack"],
      ["op", ": ["],
      ["str", '"React"'],
      ["op", ", "],
      ["str", '"Next.js"'],
      ["op", ", "],
      ["str", '"TypeScript"'],
      ["op", "],"],
    ],
  },
  { indent: 1, parts: [["prop", "focus"], ["op", ": "], ["str", '"enterprise UI systems"'], ["op", ","]] },
  { indent: 1, parts: [["prop", "perf"], ["op", ": "], ["num", "40"], ["op", ",  "], ["com", "// % faster flows"]] },
  { indent: 0, parts: [["op", "};"]] },
  { indent: 0, parts: [] },
  { indent: 0, parts: [["kw", "export default "], ["fn", "developer"], ["op", ";"]] },
];

const tokenColor: Record<Token, string> = {
  kw: "text-[#c4b8ff]",
  fn: "text-[#7dd3fc]",
  prop: "text-fg",
  str: "text-[#5ee7c7]",
  num: "text-[#f5b86b]",
  op: "text-muted",
  com: "text-subtle italic",
};

/* Chips sit on the window's corners and outer edges so they never cover code or metrics. */
const chips = [
  { label: "React.js", className: "-left-3 -top-5", delay: 0 },
  { label: "Next.js", className: "-right-3 -top-5", delay: 1.2 },
  { label: "TypeScript", className: "-right-8 top-[46%]", delay: 2.1 },
  { label: "Tailwind CSS", className: "-bottom-5 -left-4", delay: 0.6 },
];

/**
 * Code-inspired 3D workspace. The window tilts toward the pointer on desktop
 * and floats gently. Touch devices and reduced-motion users get a still frame.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 120, damping: 20 });

  function handleMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[520px] [perspective:1400px]"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-12%] rounded-full border border-dashed border-line-strong animate-orbit"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[8%] rounded-full bg-accent/20 blur-3xl" />

      <motion.div
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <Reveal y={40} delay={0.2}>
          <div className="animate-float rounded-[28px] border border-line-strong bg-surface/90 shadow-[0_40px_120px_-30px_rgb(var(--accent-rgb)/0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[11px] text-subtle">developer.ts</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#5ee7c7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5ee7c7]" />
                build passing
              </span>
            </div>

            <pre className="overflow-hidden px-5 py-6 font-mono text-[12px] leading-7 sm:px-7 sm:text-[13.5px]">
              <code>
                {codeLines.map((line, i) => (
                  <span
                    key={i}
                    className="block whitespace-pre"
                    style={{ paddingLeft: `${line.indent * 1.25}rem` }}
                  >
                    <span className="mr-4 inline-block w-4 select-none text-right text-subtle/60" aria-hidden="true">
                      {i + 1}
                    </span>
                    {line.parts.length === 0
                      ? " "
                      : line.parts.map(([type, text], j) => (
                          <span key={j} className={tokenColor[type]}>
                            {text}
                          </span>
                        ))}
                  </span>
                ))}
              </code>
            </pre>

            <div className="border-t border-line px-5 py-4 sm:px-7">
              <div className="flex items-center justify-between text-[11px] text-muted">
                <span className="font-mono">render time</span>
                <span className="font-mono text-fg">-40%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-[#5ee7c7]"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
        </Reveal>

        {chips.map((chip) => (
          <div
            key={chip.label}
            className={`glass absolute hidden rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[11px] text-fg shadow-[var(--shadow)] sm:block animate-float ${chip.className}`}
            style={{ animationDelay: `${chip.delay}s`, transform: "translateZ(60px)" }}
          >
            {chip.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

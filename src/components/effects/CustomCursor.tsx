"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Desktop-only cursor: a small dot plus a trailing ring that grows over
 * interactive elements. It stays hidden via CSS unless the effect below marks
 * <html> with `has-custom-cursor`, which only happens on fine-pointer devices.
 */
export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduce.matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    function move(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function over(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor='hover']")));
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      root.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-fg mix-blend-difference"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          backgroundColor: hovering ? "rgb(var(--accent-rgb) / 0.18)" : "rgb(var(--accent-rgb) / 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[79] rounded-full border border-accent/60"
      />
    </>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Cycles through role titles with a vertical slide. Reduced-motion users get a static first role. */
export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce, roles.length]);

  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom text-fg">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

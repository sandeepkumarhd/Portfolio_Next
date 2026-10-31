"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

/**
 * Short intro curtain on first load. Skipped for reduced-motion users.
 * Content is already in the DOM underneath, so nothing is hidden from crawlers.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), reduce ? 0 : 1500);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-sm tracking-[0.3em] text-muted uppercase"
          >
            {site.name}
          </motion.p>
          <motion.div className="mt-6 h-px w-40 origin-left overflow-hidden bg-line-strong">
            <motion.div
              className="h-full w-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

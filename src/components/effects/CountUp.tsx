"use client";

import { animate, useInView, useMotionValue, useReducedMotion, useTransform, motion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from zero to `to` the first time it scrolls into view. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const value = useMotionValue(reduce ? to : 0);
  const display = useTransform(value, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduce, to, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

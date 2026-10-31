"use client";

import { motion, useReducedMotion } from "motion/react";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Reveals text word by word with a staggered mask-up animation. */
export function TextReveal({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.06,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.08em]"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              ease,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

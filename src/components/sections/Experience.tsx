"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // The timeline spine fills as the reader scrolls through the list.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const spine = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const height = useTransform(spine, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36"
    >
      <SectionHeading
        id="experience-title"
        eyebrow="Experience"
        title="Where I've shipped and grown."
        description="Enterprise portals, workflow systems and dashboards, delivered alongside backend and DevOps teams."
      />

      <div ref={ref} className="relative mt-16 space-y-12 pl-8 sm:pl-12">
        {/* Track and filled spine */}
        <div aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-line-strong sm:left-[11px]">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-accent via-accent to-[#5ee7c7]"
            style={{ height: reduce ? "100%" : height }}
          />
        </div>

        {experience.map((job, i) => (
          <Reveal key={job.id} delay={0.05 * i}>
            <article className="relative">
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute -left-8 top-2 flex h-4 w-4 items-center justify-center rounded-full border border-line-strong bg-bg sm:-left-12 sm:h-6 sm:w-6"
              >
                <span className={`h-2 w-2 rounded-full ${job.current ? "bg-[#5ee7c7]" : "bg-accent"}`} />
                {job.current && (
                  <span className="animate-pulse-ring absolute inset-0 rounded-full border border-[#5ee7c7]" />
                )}
              </span>

              <div className="group rounded-3xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow)] sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{job.role}</h3>
                    <p className="mt-1 text-sm text-accent">{job.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {job.current && <Badge className="border-[#5ee7c7]/40 text-[#5ee7c7]">Current</Badge>}
                    <span className="font-mono text-xs text-subtle">{job.period ?? "Earlier role"}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{job.summary}</p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm text-muted">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

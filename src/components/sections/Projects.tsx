"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { projectFilters, projects } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectPreview } from "@/components/sections/ProjectPreview";
import type { ProjectItem } from "@/types/portfolio";
import { ArrowUpRight, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, wide }: { project: ProjectItem; wide: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease }}
      className={`h-full ${wide ? "md:col-span-2" : ""}`}
    >
      <SpotlightCard className="group flex h-full flex-col">
        <ProjectPreview variant={project.preview} accent={project.accent} />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              {project.category}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 text-[11px] text-muted">
                <Sparkles size={12} aria-hidden="true" />
                Featured
              </span>
            )}
          </div>

          <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{project.title}</h3>
          <p className="mt-1.5 text-sm text-fg/80">{project.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-5 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[13px] text-muted">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s}>
                  <Badge>{s}</Badge>
                </li>
              ))}
            </ul>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
            />
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured Projects"
          title="Enterprise systems, designed to be used."
          description="Illustrative previews of production-style work. Client details are kept confidential."
        />

        <LayoutGroup>
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const active = filter === f;
              const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  data-cursor="hover"
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active ? "text-bg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {f}
                    <span className="font-mono text-[10px] opacity-60">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <Reveal delay={0.1}>
        <motion.div layout className="mt-14 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              // An odd last card spans both columns so the grid never ends on a lone card.
              <ProjectCard
                key={project.id}
                project={project}
                wide={i === visible.length - 1 && visible.length % 2 === 1}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </Reveal>

      {visible.length === 0 && <p className="mt-10 text-center text-muted">No projects in this category yet.</p>}
    </section>
  );
}

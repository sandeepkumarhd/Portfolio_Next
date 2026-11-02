import { Award, Briefcase, Gauge, type LucideIcon } from "lucide-react";
import { achievements } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AchievementItem } from "@/types/portfolio";

const kindIcon: Record<AchievementItem["kind"], LucideIcon> = {
  award: Award,
  metric: Gauge,
  experience: Briefcase,
};

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative mx-auto max-w-6xl scroll-mt-24 section-shell px-5 py-16 sm:px-6 sm:py-20 lg:py-20">
      <SectionHeading id="achievements-title" eyebrow="Achievements" title="Recognition and measurable impact." />

      <div className="mt-10 grid gap-5 sm:mt-16 md:grid-cols-3">
        {achievements.map((item, i) => {
          const Icon = kindIcon[item.kind];
          const isAward = item.kind === "award";
          return (
            <Reveal key={item.id} delay={0.08 * i}>
              <SpotlightCard className="h-full">
                <article className={`flex h-full flex-col p-5 sm:p-8 ${isAward ? "sm:min-h-[260px]" : "sm:min-h-[240px]"}`}>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                      isAward ? "border-accent/40 bg-accent-soft text-accent" : "border-line bg-surface-2 text-fg"
                    }`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  {item.date && <p className="mt-8 font-mono text-xs tracking-wider text-accent uppercase">{item.date}</p>}
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </article>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

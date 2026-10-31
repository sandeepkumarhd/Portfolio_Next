import { Check } from "lucide-react";
import { aboutText } from "@/config/site";
import { stats } from "@/data/portfolio";
import { CountUp } from "@/components/effects/CountUp";
import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { StatItem } from "@/types/portfolio";

function StatValue({ stat }: { stat: StatItem }) {
  if (stat.value !== undefined) {
    return (
      <CountUp
        to={stat.value}
        decimals={stat.decimals ?? 0}
        prefix={stat.prefix}
        suffix={stat.suffix}
        className="font-semibold tabular-nums text-fg"
      />
    );
  }
  return <span className="font-semibold text-fg">{stat.display}</span>;
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title={`Engineering enterprise frontends that people rely on.`}
          />

          <div className="mt-10 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {aboutText.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {aboutText.highlights.map((item, i) => (
              <li key={item}>
                <Reveal delay={0.05 * i}>
                  <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface/60 px-4 py-3.5 text-sm text-fg">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    {item}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={0.08 * i}>
              <div className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow)] sm:p-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
                  0{i + 1}
                </span>
                <div className="relative">
                  <p className="text-4xl leading-none tracking-tight sm:text-5xl">
                    <StatValue stat={stat} />
                  </p>
                  <p className="mt-3 text-sm text-muted">{stat.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Check } from "lucide-react";
import { aboutText, site } from "@/config/site";
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
    <section id="about" aria-labelledby="about-title" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-28 lg:py-36">
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
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <Reveal>
              <figure className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src="/images/sandeep-portrait.jpg"
                  alt="Sandeep Kumar, Frontend Developer, smiling in a park"
                  width={1280}
                  height={1280}
                  sizes="(min-width: 1024px) 250px, 45vw"
                  className="aspect-[3/4] w-full object-cover object-[center_28%] transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12">
                  <p className="text-sm font-semibold text-white">{site.name}</p>
                  <p className="text-xs text-white/75">{site.role}</p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src="/images/sandeep-at-work.jpg"
                  alt="Sandeep Kumar working on a laptop while sitting on a bed"
                  width={1536}
                  height={1536}
                  sizes="(min-width: 1024px) 250px, 45vw"
                  className="aspect-[3/4] w-full object-cover object-[center_40%] transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12">
                  <p className="text-sm font-semibold text-white">At work</p>
                  <p className="text-xs text-white/75">Frontend development</p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={0.08 * i}>
              <div className="group relative flex h-full min-h-[150px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-5 sm:min-h-[200px] sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow)] sm:p-7">
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

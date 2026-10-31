import { Code2, Layers, Palette, Plug, Wrench, type LucideIcon } from "lucide-react";
import { skillCategories } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  frontend: Code2,
  state: Layers,
  ui: Palette,
  integration: Plug,
  tools: Wrench,
};

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36">
      <SectionHeading
        id="skills-title"
        eyebrow="Technical Skills"
        title="The tools I reach for every day."
        description="A toolkit shaped by enterprise work: strongly typed React, predictable state, accessible UI systems and secure integrations."
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => {
          const Icon = icons[category.id] ?? Code2;
          const featured = i === 0;
          return (
            <Reveal key={category.id} delay={0.06 * i} className={featured ? "md:col-span-2" : undefined}>
              <SpotlightCard className="h-full">
                <article className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-2 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-subtle">
                      {String(category.items.length).padStart(2, "0")} tools
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold tracking-tight text-fg">{category.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <li key={item}>
                        <Badge>{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </article>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

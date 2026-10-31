import { Reveal } from "@/components/effects/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
};

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl text-balance"
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

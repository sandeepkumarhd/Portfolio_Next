import { ArrowDown, Mail } from "lucide-react";
import { availability, heroIntro, roles, site, socialLinks } from "@/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/effects/Reveal";
import { TextReveal } from "@/components/effects/TextReveal";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { RoleRotator } from "@/components/sections/RoleRotator";

const socialIcon = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
} as const;

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-16"
    >
      {/* Animated backdrop: drifting accent glows over a faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="animate-blob absolute -left-[10%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-accent/25 blur-[120px]" />
        <div
          className="animate-blob absolute right-[-8%] top-[35%] h-[30rem] w-[30rem] rounded-full blur-[120px]"
          style={{ background: "rgb(94 231 199 / 0.14)", animationDelay: "-6s" }}
        />
        <div
          className="animate-blob absolute bottom-[-10%] left-[30%] h-[26rem] w-[26rem] rounded-full blur-[120px]"
          style={{ background: "rgb(125 211 252 / 0.12)", animationDelay: "-12s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                {availability.available && (
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#5ee7c7]" />
                )}
                <span className="relative h-2 w-2 rounded-full bg-[#5ee7c7]" />
              </span>
              <span className="text-xs text-muted">{availability.label}</span>
            </div>
          </Reveal>

          <h1 id="hero-title" className="mt-7 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-fg sm:text-6xl lg:text-[4.6rem] text-balance">
            <TextReveal text={heroIntro.headline[0]} as="span" className="block" delay={0.2} />
            <TextReveal text={heroIntro.headline[1]} as="span" className="block text-accent-gradient" delay={0.45} />
          </h1>

          <Reveal delay={0.6}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{heroIntro.subheading}</p>
          </Reveal>

          <Reveal delay={0.7}>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted">
              <span className="text-subtle">&gt;</span>
              <RoleRotator roles={roles} />
              <span className="text-subtle">· {site.experienceYears} yrs · {site.location}</span>
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="#projects" variant="primary">
                View My Work
              </ButtonLink>
              <ButtonLink href={site.resumePath} variant="secondary" download="Sandeep-Kumar-Resume.pdf" external={false}>
                Download Resume
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.95}>
            <ul className="mt-10 flex items-center gap-2" aria-label="Social links">
              {socialLinks.map((link) => {
                const Icon = socialIcon[link.id];
                const isMail = link.id === "email";
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      aria-label={link.label}
                      title={link.label}
                      data-cursor="hover"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-fg"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <HeroVisual />
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        data-cursor="hover"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors hover:text-fg md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-float" aria-hidden="true" />
      </a>
    </section>
  );
}

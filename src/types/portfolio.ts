export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  /** Shown as-is, e.g. "August 2026 – Present". Leave undefined when the period isn't known. */
  period?: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
};

export type ProjectCategory = "Enterprise" | "Dashboards" | "Workflows" | "AI";

export type ProjectPreviewVariant = "workflow" | "dashboard" | "table" | "inventory" | "chat";

export type ProjectItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  stack: string[];
  highlights: string[];
  preview: ProjectPreviewVariant;
  accent: string;
  featured?: boolean;
};

export type StatItem = {
  id: string;
  label: string;
  /** Numeric value to count up to. Omit for text-only stats. */
  value?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Text shown when there is no numeric value. */
  display?: string;
};

export type AchievementItem = {
  id: string;
  title: string;
  description: string;
  date?: string;
  kind: "award" | "metric" | "experience";
};

export type SocialLink = {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
};

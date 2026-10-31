import type { SocialLink } from "@/types/portfolio";

/*
 * Single source of truth for personal details, links and SEO.
 * Edit the values here; every section reads from this file.
 */

export const site = {
  url: "https://sandeepkumar.dev",
  name: "Sandeep Kumar",
  shortName: "Sandeep",
  role: "Frontend Developer",
  experienceYears: "3.5+",
  location: "India",
  email: "Ksandeep15267@gmail.com",
  copyrightYear: "2026",
  lastUpdated: "2026-10-31",
  resumePath: "/resume.pdf",
  siteTitle: "Sandeep Kumar — Frontend Developer",
  description:
    "Frontend Developer with 3.5+ years of experience building scalable, responsive and high-performance web applications, enterprise dashboards and reusable UI architectures.",
  keywords: [
    "Frontend Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Redux Toolkit",
    "Tailwind CSS",
    "Enterprise web applications",
    "India",
  ],
} as const;

/** Rotating role text in the hero. */
export const roles = [
  "Frontend Developer",
  "React & Next.js Engineer",
  "Enterprise UI Architect",
  "Performance-focused Builder",
];

export const availability = {
  available: true,
  label: "Open to new opportunities",
};

export const heroIntro = {
  headline: ["Building Digital Experiences", "That Make an Impact."],
  subheading:
    "I'm Sandeep Kumar, a Frontend Developer focused on building scalable, interactive, and high-performance web applications.",
};

export const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/sandeepkumar" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/sandeepkumarhd" },
  { id: "email", label: "Email", href: `mailto:${site.email}` },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const aboutText = {
  paragraphs: [
    "I build frontend systems for enterprise products, where reliability, clarity and speed matter as much as the visual design. Most of my work sits in complex dashboards, multi-stage workflow tools and role-aware portals used by large teams every day.",
    "I've built reusable React component libraries, integrated REST APIs and authentication flows, and worked closely with backend and DevOps engineers to ship features end to end, from API contracts through to deployment pipelines.",
    "Performance is a habit for me. Code splitting, memoization, data-fetching strategy and bundle hygiene have helped deliver roughly a 40% improvement in key user flows.",
  ],
  highlights: [
    "Reusable component architecture",
    "REST API & auth integration",
    "Performance optimization",
    "Cross-team delivery with backend & DevOps",
  ],
};

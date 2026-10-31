import type {
  AchievementItem,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
  StatItem,
} from "@/types/portfolio";

/* Skills ----------------------------------------------------------------- */

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Core languages and frameworks for building modern interfaces.",
    items: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    id: "state",
    title: "State Management",
    description: "Predictable data flow for large, multi-module applications.",
    items: ["Redux Toolkit", "Redux Thunk", "Context API", "React Hooks"],
  },
  {
    id: "ui",
    title: "UI & Styling",
    description: "Design systems, component libraries and responsive layouts.",
    items: ["Tailwind CSS", "Shadcn UI", "Ant Design", "Material UI"],
  },
  {
    id: "integration",
    title: "Integration",
    description: "Connecting frontends to APIs, identity and access control.",
    items: ["REST APIs", "Axios", "Fetch", "JWT Authentication", "OAuth", "RBAC"],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Version control, delivery pipelines and everyday tooling.",
    items: ["Git", "GitHub", "CI/CD", "VS Code"],
  },
];

/* Experience ------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    id: "dfccil",
    role: "Frontend Developer",
    company: "Nippon Data System / DFCCIL Project",
    period: "August 2026 – Present",
    current: true,
    summary:
      "Building enterprise-grade frontend modules for railway logistics and management portals.",
    responsibilities: [
      "Building enterprise-grade frontend modules.",
      "Developing railway logistics and management portals.",
      "Implementing responsive React.js and TypeScript interfaces.",
      "Integrating REST APIs.",
      "Developing reusable components.",
      "Improving application performance and user experience.",
    ],
  },
  {
    id: "cetpa",
    role: "React.js Developer",
    company: "Cetpa Infotech Pvt. Ltd.",
    period: "December 2024 – July 2026",
    summary:
      "Delivered enterprise web applications and workflow management systems across the React ecosystem.",
    responsibilities: [
      "Developed enterprise web applications.",
      "Worked with React.js, Next.js, TypeScript, and Tailwind CSS.",
      "Built workflow management systems.",
      "Integrated backend APIs.",
      "Implemented authentication and role-based access control.",
    ],
  },
  {
    id: "digikull",
    role: "Frontend Developer",
    company: "Digikull Education",
    summary:
      "Built responsive interfaces and reusable components with modern JavaScript and React.",
    responsibilities: [
      "Developed responsive frontend interfaces.",
      "Created reusable components.",
      "Worked on modern JavaScript and React applications.",
    ],
  },
];

/* Projects --------------------------------------------------------------- */

/*
 * Projects are described generically to avoid confidential company details.
 * Previews are illustrative mockups, not screenshots of client software.
 */
export const projects: ProjectItem[] = [
  {
    id: "noc",
    title: "NOC Management System",
    tagline: "Enterprise workflow management with multi-stage approvals",
    description:
      "A network operations workflow tool where requests move through configurable approval stages, with every transition tracked and every action gated by role.",
    category: "Workflows",
    stack: ["React.js", "TypeScript", "Redux Toolkit"],
    highlights: [
      "Multi-stage approval processes",
      "Role-based access control",
      "Typed Redux slices for request state",
    ],
    preview: "workflow",
    accent: "#8B7CFF",
    featured: true,
  },
  {
    id: "kra",
    title: "KRA Management System",
    tagline: "Employee performance evaluation with multi-level approvals",
    description:
      "Goal-setting and evaluation workflows that route assessments through reporting levels, with live progress dashboards for managers and HR.",
    category: "Dashboards",
    stack: ["React.js", "REST APIs", "Charts"],
    highlights: [
      "Employee performance evaluation",
      "Multi-level approval workflows",
      "Dynamic dashboards from API data",
    ],
    preview: "dashboard",
    accent: "#5EE7C7",
    featured: true,
  },
  {
    id: "dfccil-portal",
    title: "DFCCIL Enterprise Portal",
    tagline: "Large-scale railway logistics portal",
    description:
      "A responsive enterprise portal for logistics and large-scale employee data, built to stay fast and usable across desktops, tablets and field devices.",
    category: "Enterprise",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Responsive interfaces for large datasets",
      "Large-scale employee data management",
      "Measured performance optimization",
    ],
    preview: "table",
    accent: "#7DD3FC",
    featured: true,
  },
  {
    id: "inventory",
    title: "Inventory Management System",
    tagline: "Multi-location stock control with approval-driven dispatch",
    description:
      "Store-to-store stock transfers with approval and dispatch steps, plus permissions that differ by location and role.",
    category: "Workflows",
    stack: ["React.js", "TypeScript", "REST APIs"],
    highlights: [
      "Multi-location inventory management",
      "Store-to-store stock transfers",
      "Approval and dispatch workflows",
    ],
    preview: "inventory",
    accent: "#F5B86B",
  },
  {
    id: "ai-chat",
    title: "AI Agent Chat Interface",
    tagline: "Conversational UI that fills forms through dialogue",
    description:
      "A conversational interface where an AI agent guides users through structured forms, with streamed responses and validation before submission.",
    category: "AI",
    stack: ["React.js", "TypeScript", ".NET API"],
    highlights: [
      "AI-powered conversational interface",
      "Dynamic form-filling workflows",
      "Integration with a .NET backend",
    ],
    preview: "chat",
    accent: "#F38BD0",
  },
];

export const projectFilters = ["All", "Enterprise", "Dashboards", "Workflows", "AI"] as const;

/* Stats ------------------------------------------------------------------ */

export const stats: StatItem[] = [
  { id: "years", label: "Years Experience", value: 3.5, decimals: 1, suffix: "+" },
  { id: "projects", label: "Enterprise Projects", display: "Multiple" },
  { id: "perf", label: "Performance Improvement", value: 40, suffix: "%" },
  { id: "e2e", label: "End-to-End Feature Development", display: "Full Cycle" },
];

/* Achievements ----------------------------------------------------------- */

export const achievements: AchievementItem[] = [
  {
    id: "award",
    kind: "award",
    title: "Excellence in Development Award",
    description: "Recognised for quality of delivery and technical contribution.",
    date: "July 2026",
  },
  {
    id: "perf",
    kind: "metric",
    title: "~40% Faster Application Performance",
    description:
      "Improved rendering and data-fetching strategy to deliver a substantially faster experience on key flows.",
  },
  {
    id: "enterprise",
    kind: "experience",
    title: "Enterprise-grade Delivery",
    description:
      "Shipping workflow management, dashboards and role-aware portals used by large organisations.",
  },
];

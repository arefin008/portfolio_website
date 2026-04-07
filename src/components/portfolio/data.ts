export const heroText =
  "I don't just build websites. I engineer scalable digital systems.";

export const navItems = [
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const identityTabs = [
  {
    id: "developer",
    label: "Developer",
    icon: "terminal",
    code: "CORE_DEVELOPER",
    strap: "Precision & Performance",
    body: "I build deliberate interfaces and code paths that stay readable under pressure. Clean structure, semantic markup, and measurable performance are part of the implementation, not a clean-up step after it ships.",
    points: [
      "Semantic HTML and modern CSS systems",
      "Type-safe product logic with TypeScript",
      "Component-driven implementation",
      "Performance tuning around Core Web Vitals",
    ],
  },
  {
    id: "engineer",
    label: "Engineer",
    icon: "cpu",
    code: "SYSTEM_ENGINEER",
    strap: "Scalability & Architecture",
    body: "I design backend and platform layers that survive change. That means service boundaries, auth flows, persistence design, and deployment pipelines that support growth instead of blocking it.",
    points: [
      "Microservices and serverless patterns",
      "Database design and query optimization",
      "API security and authentication",
      "CI/CD workflow automation",
    ],
  },
  {
    id: "solver",
    label: "Problem Solver",
    icon: "lightbulb",
    code: "LOGIC_SOLVER",
    strap: "Analytics & Strategy",
    body: "I decompose ambiguous requirements into tractable engineering problems, then choose the shortest path to a reliable result. Debugging, refactoring, and product tradeoffs all sit in the same decision loop.",
    points: [
      "Algorithmic problem solving",
      "Data-informed decision making",
      "UX strategy grounded in behavior",
      "Legacy system refactoring",
    ],
  },
] as const;

export const expertiseModules = [
  {
    id: "core",
    number: "MODULE_01",
    title: "Languages & Core",
    icon: "terminal",
    badge: "Optimized",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "PHP"],
  },
  {
    id: "frontend",
    number: "MODULE_02",
    title: "Frontend Systems",
    icon: "globe",
    badge: null,
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "DaisyUI",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    number: "MODULE_03",
    title: "Backend Architecture",
    icon: "server",
    badge: null,
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "GraphQL",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    id: "data",
    number: "MODULE_04",
    title: "Data & Infrastructure",
    icon: "database",
    badge: "Secure",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Redis", "Docker"],
  },
] as const;

export const capabilities = [
  {
    title: "Frontend Architecture",
    icon: "code2",
    accent: "text-[var(--color-accent)]",
    description:
      "Scalable, typed frontend systems with strong layout discipline and production-ready component architecture.",
    tags: ["TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "DaisyUI"],
  },
  {
    title: "UI/UX Design",
    icon: "palette",
    accent: "text-[var(--color-accent)]",
    description:
      "Interfaces that convert complexity into clarity without flattening the personality of the product.",
    tags: ["Figma", "Design Systems"],
  },
  {
    title: "Backend Engine",
    icon: "database",
    accent: "text-white",
    description:
      "Robust server-side systems across multiple stacks with reliable data layers and API design.",
    tags: [
      "Python",
      "Node.js",
      "Express.js",
      "PHP",
      "Java",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    title: "Mobile First",
    icon: "smartphone",
    accent: "text-[var(--color-accent)]",
    description: "Responsive implementation that remains fast and intentional on every screen size.",
    tags: ["Responsive", "PWA"],
  },
  {
    title: "Full Stack Systems",
    icon: "layers",
    accent: "text-[var(--color-accent)]",
    description:
      "End-to-end delivery from concept to deployment with infrastructure and release workflows included.",
    tags: ["AWS", "Docker", "Terraform", "CI/CD", "Microservices"],
  },
  {
    title: "Performance",
    icon: "zap",
    accent: "text-[var(--color-accent)]",
    description: "Speed budgets, technical SEO, and web vitals work that holds up in production.",
    tags: ["Core Vitals", "SEO"],
  },
] as const;

export const projects = [
  {
    name: "MediWise",
    category: "Healthcare Platform",
    stack: "Next.js",
    summary:
      "Full-stack healthcare management platform with role-based portals, appointments, payments, and real-time messaging.",
    gradient: "from-emerald-900/25 to-blue-900/25",
  },
  {
    name: "Explorer Nature",
    category: "Tourism Platform",
    stack: "React",
    summary:
      "Premium travel experience showcasing Bangladesh and international tours with immersive discovery and booking flows.",
    gradient: "from-orange-900/25 to-yellow-900/25",
  },
  {
    name: "EMS Admin Panel",
    category: "Admin System",
    stack: "React",
    summary:
      "Employee management interface for attendance, payroll, and performance tracking across operational teams.",
    gradient: "from-fuchsia-900/25 to-pink-900/25",
  },
  {
    name: "MotoCare",
    category: "Auto Marketplace",
    stack: "Next.js",
    summary:
      "Automotive marketplace with role-based access, operational dashboards, and full-stack management workflows.",
    gradient: "from-sky-900/25 to-cyan-900/25",
  },
  {
    name: "EcoSwap",
    category: "Sustainable Marketplace",
    stack: "React Native",
    summary:
      "Community marketplace for swapping pre-loved goods and reducing waste through local, circular exchange.",
    gradient: "from-green-900/25 to-emerald-900/25",
  },
  {
    name: "Astro Commerce",
    category: "E-commerce Interface",
    stack: "Astro",
    summary:
      "High-performance commerce frontend engineered for strong SEO, speed, and tight content delivery.",
    gradient: "from-zinc-800 to-zinc-950",
  },
] as const;

export const workHistory = [
  {
    period: "Nov 2025 - Present",
    role: "Full Stack Developer",
    company: "Bengal Tech Solutions",
    model: "Remote",
    side: "right",
    bullets: [
      "Architecting enterprise full-stack applications across MERN and PERN stacks.",
      "Designing high-performance REST APIs.",
      "Leading distributed CI/CD workflows.",
    ],
  },
  {
    period: "Jul 2025 - Oct 2025",
    role: "Software Engineer Intern",
    company: "Jam Technologies",
    model: "Hybrid",
    side: "left",
    bullets: [
      "Built modular UI components for POS products.",
      "Improved performance with substantially faster page loads.",
      "Refactored legacy code into maintainable modules.",
    ],
  },
  {
    period: "2020 - 2023",
    role: "Digital Lead Generation",
    company: "Fiverr",
    model: "Remote",
    side: "right",
    bullets: [
      "Delivered 600+ freelance projects with strong client retention.",
      "Managed a 15-person cross-functional team.",
      "Built repeatable lead generation systems and workflows.",
    ],
  },
] as const;

export const protocols = [
  {
    id: "deconstruct",
    phase: "Analysis Phase",
    title: "Deconstruct",
    icon: "search",
    accent: "text-sky-400",
    glow: "bg-sky-500/12",
    body: "I start by separating constraints, assumptions, and actual user requirements. The fastest implementation is usually the one with the clearest model of the problem.",
  },
  {
    id: "architect",
    phase: "Design Phase",
    title: "Architect",
    icon: "penTool",
    accent: "text-[var(--color-accent)]",
    glow: "bg-emerald-500/12",
    body: "The stack, boundaries, data flow, and rollout plan are chosen to support real product growth, not only the first release milestone.",
  },
  {
    id: "execute",
    phase: "Deployment Phase",
    title: "Execute",
    icon: "rocket",
    accent: "text-fuchsia-400",
    glow: "bg-fuchsia-500/12",
    body: "Implementation quality, testing discipline, performance, and user experience all need to survive contact with production traffic.",
  },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "#", icon: "github" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Phone", href: "#", icon: "phone" },
  { label: "Mail", href: "#", icon: "mail" },
] as const;

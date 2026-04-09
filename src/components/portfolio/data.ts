export const heroText =
  "Full stack software engineer building modern web applications.";

export const navItems = [
  { label: "Expertise", href: "#expertise" },
  { label: "Capabilities", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const identityTabs = [
  {
    id: "developer",
    label: "Developer",
    icon: "terminal",
    code: "CORE_DEVELOPER",
    strap: "Full Stack & Scalable",
    body: "I build full stack web applications that are modern, responsive, and cleanly structured from frontend to backend. React, Next.js, TypeScript, APIs, and database-driven systems are where I do my best work.",
    points: [
      "Responsive interfaces with React, Next.js, and TypeScript",
      "REST APIs and backend features with Node.js and ASP.NET",
      "Database integration with PostgreSQL, MySQL, Prisma, and SQL",
      "Clean, maintainable full stack architecture and practical UI systems",
    ],
  },
  {
    id: "engineer",
    label: "Engineer",
    icon: "cpu",
    code: "SYSTEM_ENGINEER",
    strap: "APIs & Data Systems",
    body: "My backend work centers on practical web application engineering: REST APIs, ASP.NET applications, Node.js services, and database-backed features built with reliable validation and clear structure.",
    points: [
      "RESTful API development with ASP.NET Web API",
      "Node.js and TypeScript backend fundamentals",
      "PostgreSQL, Prisma, Oracle PL/SQL, and MySQL",
      "Authentication, validation, and CRUD-heavy systems",
    ],
  },
  {
    id: "solver",
    label: "Problem Solver",
    icon: "lightbulb",
    code: "LOGIC_SOLVER",
    strap: "Learning & Problem Solving",
    body: "I enjoy breaking real-world problems into workable systems, whether that means debugging application logic, improving data flow, or learning new tools quickly inside collaborative development environments.",
    points: [
      "Object-oriented programming and DSA foundations",
      "Adaptable across frontend, backend, and database work",
      "Collaborative teamwork and practical communication",
      "Interest in machine learning and data analysis",
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
    skills: ["C++", "Java", "C#", "JavaScript", "PHP", "Python", "TypeScript"],
  },
  {
    id: "frontend",
    number: "MODULE_02",
    title: "Frontend Systems",
    icon: "globe",
    badge: null,
    skills: [
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "DaisyUI",
      "Material UI",
      "shadcn/ui",
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
      "ASP.NET",
      "ASP.NET Web API",
      "ASP.NET MVC",
      "REST APIs",
      "TypeScript",
      "PHP",
    ],
  },
  {
    id: "data",
    number: "MODULE_04",
    title: "Data & Infrastructure",
    icon: "database",
    badge: "Structured",
    skills: ["PostgreSQL", "Prisma", "Oracle", "PL/SQL", "MySQL", "SQL Server"],
  },
] as const;

export const capabilities = [
  {
    title: "Frontend Architecture",
    icon: "code2",
    accent: "text-[var(--color-accent)]",
    description:
      "Modern responsive interfaces built with React, Next.js, TypeScript, and practical component patterns.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Interface Design",
    icon: "palette",
    accent: "text-[var(--color-accent)]",
    description:
      "UI work focused on clarity, responsiveness, and maintainable implementation rather than overdesigned complexity.",
    tags: ["Figma", "Material UI", "daisyUI", "shadcn/ui"],
  },
  {
    title: "Backend Engine",
    icon: "database",
    accent: "text-white",
    description:
      "Backend and API development across Node.js and ASP.NET with validation-heavy, database-driven application logic.",
    tags: ["Node.js", "ASP.NET", "REST API", "C#", "PHP", "TypeScript"],
  },
  {
    title: "Database Work",
    icon: "smartphone",
    accent: "text-[var(--color-accent)]",
    description: "Experience designing and querying relational data with Oracle, PostgreSQL, Prisma, MySQL, and SQL Server.",
    tags: ["Oracle", "PL/SQL", "PostgreSQL", "Prisma", "MySQL"],
  },
  {
    title: "Software Foundations",
    icon: "layers",
    accent: "text-[var(--color-accent)]",
    description:
      "Strong grounding in OOP, DSA, validation, and maintainable software structure across academic and project work.",
    tags: ["OOP", "DSA", "Validation", "CRUD", "MVC"],
  },
  {
    title: "Adaptability",
    icon: "zap",
    accent: "text-[var(--color-accent)]",
    description: "Comfortable learning new stacks quickly and contributing across frontend, backend, testing, and documentation work.",
    tags: ["Teamwork", "Testing", "MS Office", "Learning"],
  },
] as const;

export const projects = [
  {
    name: "Recipe Finder App",
    category: "Frontend App",
    stack: "HTML, CSS, Bootstrap, JavaScript",
    summary:
      "Recipe search application using a public API, live search, interactive DOM updates, highlighted keywords, and modal-based recipe details.",
    gradient: "from-emerald-900/25 to-blue-900/25",
    repoUrl: "https://github.com/arefin008/DOM-with-API-Project-Assignment-4",
  },
  {
    name: "Simple React E-commerce App",
    category: "E-commerce Frontend",
    stack: "React, Context API, Tailwind CSS",
    summary:
      "Responsive single-page e-commerce frontend with product search, sorting, cart management, and modal product detail views.",
    gradient: "from-orange-900/25 to-yellow-900/25",
    repoUrl: "https://github.com/arefin008/Assisgnment-5-E-commerce-App-with-react",
  },
  {
    name: "Online Quiz System",
    category: "Role-based Web App",
    stack: "ASP.NET MVC, SQL Server",
    summary:
      "Role-based quiz management application with CRUD operations, Entity Framework, DTOs, form validation, and user/admin authentication.",
    gradient: "from-fuchsia-900/25 to-pink-900/25",
    repoUrl: "https://github.com/arefin008/OnlineQuizSystem-with-Asp-dot-net",
  },
  {
    name: "Shopping List App",
    category: "Web API Project",
    stack: "ASP.NET Web API, C#, HTML, CSS",
    summary:
      "Categorized shopping list application with add, view, delete, status updates, sorting, price estimates, sharing, and filtering.",
    gradient: "from-sky-900/25 to-cyan-900/25",
    repoUrl: "https://github.com/arefin008/ShoppingListApp-With-Asp-dot-net-Web-Api",
  },
  {
    name: "Product & Customer Management",
    category: "Business Management System",
    stack: "ASP.NET MVC, C#, SQL Server",
    summary:
      "Product and customer management system with DTOs, Entity Framework, strong validation rules, and reliable database communication.",
    gradient: "from-green-900/25 to-emerald-900/25",
    repoUrl: "https://github.com/arefin008/ProductCustomerMamnagement-With-.Net-framework",
  },
  {
    name: "LandVitality",
    category: "Agriculture Platform",
    stack: "PHP, MySQL, JavaScript",
    summary:
      "MVC-style platform connecting farmers, consultants, and admins through multi-role workflows and agricultural support features.",
    gradient: "from-zinc-800 to-zinc-950",
    repoUrl:
      "https://github.com/arefin008/teaching-web-technologies-fall2023-2024-sec-e/tree/main/Final_Project/landvitality",
  },
  {
    name: "Birth Record Management System",
    category: "Database-focused System",
    stack: "Oracle 10g, PL/SQL, Core PHP",
    summary:
      "Birth record database system focused on efficient retrieval, secure CRUD operations, and query optimization in an MVC-style structure.",
    gradient: "from-violet-900/25 to-slate-950",
    repoUrl: "https://github.com/arefin008/Advanced-Database-Management-System-Final-Project",
  },
  {
    name: "Salary Prediction Using Data Analysis",
    category: "Machine Learning Project",
    stack: "Python, Pandas, Scikit-learn",
    summary:
      "Salary prediction workflow with data cleaning, feature engineering, EDA, Naive Bayes modeling, and train-test plus 10-fold validation.",
    gradient: "from-amber-900/25 to-zinc-950",
    repoUrl: "https://github.com/arefin008/Python_Project/tree/main/Final%20Term",
  },
] as const;

export const workHistory: ReadonlyArray<{
  period: string;
  role: string;
  company: string;
  model: string;
  side: "left" | "right";
  bullets: readonly string[];
}> = [
  {
    period: "Internship",
    role: "Web Development Intern",
    company: "Trodad International LTD.",
    model: "Professional Experience",
    side: "right",
    bullets: [
      "Worked in a professional web development environment while building practical implementation experience.",
      "Applied frontend and backend fundamentals to real application work.",
      "Strengthened collaboration habits, adaptability, and engineering discipline.",
    ],
  },
];

export const protocols = [
  {
    id: "deconstruct",
    phase: "Analysis Phase",
    title: "Deconstruct",
    icon: "search",
    accent: "text-sky-400",
    glow: "bg-sky-500/12",
    body: "I begin by understanding the actual problem, the expected user flow, and the data requirements before writing code.",
  },
  {
    id: "architect",
    phase: "Design Phase",
    title: "Architect",
    icon: "penTool",
    accent: "text-[var(--color-accent)]",
    glow: "bg-emerald-500/12",
    body: "I choose tools and structure based on the project scope, whether that means React on the frontend, ASP.NET for APIs, or a database-first approach.",
  },
  {
    id: "execute",
    phase: "Deployment Phase",
    title: "Execute",
    icon: "rocket",
    accent: "text-fuchsia-400",
    glow: "bg-fuchsia-500/12",
    body: "I aim for clean, maintainable implementation with validation, responsive behavior, and practical problem solving that holds up in real use.",
  },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/arefin008", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nasimul-arafin-rounok/",
    icon: "linkedin",
  },
  { label: "Phone", href: "tel:01707019447", icon: "phone" },
  { label: "Mail", href: "mailto:arefinrounok@gmail.com", icon: "mail" },
] as const;

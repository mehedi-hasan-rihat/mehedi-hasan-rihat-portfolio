export const site = {
  name: "Mehedi Hasan Rihat",
  role: "Full‑Stack Web Developer",
  tagline:
    "I build fast, accessible web products with React, Next.js, and the MERN stack — backed by PostgreSQL + Prisma.",
  location: "Dhaka, Bangladesh",
  email: "mehedi@example.com",
  resumePageHref: "/resume",
  resumePdfHref: null as string | null,
  socials: [
    { label: "GitHub", href: "https://github.com/your-username" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle/" },
    { label: "X", href: "https://x.com/your-handle" },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
    "REST APIs",
    "Git/GitHub",
    "Docker (Basics)",
  ],
  projects: [
    {
      title: "SaaS Dashboard",
      type: "Full‑Stack",
      description:
        "Multi-tenant dashboard with auth, billing-ready structure, and a clean component system.",
      stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
      href: "#",
      imageSrc: "/assets/project-dashboard.svg",
    },
    {
      title: "E‑Commerce Storefront",
      type: "Web App",
      description:
        "Fast product browsing, search, and checkout flow with a focus on UX and performance.",
      stack: ["React", "Node.js", "MongoDB"],
      href: "#",
      imageSrc: "/assets/project-store.svg",
    },
    {
      title: "Portfolio System",
      type: "Design + Dev",
      description:
        "A modular portfolio template you can extend with blogs, projects, and activity feeds.",
      stack: ["Next.js", "MDX (optional)"],
      href: "#",
      imageSrc: "/assets/project-portfolio.svg",
    },
  ],
  experience: [
    {
      company: "Freelance",
      role: "Full‑Stack Developer",
      location: "Remote",
      duration: "2024 — Present",
      bullets: [
        "Ship production web apps with Next.js + React and pragmatic backend architecture.",
        "Integrate APIs, databases, and authentication with a focus on security and DX.",
        "Improve Core Web Vitals via image optimization, code-splitting, and caching.",
      ],
      tools: ["Next.js", "React", "PostgreSQL", "Prisma", "Node.js"],
    },
    {
      company: "Internship / Contract",
      role: "Web Developer",
      location: "On-site / Remote",
      duration: "2023 — 2024",
      bullets: [
        "Built reusable UI components and page templates in a design-system mindset.",
        "Collaborated with designers to translate Figma into responsive UI quickly.",
      ],
      tools: ["React", "Tailwind", "Git", "Figma"],
    },
  ],
  blogs: [
    {
      title: "From Idea to MVP: Shipping Without Overthinking",
      category: "Product & Engineering",
      readTime: "4 min read",
      date: "Feb 4, 2026",
      excerpt:
        "What late nights, small bugs, and unfinished ideas taught me about building real projects.",
      tags: ["#MVP", "#Frontend", "#Iteration"],
      href: "#",
    },
    {
      title: "Prisma + Postgres: The Clean Way to Model Data",
      category: "Backend",
      readTime: "6 min read",
      date: "Jan 16, 2026",
      excerpt:
        "A practical approach to schema design, migrations, and query patterns that scale.",
      tags: ["#Prisma", "#PostgreSQL", "#SystemDesign"],
      href: "#",
    },
  ],
} as const;

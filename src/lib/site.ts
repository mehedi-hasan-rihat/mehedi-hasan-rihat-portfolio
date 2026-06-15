export const site = {
  name: "Mehedi Hasan Rihat",
  initials: "MHR",
  role: "Full‑Stack Web Developer",
  tagline:
    "Crafting high-performance web experiences with React, Next.js & the modern stack.",
  bio: "I design and build production-grade web applications that are fast, accessible, and built to scale. My approach combines clean architecture with thoughtful UI — shipping products that users love and teams can maintain.",
  location: "Dhaka, Bangladesh",
  email: "mehedi@example.com",
  availability: "Open to opportunities",
  avatar: "/assets/mehedi.jpeg",
  resumePageHref: "/resume",
  resumePdfHref: null as string | null,
  socials: [
    { label: "GitHub", href: "https://github.com/your-username", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle/", icon: "linkedin" },
    { label: "X", href: "https://x.com/your-handle", icon: "x" },
  ],
  skills: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Prisma", category: "ORM" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "REST APIs", category: "Architecture" },
    { name: "Git/GitHub", category: "Tooling" },
    { name: "Docker", category: "DevOps" },
  ],
  projects: [
    {
      title: "SaaS Dashboard",
      type: "Full‑Stack",
      description:
        "Multi-tenant analytics dashboard with role-based auth, billing integration, and a modular component system built for scale.",
      stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
      href: "#",
      imageSrc: "/assets/project-dashboard.svg",
      year: "2025",
    },
    {
      title: "E‑Commerce Storefront",
      type: "Web App",
      description:
        "Lightning-fast product browsing with optimistic UI, instant search, and a streamlined checkout flow focused on conversion.",
      stack: ["React", "Node.js", "MongoDB", "Stripe"],
      href: "#",
      imageSrc: "/assets/project-store.svg",
      year: "2024",
    },
    {
      title: "Portfolio System",
      type: "Design + Dev",
      description:
        "A modular, animated portfolio template with MDX blog support, project showcases, and activity feeds — fully customizable.",
      stack: ["Next.js", "GSAP", "Three.js", "MDX"],
      href: "#",
      imageSrc: "/assets/project-portfolio.svg",
      year: "2024",
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
        "Improve Core Web Vitals via image optimization, code-splitting, and caching strategies.",
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
        "Collaborated with designers to translate Figma mockups into responsive, pixel-perfect UI.",
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
  stats: {
    projects: "10+",
    experience: "2+",
    clients: "15+",
    commits: "1.2K+",
  },
} as const;

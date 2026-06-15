/**
 * Computes a human-readable duration string from a start date to now.
 * e.g. "Mar 2025 — Present · ~1.5 years"
 */
export function getDuration(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const years = months / 12;

  const startStr = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  if (years < 1) {
    return `${startStr} — Present · ${months} month${months !== 1 ? "s" : ""}`;
  }

  const rounded = Math.round(years * 2) / 2; // round to nearest 0.5
  return `${startStr} — Present · ~${rounded} year${rounded !== 1 ? "s" : ""}`;
}

export const site = {
  name: "Mehedi Hasan Rihat",
  initials: "MHR",
  role: "Software Developer",
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
      company: "Nexbell Inc.",
      product: "Sellzzy — E-commerce Builder Platform",
      role: "Frontend Developer",
      location: "Remote",
      startDate: "2025-03",
      duration: null, // computed dynamically
      bullets: [
        "Built core modules including Order Management, Customer Management, Courier Management, and Store Dashboard — directly impacting merchant workflow efficiency.",
        "Improved frontend performance using Next.js (SSR, SSG, ISR), achieving faster page loads and SEO-friendly storefront rendering.",
        "Implemented automated end-to-end testing with Playwright, improving stability and reducing production bugs in critical user flows.",
        "Set up Storybook for component documentation, enabling consistent UI development and streamlined design-engineering collaboration.",
        "Designed and implemented responsive, reusable UI components with React and Next.js, improving design consistency across the entire platform.",
        "Applied caching strategies and optimized data-fetching flows, reducing unnecessary re-renders and improving page speed metrics.",
        "Integrated REST APIs for dynamic data handling across both storefront and admin dashboard systems.",
        "Collaborated with product and backend teams to translate complex SaaS requirements into scalable, maintainable frontend solutions.",
        "Contributed to frontend architecture improvements, enhancing codebase maintainability and long-term scalability.",
      ],
      tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "SSR/SSG/ISR", "Playwright", "Storybook"],
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
    experience: "1.5+",
    clients: "15+",
    commits: "1.2K+",
  },
} as const;

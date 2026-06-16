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
    return `${startStr} to Present (${months} month${months !== 1 ? "s" : ""})`;
  }

  const rounded = Math.round(years * 2) / 2;
  return `${startStr} to Present (~${rounded} year${rounded !== 1 ? "s" : ""})`;
}

export const site = {
  name: "Mehedi Hasan Rihat",
  initials: "MHR",
  role: "Software Developer",
  tagline:
    "Building reliable software. Web apps, APIs, clean code and a passion for learning.",
  bio: "I'm a software developer who enjoys building things end-to-end. From UI to backend, I like writing clean readable code and solving real problems. Always learning, always improving.",
  location: "Dhaka, Bangladesh",
  email: "mehedi6381@gmail.com",
  availability: "Open to opportunities",
  avatar: "/assets/mehedi.jpeg",
  avatar_about: "/assets/mehedi_afa.jpeg",
  resumePageHref: "/resume",
  resumePdfHref: null as string | null,
  socials: [
    { label: "GitHub", href: "https://github.com/mehedi-hasan-rihat", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mehedi-hasan-rihat/", icon: "linkedin" },
    { label: "Medium", href: "https://medium.com/@mehedidevlog", icon: "Medium" },
  ],
  skills: [
    // Frontend
    { name: "React",          category: "Frontend" },
    { name: "Next.js",        category: "Frontend" },
    { name: "Tailwind CSS",   category: "Frontend" },
    { name: "HTML & CSS",     category: "Frontend" },

    // Language
    { name: "TypeScript",     category: "Language" },
    { name: "JavaScript",     category: "Language" },
    { name: "Python",         category: "Language" },
    // Backend
    { name: "Node.js",        category: "Backend" },
    { name: "Express",        category: "Backend" },
    { name: "MongoDB",        category: "Backend" },
    { name: "MySQL",          category: "Backend" },
    { name: "PostgreSQL",     category: "Backend" },
    { name: "Prisma",         category: "Backend" },
    // Tooling
    { name: "Git & GitHub",   category: "Tooling" },
    { name: "Docker",         category: "Tooling" },
    { name: "Playwright",     category: "Tooling" },
    { name: "Storybook",      category: "Tooling" },
  ],
  projects: [
    {
      title: "SaaS Dashboard",
      type: "Full‑Stack",
      description:
        "A dashboard app with user auth, data tables, and basic analytics. Built to practice full-stack skills with Next.js and PostgreSQL.",
      stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
      href: "#",
      imageSrc: "/assets/project-dashboard.svg",
      year: "2025",
    },
    {
      title: "E‑Commerce Storefront",
      type: "Web App",
      description:
        "A simple online store with product listings, a cart, and a checkout page. Integrated with Stripe to handle payments.",
      stack: ["React", "Node.js", "MongoDB", "Stripe"],
      href: "#",
      imageSrc: "/assets/project-store.svg",
      year: "2024",
    },
    {
      title: "Portfolio System",
      type: "Design + Dev",
      description:
        "My personal portfolio built from scratch with smooth animations and a blog section. A fun project to practice GSAP and Next.js.",
      stack: ["Next.js", "GSAP", "Three.js", "MDX"],
      href: "#",
      imageSrc: "/assets/project-portfolio.svg",
      year: "2024",
    },
  ],
  experience: [
    {
      company: "Nexbell Inc.",
      product: "Sellzzy - E-commerce Builder Platform",
      role: "Frontend Developer",
      location: "Remote",
      startDate: "2025-03",
      duration: null, // computed dynamically
      bullets: [
        "Helped build core modules including Order Management, Customer Management, Courier Management, and Store Dashboard.",
        "Worked with Next.js features like SSR and SSG to improve page load speed and SEO.",
        "Wrote end-to-end tests with Playwright to catch bugs in key user flows before they hit production.",
        "Used Storybook to document UI components and keep the design consistent across the platform.",
        "Built responsive, reusable UI components with React and Tailwind CSS.",
        "Worked on caching and data-fetching to reduce unnecessary re-renders.",
        "Connected REST APIs to display dynamic data in both the storefront and admin dashboard.",
        "Collaborated with product and backend teammates to understand requirements and turn them into working features.",
        "Made small improvements to the frontend codebase to keep things organized and easier to maintain.",
      ],
      tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "SSR/SSG/ISR", "Playwright", "Storybook"],
    },
  ],
  blogs: [
    {
      title: "Why React Context and State Stores Behave Differently When Rendering Components",
      category: "Software Dev",
      readTime: "3 min read",
      date: "June 5, 2026",
      excerpt:
        "If you’ve spent time in React, you’ve probably noticed a recurring claim: Context causes unnecessary re-renders, while libraries like Redux, Zustand, Jotai, or MobX feel more optimized.",
      tags: ["#Frontend", "#Next.js", "#React"],
      href: "https://mehedidevlog.medium.com/why-react-context-and-state-stores-behave-differently-when-rendering-components-78ba283d1ad7",
    },
    {
      title: "Understanding SSR, CSR, Server Components, and Client Components in Next.js (The Right Way)",
      category: "Frontend",
      readTime: "6 min read",
      date: "Jan 16, 2026",
      excerpt:
        "Modern Next.js has fundamentally changed how we build React applications. If you learned React through traditional single-page apps (SPAs), concepts like Server Components, hydration, “use client”, and the mix of SSR and CSR can feel confusing and overlapping.",
              tags: ["#Nextjs", "#Rendering", "#Frontend"],
      href: "https://mehedidevlog.medium.com/understanding-ssr-csr-server-components-and-client-components-in-next-js-the-right-way-6a2342afd6ab",
    },
  ],
  stats: {
    projects: "5+",
    experience: "1+",
    clients: "3+",
    commits: "300+",
  },
} as const;

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Blogs",      href: "#blogs" },
  { label: "Contact",    href: "#connect" },
];

const STACK = ["Next.js", "TypeScript", "Tailwind", "GSAP"];

export function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const emailRef   = useRef<HTMLAnchorElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── big heading ── */
      const words = headingRef.current?.querySelectorAll(".foot-word") ?? [];
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 95%" },
      });

      /* ── email ── */
      gsap.set(emailRef.current, { opacity: 0, yPercent: 20 });
      gsap.to(emailRef.current, {
        opacity: 1, yPercent: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: emailRef.current, start: "top 98%" },
      });

      /* ── rule sweep ── */
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(ruleRef.current, {
        scaleX: 1, duration: 1, ease: "power4.inOut",
        scrollTrigger: { trigger: ruleRef.current, start: "top 100%" },
      });

      /* ── bottom items ── */
      const items = footerRef.current?.querySelectorAll(".foot-item") ?? [];
      gsap.set(items, { opacity: 0, yPercent: 16 });
      gsap.to(items, {
        opacity: 1, yPercent: 0,
        stagger: 0.08, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ruleRef.current, start: "top 100%" },
      });
    });

    return () => ctx.revert();
  }, []);

  const headingWords = ["Let's", "Work", "Together"];

  return (
    <footer
      ref={footerRef}
      className="relative px-6 md:px-16 lg:px-24 pt-24 pb-10 border-t border-zinc-800/40"
    >
      {/* ── Big CTA heading ─────────────────────────────────────── */}
      <div ref={headingRef} className="mb-10">
        <div className="flex flex-wrap gap-x-6 gap-y-0">
          {headingWords.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className="foot-word block font-black uppercase text-white leading-[0.85] tracking-[-0.04em] will-change-transform"
                style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)" }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Email CTA ───────────────────────────────────────────── */}
      <a
        ref={emailRef}
        href={`mailto:${site.email}`}
        className="group inline-flex items-center gap-3 mb-16 opacity-0"
      >
        <span className="text-base md:text-lg text-zinc-400 font-mono group-hover:text-white transition-colors duration-300">
          {site.email}
        </span>
        <svg
          className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>

      {/* ── Mid grid: nav + socials ──────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-16">
        {/* Nav */}
        <div>
          <p className="foot-item text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-5">
            Navigation
          </p>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="foot-item block text-sm text-zinc-500 hover:text-white transition-colors duration-300 hover-line w-fit"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <p className="foot-item text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-5">
            Find Me On
          </p>
          <ul className="space-y-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foot-item group flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-300 w-fit"
                >
                  <span className="hover-line">{s.label}</span>
                  <svg
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-1 transition-all duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Built with */}
        <div className="hidden md:block">
          <p className="foot-item text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-5">
            Built With
          </p>
          <ul className="space-y-3">
            {STACK.map((tech) => (
              <li key={tech} className="foot-item text-sm text-zinc-600 font-mono">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Rule ────────────────────────────────────────────────── */}
      <div ref={ruleRef} className="h-px w-full bg-zinc-800 mb-6" />

      {/* ── Bottom strip ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="foot-item text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            {site.name}
          </span>
          <span className="foot-item text-zinc-700">·</span>
          <span className="foot-item text-[10px] font-mono uppercase tracking-widest text-zinc-600">
            {site.location}
          </span>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="foot-item group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors duration-300"
        >
          Back to top
          <svg
            className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <span className="foot-item text-[10px] font-mono uppercase tracking-widest text-zinc-600">
          © {new Date().getFullYear()} — Designed & Built by {site.initials}
        </span>
      </div>
    </footer>
  );
}

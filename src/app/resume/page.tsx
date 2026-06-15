"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site, getDuration } from "@/lib/site";
import Link from "next/link";

export default function ResumePage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const sections = pageRef.current?.querySelectorAll(".resume-section") || [];
      gsap.set(sections, { yPercent: 15, clipPath: "inset(10% 0 0 0)" });
      gsap.to(sections, {
        yPercent: 0,
        clipPath: "inset(0% 0 0 0)",
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Header
      const header = pageRef.current?.querySelector(".resume-header");
      if (header) {
        gsap.set(header, { clipPath: "inset(0 0 100% 0)" });
        gsap.to(header, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 text-sm mb-12 group"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L3 12m0 0l4-5m-4 5h18" />
          </svg>
          <span className="uppercase tracking-wider text-xs">Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="resume-header mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <span className="text-[11px] text-zinc-600 uppercase tracking-[0.3em] font-mono block mb-3">
                Resume
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
                {site.name}
              </h1>
              <p className="mt-3 text-lg text-zinc-400 font-light">
                {site.role}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 text-sm text-zinc-500">
              <span className="font-mono">{site.email}</span>
              <span>{site.location}</span>
              <div className="flex gap-4 mt-1">
                {site.socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-white transition-colors duration-300 text-xs uppercase tracking-wider"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="h-px bg-zinc-800" />
        </div>

        {/* Summary */}
        <div className="resume-section mb-16">
          <h2 className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono mb-4">
            Summary
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
            {site.bio}
          </p>
        </div>

        {/* Experience */}
        <div className="resume-section mb-16">
          <h2 className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono mb-8">
            Experience
          </h2>
          <div className="space-y-12">
            {site.experience.map((exp, i) => (
              <div key={i} className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                <div className="text-sm text-zinc-600 font-mono pt-1">
                  {exp.duration ?? getDuration(exp.startDate)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <div className="text-sm text-zinc-400 mb-1">
                    {exp.company} · {exp.location}
                  </div>
                  {exp.product && (
                    <div className="text-xs text-zinc-600 italic mb-4">{exp.product}</div>
                  )}
                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-zinc-600 mt-0.5 shrink-0">→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map((tool, j) => (
                      <span
                        key={j}
                        className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="resume-section mb-16">
          <h2 className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono mb-8">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {site.skills.map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 border border-zinc-800/60 bg-zinc-900/30"
              >
                <span className="text-[10px] text-zinc-700 font-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-zinc-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="resume-section mb-16">
          <h2 className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono mb-8">
            Selected Projects
          </h2>
          <div className="space-y-8">
            {site.projects.map((project, i) => (
              <div key={i} className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                <div className="text-sm text-zinc-600 font-mono pt-1">
                  {project.year}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-wider border border-zinc-800 px-2 py-0.5">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, j) => (
                      <span
                        key={j}
                        className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download */}
        <div className="resume-section pt-8 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {site.resumePdfHref ? (
              <a
                href={site.resumePdfHref}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PDF</span>
              </a>
            ) : (
              <div className="px-6 py-4 border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-500">
                PDF resume not configured yet — set <code className="text-zinc-400 font-mono">resumePdfHref</code> in site.ts
              </div>
            )}
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-700 text-white font-semibold text-sm uppercase tracking-wider hover:border-zinc-400 transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

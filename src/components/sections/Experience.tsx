"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, getDuration } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading clip
      gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.to(headingRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Experience cards
      const items = sectionRef.current?.querySelectorAll(".exp-card") || [];
      items.forEach((item) => {
        const timeline = item.querySelector(".exp-timeline");
        const content = item.querySelector(".exp-content");

        // Timeline bar draws down
        gsap.set(timeline, { scaleY: 0, transformOrigin: "top" });
        gsap.to(timeline, {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%" },
        });

        // Content wipes in from left
        gsap.set(content, { xPercent: 15, clipPath: "inset(0 0 0 30%)" });
        gsap.to(content, {
          xPercent: 0,
          clipPath: "inset(0 0 0 0%)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 78%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-[11px] text-zinc-600 uppercase tracking-[0.3em] font-mono">
            04 / Experience
          </span>
        </div>

        <div className="overflow-hidden mb-20">
          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]"
          >
            Where I&apos;ve
            <br />
            <span className="text-zinc-500">Worked</span>
          </h2>
        </div>

        {/* Experience list */}
        <div className="space-y-16 max-w-4xl">
          {site.experience.map((exp, index) => (
            <div key={index} className="exp-card relative grid grid-cols-[3px_1fr] gap-8 group">
              {/* Timeline bar */}
              <div className="exp-timeline relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-zinc-500 to-zinc-800 rounded-full" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-zinc-900" />
              </div>

              {/* Content */}
              <div className="exp-content pb-8">
                {/* Duration badge */}
                <div className="inline-block mb-4 px-3 py-1 border border-zinc-800 text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
                  {exp.duration ?? getDuration(exp.startDate)}
                </div>

                {/* Role + Company */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform duration-500">
                  {exp.role}
                </h3>
                <div className="flex flex-col gap-1 mb-6">
                  <div className="flex items-center gap-3 text-zinc-500 text-sm">
                    <span className="font-medium text-zinc-400">{exp.company}</span>
                    <span className="text-zinc-700">·</span>
                    <span>{exp.location}</span>
                  </div>
                  {exp.product && (
                    <span className="text-xs text-zinc-600 italic">{exp.product}</span>
                  )}
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-500 text-sm leading-relaxed">
                      <span className="text-zinc-600 mt-0.5 shrink-0">→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {exp.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-zinc-600 border border-zinc-800/60 px-2.5 py-1 font-mono"
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
    </section>
  );
}

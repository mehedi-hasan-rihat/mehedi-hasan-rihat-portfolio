"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, getDuration } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(ruleRef.current, {
        scaleX: 1, duration: 1, ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const words = headingRef.current?.querySelectorAll(".ex-word") ?? [];
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0, stagger: 0.08, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 78%" },
      });

      const cards = sectionRef.current?.querySelectorAll(".exp-card") ?? [];
      cards.forEach((card) => {
        const bar     = card.querySelector(".exp-bar");
        const content = card.querySelector(".exp-content");
        gsap.set(bar,     { scaleY: 0, transformOrigin: "top" });
        gsap.set(content, { opacity: 0, xPercent: 8 });
        gsap.to(bar,     { scaleY: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 82%" } });
        gsap.to(content, { opacity: 1, xPercent: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 80%" } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative px-6 md:px-16 lg:px-24 py-28 md:py-36">

      <div ref={ruleRef} className="h-px w-full bg-zinc-800 mb-10" />

      <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-10">
        03 / Experience
      </p>

      {/* Heading — full width with section number pushed right */}
      <div ref={headingRef} className="flex items-end justify-between mb-20 border-b border-zinc-800/50 pb-10">
        <div className="flex flex-wrap gap-x-5 gap-y-0">
          {["Where I've", "Worked"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className={`ex-word block font-black uppercase leading-[0.85] tracking-[-0.04em] will-change-transform ${i === 1 ? "text-zinc-500" : "text-white"}`}
                style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
        <span className="hidden lg:block text-[10px] font-mono uppercase tracking-widest text-zinc-700 self-end pb-2">
          {site.experience.length} position{site.experience.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Experience list */}
      <div className="space-y-16 max-w-4xl">
        {site.experience.map((exp, i) => (
          <div key={i} className="exp-card grid grid-cols-[2px_1fr] gap-8 group">

            {/* Timeline bar */}
            <div className="exp-bar relative self-stretch">
              <div className="absolute inset-0 bg-linear-to-b from-white via-zinc-600 to-zinc-800 rounded-full" />
              <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-white border-2 border-[#0a0a0a]" />
            </div>

            {/* Content */}
            <div className="exp-content pb-8">
              {/* Duration */}
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 border border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {exp.duration ?? getDuration(exp.startDate)}
                </span>
              </div>

              {/* Role */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform duration-500">
                {exp.role}
              </h3>

              {/* Company + location */}
              <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-zinc-500">
                <span className="text-zinc-300 font-medium">{exp.company}</span>
                <span className="text-zinc-700">·</span>
                <span>{exp.location}</span>
              </div>
              {exp.product && (
                <p className="text-xs text-zinc-600 italic mb-6">{exp.product}</p>
              )}

              {/* Bullets */}
              <ul className="space-y-2.5 mb-6">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-zinc-500 leading-relaxed">
                    <span className="text-zinc-700 mt-1 shrink-0">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tools */}
              <div className="flex flex-wrap gap-2">
                {exp.tools.map((t, j) => (
                  <span key={j} className="text-[10px] font-mono text-zinc-600 border border-zinc-800/60 px-2.5 py-1 hover:text-zinc-400 hover:border-zinc-700 transition-colors duration-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

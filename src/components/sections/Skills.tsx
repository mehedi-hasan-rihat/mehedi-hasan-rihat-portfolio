"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

// Group skills by category
const grouped = site.skills.reduce<Record<string, string[]>>((acc, s) => {
  (acc[s.category] ??= []).push(s.name);
  return acc;
}, {});

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(ruleRef.current, {
        scaleX: 1, duration: 1, ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const words = headingRef.current?.querySelectorAll(".sk-word") ?? [];
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0, stagger: 0.08, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 78%" },
      });

      const rows = listRef.current?.querySelectorAll(".skill-row") ?? [];
      gsap.set(rows, { opacity: 0, yPercent: 20 });
      gsap.to(rows, {
        opacity: 1, yPercent: 0, stagger: 0.09, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative px-6 md:px-16 lg:px-24 py-28 md:py-36">

      <div ref={ruleRef} className="h-px w-full bg-zinc-800 mb-10" />

      <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-10">
        02 / Skills
      </p>

      <div className="grid lg:grid-cols-12 gap-16">

        {/* Heading + description — RIGHT side */}
        <div className="lg:col-start-9 lg:col-span-4 lg:text-right">
          <div ref={headingRef} className="mb-8">
            {["Tools &", "Stack"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span
                  className={`sk-word block font-black uppercase leading-[0.85] tracking-[-0.03em] will-change-transform ${i === 1 ? "text-zinc-500" : "text-white"}`}
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Technologies I use to build, ship, and maintain software — front to back.
          </p>
        </div>

        {/* Grouped skill list — spans full width below heading on lg */}
        <div ref={listRef} className="lg:col-span-12 space-y-0 divide-y divide-zinc-800/60">
          {Object.entries(grouped).map(([category, skills]) => (
            <div key={category} className="skill-row flex flex-col sm:flex-row sm:items-start gap-4 py-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 sm:w-36 shrink-0 pt-0.5">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 border border-zinc-800 text-sm text-zinc-300 font-medium hover:border-zinc-500 hover:text-white transition-all duration-300"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/site";
import { useInView } from "@/lib/useInView";

const CATEGORY_ORDER = ["Frontend", "Language", "Backend", "Tooling"];

const grouped = CATEGORY_ORDER.reduce<Record<string, typeof site.skills[number][]>>(
  (acc, cat) => { acc[cat] = site.skills.filter((s) => s.category === cat); return acc; },
  {}
);

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useInView(sectionRef, () => {
    const words = headingRef.current?.querySelectorAll(".sk-word") ?? [];
    const cards = gridRef.current?.querySelectorAll(".skill-card") ?? [];

    gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.set(cards, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(ruleRef.current, { scaleX: 1, duration: 1, ease: "power4.inOut" });
    tl.to(words, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 1.1, ease: "expo.out" }, "-=0.6");
    tl.to(cards, { opacity: 1, y: 0, stagger: { amount: 0.5, from: "start" }, duration: 0.6 }, "-=0.5");
  }, { threshold: 0.1 });

  return (
    <section ref={sectionRef} id="skills" className="relative px-6 md:px-16 lg:px-24 py-28 md:py-36">

      <div ref={ruleRef} className="h-px w-full bg-zinc-800 mb-10" style={{ transform: "scaleX(0)", transformOrigin: "left" }} />

      <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-10">
        02 / Skills
      </p>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div ref={headingRef} className="flex flex-wrap gap-x-4 gap-y-0">
          {["Tech", "Stack"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className={`sk-word block font-black uppercase leading-[0.85] tracking-[-0.04em] will-change-transform ${i === 1 ? "text-zinc-500" : "text-white"}`}
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)", opacity: 0 }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-xs md:text-right">
          Tools and technologies I use to build, ship, and maintain software — front to back.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-800/60">
        {CATEGORY_ORDER.map((category) => (
          <div key={category} className="bg-[#0a0a0a] p-5 flex flex-col gap-4">
            <p className="skill-card text-[9px] font-mono uppercase tracking-[0.35em] text-zinc-600 pb-3 border-b border-zinc-800" style={{ opacity: 0 }}>
              {category}
            </p>
            <ul className="space-y-2.5">
              {grouped[category]?.map((skill) => (
                <li key={skill.name} className="skill-card group flex items-center gap-2" style={{ opacity: 0 }}>
                  <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-zinc-400 transition-colors duration-300 shrink-0" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors duration-300">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

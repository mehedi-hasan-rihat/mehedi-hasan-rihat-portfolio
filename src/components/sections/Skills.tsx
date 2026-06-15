"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.to(headingRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Skill items — stagger in with scale and clip
      const items = gridRef.current?.querySelectorAll(".skill-pill") || [];
      gsap.set(items, { scale: 0.8, clipPath: "inset(20%)" });
      gsap.to(items, {
        scale: 1,
        clipPath: "inset(0%)",
        stagger: { amount: 0.8, grid: "auto", from: "start" },
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-[11px] text-zinc-600 uppercase tracking-[0.3em] font-mono">
            02 / Skills
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Heading */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden mb-8">
              <h2
                ref={headingRef}
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]"
              >
                Tools &
                <br />
                <span className="text-zinc-500">Stack</span>
              </h2>
            </div>
            <p className="text-base text-zinc-500 leading-relaxed max-w-md">
              Technologies I use daily to build performant, scalable applications — from concept to deployment.
            </p>
          </div>

          {/* Skills grid */}
          <div className="lg:col-span-7">
            <div ref={gridRef} className="flex flex-wrap gap-3">
              {site.skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-pill group relative px-6 py-4 border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-500 hover:bg-zinc-800/60 transition-all duration-500"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-zinc-700 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-zinc-200 font-medium group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                  <div className="absolute top-2 right-3 text-[9px] text-zinc-700 uppercase tracking-wider">
                    {skill.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for skills
      gsap.from(".skill-item", {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".skills-list",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen px-6 md:px-12 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Right side - Sticky */}
          <div className="lg:order-2 lg:sticky lg:top-32 lg:h-fit">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">
              Skills
            </h2>
            <div className="w-24 h-[2px] bg-white" />
            <p className="text-lg text-zinc-500 mt-8">
              Technologies and tools I work with
            </p>
          </div>

          {/* Left side - Scrolling list */}
          <div className="lg:order-1 skills-list space-y-6">
            {site.skills.map((skill, index) => (
              <div
                key={index}
                className="skill-item group border-b border-zinc-800 pb-6 hover:border-zinc-600 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-zinc-400 transition-colors">
                    {skill}
                  </h3>
                  <span className="text-zinc-600 font-mono text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

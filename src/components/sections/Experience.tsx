"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".experience-item", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".experience-list",
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
      id="experience"
      className="relative min-h-screen px-6 md:px-12 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Right side - Sticky */}
          <div className="lg:order-2 lg:sticky lg:top-32 lg:h-fit">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">
              Experience
            </h2>
            <div className="w-24 h-[2px] bg-white" />
          </div>

          {/* Left side - Scrolling timeline */}
          <div className="lg:order-1 experience-list space-y-16">
            {site.experience.map((exp, index) => (
              <div key={index} className="experience-item group">
                <div className="border-l-2 border-zinc-800 pl-8 group-hover:border-zinc-600 transition-colors">
                  {/* Duration */}
                  <div className="text-sm text-zinc-500 uppercase tracking-wider mb-4 font-mono">
                    {exp.duration}
                  </div>

                  {/* Role */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {exp.role}
                  </h3>

                  {/* Company */}
                  <div className="flex items-center gap-3 mb-6 text-zinc-500">
                    <span className="font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-500">
                        <span className="text-white mt-1">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-xs text-zinc-600 border border-zinc-800 px-2 py-1"
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
      </div>
    </section>
  );
}

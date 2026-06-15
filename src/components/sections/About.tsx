"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on right content
      gsap.to(".about-content", {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen px-6 md:px-12 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Sticky */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">
              About
            </h2>
            <div className="w-24 h-[2px] bg-white" />
          </div>

          {/* Right side - Scrolling content */}
          <div className="about-content space-y-12">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
                {site.tagline}
              </p>
              
              <p className="text-lg text-zinc-500 leading-relaxed">
                I specialize in building modern web applications with a focus on 
                performance, accessibility, and clean code architecture.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-zinc-800">
              <div>
                <div className="text-5xl font-black text-white mb-2">
                  {site.projects.length}+
                </div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">
                  Projects
                </div>
              </div>
              <div>
                <div className="text-5xl font-black text-white mb-2">
                  {site.experience.length}+
                </div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">
                  Years
                </div>
              </div>
              <div>
                <div className="text-5xl font-black text-white mb-2">
                  {site.skills.length}+
                </div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">
                  Skills
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="pt-12">
              <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2">
                Based in
              </div>
              <div className="text-2xl font-bold text-white">
                {site.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading — clip from bottom
      gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.to(headingRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Bio paragraphs stagger
      const paragraphs = bioRef.current?.querySelectorAll(".bio-line") || [];
      gsap.set(paragraphs, { yPercent: 80, clipPath: "inset(0 0 50% 0)" });
      gsap.to(paragraphs, {
        yPercent: 0,
        clipPath: "inset(0 0 0% 0)",
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: bioRef.current, start: "top 75%" },
      });

      // Stats reveal with counter-like feel
      const statItems = statsRef.current?.querySelectorAll(".stat-card") || [];
      gsap.set(statItems, { yPercent: 60, scale: 0.95, rotateX: -10 });
      gsap.to(statItems, {
        yPercent: 0,
        scale: 1,
        rotateX: 0,
        stagger: 0.12,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
      });

      // Image reveal with diagonal clip
      if (imageRef.current) {
        gsap.set(imageRef.current, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
        gsap.to(imageRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: imageRef.current, start: "top 75%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-[11px] text-zinc-600 uppercase tracking-[0.3em] font-mono">
            01 / About
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Left — Heading + Bio */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden mb-12">
              <h2
                ref={headingRef}
                className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]"
              >
                Building the
                <br />
                <span className="text-zinc-500">modern web</span>
              </h2>
            </div>

            <div ref={bioRef} className="space-y-6 max-w-2xl">
              <p className="bio-line text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
                {site.bio}
              </p>
              <p className="bio-line text-base text-zinc-500 leading-relaxed">
                Based in <span className="text-zinc-300">{site.location}</span> — available for
                freelance, contract, and full-time roles worldwide.
              </p>
            </div>
          </div>

          {/* Right — Profile Image */}
          <div className="lg:col-span-5 flex items-center">
            <div ref={imageRef} className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden group">
              <img
                src={site.avatar}
                alt={site.name}
                className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              {/* Border frame */}
              <div className="absolute inset-0 border border-zinc-700/40 group-hover:border-zinc-500/60 transition-colors duration-700" />
              {/* Corner accent */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                  {site.location}
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">
                  {site.initials}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24"
          style={{ perspective: "800px" }}
        >
          {Object.entries(site.stats).map(([key, value]) => (
            <div
              key={key}
              className="stat-card p-8 border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm hover:border-zinc-600 transition-colors duration-500 group"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:scale-105 transition-transform duration-500 origin-left">
                {value}
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

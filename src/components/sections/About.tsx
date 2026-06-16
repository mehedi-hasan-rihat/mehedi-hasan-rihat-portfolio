"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
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
                Building
                <br />
                <span className="text-zinc-500">software</span>
              </h2>
            </div>

            <div ref={bioRef} className="space-y-6 max-w-2xl">
              <p className="bio-line text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
                {site.bio}
              </p>
              <p className="bio-line text-base text-zinc-500 leading-relaxed">
                Based in <span className="text-zinc-300">{site.location}</span>. Open to
                junior roles, internships, and freelance opportunities.
              </p>
            </div>
          </div>

          {/* Right — Profile Image (Hero card style) */}
          <div className="lg:col-span-5 flex items-center">
            <div
              ref={imageRef}
              className="relative w-full aspect-4/5 overflow-hidden group"
              style={{ borderRadius: "4px" }}
            >
              <Image
                src={site.avatar}
                alt={site.name}
                fill
                className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent opacity-70" />

              {/* Border frame */}
              <div className="absolute inset-0 border border-zinc-700/50 group-hover:border-zinc-500/70 transition-colors duration-700" />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-zinc-800/60">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-mono leading-none mb-1">
                      {site.role}
                    </div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-[0.15em] font-mono leading-none">
                      {site.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Top-right corner bracket */}
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 border-t border-r border-zinc-600" />
              </div>
              {/* Bottom-left corner bracket */}
              <div className="absolute bottom-16 left-4">
                <div className="w-6 h-6 border-b border-l border-zinc-600" />
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

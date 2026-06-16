"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/site";
import { useInView } from "@/lib/useInView";
import Image from "next/image";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bioRef     = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useInView(sectionRef, () => {
    const words   = headingRef.current?.querySelectorAll(".about-word") ?? [];
    const lines   = bioRef.current?.querySelectorAll(".bio-line") ?? [];
    const dItems  = detailsRef.current?.querySelectorAll(".detail-item") ?? [];

    // Set hidden state right before animating
    gsap.set(ruleRef.current,  { scaleX: 0, transformOrigin: "left" });
    gsap.set(words,            { yPercent: 110, opacity: 0 });
    gsap.set(lines,            { yPercent: 40, opacity: 0 });
    gsap.set(dItems,           { opacity: 0, yPercent: 20 });
    if (imageRef.current) gsap.set(imageRef.current, { clipPath: "inset(0 100% 0 0)" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(ruleRef.current,  { scaleX: 1, duration: 1, ease: "power4.inOut" });
    tl.to(words,            { yPercent: 0, opacity: 1, stagger: 0.08, duration: 1.2, ease: "expo.out" }, "-=0.7");
    tl.to(imageRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power4.inOut" }, "-=1");
    tl.to(lines,            { yPercent: 0, opacity: 1, stagger: 0.12, duration: 1 }, "-=0.8");
    tl.to(dItems,           { opacity: 1, yPercent: 0, stagger: 0.1, duration: 0.7 }, "-=0.5");
  }, { threshold: 0.1 });

  return (
    <section ref={sectionRef} id="about" className="relative px-6 md:px-16 lg:px-24 py-28 md:py-36">

      <div ref={ruleRef} className="h-px w-full bg-zinc-800 mb-10" style={{ transform: "scaleX(0)", transformOrigin: "left" }} />

      <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-10">
        01 / About
      </p>

      <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-start">

        {/* LEFT */}
        <div className="lg:col-span-7 space-y-10">
          <div ref={headingRef} className="flex flex-wrap gap-x-5 gap-y-0">
            {["Building", "software"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span
                  className={`about-word block font-black uppercase leading-[0.85] tracking-[-0.04em] will-change-transform ${i === 1 ? "text-zinc-500" : "text-white"}`}
                  style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)", opacity: 0 }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>

          <div ref={bioRef} className="space-y-5 max-w-2xl">
            <p className="bio-line text-lg md:text-xl text-zinc-300 leading-relaxed font-light" style={{ opacity: 0 }}>
              {site.bio}
            </p>
            <p className="bio-line text-sm text-zinc-500 leading-relaxed" style={{ opacity: 0 }}>
              Based in <span className="text-zinc-300">{site.location}</span>. Open to junior roles, internships, and freelance opportunities.
            </p>
          </div>

          <div ref={detailsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-zinc-800">
            {[
              { label: "Role",     value: site.role },
              { label: "Location", value: site.location },
              { label: "Status",   value: site.availability },
            ].map(({ label, value }) => (
              <div key={label} className="detail-item" style={{ opacity: 0 }}>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-1">{label}</p>
                <p className="text-sm text-zinc-300">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="lg:col-span-5 flex items-start">
          <div
            ref={imageRef}
            className="relative w-full aspect-4/5 overflow-hidden group"
            style={{ borderRadius: "2px", clipPath: "inset(0 100% 0 0)" }}
          >
            <Image src={site.avatar} alt={site.name} fill className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent opacity-70" />
            <div className="absolute inset-0 border border-zinc-700/40 group-hover:border-zinc-500/60 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-zinc-800/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-mono leading-none mb-1">{site.role}</p>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-[0.15em] font-mono leading-none">{site.location}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">Available</span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4"><div className="w-5 h-5 border-t border-r border-zinc-600" /></div>
            <div className="absolute bottom-16 left-4"><div className="w-5 h-5 border-b border-l border-zinc-600" /></div>
          </div>
        </div>

      </div>
    </section>
  );
}

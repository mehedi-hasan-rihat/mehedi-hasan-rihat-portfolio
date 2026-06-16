"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Connect() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(ruleRef.current, {
        scaleX: 1, duration: 1, ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const words = headingRef.current?.querySelectorAll(".cn-word") ?? [];
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0, stagger: 0.1, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 72%" },
      });

      gsap.set(rightRef.current, { opacity: 0, yPercent: 16 });
      gsap.to(rightRef.current, {
        opacity: 1, yPercent: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 82%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="connect" className="relative px-6 md:px-16 lg:px-24 py-28 md:py-36">

      <div ref={ruleRef} className="h-px w-full bg-zinc-800 mb-10" />

      <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-10">
        05 / Contact
      </p>

      <div className="grid lg:grid-cols-12 gap-16 lg:gap-12">

        {/* Big heading */}
        <div className="lg:col-span-7">
          <div ref={headingRef}>
            {[
              { text: "Let's build", align: "" },
              { text: "something", align: "text-zinc-500" },
              { text: "real.", align: "lg:text-right" },
            ].map(({ text, align }, i) => (
              <div key={i} className={`overflow-hidden ${i === 2 ? "lg:text-right" : ""}`}>
                <span
                  className={`cn-word block font-black uppercase leading-[0.85] tracking-[-0.04em] will-change-transform ${i === 1 ? "text-zinc-500" : "text-white"}`}
                  style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — CTA + links */}
        <div ref={rightRef} className="lg:col-span-5 flex items-end opacity-0">
          <div className="w-full space-y-8">
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              Always open to hearing about new projects, ideas, or opportunities to collaborate on something meaningful.
            </p>

            {/* Primary CTA */}
            <MagneticButton>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors duration-300"
              >
                Get In Touch
                <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </MagneticButton>

            {/* Socials */}
            <div className="flex flex-wrap gap-5 pt-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono uppercase tracking-widest text-zinc-600 hover:text-white transition-colors duration-300 hover-line"
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* Email display */}
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2">Direct email</p>
              <a
                href={`mailto:${site.email}`}
                className="text-sm font-mono text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width  / 2) * 0.25,
      y: (e.clientY - r.top  - r.height / 2) * 0.25,
      duration: 0.4, ease: "power2.out",
    });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });

  return (
    <div ref={ref} className="inline-block" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

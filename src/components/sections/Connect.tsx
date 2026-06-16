"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Connect() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading lines reveal
      const lines = headingRef.current?.querySelectorAll(".connect-word") || [];
      gsap.set(lines, { yPercent: 130, rotateZ: 2 });
      gsap.to(lines, {
        yPercent: 0,
        rotateZ: 0,
        stagger: 0.12,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      // Content area
      gsap.set(contentRef.current, { yPercent: 20, clipPath: "inset(20% 0 0 0)" });
      gsap.to(contentRef.current, {
        yPercent: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-[11px] text-zinc-600 uppercase tracking-[0.3em] font-mono">
            06 / Contact
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Heading */}
          <div className="lg:col-span-7">
            <div ref={headingRef}>
              <div className="overflow-hidden">
                <h2 className="connect-word text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-white leading-[0.9]">
                  Let&apos;s build
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="connect-word text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-zinc-500 leading-[0.9]">
                  something
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="connect-word text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-white leading-[0.9]">
                  real.
                </h2>
              </div>
            </div>
          </div>

          {/* CTA area */}
          <div className="lg:col-span-5 flex items-end">
            <div ref={contentRef} className="w-full space-y-10">
              <p className="text-base text-zinc-500 leading-relaxed">
                I&apos;m always interested in hearing about new projects, creative ideas, or
                opportunities to be part of something meaningful.
              </p>

              {/* Email CTA */}
              <MagneticButton>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors duration-300"
                >
                  <span>Get In Touch</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </MagneticButton>

              {/* Social links */}
              <div className="flex flex-wrap gap-6 pt-4">
                {site.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider hover-line"
                  >
                    {social.label}
                  </a>
                ))}
              </div>

              {/* Email display */}
              <div className="pt-4 border-t border-zinc-800">
                <span className="text-[11px] text-zinc-600 uppercase tracking-wider block mb-2">
                  Email
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-zinc-400 hover:text-white transition-colors duration-300 font-mono text-sm"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={buttonRef}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

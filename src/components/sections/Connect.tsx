"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/site";

export function Connect() {
  return (
    <section
      id="connect"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-32"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-12">
          Let's Work
          <br />
          Together
        </h2>

        {/* CTA */}
        <MagneticButton>
          <a
            href={`mailto:${site.email}`}
            className="inline-block px-12 py-6 border-2 border-white text-white text-lg font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
          >
            Get In Touch
          </a>
        </MagneticButton>

        {/* Social links */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {site.socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors uppercase tracking-wider text-sm"
            >
              {social.label}
            </a>
          ))}
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
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
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

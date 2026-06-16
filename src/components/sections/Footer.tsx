"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import { LogoMinimal } from "../Logo";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll(".footer-item") || [];
      gsap.set(items, { yPercent: 40, clipPath: "inset(30% 0 0 0)" });
      gsap.to(items, {
        yPercent: 0,
        clipPath: "inset(0% 0 0 0)",
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-6 md:px-16 lg:px-24 border-t border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-center mb-12">
          {/* Logo */}
          <div className="footer-item">
            <div className="w-14 h-14 opacity-40 hover:opacity-100 transition-opacity duration-500">
              <LogoMinimal className="w-full h-full" />
            </div>
          </div>

          {/* Links */}
          <div className="footer-item flex flex-wrap justify-center gap-8">
            {site.socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-white transition-colors duration-300 text-xs uppercase tracking-wider hover-line"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <div className="footer-item flex justify-end">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-zinc-600 hover:text-white transition-colors duration-300 text-xs uppercase tracking-wider hover-line"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-item flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-900">
          <div className="text-zinc-700 text-xs font-mono">
            © {new Date().getFullYear()} {site.name}
          </div>
          <div className="text-zinc-700 text-xs font-mono">
            Designed & Built by me
          </div>
        </div>
      </div>
    </footer>
  );
}

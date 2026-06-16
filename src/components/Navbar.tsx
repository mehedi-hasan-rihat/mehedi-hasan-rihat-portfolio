"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoAnimated } from "./Logo";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  name: string;
}

export function Navbar({ }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isResume = pathname === "/resume";

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.4 },
      delay: 4.5,
    });

    gsap.set(logoRef.current, { xPercent: -50, clipPath: "inset(0 100% 0 0)" });
    tl.to(logoRef.current, { xPercent: 0, clipPath: "inset(0 0% 0 0)" });

    const links = linksRef.current?.querySelectorAll(".nav-link") || [];
    gsap.set(links, { yPercent: 100 });
    tl.to(links, { yPercent: 0, stagger: 0.08, duration: 0.8 }, "-=0.8");

    // Scroll-based background
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 flex items-center justify-between transition-[padding,border-color] duration-300 ${
        scrolled ? "py-4 border-b border-zinc-800/30" : "py-6 border-b border-transparent"
      }`}
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <Link
        ref={logoRef}
        href="/"
        className="block w-10 h-10 hover:scale-110 transition-transform duration-300"
      >
        <LogoAnimated className="w-full h-full" />
      </Link>

      <div ref={linksRef} className="flex items-center gap-8">
        {!isResume && (
          <>

            <div className="overflow-hidden">
              <a
                href="#about"
                className="nav-link block text-[11px] text-zinc-500 uppercase tracking-wider hover:text-white transition-colors duration-300"
              >
                About
              </a>
            </div>
          </>
        )}
        <div className="overflow-hidden">
          <Link
            href={isResume ? "/" : "/resume"}
            className="nav-link block text-[11px] text-zinc-500 uppercase tracking-wider hover:text-white transition-colors duration-300"
          >
            {isResume ? "Home" : "Resume"}
          </Link>
        </div>
        <div className="overflow-hidden">
          <a
            href={isResume ? "/#connect" : "#connect"}
            className="nav-link block text-[11px] text-zinc-500 uppercase tracking-wider hover:text-white transition-colors duration-300 border border-zinc-700 px-4 py-2 hover:border-zinc-400"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

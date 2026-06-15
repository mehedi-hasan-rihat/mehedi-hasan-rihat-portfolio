"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LogoAnimated } from "./Logo";

interface NavbarProps {
  name: string;
}

export function Navbar({ name }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 flex items-center justify-between"
    >
      <a href="/" className="block w-12 h-12 hover:opacity-70 transition-opacity">
        <LogoAnimated className="w-full h-full" />
      </a>

      <a
        href="#connect"
        className="text-sm text-zinc-500 uppercase tracking-wider hover:text-white transition-colors"
      >
        Contact
      </a>
    </nav>
  );
}

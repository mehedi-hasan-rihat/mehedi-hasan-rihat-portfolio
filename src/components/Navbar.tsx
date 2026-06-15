"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
      <a
        href="/"
        className="text-xl font-bold text-white uppercase tracking-wider hover:text-zinc-400 transition-colors"
      >
        {name.split(" ")[0]}
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

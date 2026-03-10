"use client";

import * as React from "react";
import { IconMenu } from "./icons";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#blogs", label: "Blogs" },
  { href: "#connect", label: "Connect" },
] as const;

export function Navbar({ name }: { name: string }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 w-full z-[100] transition-all duration-500",
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
      style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center relative py-5 md:py-6">
          <a href="#" className="flex flex-col group cursor-pointer select-none">
            <span className="font-extrabold text-xl uppercase tracking-tighter leading-none text-white">
              {name.split(" ")[0]}{" "}
              <span className="text-zinc-400 group-hover:text-white transition-colors duration-500">
                {name.split(" ").slice(1).join(" ")}
              </span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-400 mt-1.5 flex items-center gap-2">
              <span className="w-2 h-[1px] bg-white/30" />
              Full‑Stack Developer
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[12px] font-semibold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-white transition-colors rounded-lg hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <IconMenu width={22} height={22} />
            <span className="sr-only">Open menu</span>
          </button>

          <div
            id="mobile-nav"
            className={[
              "absolute top-full right-0 mt-4 w-56 bg-zinc-950 border border-white/10 rounded-2xl shadow-xl transition-all duration-300 ease-out origin-top-right",
              open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
            ].join(" ")}
          >
            <div className="flex flex-col p-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-4 py-3 text-sm font-bold tracking-tight text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

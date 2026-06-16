"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Blogs() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(ruleRef.current, {
        scaleX: 1, duration: 1, ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const words = headingRef.current?.querySelectorAll(".bl-word") ?? [];
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0, stagger: 0.08, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 78%" },
      });

      const items = listRef.current?.querySelectorAll(".blog-item") ?? [];
      gsap.set(items, { opacity: 0, yPercent: 16 });
      gsap.to(items, {
        opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blogs" className="relative px-6 md:px-16 lg:px-24 py-28 md:py-36">

      <div ref={ruleRef} className="h-px w-full bg-zinc-800 mb-10" />

      <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-10 text-center">
        04 / Writing
      </p>

      {/* Heading — centered */}
      <div ref={headingRef} className="flex flex-wrap justify-center gap-x-5 mb-16 text-center">
        {["Latest", "Articles"].map((word, i) => (
          <div key={i} className="overflow-hidden">
            <span
              className={`bl-word block font-black uppercase leading-[0.85] tracking-[-0.04em] will-change-transform ${i === 1 ? "text-zinc-500" : "text-white"}`}
              style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)" }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      {/* Blog list — horizontal rows */}
      <div ref={listRef} className="divide-y divide-zinc-800/60 max-w-4xl">
        {site.blogs.map((blog, i) => (
          <a
            key={i}
            href={blog.href}
            className="blog-item group flex flex-col md:flex-row md:items-start gap-4 py-8 hover:bg-zinc-900/20 -mx-4 px-4 transition-colors duration-300"
          >
            {/* Index */}
            <span className="text-[11px] font-mono text-zinc-700 md:w-10 shrink-0 mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Main */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                <span>{blog.date}</span>
                <span className="text-zinc-800">·</span>
                <span>{blog.readTime}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-zinc-200 group-hover:text-white transition-colors duration-300 leading-snug">
                {blog.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
                {blog.excerpt}
              </p>
            </div>

            {/* Right: category + arrow */}
            <div className="md:text-right shrink-0 flex md:flex-col items-center md:items-end justify-between gap-4">
              <span className="text-[10px] font-mono uppercase tracking-wider border border-zinc-800 px-2.5 py-1 text-zinc-600">
                {blog.category}
              </span>
              <svg
                className="w-4 h-4 text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

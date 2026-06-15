"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Blogs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading clip
      gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.to(headingRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Blog items — horizontal reveal
      const items = sectionRef.current?.querySelectorAll(".blog-card") || [];
      items.forEach((item, i) => {
        gsap.set(item, { clipPath: "inset(0 100% 0 0)", xPercent: -10 });
        gsap.to(item, {
          clipPath: "inset(0 0% 0 0)",
          xPercent: 0,
          duration: 1.3,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blogs"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-[11px] text-zinc-600 uppercase tracking-[0.3em] font-mono">
            05 / Writing
          </span>
        </div>

        <div className="overflow-hidden mb-20">
          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]"
          >
            Latest
            <br />
            <span className="text-zinc-500">Articles</span>
          </h2>
        </div>

        {/* Blog list */}
        <div className="space-y-6 max-w-4xl">
          {site.blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.href}
              className="blog-card group block p-8 border border-zinc-800/60 bg-zinc-900/20 backdrop-blur-sm hover:border-zinc-600 hover:bg-zinc-900/40 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[11px] text-zinc-600 uppercase tracking-wider font-mono">
                      {blog.date}
                    </span>
                    <span className="text-zinc-800">·</span>
                    <span className="text-[11px] text-zinc-600 font-mono">
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-500">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Category badge */}
                <div className="shrink-0">
                  <span className="text-[10px] text-zinc-600 uppercase tracking-wider border border-zinc-800 px-3 py-1.5">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Read more indicator */}
              <div className="mt-6 flex items-center gap-2 text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300">
                <span className="text-xs uppercase tracking-wider">Read Article</span>
                <svg
                  className="w-3.5 h-3.5 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

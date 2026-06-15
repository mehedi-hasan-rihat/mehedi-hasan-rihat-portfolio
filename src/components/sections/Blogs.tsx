"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Blogs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-item", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".blogs-list",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blogs"
      className="relative min-h-screen px-6 md:px-12 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Sticky */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">
              Writing
            </h2>
            <div className="w-24 h-[2px] bg-white" />
            <p className="text-lg text-zinc-500 mt-8">
              Thoughts on development, design, and technology
            </p>
          </div>

          {/* Right side - Scrolling blogs */}
          <div className="blogs-list space-y-12">
            {site.blogs.map((blog, index) => (
              <a
                key={index}
                href={blog.href}
                className="blog-item group block border-b border-zinc-800 pb-12 hover:border-zinc-600 transition-colors"
              >
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4 text-sm text-zinc-600 font-mono">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-zinc-400 transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-zinc-500 mb-4 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Category */}
                <div className="text-sm text-zinc-600 uppercase tracking-wider">
                  {blog.category}
                </div>
              </a>
            ))}

            {/* View all */}
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-white hover:text-zinc-400 transition-colors group/link"
            >
              <span className="text-sm uppercase tracking-wider">View All Articles</span>
              <svg
                className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

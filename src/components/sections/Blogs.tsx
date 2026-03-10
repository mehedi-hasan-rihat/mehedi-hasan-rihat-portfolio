import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

export function Blogs() {
  return (
    <section id="blogs" className="py-16 md:py-20 bg-black scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionHeading
          kicker="Blogs"
          title="Professional"
          emphasize="Insights"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {site.blogs.map((post) => (
            <a
              key={post.title}
              href={post.href}
              className="group cursor-pointer bg-zinc-950 border border-white/10 rounded-xl p-6 hover:border-white hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/5 text-white text-xs font-medium rounded-full border border-white/10">
                    {post.category}
                  </span>
                  <span className="text-xs text-zinc-400">{post.readTime}</span>
                </div>
                <span className="text-xs text-zinc-400">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-zinc-100 transition-colors">
                {post.title}
              </h3>
              <p className="text-zinc-400 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((t) => (
                  <span key={t} className="text-xs text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:underline">
                Read article <span aria-hidden>→</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-zinc-400">
            More articles and technical deep dives coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}


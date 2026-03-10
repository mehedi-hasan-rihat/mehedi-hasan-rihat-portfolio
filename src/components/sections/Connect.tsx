import { site } from "@/lib/site";
import { IconArrowRight, IconExternal } from "../icons";
import { SectionHeading } from "./SectionHeading";

export function Connect() {
  return (
    <section
      id="connect"
      className="py-24 bg-black relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute right-10 top-0 h-full hidden lg:block">
        <span
          className="text-[14vh] font-black text-zinc-50/50 select-none rotate-180 transition-all duration-1000"
          style={{ writingMode: "vertical-rl" }}
        >
          GET IN TOUCH
        </span>
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeading
          kicker="Available for work"
          title="Get In"
          emphasize="Touch"
        />

        <div className="space-y-0">
          <a
            href={`mailto:${site.email}`}
            className="group flex items-center py-6 border-b border-white/10 hover:border-white transition-all duration-500 overflow-hidden"
          >
            <span className="text-[10px] font-mono text-zinc-400 mr-8 group-hover:text-white transition-colors">
              01
            </span>
            <div className="relative flex-1 overflow-hidden h-8">
              <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-8">
                <span className="h-8 flex items-center text-lg font-bold uppercase tracking-widest text-zinc-200">
                  Email
                </span>
                <span className="h-8 flex items-center text-lg font-bold uppercase tracking-widest text-white italic">
                  Send Mail →
                </span>
              </div>
            </div>
            <IconArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:rotate-12 transition-all duration-500" />
          </a>

          {site.socials.map((s, idx) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center py-6 border-b border-white/10 hover:border-white transition-all duration-500 overflow-hidden"
            >
              <span className="text-[10px] font-mono text-zinc-400 mr-8 group-hover:text-white transition-colors">
                {String(idx + 2).padStart(2, "0")}
              </span>
              <div className="relative flex-1 overflow-hidden h-8">
                <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-8">
                  <span className="h-8 flex items-center text-lg font-bold uppercase tracking-widest text-zinc-200">
                    {s.label}
                  </span>
                  <span className="h-8 flex items-center text-lg font-bold uppercase tracking-widest text-white italic">
                    Open →
                  </span>
                </div>
              </div>
              <IconExternal className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:rotate-12 transition-all duration-500" />
            </a>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start">
          <p className="text-zinc-400 text-xs font-medium mb-6 uppercase tracking-[0.2em]">
            Based in {site.location}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-black uppercase tracking-tighter"
          >
            {site.email}
            <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
              <IconExternal className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}


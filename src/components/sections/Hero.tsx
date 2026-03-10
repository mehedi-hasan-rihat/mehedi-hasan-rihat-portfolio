import { site } from "@/lib/site";
import { IconArrowRight, IconDownload, IconExternal } from "../icons";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden pt-20">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255, 255, 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255, 255, 255) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="mb-10 transition-all duration-1000 opacity-100 translate-y-0">
          <div className="inline-flex items-center gap-3 px-3 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-zinc-300">
              Available for Projects
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-9">
            <div className="space-y-2 mb-8 transition-all duration-1000 delay-300 opacity-100 translate-x-0">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85]">
                {site.name.split(" ")[0]} <br />
                <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">
                  {site.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 transition-all duration-1000 delay-500 opacity-100 translate-y-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-white" />
                <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.3em] text-white">
                  Full‑Stack <span className="text-zinc-400 font-light">Web</span>{" "}
                  Developer
                </h2>
              </div>
              <p className="text-zinc-400 text-sm md:text-base max-w-sm leading-relaxed border-l border-white/10 pl-6">
                {site.tagline}
              </p>
            </div>

            <div className="mt-12 flex flex-row flex-wrap gap-4 transition-all duration-1000 delay-700 opacity-100">
              <a
                href={`mailto:${site.email}`}
                className="flex-1 md:flex-initial min-w-[180px] group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all duration-300 hover:pr-10 text-center flex items-center justify-center"
              >
                <div className="relative z-10 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                  Collaborate{" "}
                  <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              <a
                href={site.resumePageHref}
                className="flex-1 md:flex-initial min-w-[180px] flex items-center justify-center gap-2 px-8 py-4 bg-black border border-white text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Resume <IconDownload className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="hidden lg:col-span-3 lg:flex flex-col items-end gap-8">
            {site.socials.map((s, idx) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-zinc-400 transition-all duration-500"
                style={{ transitionDelay: `${800 + idx * 100}ms` }}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white">
                  {s.label}
                </span>
                <div className="p-3 rounded-full border border-transparent group-hover:border-white/10 group-hover:bg-white group-hover:text-black group-hover:rotate-[360deg] transition-all duration-500 ease-in-out">
                  <IconExternal className="w-5 h-5" />
                </div>
              </a>
            ))}
            <div className="h-24 w-[1px] bg-white/10 mr-[22px] mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}


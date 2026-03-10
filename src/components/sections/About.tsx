import { site } from "@/lib/site";
import { IconArrowRight } from "../icons";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section
      id="about"
      className="py-24 bg-black text-zinc-50 relative scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading kicker="Biography" title="What" emphasize="I Do" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative group w-full max-w-[320px]">
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-white/10 -z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-white/10 bg-zinc-950">
                <div
                  aria-label={`${site.name} photo`}
                  role="img"
                  className={[
                    "w-[calc(250px+8vw)] h-[calc(200px+7vw)]",
                    "bg-my_img my_img bg-center bg-cover bg-no-repeat",
                    "filter grayscale-[80%]",
                    "border border-white/10",
                    "transition-[filter,border-color,transform] duration-700 ease-out",
                    "group-hover:grayscale-[70%] group-hover:border-white/40 group-hover:scale-[1.02]",
                  ].join(" ")}
                />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-200">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[10px] font-mono text-zinc-300 px-3 uppercase tracking-[0.3em]">
                  Profile v.26
                </span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-1 h-1 bg-white rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                The Full‑Stack Builder
              </span>
            </div>
            <div className="space-y-5">
              <h3 className="text-3xl font-bold text-white leading-tight tracking-tight max-w-2xl">
                Building refined web products with a focus on{" "}
                <span className="text-zinc-400">functional minimalism</span> and
                scalable engineering.
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
                I bridge design and engineering: from clean UI systems to robust
                APIs and data models. I care about performance, accessibility,
                and maintainable code.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 py-8 border-y border-white/10">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-black">
                  Location
                </p>
                <p className="text-[13px] font-bold text-zinc-100">
                  {site.location}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-black">
                  Status
                </p>
                <p className="text-[13px] font-bold text-zinc-100">
                  Open to Work
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-1.5">
                {site.skills.slice(0, 6).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-bold px-3 py-1 bg-white/5 text-zinc-200 rounded border border-white/10 uppercase"
                  >
                    {s}
                  </span>
                ))}
                <span className="text-[10px] font-bold px-3 py-1 bg-white/5 text-zinc-200 rounded border border-white/10 uppercase">
                  +{site.skills.length - 6} More
                </span>
              </div>
              <a
                href="#connect"
                className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white border-b-2 border-white pb-1 hover:text-zinc-300 hover:border-white/40 transition-all"
              >
                Get In Touch{" "}
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

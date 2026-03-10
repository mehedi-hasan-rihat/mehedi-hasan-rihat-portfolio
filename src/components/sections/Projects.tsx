import Image from "next/image";
import { site } from "@/lib/site";
import { IconExternal } from "../icons";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-12 md:py-20 bg-black text-zinc-50 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading kicker="Portfolio" title="Featured" emphasize="Works" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {site.projects.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group cursor-pointer"
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 mb-5 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="absolute inset-0 p-6 flex items-center justify-center">
                  <Image
                    alt={p.title}
                    className="w-full h-full object-contain drop-shadow-md transition-transform duration-700 ease-out group-hover:scale-105"
                    src={p.imageSrc}
                    width={800}
                    height={600}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <span className="p-3 bg-black text-white rounded-full hover:scale-110 active:scale-95 transition-all">
                    <IconExternal className="w-[18px] h-[18px]" />
                  </span>
                </div>
              </div>
              <div className="space-y-2 px-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    {p.type}
                  </span>
                  <IconExternal className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-white">{p.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono font-bold text-zinc-200 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


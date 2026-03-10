import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-4">
            <h3 className="text-base font-black uppercase tracking-tighter mb-2 text-white">
              {site.name}
            </h3>
            <p className="text-[11px] font-mono text-zinc-300 font-bold uppercase tracking-widest leading-loose">
              {site.role}
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-center gap-8">
            <a
              href="#about"
              className="text-[11px] font-mono font-bold text-zinc-300 hover:text-white uppercase tracking-widest transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all group-hover:w-full" />
            </a>
            <a
              href="#projects"
              className="text-[11px] font-mono font-bold text-zinc-300 hover:text-white uppercase tracking-widest transition-colors relative group"
            >
              Work
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all group-hover:w-full" />
            </a>
            <a
              href="#connect"
              className="text-[11px] font-mono font-bold text-zinc-300 hover:text-white uppercase tracking-widest transition-colors relative group"
            >
              Connect
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all group-hover:w-full" />
            </a>
          </div>
          <div className="md:col-span-4 text-left md:text-right">
            <p className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-widest mb-1">
              © {new Date().getFullYear()} Global Edition
            </p>
            <p className="text-[11px] font-mono font-black text-white uppercase tracking-widest">
              All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


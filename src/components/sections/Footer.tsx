import { site } from "@/lib/site";
import { LogoMinimal } from "../Logo";

export function Footer() {
  return (
    <footer className="relative py-12 px-6 md:px-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo */}
          <div className="w-16 h-16">
            <LogoMinimal className="w-full h-full opacity-50" />
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {site.socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-white transition-colors text-sm uppercase tracking-wider"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-zinc-600 text-sm">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

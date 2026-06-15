import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative py-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {site.socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-wider"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

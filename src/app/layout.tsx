import type { Metadata } from "next";
import "./globals.css";
import { FancyCursor } from "@/components/FancyCursor";
import { ShaderBackground } from "@/components/ShaderBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageLoader } from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "Mehedi Hasan Rihat | Software Developer",
  description:
    "Portfolio of Mehedi Hasan Rihat. A software developer building web apps with React and Next.js.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#0a0a0a]">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: `html,body{background:#0a0a0a;color:#fafafa}` }} />
      </head>
      <body className="bg-[#0a0a0a] text-zinc-50 antialiased grain">
        <PageLoader />
        <ShaderBackground />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <FancyCursor />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { FancyCursor } from "@/components/FancyCursor";
import { ShaderBackground } from "@/components/ShaderBackground";

export const metadata: Metadata = {
  title: "Mehedi Hasan Rihat — Full‑Stack Web Developer",
  description:
    "Portfolio of Mehedi Hasan Rihat — React, Next.js, MERN, PostgreSQL, Prisma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-zinc-50 antialiased">
        <ShaderBackground />
        {children}
        <FancyCursor />
      </body>
    </html>
  );
}

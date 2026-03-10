import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}

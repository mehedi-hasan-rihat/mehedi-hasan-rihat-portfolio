import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import {
  About,
  Blogs,
  Connect,
  Experience,
  Footer,
  Hero,
  Projects,
  Skills,
} from "@/components/sections";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div id="top">
      <Navbar name={site.name} />
      <main className="relative z-10">
        <Hero />
        <div className="section-divider max-w-6xl mx-auto" />
        <About />
        <div className="section-divider max-w-6xl mx-auto" />
        <Skills />
        <div className="section-divider max-w-6xl mx-auto" />
        <Projects />
        <div className="section-divider max-w-6xl mx-auto" />
        <Experience />
        <div className="section-divider max-w-6xl mx-auto" />
        <Blogs />
        <div className="section-divider max-w-6xl mx-auto" />
        <Connect />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

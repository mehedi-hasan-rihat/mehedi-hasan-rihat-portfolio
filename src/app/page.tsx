import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import {
  About,
  Blogs,
  Connect,
  Experience,
  Footer,
  Hero,
  Skills,
} from "@/components/sections";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div id="top">
      <Navbar name={site.name} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Blogs />
        <Connect />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

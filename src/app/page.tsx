import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import {
  About,
  Activity,
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
      <Site />
    </div>
  );
}

function Site() {
  return (
    <>
      <Navbar name={site.name} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Activity />
        <Blogs />
        <Connect />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

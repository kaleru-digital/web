import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AgentFlow from "@/components/AgentFlow";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <AgentFlow />
        <Pricing />
        <Process />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}

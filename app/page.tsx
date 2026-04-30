import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Apps from "@/components/Apps";
import Services from "@/components/Services";
import UseCases from "@/components/UseCases";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LeiaBot from "@/components/LeiaBot";

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden grid-bg">
        <Navbar />
        <Hero />
      </div>
      <main>
        <Apps />
        <Services />
        <UseCases />
        <About />
        <Contact />
      </main>
      <Footer />
      <LeiaBot />
    </>
  );
}

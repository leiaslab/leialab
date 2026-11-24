import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Apps from "@/components/Apps";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LeiaBot from "@/components/LeiaBot";

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Services />
        <Apps />
        <Contact />
      </main>
      <Footer />
      <LeiaBot />
    </>
  );
}

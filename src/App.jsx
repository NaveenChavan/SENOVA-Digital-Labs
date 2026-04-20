import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FoundersSection from "./components/FoundersSection";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <div className="min-h-screen bg-[#0A1931] text-[#F6FAFD] font-sans selection:bg-[#4A7FA7]/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <FoundersSection />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;

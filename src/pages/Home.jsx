import useSeoMeta from "../hooks/useSeoMeta";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Services from "../components/Services";
import FoundersSection from "../components/FoundersSection";
import Offer from "../components/Offer";
import FAQBooking from "../components/FAQBooking";
import Contact from "../components/Contact";

const Home = () => {
  useSeoMeta({
    title: "SENOVA Digital Labs | Web Development & SaaS Company in Raichur",
    description:
      "SENOVA Digital Labs builds custom websites, SaaS products, and automation for businesses in Raichur and worldwide. Premium full-stack web development, MERN/React apps, and local SEO that gets you found.",
    canonical: "https://senovadigital.xyz/",
    ogUrl: "https://senovadigital.xyz/",
  });

  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <FoundersSection />
      <Offer />
      <FAQBooking />
      <Contact />
    </>
  );
};

export default Home;

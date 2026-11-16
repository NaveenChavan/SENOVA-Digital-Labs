import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Services from "../components/Services";
import FoundersSection from "../components/FoundersSection";
import Offer from "../components/Offer";
import FAQBooking from "../components/FAQBooking";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SENOVA Digital Labs | Web Development & SaaS Company in Raichur</title>
        <meta
          name="description"
          content="SENOVA Digital Labs builds custom websites, SaaS products, and automation for businesses in Raichur and worldwide. Premium full-stack web development, MERN/React apps, and local SEO that gets you found."
        />
        <link rel="canonical" href="https://www.senovadigital.xyz/" />
        <meta property="og:url" content="https://www.senovadigital.xyz/" />
      </Helmet>
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

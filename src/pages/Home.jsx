import Hero from "../components/Hero";
import UpcomingBanner from "../components/UpcomingBanner";
import FoundersSection from "../components/FoundersSection";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Offer from "../components/Offer";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <UpcomingBanner />
      <FoundersSection />
      <Services />
      <Portfolio />
      <Offer />
      <Contact />
    </>
  );
};

export default Home;

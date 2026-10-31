import SEO from "../components/SEO";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Services from "../components/Services";
import FoundersSection from "../components/FoundersSection";
import Offer from "../components/Offer";
import FAQBooking from "../components/FAQBooking";
import Contact from "../components/Contact";

const SITE_URL = "https://www.senovadigital.xyz";

// Organization + WebSite JSON-LD, built only from details the site itself
// publishes (name, URL, logo, email, phone, social profiles). Nothing
// here is invented.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "SENOVA Digital Labs",
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  email: "info@senovadigital.xyz",
  telephone: "+91-9731133425",
  sameAs: [
    "https://www.instagram.com/senovadigitallabs",
    "https://www.linkedin.com/in/naveen-chavan-8852a9368/",
    "https://www.linkedin.com/in/shrihari-124323340/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "SENOVA Digital Labs",
  url: SITE_URL,
};

const Home = () => {
  return (
    <>
      <SEO
        title="SENOVA Digital Labs | Web Development & SaaS Company in Raichur"
        description="SENOVA Digital Labs builds custom websites, SaaS products, and automation for businesses in Raichur and worldwide. Premium full-stack web development, MERN/React apps, and local SEO that gets you found."
        canonicalUrl={`${SITE_URL}/`}
        structuredData={[organizationSchema, websiteSchema]}
      />
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

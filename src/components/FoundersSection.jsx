// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Code, Cloud, ArrowUpRight } from "lucide-react";
import { useImageLoaded } from "../hooks/useImageLoaded";

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const founders = [
  {
    id: 1,
    name: "Naveen Chavan",
    role: "Tech Lead & Partnerships",
    bio: "A driven Full-Stack Developer with a deep passion for clean UI/UX and product architecture. Naveen leverages advanced web technologies to build scalable digital solutions for businesses globally, while expertly managing client partnerships to align technical execution with business strategy.",
    icon: Code,
    image: "/assets/Naveen.jpeg",
    linkedin: "https://www.linkedin.com/in/naveen-chavan-8852a9368/",
  },
  {
    id: 2,
    name: "Shrihari",
    role: "Systems Architect & Operations",
    bio: "A precision-focused Systems Architect specializing in backend infrastructure and intelligent business automation. Shrihari designs high-performance APIs and automated workflows using Firebase and cloud technologies, ensuring that client systems are robust, secure, and prepared for exponential scale.",
    icon: Cloud,
    image: "/assets/Shrihari.webp",
    linkedin: "https://www.linkedin.com/in/shrihari-124323340/",
  },
];

const PlaceholderPortrait = ({ name }) => (
  <div className="w-full h-full bg-[#0B1120] flex items-center justify-center relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#2563EB]/15 blur-2xl" />
    <span className="relative z-10 text-6xl font-serif-display italic text-[#2563EB]/40">
      {name.charAt(0)}
    </span>
  </div>
);

// Alternating layout: even index = portrait-left, odd index = portrait-right.
// Same data, same content — different spatial identity per founder so the
// section doesn't read as two stamped-out copies of one template.
const FounderRow = ({ founder, index }) => {
  const Icon = founder.icon;
  // Shared hook: also catches a photo that finished loading from the
  // prerendered HTML before React hydrated (see useImageLoaded).
  const { loaded: imageLoaded, failed: imageFailed, imgProps } = useImageLoaded();
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 lg:gap-16 items-center py-12 md:py-14 w-full ${
        index !== 0 ? "border-t border-[#22304A]" : ""
      }`}
    >
      {/* Portrait column */}
      <div
        className={`flex justify-center ${reversed ? "md:order-2" : "md:order-1"}`}
      >
        <div className="group relative w-52 h-52 sm:w-60 sm:h-60">
          <div className="absolute inset-0 rounded-[2rem] bg-[#2563EB]/25 blur-2xl scale-105 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-[#22304A] group-hover:border-[#2563EB]/50 transition-colors duration-500 shadow-2xl">
            {!imageLoaded && !imageFailed && (
              <div className="absolute inset-0 bg-[#131C2E] animate-pulse" />
            )}
            {!imageFailed ? (
              <img
                src={founder.image}
                alt={founder.name}
                width="240"
                height="240"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                {...imgProps}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              />
            ) : (
              <PlaceholderPortrait name={founder.name} />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#2563EB] rounded-2xl flex items-center justify-center border-4 border-[#0B1120] shadow-[0_0_20px_rgba(37,99,235,0.55)]">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content column */}
      <div
        className={`max-w-xl md:max-w-none text-center md:text-left mx-auto md:mx-0 ${reversed ? "md:order-1" : "md:order-2"}`}
      >
        <span className="section-index text-[#2563EB] block mb-2">
          {String(index + 1).padStart(2, "0")} / {index === 0 ? "Founder" : "Co-Founder"}
        </span>
        <h3 className="font-serif-display italic text-3xl sm:text-4xl text-white mb-2">
          {founder.name}
        </h3>
        <span className="inline-block text-xs font-bold text-[#2563EB] tracking-[0.2em] uppercase mb-5">
          {founder.role}
        </span>
        <p className="text-[#9999A1] leading-relaxed mb-6">{founder.bio}</p>
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white hover:text-[#2563EB] transition-all"
        >
          <LinkedInIcon className="w-4 h-4" />
          <span>Connect on LinkedIn</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

const FoundersSection = () => {
  return (
    <section
      id="founders"
      className="relative py-20 md:py-28 lg:py-32 3xl:py-36 bg-[#0B1120] overflow-hidden"
    >
      <div className="noise-overlay" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-6"
        >
          <span className="eyebrow justify-center mb-4">Founders</span>
          <h2 className="font-display heading-tight text-4xl sm:text-5xl 3xl:text-6xl font-bold text-white">
            The Minds Behind
            <br />
            <span className="text-gradient">SENOVA</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {founders.map((founder, index) => (
            <FounderRow key={founder.id} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;

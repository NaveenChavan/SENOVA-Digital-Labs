import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 4,
    title: "GleamStudio",
    description:
      "Complete salon booking platform with WhatsApp automation for appointment reminders and confirmations.",
    result: "60% management time saved",
    techStack: ["React", "WhatsApp API", "Firebase", "UI/UX"],
    liveUrl: "https://gleamstudio.vercel.app/",
    staticImage: "/assets/GleamStudio.webp",
    size: "large",
  },
  {
    id: 3,
    title: "MJ Fitness Club",
    description:
      "High-end fitness center website with stunning visuals and local SEO optimization for regional reach.",
    result: "200% increase in inquiries",
    techStack: ["React", "Tailwind", "SEO", "Animations"],
    liveUrl: "https://mjfitnessclub.vercel.app/",
    staticImage: "/assets/MJFitness.webp",
    size: "small",
  },
  {
    id: 1,
    title: "FitBiteCafe",
    description:
      "Data-driven health and nutrition tracking platform with personalized meal plans and progress analytics.",
    result: "10,000+ active users",
    techStack: ["React", "Charts", "Firebase", "Analytics"],
    liveUrl: "https://fit-bite-cafe.vercel.app/",
    staticImage: "/assets/FitbiteCafe.webp",
    size: "small",
  },
  {
    id: 2,
    title: "golden-crumb-bakery",
    description:
      "Visual-first bakery e-commerce platform showcasing products with beautiful imagery and easy ordering experience.",
    result: "Featured in local news",
    techStack: ["E-commerce", "React", "Payment Integration"],
    liveUrl: "https://golden-crumb-bakery-nine.vercel.app/",
    staticImage: "/assets/GoldenCrumbBakery.webp",
    size: "small",
  },
];

const getScreenshotUrl = (liveUrl) => {
  if (!liveUrl || liveUrl === "#") return null;
  return `https://image.thum.io/get/width/600/crop/450/${liveUrl}`;
};

const ProjectImage = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageSrc =
    project.staticImage ||
    (project.liveUrl !== "#" ? getScreenshotUrl(project.liveUrl) : null);

  const handleLoad = () => setImageLoaded(true);
  const handleError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  if (!imageSrc) {
    return (
      <div className="aspect-video w-full bg-[#131C2E] flex items-center justify-center rounded-t-[20px]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-[#0B1120] border border-[#22304A] flex items-center justify-center mx-auto mb-2">
            <ExternalLink className="w-5 h-5 text-[#9999A1]" />
          </div>
          <span className="text-xs text-[#9999A1]">Coming Soon</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#131C2E]">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-[#131C2E] animate-pulse" />
      )}
      {imageError ? (
        <div className="absolute inset-0 bg-[#131C2E] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-[#0B1120] border border-[#22304A] flex items-center justify-center mx-auto mb-2">
              <ExternalLink className="w-5 h-5 text-[#9999A1]" />
            </div>
            <span className="text-xs text-[#9999A1]">Preview unavailable</span>
          </div>
        </div>
      ) : (
        <>
          {/* Blurred cover backdrop fills any remaining edges with no dead space */}
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover scale-125 blur-3xl transition-opacity duration-500 ${imageLoaded ? "opacity-60" : "opacity-0"}`}
            loading="lazy"
          />
          {/* Full, uncropped screenshot on top */}
          <img
            src={imageSrc}
            alt={`${project.title} screenshot`}
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

const BentoCard = ({ project, index, className }) => {
  const isLive = project.liveUrl && project.liveUrl !== "#";

  return (
    <motion.a
      href={project.liveUrl}
      target={isLive ? "_blank" : undefined}
      rel={isLive ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative bg-[#131C2E] rounded-[20px] border border-[#22304A] overflow-hidden shadow-lg transition-[border-color,box-shadow] duration-300 hover:border-[#2563EB]/50 hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.7),0_0_40px_-15px_rgba(37,99,235,0.2)] block ${!isLive ? "opacity-80" : ""} ${className}`}
    >
      <div className="absolute inset-0">
        <ProjectImage project={project} />
      </div>

      {/* Glassmorphism hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/95 via-[#0B1120]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#7DD3FC] transition-colors duration-300">
            {project.title}
          </h3>
          {isLive && (
            <span
              className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_8px_#4ADE80]"
              title="Live"
            />
          )}
        </div>
        <p className="text-sm text-[#9999A1] mb-3 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[11px] text-[#9999A1] bg-[#0B1120] px-2.5 py-1 rounded-full border border-[#22304A]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Glowing CTA revealed on hover */}
        <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-sm font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            View Case Study
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative py-20 md:py-28 lg:py-32 3xl:py-36 bg-[#0B1120] overflow-hidden"
    >
      <div className="noise-overlay" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16 3xl:mb-20 w-full"
        >
          <div>
            <span className="eyebrow mb-3">Portfolio</span>
            <h2 className="font-display heading-tight text-4xl sm:text-5xl 3xl:text-6xl font-bold text-white">
              Latest <span className="font-serif-display italic normal-case text-[#2563EB]">Projects</span>
            </h2>
          </div>
          <Link to="/upcoming-projects">
            <button className="btn-tactile inline-flex items-center gap-2 px-5 py-2.5 bg-[#131C2E] border border-[#22304A] hover:border-[#2563EB]/50 text-white text-sm font-semibold rounded-full transition-colors duration-300 cursor-pointer whitespace-nowrap">
              What's Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>

        {/* Bento grid: one large wide feature card on top, three smaller
            wide cards below — aspect ratios chosen close to the actual
            screenshot proportions (~16:9) so previews aren't squeezed
            into tall/square boxes and don't need heavy letterboxing. */}
        <div className="flex flex-col gap-5 3xl:gap-6">
          <BentoCard
            project={projects[0]}
            index={0}
            className="aspect-[16/9] sm:aspect-[16/8] w-full"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 3xl:gap-6">
            <BentoCard
              project={projects[1]}
              index={1}
              className="aspect-[16/10] w-full"
            />
            <BentoCard
              project={projects[2]}
              index={2}
              className="aspect-[16/10] w-full"
            />
            <BentoCard
              project={projects[3]}
              index={3}
              className="aspect-[16/10] w-full"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-14 3xl:mt-16 w-full"
        >
          <Link to="/#contact-form">
            <button className="group inline-flex items-center gap-2 text-[#9999A1] hover:text-white transition-colors duration-200 cursor-pointer">
              <span className="font-medium 3xl:text-lg">
                Want to be our next success story?
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;

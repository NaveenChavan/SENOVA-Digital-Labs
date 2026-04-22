// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Mr. Calories",
    description:
      "Data-driven health and nutrition tracking platform with personalized meal plans and progress analytics.",
    result: "10,000+ active users",
    techStack: ["React", "Charts", "Firebase", "Analytics"],
    liveUrl: "https://mr-calories.vercel.app/",
    staticImage: "/assets/MrCalories.png",
  },
  {
    id: 2,
    title: "fit-bite-cafe",
    description:
      "Visual-first bakery e-commerce platform showcasing products with beautiful imagery and easy ordering experience.",
    result: "Featured in local news",
    techStack: ["E-commerce", "React", "Payment Integration"],
    liveUrl: "https://fit-bite-cafe.vercel.app/",
    staticImage: "/assets/FitbiteCafe.png",
  },
  {
    id: 3,
    title: "MJ Fitness Club",
    description:
      "High-end fitness center website with stunning visuals and local SEO optimization for regional reach.",
    result: "200% increase in inquiries",
    techStack: ["React", "Tailwind", "SEO", "Animations"],
    liveUrl: "https://mjfitnessclub.vercel.app/",
    staticImage: "/assets/MJFitness.png",
  },
  {
    id: 4,
    title: "GleamStudio",
    description:
      "Complete salon booking platform with WhatsApp automation for appointment reminders and confirmations.",
    result: "60% management time saved",
    techStack: ["React", "WhatsApp API", "Firebase", "UI/UX"],
    liveUrl: "https://gleamstudio.vercel.app/",
    staticImage: "/assets/GleamStudio.png",
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
      <div className="aspect-video w-full bg-[#0A1931] flex items-center justify-center rounded-t-lg">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-[#1A3D63] border border-[#4A7FA7] flex items-center justify-center mx-auto mb-2">
            <ExternalLink className="w-5 h-5 text-[#B3CFE5]" />
          </div>
          <span className="text-xs text-[#B3CFE5]/60">Coming Soon</span>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full relative overflow-hidden bg-[#0A1931] rounded-t-lg border-b border-[#4A7FA7]/30">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-[#1A3D63] animate-pulse" />
      )}
      {imageError ? (
        <div className="absolute inset-0 bg-[#1A3D63] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-[#0A1931] border border-[#4A7FA7]/50 flex items-center justify-center mx-auto mb-2">
              <ExternalLink className="w-5 h-5 text-[#B3CFE5]/50" />
            </div>
            <span className="text-xs text-[#B3CFE5]/60">
              Preview unavailable
            </span>
          </div>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={`${project.title} screenshot`}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
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
      className={`group relative bg-[#1A3D63] rounded-xl border border-[#4A7FA7]/30 overflow-hidden shadow-lg transition-all duration-300 hover:border-[#B3CFE5] hover:shadow-[0_0_20px_rgba(74,127,167,0.3)] block ${!isLive ? "opacity-80" : ""}`}
    >
      <div className="relative overflow-hidden">
        <ProjectImage project={project} />
        {isLive && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0A1931]/80 backdrop-blur-sm border border-[#4A7FA7] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-[#B3CFE5]">
            <ExternalLink className="w-4 h-4 text-[#B3CFE5]" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-[#F6FAFD] group-hover:text-[#B3CFE5] transition-colors duration-300">
            {project.title}
          </h3>
          {isLive && (
            <span
              className="w-1.5 h-1.5 bg-[#50C878] rounded-full animate-pulse shadow-[0_0_8px_#50C878]"
              title="Live"
            />
          )}
        </div>

        <p className="text-sm text-[#B3CFE5]/80 mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs text-[#B3CFE5] bg-[#0A1931] px-2.5 py-1 rounded border border-[#4A7FA7]/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#4A7FA7]/30">
          <span className="text-xs text-[#B3CFE5]/60">Result:</span>
          <span className="text-sm font-medium text-[#4A7FA7] group-hover:text-[#B3CFE5] transition-colors">
            {project.result}
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
      className="relative py-20 md:py-28 lg:py-32 bg-[#0A1931]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#4A7FA7]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-14 md:mb-16 w-full"
        >
          <span className="text-[#4A7FA7] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F6FAFD] mb-4 tracking-tight">
            Built to <br />
            <span className="text-[#B3CFE5]">Scale</span>
          </h2>
          <p className="text-base md:text-lg text-[#B3CFE5]/80 max-w-xl mx-auto text-center">
            Real results for real businesses. Explore how we've helped clients
            achieve their digital goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12 w-full"
        >
          <a href="#contact-form">
            <button className="group inline-flex items-center gap-2 text-[#4A7FA7] hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer">
              <span className="font-medium">
                Want to be our next success story?
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;

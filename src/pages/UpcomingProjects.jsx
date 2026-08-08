import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

const upcomingProjects = [
  {
    id: "dashboard",
    title: "SENOVA AI Dashboard",
    description:
      "Turn raw sales data into decisions, automatically. Upload a daily sales CSV or Excel file and get instant business intelligence — all computed in-house with no third-party analytics service. Your data never leaves your own backend.",
    features: [
      "Automated business insights",
      "Revenue forecasting",
      "Inventory & reorder intelligence",
      "Interactive chart studio",
      "CA-style financial reports",
    ],
    image: "/assets/DASHBOARD.webp",
  },
  {
    id: "gym",
    title: "SENOVA Gym Management System",
    description:
      "A complete, offline-first desktop app for gym owners and staff — all running locally with an encrypted database, no cloud dependency.",
    features: [
      "Face-recognition attendance",
      "Member & trainer management",
      "Billing & subscription tracking",
      "WhatsApp automation",
      "Reports & exports (PDF/CSV)",
    ],
    image: "/assets/GYM.webp",
  },
];

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-[#0B1120]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl 3xl:max-w-2xl bg-[#131C2E] rounded-3xl border border-[#22304A] shadow-[0_0_40px_rgba(37,99,235,0.2)] max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="noise-overlay" />
        <div className="flex items-start justify-between gap-4 p-7 sm:p-9 3xl:p-11 pb-0">
          <h3 className="text-xl sm:text-2xl 3xl:text-3xl font-display font-bold text-white leading-snug">
            {project.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 shrink-0 rounded-full bg-[#0B1120] border border-[#22304A] flex items-center justify-center text-[#9999A1] hover:border-[#2563EB]/60 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-7 sm:p-9 3xl:p-11 pt-5 sm:pt-6 overflow-y-auto">
          <p className="text-base sm:text-lg 3xl:text-xl text-[#9999A1] leading-relaxed mb-7">
            {project.description}
          </p>
          <ul className="space-y-4">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-base sm:text-lg 3xl:text-xl text-white"
              >
                <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const UpcomingProjectCard = ({ project, index, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="surface-card group relative overflow-hidden shadow-lg cursor-pointer text-left"
    >
      <span className="absolute top-4 left-4 z-10 section-index bg-[#0B1120]/70 backdrop-blur-sm border border-[#22304A] rounded-full px-2.5 py-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="aspect-[3/2] w-full relative overflow-hidden bg-[#0B1120] rounded-t-[1.5rem]">
        {!imageLoaded && <div className="absolute inset-0 bg-[#131C2E] animate-pulse" />}
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-[1.02] ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-[#0B1120]/0 group-hover:bg-[#0B1120]/20 transition-colors duration-300" />
      </div>
    </motion.button>
  );
};

const UpcomingProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="relative pb-24 md:pb-32 lg:pb-36 3xl:pb-40 bg-[#0B1120] min-h-screen">
      {/* Fixed-height spacer to clear the fixed navbar. */}
      <div style={{ height: "120px" }} aria-hidden="true" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-14 md:mb-16 3xl:mb-20 w-full"
        >
          <span className="eyebrow justify-center mb-4">In The Works</span>
          <h2 className="font-display heading-tight fluid-heading-lg font-bold text-white mb-4">
            Upcoming <br />
            <span className="font-serif-display italic normal-case text-[#2563EB]">Projects</span>
          </h2>
          <p className="text-base md:text-lg 3xl:text-xl text-[#9999A1] max-w-xl 3xl:max-w-2xl mx-auto text-center">
            In-house products we're building right now. Not live yet, but
            coming soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 3xl:gap-8">
          {upcomingProjects.map((project, index) => (
            <UpcomingProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12 3xl:mt-16 w-full"
        >
          <Link to="/#contact-form">
            <button className="group inline-flex items-center gap-2 text-[#9999A1] hover:text-white transition-colors duration-200 cursor-pointer">
              <span className="font-medium 3xl:text-lg">
                Want early access when these launch?
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default UpcomingProjects;

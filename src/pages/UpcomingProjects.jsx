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
    image: "/assets/DASHBOARD.png",
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
    image: "/assets/GYM.png",
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
      className="fixed inset-0 z-[60] bg-[#0A1931]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl 3xl:max-w-2xl bg-[#1A3D63] rounded-2xl border border-[#4A7FA7]/40 shadow-[0_0_40px_rgba(74,127,167,0.3)] max-h-[90vh] flex flex-col"
      >
        {/* Header: title and close button side by side, own row */}
        <div className="flex items-start justify-between gap-4 p-6 sm:p-8 3xl:p-10 pb-0">
          <h3 className="text-xl sm:text-2xl 3xl:text-3xl font-bold text-[#F6FAFD] leading-snug">
            {project.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 shrink-0 rounded-full bg-[#0A1931]/80 border border-[#4A7FA7]/40 flex items-center justify-center text-[#B3CFE5] hover:border-[#B3CFE5] hover:text-[#F6FAFD] transition-colors duration-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 3xl:p-10 pt-4 sm:pt-5 overflow-y-auto">
          <p className="text-base sm:text-lg 3xl:text-xl text-[#B3CFE5]/85 leading-relaxed mb-6">
            {project.description}
          </p>
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-base sm:text-lg 3xl:text-xl text-[#F6FAFD]"
              >
                <span className="w-2 h-2 rounded-full bg-[#4A7FA7] shrink-0" />
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
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#1A3D63] rounded-xl border border-[#4A7FA7]/30 overflow-hidden shadow-lg transition-all duration-300 hover:border-[#B3CFE5] hover:shadow-[0_0_20px_rgba(74,127,167,0.3)] cursor-pointer text-left"
    >
      <div className="aspect-[3/2] w-full relative overflow-hidden bg-[#0A1931] rounded-t-lg">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0A1931]/0 group-hover:bg-[#0A1931]/20 transition-colors duration-300" />
      </div>
    </motion.button>
  );
};

const UpcomingProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="relative pb-24 md:pb-32 lg:pb-36 3xl:pb-40 bg-[#0A1931] min-h-screen">
      {/* Fixed-height spacer to clear the fixed navbar. Uses an explicit
          pixel height (not a Tailwind padding utility) so it can't be
          affected by breakpoint-dependent navbar height changes. */}
      <div style={{ height: "120px" }} aria-hidden="true" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#4A7FA7]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-14 md:mb-16 3xl:mb-20 w-full"
        >
          <h2 className="fluid-heading-lg font-bold text-[#F6FAFD] mb-4 tracking-tight">
            Upcoming <br />
            <span className="text-[#B3CFE5]">Projects</span>
          </h2>
          <p className="text-base md:text-lg 3xl:text-xl text-[#B3CFE5]/80 max-w-xl 3xl:max-w-2xl mx-auto text-center">
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
            <button className="group inline-flex items-center gap-2 text-[#4A7FA7] hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer">
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

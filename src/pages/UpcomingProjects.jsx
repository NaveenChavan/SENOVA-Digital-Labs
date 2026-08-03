// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const upcomingProjects = [
  {
    id: "dashboard",
    title: "SENOVA AI Dashboard",
    description:
      "Turn raw sales data into decisions, automatically. Upload a daily sales CSV or Excel file and get instant business intelligence — automated insights, revenue forecasting, inventory reorder intelligence, and interactive charts, all computed in-house with no third-party analytics service. Your data never leaves your own backend.",
    image: "/assets/DASHBOARD.png",
  },
  {
    id: "gym",
    title: "SENOVA Gym Management System",
    description:
      "A complete, offline-first desktop app for gym owners and staff. Manage members, track attendance with face recognition, handle billing and subscriptions, and automate WhatsApp reminders — all running locally with an encrypted database, no cloud dependency.",
    image: "/assets/GYM.png",
  },
];

const UpcomingProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#1A3D63] rounded-xl border border-[#4A7FA7]/30 overflow-hidden shadow-lg transition-all duration-300 hover:border-[#B3CFE5] hover:shadow-[0_0_20px_rgba(74,127,167,0.3)]"
    >
      <div className="aspect-[3/2] w-full relative overflow-hidden bg-[#0A1931] rounded-t-lg border-b border-[#4A7FA7]/30">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-contain transition-all duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5 3xl:p-7">
        <p className="text-sm 3xl:text-base text-[#B3CFE5]/80 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const UpcomingProjects = () => {
  return (
    <section className="relative pt-28 sm:pt-32 pb-24 md:pb-32 lg:pb-36 3xl:pb-40 bg-[#0A1931] min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#4A7FA7]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative responsive-container">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#4A7FA7] hover:text-[#B3CFE5] transition-colors duration-200 mb-10 3xl:mb-14"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm 3xl:text-base font-medium">
            Back to home
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-14 md:mb-16 3xl:mb-20 w-full"
        >
          <span className="text-[#4A7FA7] text-sm 3xl:text-base font-semibold tracking-wider uppercase mb-4 block">
            What's Next
          </span>
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
    </section>
  );
};

export default UpcomingProjects;

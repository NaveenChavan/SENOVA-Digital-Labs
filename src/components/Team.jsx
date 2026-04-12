// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { Code, Cloud, Sparkles, Linkedin, ArrowUpRight } from "lucide-react";

const founders = [
  {
    id: 1,
    name: "Naveen Chavan",
    role: "Tech Lead & Partnerships",
    bio: "A driven Full-Stack Developer with a deep passion for clean UI/UX and product architecture. Naveen leverages advanced web technologies to build scalable digital solutions for businesses globally, while expertly managing client partnerships to align technical execution with business strategy.",
    icon: Code,
    image: "/assets/naveen.png",
    linkedin: "https://www.linkedin.com/in/naveen-chavan-8852a9368/",
    expertise: ["React.js", "Node.js", "System Design"],
  },
  {
    id: 2,
    name: "Shrihari",
    role: "Systems Architect",
    bio: "A precision-focused Systems Architect specializing in backend infrastructure and intelligent business automation. Shrihari designs high-performance APIs and automated workflows using Firebase and cloud technologies, ensuring that client systems are robust, secure, and prepared for exponential scale.",
    icon: Cloud,
    image: "/assets/shrihari.png",
    linkedin: "https://www.linkedin.com/in/shrihari-124323340/",
    expertise: ["Firebase", "Cloud Architecture", "API Design"],
  },
];

// Fallback Placeholder if real image is missing
const PlaceholderPortrait = ({ name }) => (
  <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#E5B700]/5 via-transparent to-transparent" />
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#E5B700]/20 to-transparent animate-pulse" />
    </div>
    <div className="relative z-10 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#27272A] to-[#1a1a1a] flex items-center justify-center mb-3 border border-[#27272A]">
        <span className="text-3xl font-bold text-[#E5B700]/40">
          {name.charAt(0)}
        </span>
      </div>
      <span className="text-xs text-[#6B7280]">{name}</span>
    </div>
  </div>
);

const FounderCard = ({ founder, index }) => {
  const Icon = founder.icon;
  const isEven = index % 2 === 0;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#E5B700]/10 to-[#E5B700]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl border border-[#27272A] overflow-hidden transition-all duration-500 hover:-translate-y-1 group-hover:border-[#E5B700]/40 group-hover:shadow-2xl group-hover:shadow-[#E5B700]/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E5B700]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
            {/* Image Section */}
            <div className="flex-shrink-0 w-full max-w-[280px] lg:w-72">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border-2 border-[#27272A] group-hover:border-[#E5B700]/50 transition-colors duration-500">
                {!imageFailed ? (
                  <img
                    src={founder.image}
                    alt={founder.name}
                    onError={() => setImageFailed(true)}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <PlaceholderPortrait name={founder.name} />
                )}
                <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5B700]/50 to-transparent" />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 pt-2 lg:pt-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E5B700]/10 border border-[#E5B700]/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#E5B700]" />
                </div>
                <span className="text-[#E5B700] text-sm font-medium tracking-wider uppercase">
                  {founder.role}
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-5 tracking-tight group-hover:text-[#E5B700] transition-colors duration-500">
                {founder.name}
              </h3>

              <div className="w-12 h-px bg-gradient-to-r from-[#E5B700] to-transparent mb-6 mx-auto lg:mx-0" />

              <p className="text-[#9CA3AF] text-base lg:text-lg leading-relaxed mb-8">
                {founder.bio}
              </p>

              {/* New Addition: Expertise Tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                {founder.expertise.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs text-[#D1D5DB] bg-[#27272A]/50 px-3 py-1.5 rounded-full border border-[#3F3F46]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#27272A]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-xs text-[#6B7280] uppercase tracking-wider font-medium">
                    Available for projects
                  </span>
                </div>

                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#E5B700] transition-colors duration-300 group/link"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E5B700]/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const Team = () => {
  return (
    <section
      id="team"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#E5B700]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#E5B700]/3 rounded-full blur-[120px]" />

        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E5B700]/10 to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-20 lg:mb-24 w-full"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#E5B700]/50" />
            <Sparkles className="w-5 h-5 text-[#E5B700]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E5B700]/50" />
          </div>

          <span className="text-[#E5B700] text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            The Visionaries
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Meet Our
            <br />
            <span className="text-gradient">Founders</span>
          </h2>

          <p className="text-[#9CA3AF] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Two passionate technologists dedicated to transforming businesses
            through innovative digital solutions.
          </p>
        </motion.div>

        <div className="space-y-12 lg:space-y-16 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <FounderCard key={founder.id} founder={founder} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 lg:mt-24 flex justify-center w-full"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#111111]/50 backdrop-blur-xl rounded-full border border-[#27272A] shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-[#9CA3AF]">
              Currently{" "}
              <span className="text-white font-medium">
                accepting new projects
              </span>{" "}
              globally
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5B700]/20 to-transparent" />
    </section>
  );
};

export default Team;

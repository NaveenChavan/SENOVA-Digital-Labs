import { motion } from "framer-motion";
import { Code, Database, Sparkles, ArrowUpRight } from "lucide-react";

const founders = [
  {
    id: 1,
    name: "Naveen Chavan",
    role: "Tech Lead & Partnerships",
    bio: "A visionary Full-Stack Architect with a focus on high-performance web systems and clean UI/UX. Specializes in building scalable digital products for global businesses.",
    icon: Code,
    image: "/assets/naveen.png",
    linkedin: "https://www.linkedin.com/in/naveen-chavan-8852a9368/",
  },
  {
    id: 2,
    name: "Shrihari",
    role: "Systems Architect & Operations",
    bio: "An expert Systems Architect specializing in backend infrastructure and enterprise-grade automation. Designs robust cloud-native workflows and high-concurrency APIs.",
    icon: Database,
    image: "/assets/shrihari.png",
    linkedin: "https://www.linkedin.com/in/shrihari-124323340/",
  },
];

const FounderCard = ({ founder, index }) => {
  const Icon = founder.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative h-full">
        <div className="absolute inset-0 bg-[#4A7FA7]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-[#1A3D63]/40 backdrop-blur-xl rounded-3xl border border-[#4A7FA7]/20 p-8 md:p-10 transition-all duration-500 hover:border-[#B3CFE5]/50 hover:-translate-y-2 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute -inset-2 bg-[#4A7FA7]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* YAHAN FIX KIYA: Grayscale hata diya, bas hover par scale hoga */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-[#0A1931] shadow-2xl">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#4A7FA7] rounded-full flex items-center justify-center border-4 border-[#0A1931]">
                  <Icon className="w-6 h-6 text-[#0A1931]" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#B3CFE5] tracking-[0.2em] uppercase mb-3 px-4 py-1.5 bg-[#4A7FA7]/10 rounded-full border border-[#4A7FA7]/20">
                <Sparkles className="w-3.5 h-3.5" />
                {founder.role}
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-[#F6FAFD] mb-4 group-hover:text-[#B3CFE5] transition-colors">
                {founder.name}
              </h3>

              <div className="w-16 h-1 bg-[#4A7FA7] rounded-full mb-6 mx-auto lg:mx-0" />

              <p className="text-[#B3CFE5]/80 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 font-medium">
                {founder.bio}
              </p>

              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#4A7FA7] hover:text-[#B3CFE5] transition-all"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FoundersSection = () => {
  return (
    <section id="founders" className="relative py-24 bg-[#0A1931]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#F6FAFD] mb-6">
            The Minds Behind <br />
            <span className="text-gradient">SENOVA</span>
          </h2>
          <p className="text-[#B3CFE5]/70 max-w-xl mx-auto">
            Driving digital excellence through high-performance engineering and
            strategic innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {founders.map((founder, index) => (
            <FounderCard key={founder.id} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;

// eslint-disable-next-line no-unused-vars
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-border p-8 md:p-10 shadow-lg shadow-black/5 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-accent/10 group-hover:-translate-y-1">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-accent/30 to-accent/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-surface to-bg-elevated flex items-center justify-center">
                          <${Icon.name} className="w-16 h-16 text-accent/40"/>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent tracking-widest uppercase mb-3 px-4 py-1.5 bg-accent/10 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                {founder.role}
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                {founder.name}
              </h3>

              <div className="w-16 h-1.5 bg-gradient-to-r from-accent to-accent/30 rounded-full mb-5 mx-auto lg:mx-0" />

              <p className="text-text-secondary leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
                {founder.bio}
              </p>

              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200 group/link"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>

          <div className="absolute top-6 right-6 w-16 h-16 border border-border/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border border-border/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

const FoundersSection = () => {
  return (
    <section id="founders" className="relative py-20 md:py-28 lg:py-36">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/[0.08] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-16 md:mb-20 w-full"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent/50" />
            <Sparkles className="w-5 h-5 text-accent" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent/50" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-5">
            Meet The
            <br />
            <span className="text-gradient">Founders</span>
          </h2>

          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto text-center">
            The passionate minds driving SENOVA's vision of digital excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {founders.map((founder, index) => (
            <FounderCard key={founder.id} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;

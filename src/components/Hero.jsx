// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100vh] pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 bg-[#0B1120] overflow-hidden">
      {/* Spacer that reliably clears the fixed navbar pill (top-4 + ~4rem
          height) before any hero content begins, independent of section
          padding so it can't visually collide regardless of viewport. */}
      <div className="h-16 sm:h-16 shrink-0" aria-hidden="true" />
      {/* Layered ambient lighting — replaces single flat glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[700px] sm:h-[1000px] bg-[#2563EB]/[0.08] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="noise-overlay" />

      <div className="relative z-10 responsive-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
          className="flex flex-col items-center"
        >
          {/* Trust Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
            className="flex items-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 px-4 py-2 rounded-full bg-[#131C2E]/60 border border-[#22304A] backdrop-blur-sm"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#0B1120] bg-[#131C2E] flex items-center justify-center"
                >
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9999A1]" />
                </div>
              ))}
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-[#9999A1] uppercase tracking-widest pl-0.5">
              Trusted by 10+ Businesses
            </span>
          </motion.div>

          {/* Asymmetric hero composition: oversized statement type,
              serif accent word, 3D centerpiece offset to the side */}
          <div className="relative w-full grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-center gap-6 lg:gap-4">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                className="relative font-display heading-tight text-[clamp(2.75rem,6vw+1rem,6.5rem)] font-bold text-white leading-[0.95] select-none"
              >
                THINK
                <br />
                <span className="font-serif-display italic normal-case tracking-normal text-[#2563EB]">
                  Creatively.
                </span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                className="fluid-body-lg text-[#9999A1] max-w-xl mx-auto lg:mx-0 mt-8 sm:mt-10 mb-10 sm:mb-12"
              >
                We help ambitious brands turn bold ideas into structured,
                high-converting digital experiences.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
              >
                <Link to="/#contact-form">
                  <button className="btn-tactile group inline-flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold rounded-full transition-colors duration-300 cursor-pointer shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_40px_rgba(37,99,235,0.65)]">
                    Book a Discovery Call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </Link>
                <Link to="/#portfolio">
                  <button className="btn-tactile inline-flex items-center gap-2 px-7 py-3.5 border border-[#22304A] hover:border-[#2563EB]/50 text-white font-semibold rounded-full transition-colors duration-300 cursor-pointer">
                    View Our Work
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* 3D glass centerpiece — now a floating element within its own
                space rather than overlapping the headline. Brand mark sits
                behind/inside the transmissive glass so it reads through it. */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
              className="relative order-1 lg:order-2 flex items-center justify-center h-[220px] sm:h-[280px] lg:h-[360px]"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] flex items-center justify-center"
              >
                <img
                  src="/assets/logo.webp"
                  alt="Senova Digital Labs"
                  width="260"
                  height="275"
                  fetchpriority="high"
                  decoding="async"
                  className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(37,99,235,0.45)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

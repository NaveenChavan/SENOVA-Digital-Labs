import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 bg-[#0A1931] overflow-hidden">
      {/* Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#4A7FA7]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 responsive-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Trust Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-10 sm:mb-12 px-4 py-2 rounded-full bg-[#1A3D63]/30 border border-[#4A7FA7]/20 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 sm:w-7 sm:h-7 3xl:w-8 3xl:h-8 rounded-full border-2 border-[#0A1931] bg-[#1A3D63] flex items-center justify-center"
                >
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B3CFE5]" />
                </div>
              ))}
            </div>
            <span className="text-[11px] sm:text-xs 3xl:text-sm font-medium text-[#B3CFE5] uppercase tracking-widest pl-0.5">
              Trusted by 10+ Businesses
            </span>
          </div>

          {/* Heading — NO fixed height on animated text. Uses min-height instead to prevent overlap */}
          <h1 className="fluid-heading-xl font-extrabold text-[#F6FAFD] tracking-tight">
            We Build
          </h1>
          <div className="min-h-[3.5rem] sm:min-h-[4rem] md:min-h-[4.5rem] lg:min-h-[5.5rem] 3xl:min-h-[6.5rem] flex items-center justify-center mt-1 mb-6 sm:mb-8">
            <span className="fluid-heading-xl font-extrabold text-[#B3CFE5] block">
              <TypeAnimation
                sequence={[
                  "High-Performance Systems",
                  2000,
                  "Automation Workflows",
                  2000,
                  "Scalable SaaS Products",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </div>

          <h2 className="fluid-heading-md font-semibold text-[#F6FAFD]/90 mb-5 sm:mb-6">
            To Get You More Customers
          </h2>

          <p className="fluid-body-lg text-[#B3CFE5]/70 max-w-xl sm:max-w-2xl lg:max-w-2xl 3xl:max-w-3xl mx-auto mb-10 sm:mb-12">
            Transforming businesses into tech-driven powerhouses with clean
            code, premium design, and intelligent automation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

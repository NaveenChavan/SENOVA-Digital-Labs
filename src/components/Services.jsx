import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Code, Smartphone, Layers, Globe, Plus, Minus } from "lucide-react";

// Real service categories offered by Senova, mapped from existing
// Services.jsx content + agreed category naming.
const services = [
  {
    icon: Code,
    tag: "Strategy",
    title: "Design Strategy",
    description:
      "Understanding the core market problem before designing. Every decision — from architecture to UI — is driven by commercial ROI, not decoration.",
  },
  {
    icon: Layers,
    tag: "Identity",
    title: "Brand Identity",
    description:
      "Bold visual systems built in Figma: logo direction, visual language, typography, and guidelines that keep a brand consistent across every touchpoint.",
  },
  {
    icon: Smartphone,
    tag: "Product",
    title: "UI/UX & Web Development",
    description:
      "Crafting custom web applications and interactive interfaces — wireframing, prototyping, and production-grade front-end code with React and Tailwind CSS.",
  },
  {
    icon: Globe,
    tag: "Engineering",
    title: "Custom Web Development",
    description:
      "Full-stack builds on React, Next.js, Node.js and Firebase — scalable architectures, clean APIs, and automation workflows that save time and convert leads.",
  },
];

// Real stack Senova builds with.
const stack = [
  "React",
  "Tailwind CSS",
  "Firebase",
  "Node.js",
  "Next.js",
  "Figma",
];

const AccordionItem = ({ service, index, isOpen, onToggle }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`surface-card overflow-hidden ${
        isOpen ? "border-[#2563EB]/60" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left cursor-pointer"
      >
        <span className="section-index shrink-0 w-6">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#0B1120] border border-[#22304A] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#2563EB]" />
        </div>
        <div className="flex-1">
          <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-widest">
            {service.tag}
          </span>
          <h3 className="text-lg sm:text-xl font-display font-bold text-white">
            {service.title}
          </h3>
        </div>
        <span className="shrink-0 w-8 h-8 rounded-full border border-[#22304A] flex items-center justify-center text-[#9999A1]">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pl-[4.75rem] pr-6 sm:pr-8 pb-5 sm:pb-6 text-sm sm:text-base text-[#9999A1] leading-relaxed">
          {service.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 lg:py-32 3xl:py-36 bg-[#0B1120] overflow-hidden"
    >
      <div className="noise-overlay" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative responsive-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 3xl:gap-16">
          {/* Left sticky column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="eyebrow mb-4">Our Services</span>
                <h2 className="font-display heading-tight text-4xl sm:text-5xl 3xl:text-6xl font-bold text-white mb-8">
                  What We Help
                  <br />
                  <span className="font-serif-display italic normal-case text-[#2563EB]">You Shape</span>
                </h2>
                <p className="text-base sm:text-lg text-[#9999A1] leading-relaxed mb-10 max-w-md">
                  Comprehensive solutions designed to transform your digital
                  presence and accelerate business growth.
                </p>

                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                  Tools &amp; Technologies We Master
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {stack.map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 rounded-full bg-[#131C2E] border border-[#22304A] text-sm font-medium text-white hover:border-[#2563EB]/50 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right accordion column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {services.map((service, index) => (
              <AccordionItem
                key={service.title}
                service={service}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

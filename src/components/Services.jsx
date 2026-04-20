import { motion } from "framer-motion";
import { Code, Zap, BarChart3, Palette } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Custom Web Development",
    description:
      "Building high-performance web applications with React, Tailwind CSS, and modern architectures that scale.",
    features: [
      "React & Next.js",
      "Tailwind CSS",
      "Responsive Design",
      "Performance Optimization",
    ],
  },
  {
    icon: Zap,
    title: "Business Automation",
    description:
      "Streamline operations with intelligent automation workflows that save time and reduce operational costs.",
    features: [
      "WhatsApp Integration",
      "Google Sheets Sync",
      "Firebase Backend",
      "Auto Notifications",
    ],
  },
  {
    icon: BarChart3,
    title: "SaaS & Product Engineering",
    description:
      "From concept to launch, we build scalable SaaS products that drive sustainable business growth.",
    features: [
      "Scalable Architecture",
      "Multi-tenant Design",
      "Analytics Dashboard",
      "Subscription System",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX & Brand Design",
    description:
      "Creating stunning, user-centric designs that captivate audiences and elevate your brand presence.",
    features: [
      "Figma Design",
      "Brand Identity",
      "Prototyping",
      "Design Systems",
    ],
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#1A3D63]/30 rounded-xl border border-[#4A7FA7]/20 shadow-lg p-6 md:p-7 cursor-pointer transition-all duration-500 hover:border-[#B3CFE5] hover:shadow-[0_0_30px_rgba(74,127,167,0.2)]"
    >
      <div className="w-14 h-14 rounded-xl bg-[#0A1931] border border-[#4A7FA7]/30 flex items-center justify-center mb-6 group-hover:bg-[#4A7FA7] transition-colors duration-500">
        <Icon className="w-7 h-7 text-[#B3CFE5] group-hover:text-[#0A1931]" />
      </div>

      <h3 className="text-lg md:text-xl font-bold text-[#F6FAFD] mb-3 group-hover:text-[#B3CFE5] transition-colors duration-300">
        {service.title}
      </h3>

      <p className="text-sm text-[#B3CFE5]/80 mb-6 leading-relaxed">
        {service.description}
      </p>

      <ul className="space-y-3">
        {service.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-sm text-[#B3CFE5]/70"
          >
            <svg
              className="w-4 h-4 text-[#4A7FA7] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative py-20 md:py-28 lg:py-32 bg-[#0A1931]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A7FA7]/5 rounded-full blur-[120px]" />
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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F6FAFD] mb-4 tracking-tight">
            Four Pillars of <br />
            <span className="text-[#B3CFE5]">Digital Excellence</span>
          </h2>
          <p className="text-base md:text-lg text-[#B3CFE5]/80 max-w-xl mx-auto text-center">
            Comprehensive solutions designed to transform your digital presence
            and accelerate business growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

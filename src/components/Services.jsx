// eslint-disable-next-line no-unused-vars
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
    gradient: "from-blue-500 to-cyan-500",
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
    gradient: "from-amber-500 to-orange-500",
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
    gradient: "from-purple-500 to-pink-500",
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
    gradient: "from-green-500 to-emerald-500",
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
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-xl border border-border shadow-sm p-6 md:p-7 cursor-pointer transition-all duration-300 hover:border-accent/30 hover:shadow-md"
    >
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} p-0.5 mb-5`}
      >
        <div className="w-full h-full bg-bg-primary rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
        {service.title}
      </h3>

      <p className="text-sm text-text-secondary mb-5 leading-relaxed">
        {service.description}
      </p>

      <ul className="space-y-2.5">
        {service.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-center gap-2.5 text-sm text-text-muted"
          >
            <svg
              className="w-4 h-4 text-accent flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
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
    <section id="services" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-14 md:mb-16 w-full"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            Four Pillars of
            <br />
            <span className="text-gradient">Digital Excellence</span>
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto text-center">
            Comprehensive solutions designed to transform your digital presence
            and accelerate business growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

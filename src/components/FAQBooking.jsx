import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Plus, Minus, CalendarCheck, Mail } from "lucide-react";

// FAQ copy grounded in real, established facts about Senova (real stack,
// real contact channels, real service categories) — no fabricated policies.
const faqs = [
  {
    q: "How do we get started?",
    a: "Reach out through the contact form or WhatsApp with a short brief of your project. We'll schedule a discovery call to understand your goals, then follow up with a scoped proposal before any work begins.",
  },
  {
    q: "What is the typical timeline for a website redesign?",
    a: "Timelines depend on scope, but most custom web builds move from discovery to launch within a few weeks once requirements are locked in. We'll give you a concrete estimate after the discovery call.",
  },
  {
    q: "Do you handle both design and custom web development?",
    a: "Yes. Our two-founder structure covers both sides: brand/UI design and prototyping in Figma, and full-stack engineering with React, Next.js, Node.js, and Firebase.",
  },
  {
    q: "How many revision cycles are included?",
    a: "Revision rounds are agreed upfront as part of the project scope so there are no surprises — this is confirmed with you before the project kicks off.",
  },
  {
    q: "What tools do you build with?",
    a: "React, Tailwind CSS, Next.js, and Node.js for engineering; Firebase for backend/data; Figma for design and prototyping.",
  },
  {
    q: "How do we handle ongoing support?",
    a: "You can reach us directly via WhatsApp, phone, or email after launch. Ongoing support and maintenance can be scoped as part of your project agreement.",
  },
];

const FAQItem = ({ item, index, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className={`border-b border-[#22304A] ${index === 0 ? "border-t" : ""}`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center gap-5 py-6 text-left cursor-pointer group"
    >
      <span className="font-display text-sm text-[#2563EB] font-bold shrink-0 w-8">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex-1 text-base sm:text-lg font-semibold text-white group-hover:text-[#7DD3FC] transition-colors">
        {item.q}
      </span>
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
      <p className="pb-6 pl-[3.25rem] text-sm sm:text-base text-[#9999A1] leading-relaxed">
        {item.a}
      </p>
    </motion.div>
  </motion.div>
);

const FAQBooking = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-20 md:py-28 lg:py-32 3xl:py-36 bg-[#0B1120] overflow-hidden">
      <div className="noise-overlay" />
      <div className="relative responsive-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 3xl:gap-16">
          {/* Left: FAQ accordion */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <span className="eyebrow mb-4">Got Questions?</span>
              <h2 className="font-display heading-tight text-4xl sm:text-5xl 3xl:text-6xl font-bold text-white">
                FAQ<span className="font-serif-display italic normal-case text-[#2563EB]">s</span>
              </h2>
            </motion.div>

            <div>
              {faqs.map((item, index) => (
                <FAQItem
                  key={item.q}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? -1 : index)
                  }
                />
              ))}
            </div>
          </div>

          {/* Right: Booking CTA card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:sticky lg:top-32 bg-[#2563EB] rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(37,99,235,0.35)]"
            >
              <h3 className="font-display heading-tight text-2xl sm:text-3xl font-bold text-[#0B1120] mb-4">
                Still not sure?
                <br />
                Book a free discovery call.
              </h3>
              <p className="text-[#0B1120]/80 leading-relaxed mb-8">
                Your website should make your brand clear, strong, and
                instantly trustworthy. Let's talk about your project.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+919731133425" className="flex-1">
                  <button className="btn-tactile w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0B1120] hover:bg-black text-white font-bold rounded-full transition-colors duration-300 cursor-pointer">
                    <CalendarCheck className="w-4 h-4" />
                    Schedule Now
                  </button>
                </a>
                <a href="mailto:info@senovadigital.xyz" className="flex-1">
                  <button className="btn-tactile w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-white/90 text-[#0B1120] font-bold rounded-full transition-colors duration-300 cursor-pointer">
                    <Mail className="w-4 h-4" />
                    Email Us
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQBooking;

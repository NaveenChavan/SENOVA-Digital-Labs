// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const UpcomingBanner = () => {
  return (
    <section className="relative py-16 md:py-20 3xl:py-24 bg-[#0A1931]">
      <div className="relative responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-2xl overflow-hidden border border-[#4A7FA7]/30 shadow-[0_0_30px_rgba(74,127,167,0.2)]"
        >
          <img
            src="/assets/banner.png"
            alt="Something big is taking shape — SENOVA is building two new software platforms"
            className="w-full h-auto block"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingBanner;

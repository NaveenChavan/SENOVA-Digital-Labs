// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Clock,
  Tag,
  Users,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

const Offer = () => {
  const smoothEase = [0.25, 0.1, 0.25, 1];

  return (
    <section
      id="offer"
      className="py-20 md:py-28 lg:py-32 3xl:py-36 bg-[#0B1120] relative overflow-hidden"
    >
      <div className="noise-overlay" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-[150px] pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[120px] pointer-events-none will-change-transform" />

      <div className="responsive-container relative z-10">
        <div className="w-full flex justify-center mb-16 3xl:mb-20 px-2">
          <div className="flex flex-col items-center justify-center max-w-4xl 3xl:max-w-5xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="eyebrow justify-center mb-6"
            >
              <Clock size={16} className="animate-pulse" />
              Launch Offer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
              className="font-display heading-tight fluid-heading-lg font-extrabold text-white mb-6 w-full text-center"
            >
              Scale Your Business. <br />
              <span className="font-serif-display italic normal-case text-[#2563EB]">We Pay For Your Trust.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="text-[#9999A1] text-lg 3xl:text-xl leading-relaxed w-full text-center"
            >
              SENOVA Digital Labs is officially live! To celebrate, we are
              rolling out an exclusive offer with massive benefits for both
              business owners and our referral partners.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 3xl:gap-14 items-stretch w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
            className="flex flex-col justify-center gap-6 3xl:gap-8 w-full"
          >
            <div className="w-full bg-[#131C2E] border border-[#2563EB]/30 rounded-3xl p-7 sm:p-8 md:p-9 3xl:p-10 relative overflow-hidden group hover:border-[#2563EB]/60 transition-colors shadow-lg">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]" />
              <div className="flex items-center gap-4 mb-4 pl-1">
                <div className="w-12 h-12 3xl:w-14 3xl:h-14 rounded-xl bg-[#2563EB]/10 flex items-center justify-center border border-[#2563EB]/30 shrink-0">
                  <Tag className="w-6 h-6 3xl:w-7 3xl:h-7 text-[#2563EB]" />
                </div>
                <h3 className="text-xl sm:text-2xl 3xl:text-3xl font-display font-bold text-white">
                  For Business Owners
                </h3>
              </div>
              <h4 className="text-lg sm:text-xl 3xl:text-2xl font-bold text-[#2563EB] mb-3 pl-1">
                Up to 15% OFF Direct Booking
              </h4>
              <p className="text-[#9999A1] text-sm sm:text-base 3xl:text-lg leading-relaxed mb-6 pl-1">
                Skip the middleman. If you are a gym, salon, clinic, or business
                owner reaching out to us directly, you get up to 15% discount on
                custom web development and mobile apps. Get premium tech at an
                unbeatable launch price.
              </p>
              <a
                href="https://wa.me/919731133425"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#2563EB] font-bold hover:text-white transition-colors 3xl:text-lg pl-1"
              >
                Claim Offer Now <ArrowRight size={18} />
              </a>
            </div>

            <div className="w-full bg-[#131C2E] border border-[#22304A] rounded-3xl p-7 sm:p-8 md:p-9 3xl:p-10 relative overflow-hidden group hover:border-[#2563EB]/40 transition-colors shadow-lg">
              <div className="absolute top-0 left-0 w-1 h-full bg-white/40" />
              <div className="flex items-center gap-4 mb-4 pl-1">
                <div className="w-12 h-12 3xl:w-14 3xl:h-14 rounded-xl bg-white/5 flex items-center justify-center border border-[#22304A] shrink-0">
                  <Users className="w-6 h-6 3xl:w-7 3xl:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl 3xl:text-3xl font-display font-bold text-white">
                  For Referral Partners
                </h3>
              </div>
              <h4 className="text-lg sm:text-xl 3xl:text-2xl font-bold text-[#4ADE80] mb-3 pl-1">
                Flat 10% Cash Commission
              </h4>
              <p className="text-[#9999A1] text-sm sm:text-base 3xl:text-lg leading-relaxed mb-6 pl-1">
                Know someone who needs a professional website or app? Refer them
                to SENOVA. When the deal closes, we transfer{" "}
                <span className="font-bold text-[#4ADE80]">
                  10% of the total project value
                </span>{" "}
                directly to your bank account. No capping, no hidden terms.
              </p>
              <a
                href="https://wa.me/919731133425"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#4ADE80] font-bold hover:text-white transition-colors 3xl:text-lg pl-1"
              >
                Submit a Referral <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
            className="w-full h-full flex items-center"
          >
            <div className="w-full bg-[#131C2E] border-2 border-dashed border-[#22304A] rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl relative group p-5 sm:p-7 3xl:p-9">
              <img
                src="/assets/Offer.png"
                alt="SENOVA Launch Offer"
                className="responsive-image-contain min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[450px] 3xl:min-h-[520px] max-h-[700px] 3xl:max-h-[800px] transition-transform duration-500 hover:scale-[1.03] rounded-xl"
              />
              <div className="absolute inset-0 z-[-1] flex flex-col items-center justify-center p-8">
                <ImageIcon className="w-12 h-12 lg:w-20 lg:h-20 text-[#22304A] mb-4 transition-transform duration-300" />
                <p className="text-[#9999A1] font-medium text-sm lg:text-base text-center">
                  Loading Image...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Offer;

import React from "react";
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
      className="min-h-screen mt-32 pt-12 pb-20 bg-[#0A1931] relative overflow-hidden flex items-center"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#50C878]/5 rounded-full blur-[150px] pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A7FA7]/10 rounded-full blur-[120px] pointer-events-none will-change-transform" />

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full flex justify-center mb-16 px-2">
          <div className="flex flex-col items-center justify-center max-w-4xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center justify-center gap-2 bg-[#50C878]/10 text-[#50C878] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#50C878]/20"
            >
              <Clock size={16} className="animate-pulse" />
              Launch Offer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F6FAFD] mb-6 tracking-tight w-full text-center"
            >
              Scale Your Business. <br />
              <span className="text-[#50C878]">We Pay For Your Trust.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="text-[#B3CFE5]/80 text-lg leading-relaxed w-full text-center"
            >
              SENOVA Digital Labs is officially live! To celebrate, we are
              rolling out an exclusive offer with massive benefits for both
              business owners and our referral partners.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
            className="flex flex-col justify-center gap-6 w-full"
          >
            <div className="w-full bg-[#1A3D63]/40 backdrop-blur-md border border-[#50C878]/30 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-[#50C878]/60 transition-colors shadow-lg">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#50C878]" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#50C878]/10 flex items-center justify-center border border-[#50C878]/30 shrink-0">
                  <Tag className="w-6 h-6 text-[#50C878]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F6FAFD]">
                  For Business Owners
                </h3>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#50C878] mb-3">
                Up to 15% OFF Direct Booking
              </h4>
              <p className="text-[#B3CFE5]/80 text-sm sm:text-base leading-relaxed mb-6">
                Skip the middleman. If you are a gym, salon, clinic, or business
                owner reaching out to us directly, you get up to 15% discount on
                custom web development and mobile apps. Get premium tech at an
                unbeatable launch price.
              </p>
              <a
                href="https://wa.me/919731133425"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#50C878] font-bold hover:text-white transition-colors"
              >
                Claim Offer Now <ArrowRight size={18} />
              </a>
            </div>

            <div className="w-full bg-[#1A3D63]/40 backdrop-blur-md border border-[#4A7FA7]/30 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-[#4A7FA7]/60 transition-colors shadow-lg">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#4A7FA7]" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#4A7FA7]/10 flex items-center justify-center border border-[#4A7FA7]/30 shrink-0">
                  <Users className="w-6 h-6 text-[#F6FAFD]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F6FAFD]">
                  For Referral Partners
                </h3>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#10B981] mb-3">
                Flat 10% Cash Commission
              </h4>
              <p className="text-[#B3CFE5]/80 text-sm sm:text-base leading-relaxed mb-6">
                Know someone who needs a professional website or app? Refer them
                to SENOVA. When the deal closes, we transfer{" "}
                <span className="font-bold text-[#10B981]">
                  10% of the total project value
                </span>{" "}
                directly to your bank account. No capping, no hidden terms.
              </p>
              <a
                href="https://wa.me/919731133425"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#10B981] font-bold hover:text-white transition-colors"
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
            className="w-full h-full"
          >
            <div className="w-full h-full bg-[#1A3D63]/30 backdrop-blur-sm border-2 border-dashed border-[#4A7FA7]/50 rounded-3xl flex flex-col items-center justify-center overflow-hidden shadow-2xl relative group">
              <img
                src="/assets/Offer.png"
                alt="SENOVA Launch Offer"
                className="w-full h-auto lg:absolute lg:inset-0 lg:h-full object-contain p-4 lg:p-6 z-10 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-8">
                <ImageIcon className="w-12 h-12 lg:w-20 lg:h-20 text-[#4A7FA7]/40 mb-4 transition-transform duration-300" />
                <p className="text-[#B3CFE5]/60 font-medium text-sm lg:text-base text-center">
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

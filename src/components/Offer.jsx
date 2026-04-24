import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Tag,
  Users,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

const Offer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Deadline: May 9, 2026
    const targetDate = new Date("2026-05-09T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const smoothEase = [0.25, 0.1, 0.25, 1];

  return (
    <section
      id="offer"
      className="min-h-screen mt-32 pt-12 pb-20 bg-[#0A1931] relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#50C878]/5 rounded-full blur-[150px] pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A7FA7]/10 rounded-full blur-[120px] pointer-events-none will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Title Area */}
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mb-16 px-2 sm:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center justify-center gap-2 bg-[#50C878]/10 text-[#50C878] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-[#50C878]/20"
          >
            <Clock size={16} className="animate-pulse" />
            Limited Time Launch Offer
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
            className="text-[#B3CFE5]/80 text-lg leading-relaxed max-w-3xl w-full text-center"
          >
            SENOVA Digital Labs is officially live! To celebrate, we are rolling
            out an exclusive 15-day offer with massive benefits for both
            business owners and our referral partners.
          </motion.p>
        </div>

        {/* Two Column Layout Master Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch w-full">
          {/* LEFT COLUMN: Timer & Offer Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
            className="flex flex-col gap-6 w-full"
          >
            {/* Timer Card */}
            <div className="w-full bg-[#1A3D63]/30 backdrop-blur-md border border-[#50C878]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(80,200,120,0.15)] flex flex-col justify-center items-center">
              <h3 className="text-[#F6FAFD] font-bold text-base md:text-lg mb-5 uppercase tracking-widest flex items-center justify-center gap-2">
                <Clock size={18} className="text-[#50C878] animate-pulse" />
                Offer Expires In
              </h3>
              <div className="flex justify-center items-center gap-4 sm:gap-8 text-3xl sm:text-5xl font-bold text-[#F6FAFD] tracking-wider font-mono">
                <div className="flex flex-col items-center">
                  <span>{String(timeLeft.days).padStart(2, "0")}</span>
                  <span className="text-xs text-[#B3CFE5]/60 font-medium uppercase tracking-widest mt-2">
                    Days
                  </span>
                </div>
                <span className="text-[#4A7FA7] text-3xl sm:text-5xl pb-4 sm:pb-6">
                  :
                </span>
                <div className="flex flex-col items-center">
                  <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-xs text-[#B3CFE5]/60 font-medium uppercase tracking-widest mt-2">
                    Hrs
                  </span>
                </div>
                <span className="text-[#4A7FA7] text-3xl sm:text-5xl pb-4 sm:pb-6">
                  :
                </span>
                <div className="flex flex-col items-center">
                  <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-xs text-[#B3CFE5]/60 font-medium uppercase tracking-widest mt-2">
                    Min
                  </span>
                </div>
                <span className="text-[#4A7FA7] text-3xl sm:text-5xl pb-4 sm:pb-6">
                  :
                </span>
                <div className="flex flex-col items-center">
                  <span className="text-[#50C878]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-[#50C878]/60 font-medium uppercase tracking-widest mt-2">
                    Sec
                  </span>
                </div>
              </div>
            </div>

            {/* Business Owner Card */}
            <div className="w-full bg-[#1A3D63]/40 backdrop-blur-md border border-[#50C878]/30 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-[#50C878]/60 transition-colors">
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
                Flat 25% OFF Direct Booking
              </h4>
              <p className="text-[#B3CFE5]/80 text-sm sm:text-base leading-relaxed mb-6">
                Skip the middleman. If you are a gym, salon, clinic, or business
                owner reaching out to us directly, you get a flat 25% discount
                on custom web development and mobile apps. Get premium tech at
                an unbeatable launch price.
              </p>
              <a
                href="https://wa.me/919731133425?text=Hi%20SENOVA,%20I'm%20a%20business%20owner%20interested%20in%20the%2025%25%20OFF%20offer."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#50C878] font-bold hover:text-white transition-colors"
              >
                Claim 25% Off Now <ArrowRight size={18} />
              </a>
            </div>

            {/* Referral Partner Card */}
            <div className="w-full bg-[#1A3D63]/40 backdrop-blur-md border border-[#4A7FA7]/30 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-[#4A7FA7]/60 transition-colors">
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
                href="https://wa.me/919731133425?text=Hi%20SENOVA,%20I%20have%20a%20referral%20for%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#10B981] font-bold hover:text-white transition-colors"
              >
                Submit a Referral <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Image Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
            className="w-full h-full min-h-[400px] lg:min-h-full"
          >
            {/* Square/Vertical Image Placeholder */}
            <div className="w-full h-full bg-[#1A3D63]/30 backdrop-blur-sm border-2 border-dashed border-[#4A7FA7]/50 rounded-3xl flex flex-col items-center justify-center overflow-hidden shadow-2xl relative group">
              {/* YAHAN FIX KIYA: Image ka path aur code theek kar diya gaya hai */}
              <img
                src="/assets/Offer.jpeg"
                alt="SENOVA Launch Offer"
                className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 hover:scale-105"
              />

              {/* Ye placeholder background mein rahega agar image load na ho */}
              <div className="relative z-0 flex flex-col items-center justify-center p-8">
                <ImageIcon className="w-20 h-20 text-[#4A7FA7]/40 mb-4 transition-transform duration-300" />
                <p className="text-[#B3CFE5]/60 font-medium text-base text-center">
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

// eslint-disable-next-line no-unused-vars
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Phone,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Terminal,
} from "lucide-react";

const FloatingBadge = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    // YAHAN FIX HAI: Premium Dark Theme Glassmorphism
    className={`absolute hidden xl:flex items-center gap-2 bg-[#1A3D63]/50 backdrop-blur-md border border-[#4A7FA7]/30 rounded-full px-4 py-2 shadow-[0_0_20px_rgba(74,127,167,0.15)] ${className}`}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  return (
    // YAHAN FIX HAI: Dark Navy Background (#0A1931)
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-[#0A1931]">
      {/* Background Glowing Mesh Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#4A7FA7]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#1A3D63]/30 rounded-full blur-[100px]" />
      </div>

      <FloatingBadge delay={0.8} className="top-1/4 left-10">
        <Sparkles className="w-4 h-4 text-[#B3CFE5]" />
        <span className="text-sm text-[#F6FAFD]">Premium Quality</span>
      </FloatingBadge>

      <FloatingBadge delay={1} className="top-1/3 right-10">
        <span className="w-2 h-2 bg-[#50C878] rounded-full animate-pulse shadow-[0_0_10px_#50C878]" />
        <span className="text-sm text-[#F6FAFD]">24/7 Support</span>
      </FloatingBadge>

      <FloatingBadge delay={1.2} className="bottom-1/3 left-16">
        <Terminal className="w-4 h-4 text-[#B3CFE5]" />
        <span className="text-[#B3CFE5] font-semibold">100%</span>
        <span className="text-sm text-[#F6FAFD]/80">Scalable Code</span>
      </FloatingBadge>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center w-full"
        >
          {/* Top Pill / Status Indicator */}
          <div className="inline-flex items-center gap-2 bg-[#1A3D63]/60 border border-[#4A7FA7]/40 rounded-full px-5 py-2.5 mb-8 shadow-[0_0_15px_rgba(74,127,167,0.2)]">
            <span className="w-2 h-2 bg-[#B3CFE5] rounded-full animate-pulse" />
            <span className="text-sm text-[#B3CFE5] font-medium tracking-wide">
              SENOVA Digital Innovation Lab
            </span>
          </div>

          {/* YAHAN FIX HAI: Robotic Typewriter Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F6FAFD] leading-tight mb-6 tracking-tight min-h-[140px] md:min-h-[180px]">
            We Build
            <br />
            <span className="text-[#B3CFE5]">
              <TypeAnimation
                sequence={[
                  "High-Performance Systems",
                  2000,
                  "Automation Workflows",
                  2000,
                  "Scalable SaaS Products",
                  2000,
                  "Your Digital Future",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl opacity-90">
              To Get You More Customers
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#B3CFE5]/80 max-w-2xl mx-auto mb-10 leading-relaxed text-center">
            Transforming local businesses into tech-driven powerhouses with
            clean code, premium design, and intelligent automation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
            <a href="#contact-form" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#4A7FA7] hover:bg-[#B3CFE5] text-[#0A1931] font-bold px-8 py-3.5 rounded-lg transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(74,127,167,0.4)] hover:shadow-[0_0_30px_rgba(179,207,229,0.6)] hover:-translate-y-1">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </a>
            <a href="#portfolio" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#4A7FA7]/50 hover:border-[#B3CFE5] text-[#F6FAFD] hover:text-[#B3CFE5] bg-[#1A3D63]/30 hover:bg-[#1A3D63]/60 font-medium px-8 py-3.5 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
                <span>View Our Work</span>
              </button>
            </a>
          </div>

          {/* Contact Info Footer inside Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="tel:+919731133425"
              className="flex items-center gap-3 text-[#B3CFE5]/70 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] group-hover:shadow-[0_0_15px_rgba(74,127,167,0.4)] transition-all duration-300">
                <Phone className="w-4 h-4 text-[#B3CFE5]" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#B3CFE5]/50">Call Us</p>
                <p className="text-sm font-medium text-[#F6FAFD]">
                  +91 9731133425
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/918088366098?text=Hello%20SENOVA%2C%20I%27m%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#B3CFE5]/70 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] group-hover:shadow-[0_0_15px_rgba(74,127,167,0.4)] transition-all duration-300">
                <MessageCircle className="w-4 h-4 text-[#B3CFE5]" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#B3CFE5]/50">WhatsApp</p>
                <p className="text-sm font-medium text-[#F6FAFD]">
                  +91 8088366098
                </p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-[#4A7FA7]/50 bg-[#1A3D63]/30 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-[#B3CFE5] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

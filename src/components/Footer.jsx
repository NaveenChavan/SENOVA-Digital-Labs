import React from "react";
import { Phone, Mail, ChevronRight } from "lucide-react";
import SenovaLogo from "./SenovaLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#0A1931] border-t border-[#4A7FA7]/20 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#1A3D63]/20 rounded-t-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo & Contact Details Column (Takes 2 Columns) */}
          <div className="lg:col-span-2 text-center md:text-left">
            <a
              href="#"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2.5 mb-6 cursor-pointer group"
            >
              <SenovaLogo className="w-10 h-10 group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col justify-center text-left">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-[#F6FAFD] leading-none transition-colors">
                  SENOVA
                </span>
                <span className="text-[11px] md:text-xs font-bold tracking-widest uppercase text-[#4A7FA7] mt-0.5">
                  Digital Labs
                </span>
              </div>
            </a>

            <p className="text-[#B3CFE5]/70 text-sm md:text-base max-w-md mx-auto md:mx-0 mb-8 leading-relaxed font-medium">
              Building high-performance web systems and automation workflows
              that turn visitors into loyal customers.
            </p>

            <div className="flex flex-col gap-5 justify-center md:justify-start mb-8">
              <a
                href="tel:+919731133425"
                className="flex items-center justify-center md:justify-start gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] transition-all duration-300">
                  <Phone size={16} className="text-[#B3CFE5]" />
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  +91 9731133425
                </span>
              </a>

              <a
                href="tel:+918088366098"
                className="flex items-center justify-center md:justify-start gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] transition-all duration-300">
                  <Phone size={16} className="text-[#B3CFE5]" />
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  +91 8088366098
                </span>
              </a>

              <a
                href="mailto:naveenchavan29@gmail.com"
                className="flex items-center justify-center md:justify-start gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] transition-all duration-300">
                  <Mail size={16} className="text-[#B3CFE5]" />
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  naveenchavan29@gmail.com
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/naveen-chavan-8852a9368/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#B3CFE5]"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  Naveen Chavan
                </span>
              </a>
            </div>
          </div>

          {/* Services Links (YAHAN FIX KIYA: lg:justify-self-center) */}
          <div className="lg:justify-self-center text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-[#F6FAFD] font-bold mb-6 text-sm tracking-widest uppercase">
              Services
            </h4>
            <ul className="space-y-4">
              {[
                "Web Development",
                "Business Automation",
                "SaaS Products",
                "UI/UX Design",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="group flex items-center justify-center md:justify-start text-[#B3CFE5]/70 hover:text-[#B3CFE5] transition-all duration-300 text-sm font-medium"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#4A7FA7] mr-1 hidden md:block" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (YAHAN FIX KIYA: lg:justify-self-center) */}
          <div className="lg:justify-self-center text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-[#F6FAFD] font-bold mb-6 text-sm tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Portfolio", href: "#portfolio" },
                { name: "Founders", href: "#founders" },
                { name: "Contact Us", href: "#contact-form" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-center md:justify-start text-[#B3CFE5]/70 hover:text-[#B3CFE5] transition-all duration-300 text-sm font-medium"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#4A7FA7] mr-1 hidden md:block" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#4A7FA7]/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#B3CFE5]/50 text-sm text-center md:text-left font-medium">
            © {currentYear} SENOVA Digital Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[#B3CFE5]/70 text-sm bg-[#1A3D63]/30 px-5 py-2.5 rounded-full border border-[#4A7FA7]/30 font-medium">
            <span>Crafted with</span>
            <svg
              className="w-4 h-4 text-[#50C878] animate-pulse drop-shadow-[0_0_5px_#50C878]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span>in India, serving globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

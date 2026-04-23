// eslint-disable-next-line no-unused-vars
import React from "react";
import { ChevronRight } from "lucide-react";
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
    <footer className="bg-[#0A1931] border-t border-[#4A7FA7]/20 overflow-hidden relative mt-12">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#1A3D63]/20 rounded-t-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* YAHAN FIX HAI: 4 Equal Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & MSME */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <a
              href="#"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2.5 mb-5 cursor-pointer group"
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

            {/* MSME Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A3D63]/40 border border-[#4A7FA7]/30 rounded-lg mb-6 shadow-[0_0_15px_rgba(74,127,167,0.1)]">
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
                className="text-[#50C878]"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span className="text-[11px] md:text-xs font-semibold text-[#B3CFE5] tracking-widest uppercase">
                Govt. MSME Regd.
              </span>
            </div>

            <p className="text-[#B3CFE5]/70 text-sm md:text-base max-w-[250px] text-center md:text-left leading-relaxed font-medium">
              Building high-performance web systems and intelligent workflows
              that turn visitors into loyal customers.
            </p>
          </div>

          {/* Column 2: Contact Info (Ab ye alag ho gaya hai) */}
          <div className="text-center md:text-left lg:justify-self-center">
            <h4 className="text-[#F6FAFD] font-bold mb-6 text-sm tracking-widest uppercase">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4 items-center md:items-start w-full">
              <a
                href="tel:+919731133425"
                className="flex items-center gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] group-hover:shadow-[0_0_10px_rgba(74,127,167,0.3)] transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#B3CFE5]"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  +91 9731133425
                </span>
              </a>

              <a
                href="tel:+918088366098"
                className="flex items-center gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] group-hover:shadow-[0_0_10px_rgba(74,127,167,0.3)] transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#B3CFE5]"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  +91 8088366098
                </span>
              </a>

              <a
                href="mailto:naveenchavan29@gmail.com"
                className="flex items-center gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] group-hover:shadow-[0_0_10px_rgba(74,127,167,0.3)] transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#B3CFE5]"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  naveenchavan29@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Column 3: Services Links */}
          <div className="text-center md:text-left lg:justify-self-center">
            <h4 className="text-[#F6FAFD] font-bold mb-6 text-sm tracking-widest uppercase">
              Services
            </h4>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              {[
                "Web Development",
                "Mobile Applications",
                "Business Automation",
                "SaaS Products",
                "UI/UX Design",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="group flex items-center text-[#B3CFE5]/70 hover:text-[#B3CFE5] transition-all duration-300 text-sm font-medium"
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

          {/* Column 4: Quick Links & Socials */}
          <div className="text-center md:text-left lg:justify-self-end">
            <h4 className="text-[#F6FAFD] font-bold mb-6 text-sm tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-4 flex flex-col items-center md:items-start mb-8">
              {[
                { name: "Portfolio", href: "#portfolio" },
                { name: "Founders", href: "#founders" },
                { name: "Contact Us", href: "#contact-form" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center text-[#B3CFE5]/70 hover:text-[#B3CFE5] transition-all duration-300 text-sm font-medium"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#4A7FA7] mr-1 hidden md:block" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media Row moved here for balance */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://www.instagram.com/senovadigitallabs?igsh=ZG8yZXcxdnRyODIy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#1A3D63]/80 border border-[#4A7FA7]/50 flex items-center justify-center hover:bg-[#4A7FA7] hover:border-[#B3CFE5] transition-all duration-300 group shadow-[0_0_15px_rgba(74,127,167,0.15)] hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#B3CFE5] group-hover:text-[#0A1931] transition-colors"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/naveen-chavan-8852a9368/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#1A3D63]/80 border border-[#4A7FA7]/50 flex items-center justify-center hover:bg-[#4A7FA7] hover:border-[#B3CFE5] transition-all duration-300 group shadow-[0_0_15px_rgba(74,127,167,0.15)] hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#B3CFE5] group-hover:text-[#0A1931] transition-colors"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#4A7FA7]/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
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
            <span>in Raichur, serving globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

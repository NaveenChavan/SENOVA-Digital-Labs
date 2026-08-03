import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1931] border-t border-[#4A7FA7]/20 overflow-hidden relative mt-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#1A3D63]/20 rounded-t-full blur-[100px]" />
      </div>

      <div className="relative responsive-container py-12 md:py-16 3xl:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 3xl:gap-12">
          {/* Column 1: Brand & MSME */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-5 cursor-pointer group"
            >
              <img
                src="/assets/logo.jpeg"
                alt="SENOVA Logo"
                className="w-10 h-10 3xl:w-12 3xl:h-12 4k:w-14 4k:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col justify-center text-left">
                <span className="text-xl md:text-2xl 3xl:text-3xl font-bold tracking-tight text-[#F6FAFD] leading-none transition-colors">
                  SENOVA
                </span>
                <span className="text-[11px] md:text-xs 3xl:text-sm font-bold tracking-widest uppercase text-[#4A7FA7] mt-0.5">
                  Digital Labs
                </span>
              </div>
            </Link>

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
              <span className="text-[11px] md:text-xs 3xl:text-sm font-semibold text-[#B3CFE5] tracking-widest uppercase">
                Govt. MSME Regd.
              </span>
            </div>

            <p className="text-[#B3CFE5]/70 text-sm md:text-base 3xl:text-lg max-w-[250px] 3xl:max-w-[300px] text-center md:text-left leading-relaxed font-medium">
              Building high-performance web systems and intelligent workflows
              that turn visitors into loyal customers.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="text-center md:text-left lg:justify-self-center">
            <h4 className="text-[#F6FAFD] font-bold mb-6 text-sm 3xl:text-base tracking-widest uppercase">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4 3xl:gap-5 items-center md:items-start w-full">
              <a
                href="tel:+919731133425"
                className="flex items-center gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-9 h-9 3xl:w-10 3xl:h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] group-hover:shadow-[0_0_10px_rgba(74,127,167,0.3)] transition-all duration-300">
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
                <span className="text-sm 3xl:text-base font-semibold tracking-wide">
                  +91 9731133425
                </span>
              </a>

              <a
                href="tel:+918088366098"
                className="flex items-center gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-9 h-9 3xl:w-10 3xl:h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] group-hover:shadow-[0_0_10px_rgba(74,127,167,0.3)] transition-all duration-300">
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
                <span className="text-sm 3xl:text-base font-semibold tracking-wide">
                  +91 8088366098
                </span>
              </a>

              <a
                href="mailto:info@senovadigital.xyz"
                className="flex items-center gap-3 text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-9 h-9 3xl:w-10 3xl:h-10 rounded-full bg-[#1A3D63] border border-[#4A7FA7]/40 flex items-center justify-center group-hover:border-[#B3CFE5] group-hover:shadow-[0_0_10px_rgba(74,127,167,0.3)] transition-all duration-300">
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
                <span className="text-sm 3xl:text-base font-semibold tracking-wide">
                  info@senovadigital.xyz
                </span>
              </a>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="text-center md:text-left lg:justify-self-center">
            <h4 className="text-[#F6FAFD] font-bold mb-6 text-sm 3xl:text-base tracking-widest uppercase">
              Services
            </h4>
            <ul className="space-y-4 3xl:space-y-5 flex flex-col items-center md:items-start">
              {[
                "Web Development",
                "Mobile Applications",
                "Business Automation",
                "SaaS Products",
                "UI/UX Design",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/#services"
                    className="group flex items-center text-[#B3CFE5]/70 hover:text-[#B3CFE5] transition-all duration-300 text-sm 3xl:text-base font-medium"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#4A7FA7] mr-1 hidden md:block" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="text-center md:text-left lg:justify-self-end">
            <h4 className="text-[#F6FAFD] font-bold mb-6 text-sm 3xl:text-base tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-4 3xl:space-y-5 flex flex-col items-center md:items-start mb-8">
              {[
                { name: "Portfolio", href: "/#portfolio" },
                { name: "Founders", href: "/#founders" },
                { name: "Contact Us", href: "/#contact-form" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center text-[#B3CFE5]/70 hover:text-[#B3CFE5] transition-all duration-300 text-sm 3xl:text-base font-medium"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#4A7FA7] mr-1 hidden md:block" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#4A7FA7]/20 mt-16 3xl:mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <p className="text-[#B3CFE5]/50 text-sm 3xl:text-base text-center md:text-left font-medium">
            © {currentYear} SENOVA Digital Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[#B3CFE5]/70 text-sm 3xl:text-base bg-[#1A3D63]/30 px-5 py-2.5 rounded-full border border-[#4A7FA7]/30 font-medium">
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

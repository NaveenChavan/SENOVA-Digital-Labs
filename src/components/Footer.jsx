// eslint-disable-next-line no-unused-vars
import React from "react";
// DEKHIYE: Yahan se Linkedin hata diya hai taaki crash na ho
import { Phone, Mail, ChevronRight } from "lucide-react";

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
    <footer className="bg-surface border-t border-border overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand & Contact Section */}
          <div className="lg:col-span-2 text-center md:text-left">
            <a
              href="#"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 mb-5 cursor-pointer group"
            >
              <span className="text-xl md:text-2xl font-bold text-text-primary tracking-tight transition-colors group-hover:text-accent">
                SENOVA
              </span>
              <span className="text-xl md:text-2xl font-bold text-accent tracking-tight">
                Digital Labs
              </span>
            </a>

            <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
              Building high-performance web systems and automation workflows
              that turn visitors into loyal customers.
            </p>

            {/* Contact Details Stack */}
            <div className="flex flex-col gap-3 justify-center md:justify-start mb-8">
              <a
                href="tel:+919731133425"
                className="flex items-center justify-center md:justify-start gap-3 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:border-accent">
                  <Phone size={14} />
                </div>
                <span className="text-sm font-medium">+91 9731133425</span>
              </a>

              <a
                href="tel:+918088366098"
                className="flex items-center justify-center md:justify-start gap-3 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:border-accent">
                  <Phone size={14} />
                </div>
                <span className="text-sm font-medium">+91 8088366098</span>
              </a>

              <a
                href="mailto:naveenchavan29@gmail.com"
                className="flex items-center justify-center md:justify-start gap-3 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:border-accent">
                  <Mail size={14} />
                </div>
                <span className="text-sm font-medium">
                  naveenchavan29@gmail.com
                </span>
              </a>
            </div>

            {/* 100% CRASH-FREE Social Icon (Using raw SVG) */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://www.linkedin.com/in/naveen-chavan-8852a9368/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent hover:border-accent transition-all duration-300"
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
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h4 className="text-text-primary font-semibold mb-6 text-sm tracking-wider uppercase">
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
                    className="group flex items-center justify-center md:justify-start text-text-secondary hover:text-accent transition-all duration-300 text-sm"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent mr-1 hidden md:block" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h4 className="text-text-primary font-semibold mb-6 text-sm tracking-wider uppercase">
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
                    className="group flex items-center justify-center md:justify-start text-text-secondary hover:text-accent transition-all duration-300 text-sm"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent mr-1 hidden md:block" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm text-center md:text-left">
            © {currentYear} SENOVA Digital Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-text-muted text-sm bg-surface px-4 py-2 rounded-full border border-border">
            <span>Crafted with</span>
            <svg
              className="w-4 h-4 text-accent animate-pulse"
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

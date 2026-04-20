import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import SenovaLogo from "./SenovaLogo";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Founders", href: "#founders" },
  { name: "Contact", href: "#contact-form" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="w-full fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-7xl mx-auto transition-all duration-300 ${
            isScrolled
              ? "bg-[#0A1931]/80 backdrop-blur-xl rounded-xl border border-[#4A7FA7]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between h-16 md:h-20">
            {/* Naya Logo Section */}
            <a
              href="#"
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <SenovaLogo className="w-9 h-9 md:w-10 md:h-10 group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col justify-center">
                <span className="text-lg md:text-xl font-bold tracking-tight text-[#F6FAFD] leading-none">
                  SENOVA
                </span>
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#4A7FA7] mt-0.5">
                  Digital Labs
                </span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[#B3CFE5]/80 hover:text-[#B3CFE5] transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a href="#contact-form">
                <button className="group flex items-center gap-2 px-5 py-2.5 bg-[#4A7FA7] hover:bg-[#B3CFE5] text-[#0A1931] rounded-lg transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(74,127,167,0.3)]">
                  <span className="text-sm font-bold">Start project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </a>
            </div>

            <button
              className="md:hidden text-[#F6FAFD] cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A1931]/95 backdrop-blur-xl md:hidden pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-semibold text-[#F6FAFD] hover:text-[#4A7FA7] transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact-form"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full max-w-xs"
              >
                <button className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-[#4A7FA7] text-[#0A1931] rounded-lg transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(74,127,167,0.4)]">
                  <span className="font-bold">Start project</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

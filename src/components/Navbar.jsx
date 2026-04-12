import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
              ? "bg-white/90 backdrop-blur-xl rounded-xl border border-border shadow-lg"
              : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center cursor-pointer">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
                SENOVA
              </span>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-accent ml-1">
                Digital Labs
              </span>
            </a>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a href="#contact-form">
                <button className="group flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg transition-all duration-300 cursor-pointer shadow-lg shadow-accent/20">
                  <span className="text-sm font-semibold">Start project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </a>
            </div>

            <button
              className="md:hidden text-text-primary cursor-pointer"
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
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl md:hidden pt-20"
          >
            <div className="flex flex-col items-center gap-8 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl text-text-primary hover:text-accent transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact-form"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <button className="mt-4 flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg transition-all duration-300 cursor-pointer shadow-lg shadow-accent/20">
                  <span className="text-sm font-semibold">Start project</span>
                  <ArrowRight className="w-4 h-4" />
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

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  // eslint-disable-next-line no-unused-vars
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Work", href: "/#portfolio", section: "portfolio" },
  { name: "Services", href: "/#services", section: "services" },
  { name: "Founders", href: "/#founders", section: "founders" },
  { name: "Offer", href: "/#offer", section: "offer" },
];

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [progress, setProgress] = useState(0);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setIsHidden(latest > previous && latest > 150);

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    setProgress(scrollable > 0 ? Math.min(latest / scrollable, 1) : 0);
  });

  // Track which section is currently in view so the nav link for it can be
  // highlighted — pure enhancement, doesn't touch existing hash routing.
  useEffect(() => {
    if (location.pathname !== "/") {
      const timeoutId = setTimeout(() => setActiveSection(""), 0);
      return () => clearTimeout(timeoutId);
    }

    const sectionIds = navLinks.filter((l) => l.section).map((l) => l.section);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <header className="w-full fixed top-4 left-0 right-0 z-50 px-4 sm:px-5 md:px-8 lg:px-10 3xl:px-10">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: isHidden ? -100 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-[1600px] mx-auto bg-[#101828]/70 backdrop-blur-xl rounded-full border border-[#22304A] shadow-[0_10px_30px_rgba(0,0,0,0.6)] will-change-transform overflow-hidden"
        >
          {/* Scroll progress indicator — thin accent line along the top edge */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-[#2563EB] shadow-[0_0_8px_#2563EB]"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="w-full px-4 sm:px-5 lg:px-6 flex items-center justify-between h-14 md:h-16">
            {/* Left: brand mark + identifier */}
            <Link
              to="/"
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <span className="w-11 h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src="/assets/logo.webp"
                  alt="Senova Digital Labs logo"
                  width="48"
                  height="51"
                  fetchpriority="high"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display font-bold text-sm md:text-base text-white tracking-tight whitespace-nowrap">
                  SENOVA
                </span>
                <span className="font-display font-semibold text-[9px] md:text-[10px] text-[#7DD3FC] tracking-widest whitespace-nowrap">
                  DIGITAL LABS
                </span>
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-7 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.section;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative text-sm font-medium transition-colors duration-200 cursor-pointer group ${
                      isActive ? "text-white" : "text-[#9999A1] hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#2563EB] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block shrink-0">
              <Link to="/#contact-form">
                <button className="btn-tactile group flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#3B82F6] text-white rounded-full transition-colors duration-300 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_28px_rgba(37,99,235,0.6)]">
                  <span className="text-sm font-bold">Contact</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#0B1120]/95 backdrop-blur-xl md:hidden pt-24 will-change-transform will-change-opacity"
          >
            <div className="flex flex-col items-center gap-8 p-6">
              {navLinks.map((link) => {
                const isMobileActive = activeSection === link.section;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-2xl font-display font-semibold transition-colors duration-200 cursor-pointer ${
                      isMobileActive ? "text-[#2563EB]" : "text-white hover:text-[#2563EB]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/#contact-form"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full max-w-xs"
              >
                <button className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-[#2563EB] text-white rounded-full transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                  <span className="font-bold">Contact</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

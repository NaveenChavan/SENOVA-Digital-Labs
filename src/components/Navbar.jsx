import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Work", href: "/#portfolio", section: "portfolio" },
  { name: "Services", href: "/#services", section: "services" },
  { name: "Team", href: "/#founders", section: "founders" },
  { name: "Offer", href: "/#offer", section: "offer" },
  { name: "Coming soon", href: "/upcoming-projects", section: null },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    // Observe every home section (including ones not in the nav, like FAQ and
    // Contact) so the highlight clears when the reader moves past the last
    // nav section. Without this the last highlighted link would stick.
    const ids = ["portfolio", "services", "founders", "offer", "faq", "contact-form"];
    const navIds = navLinks.map((l) => l.section).filter(Boolean);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;
    const inBand = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? inBand.add(e.target.id) : inBand.delete(e.target.id),
        );
        const current = ids.find((id) => inBand.has(id));
        setActiveSection(current && navIds.includes(current) ? current : "");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (link) =>
    link.section
      ? location.pathname === "/" && activeSection === link.section
      : location.pathname === link.href;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "bg-[#0b1120]/80 backdrop-blur-xl border-b border-white/[0.08]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="responsive-container flex h-16 items-center justify-between"
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
          >
            <img
              src="/assets/logo-sm.webp"
              alt=""
              width="34"
              height="36"
              decoding="async"
              className="h-9 w-auto"
            />
            <span className="text-[15px] font-semibold tracking-tight">
              SENOVA
              <span className="ml-1.5 hidden font-medium text-[#9aa3b2] min-[400px]:inline">Digital Labs</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  aria-current={isActive(link) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link)
                      ? "bg-white/[0.08] text-white"
                      : "text-[#b4bccb] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link to="/#contact-form" className="btn btn-primary btn-sm hidden md:inline-flex">
              Get in touch
            </Link>
            <button
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
          <div
            id="mobile-menu"
            className="menu-in fixed inset-0 z-40 bg-[#0b1120]/95 pt-16 backdrop-blur-xl md:hidden"
          >
            <ul className="responsive-container flex flex-col pt-4">
              {navLinks.map((link) => (
                <li key={link.name} className="border-b border-white/[0.08]">
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-5 text-2xl font-semibold tracking-tight ${
                      isActive(link) ? "text-white" : "text-[#b4bccb]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-8">
                <Link
                  to="/#contact-form"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>
        )}
    </>
  );
};

export default Navbar;

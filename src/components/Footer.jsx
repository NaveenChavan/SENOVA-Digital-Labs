import { Link } from "react-router-dom";
import { Mail, PhoneCall } from "lucide-react";

const navLinks = [
  { name: "Work", href: "/#portfolio" },
  { name: "Services", href: "/#services" },
  { name: "Founders", href: "/#founders" },
  { name: "Contact", href: "/#contact-form" },
];

// Simple inline brand icons (lucide-react no longer ships branded social
// icons in this project's installed version).
const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.16L2 22l5.09-1.53a9.87 9.87 0 0 0 4.95 1.33h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.02.9.91-2.94-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.82 2.42a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.22-8.22 8.22h-.17zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.19.04-.35-.03-.48-.08-.13-.51-1.22-.7-1.68-.19-.44-.38-.38-.53-.39h-.45c-.15 0-.4.06-.6.29-.21.23-.79.77-.79 1.86 0 1.1.8 2.16.91 2.31.12.15 1.52 2.32 3.7 3.16 1.84.7 2.22.56 2.62.52.4-.04 1.29-.53 1.47-1.03.18-.51.18-.94.13-1.03-.06-.1-.24-.16-.5-.28z" />
  </svg>
);

const socials = [
  {
    name: "Naveen — LinkedIn",
    href: "https://www.linkedin.com/in/naveen-chavan-8852a9368/",
    icon: LinkedInIcon,
  },
  {
    name: "Shrihari — LinkedIn",
    href: "https://www.linkedin.com/in/shrihari-124323340/",
    icon: LinkedInIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/senovadigitallabs",
    icon: InstagramIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919731133425",
    icon: WhatsAppIcon,
  },
];

const Footer = () => {
  // Fixed at build time so the prerendered HTML and the hydrated page
  // always agree (a runtime `new Date()` would differ for a build served
  // across a new year). Rebuild to update.
  const currentYear = __BUILD_YEAR__;

  return (
    <footer className="bg-[#0B1120] border-t border-[#22304A] overflow-hidden relative">
      <div className="noise-overlay" />
      {/* Giant headline */}
      <div className="relative responsive-container pt-20 md:pt-28 3xl:pt-32 pb-16 md:pb-20">
        <h2 className="font-display heading-tight text-[clamp(2rem,7vw,5.5rem)] font-bold text-white leading-[0.95] text-center sm:text-left">
          Let's <span className="font-serif-display italic normal-case text-[#2563EB]">build</span> incredible
          <br />
          work together.
        </h2>
      </div>

      <div className="relative responsive-container pb-12 md:pb-16 3xl:pb-20 border-t border-[#22304A] pt-12 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 3xl:gap-12">
          {/* Column 1: Email */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">
              Email
            </h4>
            <a
              href="mailto:info@senovadigital.xyz"
              className="inline-flex items-center gap-3 text-[#9999A1] hover:text-[#2563EB] transition-colors duration-200 group"
            >
              <span className="w-9 h-9 rounded-full bg-[#131C2E] border border-[#22304A] flex items-center justify-center group-hover:border-[#2563EB]/60 transition-colors">
                <Mail className="w-4 h-4" />
              </span>
              <span className="text-sm font-semibold break-all">
                info@senovadigital.xyz
              </span>
            </a>
          </div>

          {/* Column 2: Call Us */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">
              Call Us
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+919731133425"
                className="inline-flex items-center gap-3 text-[#9999A1] hover:text-[#2563EB] transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded-full bg-[#131C2E] border border-[#22304A] flex items-center justify-center group-hover:border-[#2563EB]/60 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </span>
                <span className="text-sm font-semibold">+91 9731133425</span>
              </a>
              <a
                href="tel:+918088366098"
                className="inline-flex items-center gap-3 text-[#9999A1] hover:text-[#2563EB] transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded-full bg-[#131C2E] border border-[#22304A] flex items-center justify-center group-hover:border-[#2563EB]/60 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </span>
                <span className="text-sm font-semibold">+91 8088366098</span>
              </a>
              <Link
                to="/#contact-form"
                className="text-sm font-semibold text-[#9999A1] hover:text-[#2563EB] transition-colors duration-200 pl-12"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          {/* Column 3: Socials */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">
              Socials
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="w-10 h-10 rounded-full bg-[#131C2E] border border-[#22304A] flex items-center justify-center text-[#9999A1] hover:text-white hover:border-[#2563EB]/60 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 4: Navigation */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm font-semibold text-[#9999A1] hover:text-[#2563EB] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-16 3xl:mt-20 pt-8 border-t border-[#22304A]">
          <p className="text-[#9999A1] text-sm text-center md:text-left">
            © {currentYear} SENOVA Digital Labs. All rights reserved.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#131C2E] border border-[#22304A] rounded-lg">
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
              className="text-[#4ADE80]"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <span className="text-[11px] font-semibold text-[#9999A1] tracking-widest uppercase">
              Govt. MSME Regd.
            </span>
          </div>
        </div>
      </div>

      {/* Background watermark */}
      <div className="relative overflow-hidden select-none pointer-events-none w-full text-center px-4">
        <span className="inline-block whitespace-nowrap font-display font-bold text-[clamp(1.1rem,7.2vw,6rem)] leading-none text-white/5 py-2">
          SENOVA DIGITAL LABS
        </span>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import { SITE } from "../lib/site";

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const columns = [
  {
    heading: "Explore",
    links: [
      { name: "Work", to: "/#portfolio" },
      { name: "Services", to: "/#services" },
      { name: "Team", to: "/#founders" },
      { name: "Launch offer", to: "/#offer" },
      { name: "Coming soon", to: "/upcoming-projects" },
    ],
  },
];

const socials = [
  { name: "Naveen Chavan on LinkedIn", href: SITE.linkedin.naveen, Icon: LinkedInIcon },
  { name: "Shrihari on LinkedIn", href: SITE.linkedin.shrihari, Icon: LinkedInIcon },
  { name: "SENOVA on Instagram", href: SITE.instagram, Icon: InstagramIcon },
];

const Footer = () => (
  <footer className="border-t border-white/[0.08]">
    <div className="responsive-container py-16 sm:py-20">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xl font-semibold tracking-tight">SENOVA Digital Labs</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#9aa3b2]">
            Web development, SaaS and automation for businesses in Raichur and
            across India.
          </p>
          <ul className="mt-6 flex items-center gap-3">
            {socials.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] text-[#b4bccb] transition-colors hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="md:col-span-3">
            <h2 className="text-sm font-semibold text-white">{col.heading}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.to}
                    className="text-[15px] text-[#9aa3b2] transition-colors hover:text-white"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <address className="not-italic md:col-span-4">
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-[15px] text-[#9aa3b2]">
            {SITE.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="transition-colors hover:text-white">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li>{SITE.addressLine}</li>
          </ul>
        </address>
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/[0.08] pt-8 text-sm text-[#7d8798] sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} SENOVA Digital Labs. All rights reserved.</p>
        <p>Government of India MSME registered</p>
      </div>
    </div>
  </footer>
);

export default Footer;

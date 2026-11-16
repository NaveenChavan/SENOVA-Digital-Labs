import { Compass, Layers, MonitorSmartphone, Code2 } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Website design and development",
    description:
      "Fast, responsive business websites built with React and Tailwind CSS, designed to turn visitors in Raichur and beyond into enquiries.",
  },
  {
    icon: Code2,
    title: "Custom web apps and SaaS",
    description:
      "Full-stack products on React, Next.js, Node.js and Firebase, with clean APIs, dashboards and automation that save your team time.",
  },
  {
    icon: Layers,
    title: "Brand identity and UI/UX",
    description:
      "Logo direction, visual language and interface design prototyped in Figma, so your brand looks consistent on every screen.",
  },
  {
    icon: Compass,
    title: "Design strategy",
    description:
      "We study your market before we design, so every decision from layout to copy is tied to a business result, not decoration.",
  },
];

const stack = ["React", "Next.js", "Node.js", "Firebase", "Tailwind CSS", "Figma"];

const Services = () => (
  <section id="services" className="section-pad section-alt relative">
    <div className="responsive-container">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Services</p>
        <h2 className="h-section mt-3">Everything your business needs to grow online.</h2>
        <p className="lede mt-5">
          From a first website to a full software product, one small team
          handles design, code and launch.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 0.07}>
              <article className="card h-full p-7 sm:p-9">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563eb]/15 text-[#6ea8fe]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="h-card mt-6">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#9aa3b2]">
                  {s.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12 text-center">
        <p className="text-sm font-medium text-[#7d8798]">Built with</p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          {stack.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default Services;

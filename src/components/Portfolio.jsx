import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const projects = [
  {
    title: "GleamStudio",
    kind: "Salon booking platform",
    description:
      "A complete salon website with online booking and WhatsApp automation for appointment reminders and confirmations.",
    techStack: ["React", "WhatsApp API", "Firebase", "UI/UX"],
    liveUrl: "https://gleamstudio.vercel.app/",
    image: "/assets/GleamStudio.webp",
    width: 1378,
    height: 651,
  },
  {
    title: "MJ Fitness Club",
    kind: "Gym website, Raichur",
    description:
      "A high-impact website for a Raichur fitness centre, built with local SEO so nearby members can find it.",
    techStack: ["React", "Tailwind", "Local SEO"],
    liveUrl: "https://mjfitnessclub.vercel.app/",
    image: "/assets/MJFitness.webp",
    width: 1378,
    height: 648,
  },
  {
    title: "FitBite Cafe",
    kind: "Nutrition and ordering",
    description:
      "A calorie-focused cafe platform with transparent nutrition info, meal plans and an ordering flow.",
    techStack: ["React", "Charts", "Firebase"],
    liveUrl: "https://fit-bite-cafe.vercel.app/",
    image: "/assets/FitbiteCafe.webp",
    width: 1400,
    height: 615,
  },
  {
    title: "Golden Crumb Bakery",
    kind: "Bakery e-commerce",
    description:
      "A visual-first bakery storefront with custom cake orders and an easy checkout experience.",
    techStack: ["E-commerce", "React", "Payments"],
    liveUrl: "https://golden-crumb-bakery-nine.vercel.app/",
    image: "/assets/GoldenCrumbBakery.webp",
    width: 1378,
    height: 652,
  },
];

const BrowserShot = ({ project, sizes, eager = false }) => (
  <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b1120]">
    <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
    </div>
    <img
      src={project.image}
      srcSet={`${project.image.replace(".webp", "-640.webp")} 640w, ${project.image} ${project.width}w`}
      sizes={sizes}
      alt={`${project.title} website, ${project.kind.toLowerCase()}, built by SENOVA Digital Labs`}
      width={project.width}
      height={project.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
    />
  </div>
);

const ProjectCard = ({ project, featured = false, index = 0 }) => (
  <Reveal delay={index * 0.08} className={featured ? "lg:col-span-3" : ""}>
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title} (opens in a new tab)`}
      className={`card group block h-full overflow-hidden p-5 sm:p-6 ${
        featured ? "lg:grid lg:grid-cols-5 lg:items-center lg:gap-10 lg:p-8" : ""
      }`}
    >
      <div className={featured ? "lg:col-span-3" : ""}>
        <div className="overflow-hidden rounded-xl">
          <BrowserShot
            project={project}
            sizes={featured ? "(min-width: 1024px) 640px, 92vw" : "(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"}
          />
        </div>
      </div>
      <div className={`${featured ? "mt-6 lg:col-span-2 lg:mt-0" : "mt-6"}`}>
        <p className="text-sm font-medium text-[#6ea8fe]">{project.kind}</p>
        <h3 className="h-card mt-2 flex items-center gap-2 text-white">
          {project.title}
          <ArrowUpRight
            className="h-5 w-5 text-[#9aa3b2] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#9aa3b2]">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </a>
  </Reveal>
);

const Portfolio = () => (
  <section id="portfolio" className="section-pad relative">
    <div className="responsive-container">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow">Our work</p>
          <h2 className="h-section mt-3">
            Real websites for real local businesses.
          </h2>
        </div>
        <Link
          to="/upcoming-projects"
          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#6ea8fe] transition-colors hover:text-white"
        >
          See what we&apos;re building next
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3 lg:gap-6">
        <ProjectCard project={projects[0]} featured index={0} />
        {projects.slice(1).map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i + 1} />
        ))}
      </div>

      <Reveal className="mt-14 text-center">
        <Link
          to="/#contact-form"
          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#6ea8fe] transition-colors hover:text-white"
        >
          Want to be our next success story?
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default Portfolio;

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { SITE } from "../lib/site";

const founders = [
  {
    name: "Naveen Chavan",
    title: "Founder",
    role: "Tech lead and partnerships",
    bio: "Full-stack developer with a focus on clean UI/UX and product architecture. Naveen builds scalable web products and manages client partnerships so technical work stays tied to business goals.",
    image: "/assets/naveen-chavan.webp",
    linkedin: SITE.linkedin.naveen,
  },
  {
    name: "Shrihari",
    title: "Co-founder",
    role: "Systems architect and operations",
    bio: "Backend and automation specialist. Shrihari designs fast APIs and automated workflows on Firebase and cloud tools, so client systems stay reliable, secure and ready to scale.",
    image: "/assets/Shrihari.webp",
    linkedin: SITE.linkedin.shrihari,
  },
];

const Portrait = ({ founder }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="flex aspect-square w-full items-center justify-center bg-[#0b1120] text-6xl font-semibold text-[#2563eb]/50"
        aria-hidden="true"
      >
        {founder.name.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={founder.image}
      alt={`${founder.name}, ${founder.title} of SENOVA Digital Labs`}
      width="640"
      height="640"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="aspect-square w-full object-cover"
    />
  );
};

const FoundersSection = () => (
  <section id="founders" className="section-pad relative">
    <div className="responsive-container">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">The team</p>
        <h2 className="h-section mt-3">Two founders. Every project, start to finish.</h2>
        <p className="lede mt-5">
          You work directly with the people who design and write your code.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 lg:gap-6">
        {founders.map((f, i) => (
          <Reveal key={f.name} delay={i * 0.1}>
            <article className="card h-full overflow-hidden">
              <div className="overflow-hidden">
                <Portrait founder={f} />
              </div>
              <div className="p-7 sm:p-8">
                <p className="text-sm font-medium text-[#6ea8fe]">{f.title}</p>
                <h3 className="h-card mt-1 text-2xl">{f.name}</h3>
                <p className="mt-1 text-sm text-[#9aa3b2]">{f.role}</p>
                <p className="mt-4 text-base leading-relaxed text-[#9aa3b2]">{f.bio}</p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-white transition-colors hover:text-[#6ea8fe]"
                >
                  {f.name.split(" ")[0]} on LinkedIn
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FoundersSection;

import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import useSeoMeta from "../hooks/useSeoMeta";
import { SITE } from "../lib/site";

// Answers only state facts about how SENOVA actually works. Anything price- or
// deadline-specific is deliberately deferred to the scoped proposal.
const faqs = [
  {
    q: "Where is SENOVA Digital Labs based?",
    a: "We are based in Raichur, Karnataka. We work in person with businesses in and around Raichur, and remotely with clients across India and worldwide.",
  },
  {
    q: "How do we get started?",
    a: "Send us a short brief through the contact form or WhatsApp. We schedule a free discovery call to understand your goals, then send a scoped proposal before any work begins.",
  },
  {
    q: "How long does a website take?",
    a: "It depends on scope, but most custom websites go from discovery to launch within a few weeks once requirements are locked in. You get a concrete timeline after the discovery call.",
  },
  {
    q: "Will my website show up on Google for local searches?",
    a: "We build every site with search in mind: fast loading, clean structure, proper metadata and local business markup. No one can promise a specific ranking, but we set the technical foundation that local search rewards.",
  },
  {
    q: "Do you handle both design and development?",
    a: "Yes. One team covers brand and UI design in Figma and full-stack engineering with React, Next.js, Node.js and Firebase, so nothing gets lost between designer and developer.",
  },
  {
    q: "How many revision rounds are included?",
    a: "Revision rounds are agreed in writing as part of the project scope before kickoff, so there are no surprises.",
  },
  {
    q: "What technology do you build with?",
    a: "React, Next.js and Tailwind CSS on the front end, Node.js and Firebase on the back end, and Figma for design and prototyping.",
  },
  {
    q: "What happens after launch?",
    a: "You can reach us directly on WhatsApp, phone or email after launch. Ongoing support and maintenance can be included in your project agreement.",
  },
];

const FAQBooking = () => {
  useSeoMeta({
    jsonLd: {
      id: "faq-schema",
      data: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    },
  });

  return (
    <section id="faq" className="section-pad relative">
      <div className="responsive-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="h-section mt-3">Questions, answered.</h2>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl sm:mt-14">
          <div className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
            {faqs.map((f, i) => (
              <details key={f.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <Plus
                    className="h-5 w-5 shrink-0 text-[#9aa3b2] transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-6 pr-10 text-base leading-relaxed text-[#9aa3b2]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg font-medium">Still have a question?</p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/#contact-form" className="btn btn-primary w-full sm:w-auto">
                Book a free call
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="btn btn-secondary w-full sm:w-auto"
              >
                Email us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQBooking;

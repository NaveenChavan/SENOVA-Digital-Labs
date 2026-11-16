import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { SITE } from "../lib/site";

const offers = [
  {
    audience: "For business owners",
    figure: "Up to 15% off",
    headline: "Direct booking discount",
    body: "Gym, salon, clinic or any local business: reach out to us directly and get up to 15% off custom websites and mobile apps during our launch period.",
    cta: "Claim the discount",
    message: "Hello SENOVA! I would like to claim the launch discount for a new project.",
  },
  {
    audience: "For referral partners",
    figure: "10% commission",
    headline: "Flat cash commission",
    body: "Know someone who needs a website or app? When the project closes, we pay you 10% of the total project value directly to your bank account.",
    cta: "Submit a referral",
    message: "Hello SENOVA! I would like to refer someone for a project.",
  },
];

const Offer = () => (
  <section id="offer" className="section-pad section-alt relative">
    <div className="responsive-container">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Launch offer</p>
        <h2 className="h-section mt-3">We&apos;re live. Here&apos;s our thank-you.</h2>
        <p className="lede mt-5">
          To celebrate launching SENOVA Digital Labs, we&apos;re rewarding both
          business owners and the people who recommend us.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 lg:gap-6">
        {offers.map((o, i) => (
          <Reveal key={o.audience} delay={i * 0.1}>
            <article className="card flex h-full flex-col p-8 sm:p-10">
              <p className="text-sm font-medium text-[#6ea8fe]">{o.audience}</p>
              <p className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                {o.figure}
              </p>
              <h3 className="h-card mt-3 text-white">{o.headline}</h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-[#9aa3b2]">
                {o.body}
              </p>
              <a
                href={`${SITE.whatsappSales}?text=${encodeURIComponent(o.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#6ea8fe] transition-colors hover:text-white"
              >
                {o.cta} on WhatsApp
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Offer;

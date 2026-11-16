import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// The hero is intentionally static HTML + a CSS-only entrance. It is the
// largest-contentful-paint element and the first thing crawlers read, so it
// never waits on JavaScript animation to become visible.
const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden pt-32 sm:pt-40">
      <div className="hero-glow" aria-hidden="true" />

      <div className="responsive-container text-center">
        <p className="eyebrow rise" style={{ "--d": "0ms" }}>
          Web development and software company in Raichur
        </p>

        <h1
          className="h-display rise mx-auto mt-5 max-w-4xl"
          style={{ "--d": "80ms" }}
        >
          Websites and software that{" "}
          <span className="text-gradient">bring you customers.</span>
        </h1>

        <p
          className="lede rise mx-auto mt-6 max-w-2xl"
          style={{ "--d": "160ms" }}
        >
          We design and build fast, search-friendly websites, booking systems
          and automation for businesses in Raichur and across India.
        </p>

        <div
          className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ "--d": "240ms" }}
        >
          <Link to="/#contact-form" className="btn btn-primary w-full sm:w-auto">
            Book a free call
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/#portfolio" className="btn btn-secondary w-full sm:w-auto">
            See our work
          </Link>
        </div>
        <p
          className="rise mt-4 text-sm text-[#7d8798]"
          style={{ "--d": "300ms" }}
        >
          Free discovery call. No obligation.
        </p>
      </div>

      <div
        className="responsive-container rise relative mt-16 sm:mt-20"
        style={{ "--d": "380ms" }}
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-t-2xl border border-white/[0.1] border-b-0 bg-[#121b2f] shadow-[0_-30px_120px_-30px_rgba(37,99,235,0.45)]">
          <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="mx-auto rounded-md bg-white/[0.06] px-4 py-1 text-xs text-[#9aa3b2]">
              gleamstudio.vercel.app
            </span>
            <span className="w-[42px]" aria-hidden="true" />
          </div>
          <img
            src="/assets/GleamStudio.webp"
            srcSet="/assets/GleamStudio-640.webp 640w, /assets/GleamStudio.webp 1378w"
            sizes="(min-width: 1024px) 1024px, 92vw"
            alt="GleamStudio salon booking website designed and built by SENOVA Digital Labs"
            width="1378"
            height="651"
            fetchpriority="high"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b1120] to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default Hero;

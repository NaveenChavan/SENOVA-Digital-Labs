import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Reveal from "../components/Reveal";
import NotifyButton from "../components/NotifyButton";
import useSeoMeta from "../hooks/useSeoMeta";
import { submitLead } from "../lib/submitLead";

const products = [
  {
    id: "ai-dashboard",
    name: "SENOVA AI Dashboard",
    tagline: "Turn raw sales data into decisions, automatically.",
    description:
      "Upload a daily sales CSV or Excel file and get instant business intelligence. Everything is computed in-house with no third-party analytics service, so your data never leaves your own backend.",
    features: [
      "Automated business insights",
      "Revenue forecasting",
      "Inventory and reorder intelligence",
      "Interactive chart studio",
      "CA-style financial reports",
    ],
    image: "/assets/DASHBOARD.webp",
    alt: "Preview of the SENOVA AI Dashboard showing analytics charts and sales forecasts",
  },
  {
    id: "gym-management",
    name: "SENOVA Gym Management System",
    tagline: "Run your gym from one offline-first desktop app.",
    description:
      "A complete desktop app for gym owners and staff. It runs locally with an encrypted database and has no cloud dependency, so it keeps working even when the internet doesn't.",
    features: [
      "Face-recognition attendance",
      "Member and trainer management",
      "Billing and subscription tracking",
      "WhatsApp automation",
      "Reports and exports (PDF, CSV)",
    ],
    image: "/assets/GYM.webp",
    alt: "Preview of the SENOVA Gym Management System member onboarding screen",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WaitlistForm = ({ product, onProductChange }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const chosen = products.find((p) => p.id === product);
    setStatus("sending");
    try {
      await submitLead(
        {
          name: form.name.trim(),
          email: form.email.trim(),
          description: `Early access request for ${chosen.name}`,
          product: chosen.name,
          source: "early-access-waitlist",
        },
        `Early access request: ${chosen.name}`,
      );
      setStatus("success");
      setForm({ name: "", email: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="card mx-auto max-w-xl p-7 sm:p-9">
      <div>
        <label htmlFor="product" className="label">Which product are you interested in?</label>
        <select
          id="product"
          value={product}
          onChange={(e) => onProductChange(e.target.value)}
          className="field"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="wl-name" className="label">Full name</label>
        <input
          id="wl-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={onChange}
          className="field"
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "wl-name-error" : undefined}
        />
        {errors.name && (
          <p id="wl-name-error" className="mt-2 flex items-center gap-1.5 text-sm text-[#fca5a5]">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.name}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label htmlFor="wl-email" className="label">Email</label>
        <input
          id="wl-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={onChange}
          className="field"
          placeholder="you@company.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "wl-email-error" : undefined}
        />
        {errors.email && (
          <p id="wl-email-error" className="mt-2 flex items-center gap-1.5 text-sm text-[#fca5a5]">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.email}
          </p>
        )}
      </div>

      <div aria-live="polite" className="mt-6">
        {status === "success" && (
          <p className="flex items-start gap-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-[15px] text-emerald-200">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            You&apos;re on the list. We&apos;ll email you before it launches.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-2.5 rounded-xl border border-red-400/25 bg-red-400/10 p-4 text-[15px] text-red-200">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            We couldn&apos;t save your request. Please try again in a moment.
          </p>
        )}
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-6 w-full">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Joining
          </>
        ) : (
          "Join the waitlist"
        )}
      </button>
      <p className="mt-4 text-center text-sm text-[#7d8798]">
        Waitlist members hear about the launch first. No spam.
      </p>
    </form>
  );
};

const UpcomingProjects = () => {
  const [selected, setSelected] = useState(products[0].id);

  useSeoMeta({
    title: "Upcoming Projects | SENOVA Digital Labs, Raichur",
    description:
      "Join the early-access waitlist for the SaaS products SENOVA Digital Labs is building next: an AI sales dashboard and an offline-first gym management system.",
    canonical: "https://senovadigital.xyz/upcoming-projects",
    ogUrl: "https://senovadigital.xyz/upcoming-projects",
    ogTitle: "Upcoming Projects | SENOVA Digital Labs",
    ogDescription:
      "Early access to the AI sales dashboard and gym management system SENOVA is building in Raichur.",
    jsonLd: {
      id: "breadcrumb-schema",
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://senovadigital.xyz/" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Upcoming Projects",
            item: "https://senovadigital.xyz/upcoming-projects",
          },
        ],
      },
    },
  });

  const joinWaitlist = (id) => {
    setSelected(id);
    document
      .getElementById("early-access")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-16 text-center sm:pt-40">
        <div className="hero-glow" aria-hidden="true" />
        <div className="responsive-container">
          <p className="eyebrow rise" style={{ "--d": "0ms" }}>Coming soon</p>
          <h1 className="h-display rise mx-auto mt-5 max-w-3xl" style={{ "--d": "80ms" }}>
            What we&apos;re building <span className="text-gradient">next.</span>
          </h1>
          <p className="lede rise mx-auto mt-6 max-w-2xl" style={{ "--d": "160ms" }}>
            Two in-house products from SENOVA Digital Labs. They aren&apos;t live
            yet, but you can get early access.
          </p>
          <div className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--d": "240ms" }}>
            <a href="#early-access" className="btn btn-primary w-full sm:w-auto">
              Get early access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <NotifyButton />
          </div>
        </div>
      </section>

      {products.map((p, i) => (
        <section
          key={p.id}
          aria-labelledby={`${p.id}-title`}
          className={`section-pad ${i % 2 === 0 ? "section-alt" : ""}`}
        >
          <div className="responsive-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0b1120] shadow-[0_30px_100px_-40px_rgba(37,99,235,0.5)]">
                <img
                  src={p.image}
                  srcSet={`${p.image.replace(".webp", "-720.webp")} 720w, ${p.image} 1400w`}
                  sizes="(min-width: 1024px) 560px, 92vw"
                  alt={p.alt}
                  width="1400"
                  height="933"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="chip">In development</span>
              <h2 id={`${p.id}-title`} className="h-section mt-5">{p.name}</h2>
              <p className="mt-3 text-xl font-medium text-white/90">{p.tagline}</p>
              <p className="lede mt-5">{p.description}</p>
              <ul className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-base text-[#d5dae3]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#6ea8fe]" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => joinWaitlist(p.id)}
                className="btn btn-secondary mt-9"
              >
                Join the {p.id === "ai-dashboard" ? "dashboard" : "gym app"} waitlist
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>
        </section>
      ))}

      <section id="early-access" className="section-pad">
        <div className="responsive-container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow">Early access</p>
            <h2 className="h-section mt-3">Be first in line.</h2>
            <p className="lede mt-5">
              Tell us which product you want and we&apos;ll contact you before launch.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <WaitlistForm product={selected} onProductChange={setSelected} />
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default UpcomingProjects;

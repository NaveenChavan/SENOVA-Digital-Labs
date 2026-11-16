import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { submitLead } from "../lib/submitLead";
import { SITE } from "../lib/site";

const EMPTY = { name: "", email: "", phone: "", description: "" };

const FieldError = ({ id, children }) =>
  children ? (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-[#fca5a5]">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  ) : null;

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      e.phone = "Enter a valid 10-digit mobile number.";
    if (form.description.trim().length < 20)
      e.description = "Please share at least 20 characters about your project.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await submitLead(
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: `+91 ${form.phone}`,
          description: form.description.trim(),
          source: "contact-form",
        },
        `New SENOVA lead: ${form.name.trim()}`,
      );
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const describedBy = (key) => (errors[key] ? `${key}-error` : undefined);

  return (
    <section id="contact-form" className="section-pad section-alt relative">
      <div className="responsive-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Contact</p>
          <h2 className="h-section mt-3">Tell us about your project.</h2>
          <p className="lede mt-5">
            Share a few details and we&apos;ll reply with next steps, usually
            within one working day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-5 lg:gap-6">
          <Reveal className="lg:col-span-2">
            <div className="card h-full p-7 sm:p-9">
              <h3 className="h-card">Talk to us directly</h3>
              <ul className="mt-7 space-y-6">
                <li>
                  <a href={`tel:${SITE.phones[0].tel}`} className="group flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/15 text-[#6ea8fe]">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-[#9aa3b2]">Call or WhatsApp</span>
                      <span className="mt-0.5 block text-lg font-medium group-hover:text-[#6ea8fe]">
                        {SITE.phones[0].display}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="group flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/15 text-[#6ea8fe]">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-[#9aa3b2]">Email</span>
                      <span className="mt-0.5 block break-all text-lg font-medium group-hover:text-[#6ea8fe]">
                        {SITE.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/15 text-[#6ea8fe]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-[#9aa3b2]">Based in</span>
                    <span className="mt-0.5 block text-lg font-medium">{SITE.addressLine}</span>
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.08}>
            <form onSubmit={onSubmit} noValidate className="card h-full p-7 sm:p-9">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={onChange}
                    className="field"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={describedBy("name")}
                  />
                  <FieldError id="name-error">{errors.name}</FieldError>
                </div>
                <div>
                  <label htmlFor="phone" className="label">Mobile number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={form.phone}
                    onChange={onChange}
                    className="field"
                    placeholder="10-digit number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={describedBy("phone")}
                  />
                  <FieldError id="phone-error">{errors.phone}</FieldError>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="email" className="label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange}
                  className="field"
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                />
                <FieldError id="email-error">{errors.email}</FieldError>
              </div>

              <div className="mt-6">
                <label htmlFor="description" className="label">Project details</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={onChange}
                  className="field resize-y"
                  placeholder="What do you need built, and what should it achieve?"
                  aria-invalid={!!errors.description}
                  aria-describedby={describedBy("description")}
                />
                <FieldError id="description-error">{errors.description}</FieldError>
              </div>

              <div aria-live="polite" className="mt-6">
                {status === "success" && (
                  <p className="flex items-start gap-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-[15px] text-emerald-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    Thank you. We received your message and will reply soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-start gap-2.5 rounded-xl border border-red-400/25 bg-red-400/10 p-4 text-[15px] text-red-200">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>
                      We couldn&apos;t send your message. Please message us on{" "}
                      <a className="underline" href={SITE.whatsappSales}>WhatsApp</a> or
                      email <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                    </span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary mt-6 w-full"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

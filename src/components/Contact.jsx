import { motion } from "framer-motion";
import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Clock,
  Globe,
} from "lucide-react";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description =
        "Please provide more details (at least 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNumbers.length <= 10) {
      setFormData((prev) => ({ ...prev, phone: onlyNumbers }));
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      handlePhoneChange(e);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const leadsRef = collection(db, "leads");
      await addDoc(leadsRef, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: "+91 " + formData.phone,
        description: formData.description.trim(),
        createdAt: serverTimestamp(),
        status: "new",
      });

      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", description: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please check your Firebase connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.phone.length === 10 &&
    formData.description.trim().length >= 20;

  return (
    <section id="contact-form" className="relative py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-14 md:mb-16 w-full"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            Start Your
            <br />
            <span className="text-gradient">Digital Journey</span>
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto text-center">
            Ready to transform your business? Let's discuss your project and
            make it happen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-5"
          >
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-5 text-center lg:text-left">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <a
                  href="tel:+919731133425"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Primary</p>
                    <p className="font-medium text-text-primary">
                      +91 9731133425
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+918088366098"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Secondary</p>
                    <p className="font-medium text-text-primary">
                      +91 8088366098
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:naveenchavan29@gmail.com"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Email</p>
                    <p className="font-medium text-text-primary">
                      naveenchavan29@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Location</p>
                    <p className="font-medium text-text-primary">
                      India (Serving Globally)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">
                      Response Time
                    </p>
                    <p className="font-medium text-text-primary">
                      Within 24 Hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 rounded-xl border border-accent/20 p-5">
              <h4 className="text-text-primary font-semibold text-sm mb-3 text-center lg:text-left">
                Why Choose SENOVA?
              </h4>
              <ul className="space-y-2.5 text-text-secondary text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>24/7 Support & Maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Transparent Pricing & Timelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Clean, Maintainable Code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Scalable Solutions</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-6">
                Start Your Project
              </h3>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full bg-bg-primary border ${errors.name ? "border-red-500" : "border-border focus:border-accent"} rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={`w-full bg-bg-primary border ${errors.email ? "border-red-500" : "border-border focus:border-accent"} rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Phone Number <span className="text-accent">*</span>
                  </label>

                  {/* FIX: Flexbox layout for +91 without overlap in Light Mode */}
                  <div
                    className={`flex items-center w-full bg-bg-primary border ${errors.phone ? "border-red-500" : "border-border focus-within:border-accent"} rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-accent transition-all duration-200`}
                  >
                    <div className="pl-4 pr-2 py-3 text-text-muted select-none flex items-center justify-center bg-transparent border-r border-border/50">
                      +91
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      maxLength="10"
                      className="w-full py-3 pl-3 pr-4 bg-transparent text-text-primary placeholder-text-muted focus:outline-none"
                    />
                  </div>

                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Project Description <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={4}
                    className={`w-full bg-bg-primary border ${errors.description ? "border-red-500" : "border-border focus:border-accent"} rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200 resize-none`}
                  />
                  {errors.description && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-start gap-3 ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm font-medium">
                      {submitStatus.message}
                    </span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    isFormValid && !isSubmitting
                      ? "bg-accent hover:bg-accent-hover text-white cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-accent/50 text-white/50 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

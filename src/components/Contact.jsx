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

  // YAHAN FIX HAI: Sirf numbers allow karega, no spaces, no 91 91 91
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
    <section
      id="contact-form"
      className="relative py-20 md:py-28 lg:py-32 bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E5B700]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center mb-14 md:mb-16 w-full"
        >
          <span className="text-[#E5B700] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Start Your
            <br />
            <span className="text-[#E5B700]">Digital Journey</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto text-center">
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
              <h3 className="text-lg font-semibold text-white mb-5 text-center lg:text-left">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <a
                  href="tel:+919731133425"
                  className="flex items-center gap-3 text-zinc-400 hover:text-[#E5B700] transition-colors duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[#E5B700] transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Primary</p>
                    <p className="font-medium text-white">+91 9731133425</p>
                  </div>
                </a>

                <a
                  href="tel:+918088366098"
                  className="flex items-center gap-3 text-zinc-400 hover:text-[#E5B700] transition-colors duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[#E5B700] transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Secondary</p>
                    <p className="font-medium text-white">+91 8088366098</p>
                  </div>
                </a>

                {/* YAHAN FIX HAI: Updated Email */}
                <a
                  href="mailto:naveenchavan29@gmail.com"
                  className="flex items-center gap-3 text-zinc-400 hover:text-[#E5B700] transition-colors duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[#E5B700] transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Email</p>
                    <p className="font-medium text-white">
                      naveenchavan29@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-zinc-400">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Location</p>
                    <p className="font-medium text-white">
                      India (Serving Globally)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-400">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">
                      Response Time
                    </p>
                    <p className="font-medium text-white">Within 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#E5B700]/5 rounded-xl border border-[#E5B700]/20 p-5">
              <h4 className="text-white font-semibold text-sm mb-3 text-center lg:text-left">
                Why Choose SENOVA?
              </h4>
              <ul className="space-y-2.5 text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E5B700] flex-shrink-0" />
                  <span>24/7 Support & Maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E5B700] flex-shrink-0" />
                  <span>Transparent Pricing & Timelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E5B700] flex-shrink-0" />
                  <span>Clean, Maintainable Code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E5B700] flex-shrink-0" />
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
              className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-sm p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-6">
                Start Your Project
              </h3>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Your Name <span className="text-[#E5B700]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full bg-zinc-950 border ${errors.name ? "border-red-500" : "border-zinc-800 focus:border-[#E5B700]"} rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E5B700] transition-all duration-200`}
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
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Email Address <span className="text-[#E5B700]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={`w-full bg-zinc-950 border ${errors.email ? "border-red-500" : "border-zinc-800 focus:border-[#E5B700]"} rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E5B700] transition-all duration-200`}
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
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Phone Number <span className="text-[#E5B700]">*</span>
                  </label>

                  {/* YAHAN FIX HAI: Flexbox layout taaki +91 overlap na ho */}
                  <div
                    className={`flex items-center w-full bg-zinc-950 border ${errors.phone ? "border-red-500" : "border-zinc-800 focus-within:border-[#E5B700]"} rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#E5B700] transition-all duration-200`}
                  >
                    <div className="pl-4 pr-2 py-3 text-zinc-500 select-none flex items-center justify-center bg-transparent border-r border-zinc-800">
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
                      className="w-full py-3 pl-3 pr-4 bg-transparent text-white placeholder-zinc-600 focus:outline-none"
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
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Project Description{" "}
                    <span className="text-[#E5B700]">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={4}
                    className={`w-full bg-zinc-950 border ${errors.description ? "border-red-500" : "border-zinc-800 focus:border-[#E5B700]"} rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E5B700] transition-all duration-200 resize-none`}
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
                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                        : "bg-red-500/10 border border-red-500/30 text-red-400"
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
                      ? "bg-[#E5B700] hover:bg-[#D4A900] text-zinc-950 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-[#E5B700]/20 text-white/30 cursor-not-allowed"
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

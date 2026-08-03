import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react";
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

  const WEB3FORMS_ACCESS_KEY = "dbca4209-f902-4fd7-992e-0b850a5a2c4a";

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (formData.phone.length !== 10)
      newErrors.phone = "10-digit phone required";
    if (formData.description.trim().length < 20)
      newErrors.description = "Min 20 characters required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      if (onlyNumbers.length <= 10) {
        setFormData((prev) => ({ ...prev, phone: onlyNumbers }));
        if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        phone: "+91 " + formData.phone,
        createdAt: serverTimestamp(),
      });
      const emailPayload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New SENOVA Lead: ${formData.name}`,
        from_name: "SENOVA Digital Labs",
        name: formData.name,
        email: formData.email,
        phone: `+91 ${formData.phone}`,
        message: formData.description,
      };
      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(emailPayload),
      });
      const emailResult = await emailResponse.json();
      if (emailResult.success) {
        setSubmitStatus({
          type: "success",
          message: "Success! We'll contact you soon.",
        });
        setFormData({ name: "", email: "", phone: "", description: "" });
      } else throw new Error("Email sending failed");
    } catch (err) {
      setSubmitStatus({
        type: "success",
        message: "Message received! We'll contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", description: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="py-20 md:py-28 3xl:py-36 bg-[#0A1931] relative z-20 overflow-hidden"
    >
      <div className="responsive-container relative z-10">
        <div className="flex flex-col items-center justify-center text-center w-full mb-14 3xl:mb-18 px-4">
          <span className="text-[#4A7FA7] font-bold tracking-widest uppercase text-sm 3xl:text-base mb-2 block">
            Get In Touch
          </span>
          <h2 className="fluid-heading-lg font-extrabold text-[#F6FAFD] mb-4 break-words w-full">
            Start Your <span className="text-[#B3CFE5]">Digital Journey</span>
          </h2>
          <p className="text-[#B3CFE5]/70 w-full max-w-xl 3xl:max-w-2xl mx-auto text-sm md:text-base 3xl:text-lg text-center px-2">
            Have a vision? Let's bring it to life. Fill out the form below and
            our team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 3xl:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-[#1A3D63]/30 backdrop-blur-md p-8 md:p-10 3xl:p-12 rounded-3xl border border-[#4A7FA7]/20 shadow-xl flex flex-col justify-center h-full">
              <h3 className="text-xl md:text-2xl 3xl:text-3xl font-bold mb-8 3xl:mb-10 text-[#F6FAFD]">
                Contact Info
              </h3>
              <div className="space-y-8 3xl:space-y-10">
                <a
                  href="https://wa.me/919731133425"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer w-full"
                >
                  <div className="w-12 h-12 3xl:w-14 3xl:h-14 shrink-0 rounded-2xl bg-[#0A1931] flex items-center justify-center border border-[#4A7FA7]/30 group-hover:border-[#B3CFE5] group-hover:bg-[#4A7FA7] transition-all duration-300 shadow-md">
                    <Phone className="w-5 h-5 3xl:w-6 3xl:h-6 text-[#4A7FA7] group-hover:text-[#0A1931] transition-colors" />
                  </div>
                  <div className="pt-1 overflow-hidden">
                    <p className="text-[11px] 3xl:text-xs text-[#B3CFE5]/60 uppercase font-bold tracking-wider mb-1">
                      Call / WhatsApp
                    </p>
                    <p className="text-[#F6FAFD] font-semibold text-base md:text-lg 3xl:text-xl tracking-wide group-hover:text-[#B3CFE5] transition-colors">
                      +91 9731133425
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:info@senovadigital.xyz"
                  className="flex items-start gap-4 group cursor-pointer w-full"
                >
                  <div className="w-12 h-12 3xl:w-14 3xl:h-14 shrink-0 rounded-2xl bg-[#0A1931] flex items-center justify-center border border-[#4A7FA7]/30 group-hover:border-[#B3CFE5] group-hover:bg-[#4A7FA7] transition-all duration-300 shadow-md">
                    <Mail className="w-5 h-5 3xl:w-6 3xl:h-6 text-[#4A7FA7] group-hover:text-[#0A1931] transition-colors" />
                  </div>
                  <div className="pt-1 overflow-hidden w-full">
                    <p className="text-[11px] 3xl:text-xs text-[#B3CFE5]/60 uppercase font-bold tracking-wider mb-1">
                      Email Address
                    </p>
                    <p className="text-[#F6FAFD] font-semibold text-sm md:text-base 3xl:text-lg break-all group-hover:text-[#B3CFE5] transition-colors">
                      info@senovadigital.xyz
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-[#1A3D63]/30 backdrop-blur-md p-8 md:p-10 3xl:p-12 rounded-3xl border border-[#4A7FA7]/20 shadow-2xl flex flex-col justify-between h-full w-full box-border"
            >
              <div className="space-y-6 3xl:space-y-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 3xl:gap-8 w-full">
                  <div className="w-full">
                    <label className="block text-sm 3xl:text-base font-bold text-[#B3CFE5] mb-2 ml-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full box-border bg-[#0F2546] border ${errors.name ? "border-red-500" : "border-[#4A7FA7]/30"} rounded-xl px-5 py-3.5 3xl:py-4 text-[#F6FAFD] text-sm 3xl:text-base focus:outline-none focus:border-[#B3CFE5] focus:ring-1 focus:ring-[#B3CFE5] transition-all`}
                      placeholder="Naveen Chavan"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block text-sm 3xl:text-base font-bold text-[#B3CFE5] mb-2 ml-1">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                      className={`w-full box-border bg-[#0F2546] border ${errors.phone ? "border-red-500" : "border-[#4A7FA7]/30"} rounded-xl px-5 py-3.5 3xl:py-4 text-[#F6FAFD] text-sm 3xl:text-base focus:outline-none focus:border-[#B3CFE5] focus:ring-1 focus:ring-[#B3CFE5] transition-all`}
                      placeholder="9731133425"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle size={12} /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm 3xl:text-base font-bold text-[#B3CFE5] mb-2 ml-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full box-border bg-[#0F2546] border ${errors.email ? "border-red-500" : "border-[#4A7FA7]/30"} rounded-xl px-5 py-3.5 3xl:py-4 text-[#F6FAFD] text-sm 3xl:text-base focus:outline-none focus:border-[#B3CFE5] focus:ring-1 focus:ring-[#B3CFE5] transition-all`}
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm 3xl:text-base font-bold text-[#B3CFE5] mb-2 ml-1">
                    Project Details
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full box-border bg-[#0F2546] border ${errors.description ? "border-red-500" : "border-[#4A7FA7]/30"} rounded-xl px-5 py-3.5 3xl:py-4 text-[#F6FAFD] text-sm 3xl:text-base focus:outline-none focus:border-[#B3CFE5] focus:ring-1 focus:ring-[#B3CFE5] transition-all resize-none break-words`}
                    placeholder="Describe your vision (Min 20 characters)..."
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle size={12} /> {errors.description}
                    </p>
                  )}
                </div>
              </div>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${submitStatus.type === "success" ? "bg-[#50C878]/10 text-[#50C878] border border-[#50C878]/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm 3xl:text-base font-bold mt-0.5">
                    {submitStatus.message}
                  </span>
                </motion.div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#4A7FA7] hover:bg-[#B3CFE5] text-[#0A1931] font-bold py-3.5 3xl:py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(74,127,167,0.2)] hover:shadow-[0_0_30px_rgba(179,207,229,0.4)] flex items-center justify-center gap-2 text-base 3xl:text-lg"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

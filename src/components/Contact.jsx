import { motion } from "framer-motion";
import { useState } from "react";
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

    // Phone number mein sirf numbers allow karne ke liye
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
    if (!validateForm()) return; // Agar validation fail hui toh ruk jayega

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        phone: "+91 " + formData.phone,
        createdAt: serverTimestamp(),
      });
      setSubmitStatus({
        type: "success",
        message: "Success! We'll contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", description: "" }); // Form clear
    } catch (err) {
      console.error("Firebase Error: ", err);
      setSubmitStatus({
        type: "error",
        message: "Error! Check Firebase connection or Rules.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-24 bg-[#0A1931] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#4A7FA7] font-bold tracking-widest uppercase text-sm">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F6FAFD] mt-4 mb-6">
            Start Your <span className="text-gradient">Digital Journey</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1A3D63]/30 p-8 rounded-3xl border border-[#4A7FA7]/20">
              <h3 className="text-xl font-bold mb-8 text-[#F6FAFD]">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1931] flex items-center justify-center border border-[#4A7FA7]/30 group-hover:border-[#4A7FA7] transition-all">
                    <Phone className="w-5 h-5 text-[#4A7FA7]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#B3CFE5]/50 uppercase font-bold">
                      Call/WhatsApp
                    </p>
                    <p className="text-[#F6FAFD] font-semibold">
                      +91 9731133425
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1931] flex items-center justify-center border border-[#4A7FA7]/30 group-hover:border-[#4A7FA7] transition-all">
                    <Mail className="w-5 h-5 text-[#4A7FA7]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#B3CFE5]/50 uppercase font-bold">
                      Email
                    </p>
                    <p className="text-[#F6FAFD] font-semibold">
                      naveenchavan29@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-[#1A3D63]/30 p-8 md:p-10 rounded-3xl border border-[#4A7FA7]/20 backdrop-blur-xl shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-[#B3CFE5] mb-2 ml-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-[#0A1931] border ${errors.name ? "border-red-500" : "border-[#4A7FA7]/20"} rounded-xl px-5 py-4 text-[#F6FAFD] focus:outline-none focus:border-[#4A7FA7] transition-all`}
                    placeholder="Naveen Chavan"
                  />
                  {/* YAHAN FIX KIYA: Error Messages */}
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#B3CFE5] mb-2 ml-1">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full bg-[#0A1931] border ${errors.phone ? "border-red-500" : "border-[#4A7FA7]/20"} rounded-xl px-5 py-4 text-[#F6FAFD] focus:outline-none focus:border-[#4A7FA7] transition-all`}
                    placeholder="9731133425"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-[#B3CFE5] mb-2 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[#0A1931] border ${errors.email ? "border-red-500" : "border-[#4A7FA7]/20"} rounded-xl px-5 py-4 text-[#F6FAFD] focus:outline-none focus:border-[#4A7FA7] transition-all`}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-[#B3CFE5] mb-2 ml-1">
                  Project Details
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full bg-[#0A1931] border ${errors.description ? "border-red-500" : "border-[#4A7FA7]/20"} rounded-xl px-5 py-4 text-[#F6FAFD] focus:outline-none focus:border-[#4A7FA7] transition-all resize-none`}
                  placeholder="Describe your vision (Min 20 characters)..."
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.description}
                  </p>
                )}
              </div>

              {/* YAHAN FIX KIYA: Success/Error Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 mb-6 rounded-xl flex items-start gap-3 ${submitStatus.type === "success" ? "bg-[#50C878]/10 text-[#50C878] border border-[#50C878]/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm font-bold mt-0.5">
                    {submitStatus.message}
                  </span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4A7FA7] hover:bg-[#B3CFE5] text-[#0A1931] font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-[0_0_30px_rgba(74,127,167,0.3)] flex items-center justify-center gap-2"
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

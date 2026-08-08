// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  // Synchronized with Hero section WhatsApp number
  const phoneNumber = "918088366098";
  const message = encodeURIComponent(
    "Hello SENOVA! I am interested in your services and would like to discuss a project.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-24 sm:bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.7)] cursor-pointer group transition-shadow duration-300"
    >
      <MessageCircle className="w-7 h-7 text-white" />

      <span className="absolute right-full mr-4 px-4 py-2 bg-[#131C2E] border border-[#22304A] rounded-lg text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        Chat with us
      </span>

      {/* Pulsing Dot Indicator */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border-2 border-[#0B1120]"></span>
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;

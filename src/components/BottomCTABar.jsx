import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { Mail, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const BottomCTABar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setIsHidden(latest > previous && latest > 150);
    // Also hide near the very top so it doesn't collide with the hero on load
  });

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isHidden ? 100 : 0, opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-4 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none will-change-transform"
    >
      <div className="pointer-events-auto w-full max-w-xl flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-[#101828]/80 backdrop-blur-xl border border-[#22304A] rounded-full sm:rounded-full px-5 sm:px-7 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <span className="hidden sm:block text-sm font-medium text-[#9999A1] whitespace-nowrap">
          Ready to elevate your digital presence?
        </span>
        <span className="sm:hidden text-xs font-medium text-[#9999A1] text-center">
          Ready to elevate your digital presence?
        </span>
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <Link to="/#contact-form" className="flex-1 sm:flex-none">
            <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#3B82F6] text-white text-sm font-bold rounded-full transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] whitespace-nowrap">
              <PhoneCall className="w-3.5 h-3.5" />
              Book a Call
            </button>
          </Link>
          <a href="mailto:info@senovadigital.xyz" className="flex-1 sm:flex-none">
            <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 border border-[#22304A] hover:border-[#2563EB]/60 text-white text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap">
              <Mail className="w-3.5 h-3.5" />
              Email Us
            </button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomCTABar;

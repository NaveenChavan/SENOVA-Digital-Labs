// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '919731133425';
  const message = encodeURIComponent('Hi SENOVA! I would like to discuss a project.');
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
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer group"
      style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)' }}
    >
      <MessageCircle className="w-7 h-7 text-white" />

      <span className="absolute right-full mr-3 px-3 py-2 bg-white border border-border rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us
      </span>

      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full flex items-center justify-center">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;

import { MessageCircle } from "lucide-react";
import { SITE } from "../lib/site";

// The single floating action on the site. Everything else (book a call, email)
// lives in the page content, so nothing competes with the reader.
const WhatsAppButton = () => (
  <a
    href={SITE.whatsappChat}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with SENOVA on WhatsApp"
    className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
  >
    <MessageCircle className="h-7 w-7" aria-hidden="true" />
  </a>
);

export default WhatsAppButton;

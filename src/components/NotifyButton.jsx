// src/components/NotifyButton.jsx
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Bell, BellRing, BellOff } from "lucide-react";
import { getToken } from "firebase/messaging";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, getMessagingInstance, VAPID_KEY } from "../config/firebase";

// "idle" -> nothing requested yet
// "loading" -> permission/token request in progress
// "granted" -> subscribed successfully
// "denied" -> user blocked notifications
// "unsupported" -> browser doesn't support Push/Service Workers
const getInitialStatus = () => {
  if (typeof Notification === "undefined" || !("serviceWorker" in navigator)) {
    return "unsupported";
  }
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return "idle";
};

const NotifyButton = () => {
  const [status, setStatus] = useState(getInitialStatus);

  const saveTokenToFirestore = async (token) => {
    // Use the token itself as the document ID to avoid duplicate entries
    // for the same browser subscription.
    await setDoc(doc(db, "pushSubscribers", token), {
      token,
      subscribedAt: serverTimestamp(),
      userAgent: navigator.userAgent,
    });
  };

  const handleClick = async () => {
    if (status === "granted" || status === "unsupported") return;

    setStatus("loading");

    try {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setStatus("denied");
        return;
      }

      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );
      // .register() can resolve before a worker is actually active, and
      // getToken() needs an active registration to access pushManager.
      // navigator.serviceWorker.ready only resolves once a worker for this
      // scope is active.
      await navigator.serviceWorker.ready;

      const messaging = await getMessagingInstance();
      if (!messaging) {
        setStatus("unsupported");
        return;
      }

      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (!token) {
        setStatus("denied");
        return;
      }

      await saveTokenToFirestore(token);
      setStatus("granted");
    } catch (error) {
      console.error("Push notification subscription failed:", error);
      setStatus("denied");
    }
  };

  if (status === "unsupported") return null;

  const tooltip =
    status === "granted"
      ? "Notifications on"
      : status === "denied"
        ? "Notifications blocked"
        : status === "loading"
          ? "Requesting..."
          : "Notify me about updates";

  const Icon =
    status === "granted" ? BellRing : status === "denied" ? BellOff : Bell;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={status === "loading" || status === "granted"}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={status === "denied" ? {} : { scale: 1.1 }}
      whileTap={status === "denied" ? {} : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`fixed bottom-24 sm:bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] cursor-pointer group transition-shadow duration-300 ${
        status === "granted" ? "bg-[#2563EB]" : "bg-[#131C2E] border border-[#22304A]"
      } ${status === "denied" ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      <Icon className="w-7 h-7 text-white" />

      <span className="absolute left-full ml-4 px-4 py-2 bg-[#131C2E] border border-[#22304A] rounded-lg text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        {tooltip}
      </span>

      {status === "idle" && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#2563EB] border-2 border-[#0B1120]"></span>
        </span>
      )}
    </motion.button>
  );
};

export default NotifyButton;

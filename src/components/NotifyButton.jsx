import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, BellRing, BellOff } from "lucide-react";

// Wait until the OneSignal Web SDK is ready.
const waitForOneSignal = () =>
  new Promise((resolve) => {
    if (window.OneSignal) {
      resolve(window.OneSignal);
      return;
    }

    window.OneSignalDeferred = window.OneSignalDeferred || [];

    window.OneSignalDeferred.push((OneSignal) => {
      resolve(OneSignal);
    });
  });

// Determine the initial browser support / permission state.
const getInitialStatus = () => {
  if (
    typeof Notification === "undefined" ||
    !("serviceWorker" in navigator)
  ) {
    return "unsupported";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  if (Notification.permission === "denied") {
    return "denied";
  }

  return "idle";
};

const NotifyButton = () => {
  const [status, setStatus] = useState(getInitialStatus);

  // Sync the UI with the actual OneSignal subscription.
  useEffect(() => {
    if (status === "unsupported") return;

    let cancelled = false;
    let OneSignalInstance = null;

    const handleSubscriptionChange = (event) => {
      if (cancelled) return;

      const optedIn = event?.current?.optedIn;

      setStatus(optedIn ? "granted" : "idle");
    };

    waitForOneSignal()
      .then((OneSignal) => {
        if (cancelled) return;

        OneSignalInstance = OneSignal;

        const pushSubscription =
          OneSignal.User?.PushSubscription;

        if (!pushSubscription) {
          setStatus("idle");
          return;
        }

        // Check the current subscription state.
        const isSubscribed = pushSubscription.optedIn;

        setStatus(isSubscribed ? "granted" : "idle");

        // Listen for subscription changes.
        pushSubscription.addEventListener(
          "change",
          handleSubscriptionChange
        );
      })
      .catch((error) => {
        console.error(
          "Failed to initialize OneSignal:",
          error
        );
      });

    // Clean up the listener when the component unmounts.
    return () => {
      cancelled = true;

      const pushSubscription =
        OneSignalInstance?.User?.PushSubscription;

      if (pushSubscription) {
        pushSubscription.removeEventListener(
          "change",
          handleSubscriptionChange
        );
      }
    };
  }, []);

  const handleClick = async () => {
    if (
      status === "granted" ||
      status === "unsupported" ||
      status === "loading"
    ) {
      return;
    }

    // If the browser has permanently blocked notifications,
    // the browser settings must be changed manually.
    if (
      typeof Notification !== "undefined" &&
      Notification.permission === "denied"
    ) {
      setStatus("denied");
      return;
    }

    setStatus("loading");

    try {
      const OneSignal = await waitForOneSignal();

      // Ask for notification permission and opt the user into
      // OneSignal Web Push.
      await OneSignal.Notifications.requestPermission();

      const optedIn =
        OneSignal.User?.PushSubscription?.optedIn;

      if (optedIn) {
        setStatus("granted");
      } else if (
        typeof Notification !== "undefined" &&
        Notification.permission === "denied"
      ) {
        setStatus("denied");
      } else {
        setStatus("idle");
      }
    } catch (error) {
      console.error(
        "OneSignal push subscription failed:",
        error
      );

      if (
        typeof Notification !== "undefined" &&
        Notification.permission === "denied"
      ) {
        setStatus("denied");
      } else {
        setStatus("idle");
      }
    }
  };

  // Don't show the button if Web Push isn't supported.
  if (status === "unsupported") {
    return null;
  }

  const tooltip =
    status === "granted"
      ? "Notifications on"
      : status === "denied"
        ? "Notifications blocked"
        : status === "loading"
          ? "Requesting..."
          : "Notify me about updates";

  const Icon =
    status === "granted"
      ? BellRing
      : status === "denied"
        ? BellOff
        : Bell;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={
        status === "loading" ||
        status === "granted" ||
        status === "denied"
      }
      aria-label={tooltip}
      title={tooltip}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={
        status === "denied"
          ? {}
          : { scale: 1.1 }
      }
      whileTap={
        status === "denied"
          ? {}
          : { scale: 0.9 }
      }
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className={`fixed bottom-24 sm:bottom-6 left-6 z-50
        w-14 h-14 rounded-full
        flex items-center justify-center
        shadow-[0_0_20px_rgba(37,99,235,0.4)]
        hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]
        cursor-pointer group
        transition-shadow duration-300
        ${
          status === "granted"
            ? "bg-[#2563EB]"
            : "bg-[#131C2E] border border-[#22304A]"
        }
        ${
          status === "denied"
            ? "opacity-70 cursor-not-allowed"
            : ""
        }
      `}
    >
      <Icon className="w-7 h-7 text-white" />

      <span
        className="absolute left-full ml-4
          px-4 py-2
          bg-[#131C2E]
          border border-[#22304A]
          rounded-lg
          text-sm font-semibold text-white
          whitespace-nowrap
          opacity-0
          group-hover:opacity-100
          -translate-x-1
          group-hover:translate-x-0
          transition-all duration-300
          pointer-events-none
          shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        {tooltip}
      </span>

      {status === "idle" && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span
            className="animate-ping absolute
              inline-flex h-full w-full
              rounded-full bg-white opacity-75"
          />

          <span
            className="relative inline-flex
              rounded-full h-4 w-4
              bg-[#2563EB]
              border-2 border-[#0B1120]"
          />
        </span>
      )}
    </motion.button>
  );
};

export default NotifyButton;
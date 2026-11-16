import { useState, useEffect, useSyncExternalStore } from "react";
import { Bell, BellRing, Loader2 } from "lucide-react";

// Inline "notify me" control backed by OneSignal Web Push. It now lives on the
// Upcoming Projects page (where "tell me when it launches" makes sense) rather
// than floating over every page.

// Resolves once the OneSignal SDK (loaded in index.html) is ready.
const waitForOneSignal = () =>
  new Promise((resolve) => {
    if (window.OneSignal) {
      resolve(window.OneSignal);
      return;
    }
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push((OneSignal) => resolve(OneSignal));
  });

// Browser permission state. Read through useSyncExternalStore so the server /
// prerendered markup and the first client render both use the neutral "idle"
// value, and React then switches to the real value after hydration.
const getBrowserStatus = () => {
  if (typeof Notification === "undefined" || !("serviceWorker" in navigator)) {
    return "unsupported";
  }
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return "idle";
};
const getServerStatus = () => "idle";
const noopSubscribe = () => () => {};
const readStatus = () => (window.__PRERENDER__ ? "idle" : getBrowserStatus());

const NotifyButton = () => {
  const browserStatus = useSyncExternalStore(noopSubscribe, readStatus, getServerStatus);
  // Set by user actions and by OneSignal subscription events.
  const [override, setStatus] = useState(null);
  const status = override ?? browserStatus;

  // Keep the UI in sync with the real OneSignal subscription.
  useEffect(() => {
    if (window.__PRERENDER__ || browserStatus === "unsupported") return;

    let cancelled = false;
    let subscription = null;

    const onChange = (event) => {
      if (!cancelled) setStatus(event?.current?.optedIn ? "granted" : "idle");
    };

    waitForOneSignal()
      .then((OneSignal) => {
        if (cancelled) return;
        subscription = OneSignal.User?.PushSubscription;
        if (!subscription) return;
        setStatus(subscription.optedIn ? "granted" : "idle");
        subscription.addEventListener("change", onChange);
      })
      .catch((error) => console.error("Failed to initialize OneSignal:", error));

    return () => {
      cancelled = true;
      subscription?.removeEventListener("change", onChange);
    };
  }, [browserStatus]);

  const handleClick = async () => {
    if (status !== "idle") return;
    setStatus("loading");
    try {
      const OneSignal = await waitForOneSignal();
      await OneSignal.Notifications.requestPermission();
      if (OneSignal.User?.PushSubscription?.optedIn) {
        setStatus("granted");
      } else {
        setStatus(Notification.permission === "denied" ? "denied" : "idle");
      }
    } catch (error) {
      console.error("OneSignal push subscription failed:", error);
      setStatus(
        typeof Notification !== "undefined" && Notification.permission === "denied"
          ? "denied"
          : "idle",
      );
    }
  };

  if (status === "unsupported") return null;

  const config = {
    idle: { Icon: Bell, label: "Notify me when these launch" },
    loading: { Icon: Loader2, label: "Waiting for permission" },
    granted: { Icon: BellRing, label: "You'll be notified" },
    denied: { Icon: Bell, label: "Notifications are blocked in your browser" },
  }[status];

  const { Icon, label } = config;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status !== "idle"}
      className={`btn btn-secondary ${status === "granted" ? "!border-emerald-400/40 !text-emerald-200" : ""}`}
    >
      <Icon
        className={`h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`}
        aria-hidden="true"
      />
      {label}
    </button>
  );
};

export default NotifyButton;

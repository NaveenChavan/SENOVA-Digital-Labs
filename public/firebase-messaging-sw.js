// public/firebase-messaging-sw.js
//
// Firebase Cloud Messaging service worker.
// This runs in the background (even when no tab is open) and is what
// allows Chrome to show native OS notifications for push messages
// received while the site isn't in focus.
//
// Must live at the site root so its scope covers the whole domain.

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js",
);

// Same config as src/config/firebase.js. Service workers can't import
// app modules or read Vite env vars, so these values are duplicated here.
// They are the public web app config (not secrets).
firebase.initializeApp({
  apiKey: "AIzaSyDG74b1W9QD-XP2OhiaBgZx2MDgO_dyKFw",
  authDomain: "portfolio-9bcab.firebaseapp.com",
  projectId: "portfolio-9bcab",
  storageBucket: "portfolio-9bcab.firebasestorage.app",
  messagingSenderId: "589929159059",
  appId: "1:589929159059:web:b28199ba8c01c651227066",
});

const messaging = firebase.messaging();

// Shown when a push arrives while the site/tab is not in focus.
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "SENOVA Digital Labs";
  const options = {
    body: payload.notification?.body || "",
    icon: "/android-chrome-192x192.png",
    badge: "/favicon-32x32.png",
    data: payload.data || {},
  };

  self.registration.showNotification(title, options);
});

// Focus/open the site when the notification is clicked.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.click_action || "/";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      }),
  );
});

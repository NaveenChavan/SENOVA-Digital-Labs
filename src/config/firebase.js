// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Form data save karne ke liye ye zaroori hai
import { getMessaging, isSupported } from "firebase/messaging";

// Aapki Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG74b1W9QD-XP2OhiaBgZx2MDgO_dyKFw",
  authDomain: "portfolio-9bcab.firebaseapp.com",
  projectId: "portfolio-9bcab",
  storageBucket: "portfolio-9bcab.firebasestorage.app",
  messagingSenderId: "589929159059",
  appId: "1:589929159059:web:b28199ba8c01c651227066",
  measurementId: "G-BE9BQ36LKW",
};

// VAPID public key for Web Push (Firebase Cloud Messaging).
// Safe to expose in frontend code — only the private key (kept in Firebase) is secret.
export const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database aur isko export karo taaki Contact.jsx isko use kar sake
export const db = getFirestore(app);

// Firebase Cloud Messaging isn't supported in all browsers/contexts
// (e.g. no Service Worker support, some in-app browsers). Resolve lazily.
export const getMessagingInstance = async () => {
  const supported = await isSupported();
  if (!supported) return null;
  return getMessaging(app);
};


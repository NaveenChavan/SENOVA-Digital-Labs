// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Form data save karne ke liye ye zaroori hai

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database aur isko export karo taaki Contact.jsx isko use kar sake
export const db = getFirestore(app);

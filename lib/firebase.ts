import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBadtGIjQ7GOg_l4egLDb_KgN9uMpJNAb8",
  authDomain: "product-management-9cbae.firebaseapp.com",
  projectId: "product-management-9cbae",
  storageBucket: "product-management-9cbae.firebasestorage.app",
  messagingSenderId: "83949576172",
  appId: "1:83949576172:web:029551877c5df0d735eac9",
  measurementId: "G-J3ZFZ6PMDP"
};

let app;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization failed:", error);
}

export { db };
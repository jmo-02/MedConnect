// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6-XyGTM9ututtSOeJNv_J542rLT1saZk",
  authDomain: "medconnect-890bc.firebaseapp.com",
  projectId: "medconnect-890bc",
  storageBucket: "medconnect-890bc.firebasestorage.app",
  messagingSenderId: "256950373118",
  appId: "1:256950373118:web:5c9b9187b7d36ede5ab3af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

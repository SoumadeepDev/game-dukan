// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD96sLq6K_oLz1XPz6Gb146zTuQ4TX5aQY",
  authDomain: "game-store-be134.firebaseapp.com",
  projectId: "game-store-be134",
  storageBucket: "game-store-be134.appspot.com",
  messagingSenderId: "977075912058",
  appId: "1:977075912058:web:fea7ce653110e0ddad6ac3",
  measurementId: "G-TQ0S8CH40M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };

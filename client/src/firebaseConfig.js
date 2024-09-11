// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; // Importa la función getAuth
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjqkonhhGm8V0M-TSYAhBSirUUB7cw4HY",
  authDomain: "shoppy-153a0.firebaseapp.com",
  projectId: "shoppy-153a0",
  storageBucket: "shoppy-153a0.appspot.com",
  messagingSenderId: "1023666717519",
  appId: "1:1023666717519:web:cebab2ea647d617f8bbb3a",
  measurementId: "G-ZFEBDFN8N1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación y exporta
export const auth = getAuth(app);

// Si también estás usando Analytics
export const analytics = getAnalytics(app);
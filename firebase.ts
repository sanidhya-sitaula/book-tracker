// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxgxcKcVkhWzqs-v1SwCGPSiPad9faFWk",
  authDomain: "book-tracker-95319.firebaseapp.com",
  projectId: "book-tracker-95319",
  storageBucket: "book-tracker-95319.appspot.com",
  messagingSenderId: "255484487849",
  appId: "1:255484487849:web:827ad005ca827de7d321b8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxgxcKcVkhWzqs-v1SwCGPSiPad9faFWk",
  authDomain: "book-tracker-95319.firebaseapp.com",
  projectId: "book-tracker-95319",
  storageBucket: "book-tracker-95319.appspot.com",
  messagingSenderId: "255484487849",
  appId: "1:255484487849:web:827ad005ca827de7d321b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/
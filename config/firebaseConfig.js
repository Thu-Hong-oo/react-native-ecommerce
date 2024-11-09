import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiVD74lGlaAhmRNJ-OuIgXtYs3BwnppXk",
  authDomain: "subproject-96426.firebaseapp.com",
  projectId: "subproject-96426",
  storageBucket: "subproject-96426.firebasestorage.app",
  messagingSenderId: "124321505047",
  appId: "1:124321505047:web:d8a58c372030dd5c712152",
  measurementId: "G-PY3DWTZV97",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

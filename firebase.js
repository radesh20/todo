// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Only needed if you're using Firestore
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCDVH1zK_mOJrW8kyCwPYirpvoZXXRIfS8",
  authDomain: "react-todo-56dc9.firebaseapp.com",
  projectId: "react-todo-56dc9",
  storageBucket: "react-todo-56dc9.appspot.com",
  messagingSenderId: "909811265888",
  appId: "1:909811265888:web:79da401e6b7cc31b3c2e05",
  measurementId: "G-R6133RYGXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // If using Firestore
const analytics = getAnalytics(app);

export { auth, db, analytics };




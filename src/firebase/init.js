// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPC3ka7fWRKPQHHqTSbuy19Esk50dTQn4",
  authDomain: "project-firebase-rc.firebaseapp.com",
  projectId: "project-firebase-rc",
  storageBucket: "project-firebase-rc.firebasestorage.app",
  messagingSenderId: "263082426193",
  appId: "1:263082426193:web:95dc8ceeed73d658c8dd70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
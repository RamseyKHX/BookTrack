// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBriApF2KBVc2IzPe6paNSqL05On1KRxw",
  authDomain: "book-track-50952.firebaseapp.com",
  projectId: "book-track-50952",
  storageBucket: "book-track-50952.firebasestorage.app",
  messagingSenderId: "687653341365",
  appId: "1:687653341365:web:bef32de31bf5cbda1c16fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// You can export other Firebase services here if needed

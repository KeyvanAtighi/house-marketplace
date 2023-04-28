// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY4ZzucOv15ab6KOp8OoMHMnyAABWmMCI",
  authDomain: "house-market-place-ca6a7.firebaseapp.com",
  projectId: "house-market-place-ca6a7",
  storageBucket: "house-market-place-ca6a7.appspot.com",
  messagingSenderId: "883430408002",
  appId: "1:883430408002:web:7bea513f217388582012db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

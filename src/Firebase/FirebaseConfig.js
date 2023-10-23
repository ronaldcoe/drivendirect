// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import{getFirestore} from "@firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


//  Place in Keys in .ENV Files
const firebaseConfig = {
  apiKey: "AIzaSyBS9CpW7NVb6Qfraga8yPbjlq4iKnH6MXs",
  authDomain: "driven-direct.firebaseapp.com",
  projectId: "driven-direct",
  storageBucket: "driven-direct.appspot.com",
  messagingSenderId: "912928589315",
  appId: "1:912928589315:web:12ed01c60912b9ad903036",
  measurementId: "G-L6QESKC1B4"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);


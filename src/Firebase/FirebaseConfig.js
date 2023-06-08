// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import{getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD149aLsb9hJLuZ-JULHW3hyLfBql7kIj4",
  authDomain: "test-45444.firebaseapp.com",
  projectId: "test-45444",
  storageBucket: "test-45444.appspot.com",
  messagingSenderId: "981486494124",
  appId: "1:981486494124:web:3e167efc44418d6e51da09",
  measurementId: "G-8K7XGSEZQ8",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
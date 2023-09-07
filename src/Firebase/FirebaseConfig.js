// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import{getFirestore} from "@firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA9t6Ui5OnzjIxJht7GJm57-hop0335v5U",
  authDomain: "drivendirect-c0645.firebaseapp.com",
  databaseURL: "https://drivendirect-c0645-default-rtdb.firebaseio.com",
  projectId: "drivendirect-c0645",
  storageBucket: "drivendirect-c0645.appspot.com",
  messagingSenderId: "285508548627",
  appId: "1:285508548627:web:b5120082100088ac3527e6",
  measurementId: "G-4QJCQD4EKB"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);


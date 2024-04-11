// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBXsaCJw4XzEPD7FiOdK9I__wBi29Sxgzo",
  authDomain: "eons-system.firebaseapp.com",
  projectId: "eons-system",
  storageBucket: "eons-system.appspot.com",
  messagingSenderId: "436766671981",
  appId: "1:436766671981:web:f173895a8364ca68e66b64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection } from "firebase/firestore";

// Initialize Firebase
export const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId
});

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage }

export const productRef = collection(db, 'products')
export const employeeRef = collection(db, 'employee')
export const transactionRef = collection(db, 'transactions')

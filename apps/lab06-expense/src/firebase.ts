import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdcf-YH5uI3X6uXTRDREe5NRZbE8PPRfU",
  authDomain: "mobileweb-59599.firebaseapp.com",
  projectId: "mobileweb-59599",
  storageBucket: "mobileweb-59599.firebasestorage.app",
  messagingSenderId: "765090315672",
  appId: "1:765090315672:web:4392ecec1f0839a7ba7fed",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
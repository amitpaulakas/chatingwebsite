// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCN9mvI2isIIwa22K04jziQy58ia15Low8",
  authDomain: "amitmern2306.firebaseapp.com",
  projectId: "amitmern2306",
  storageBucket: "amitmern2306.appspot.com",
  messagingSenderId: "246455220598",
  appId: "1:246455220598:web:36aa1e1f952c2b04ad6257"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
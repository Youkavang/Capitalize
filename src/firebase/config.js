// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {getFirestore} from "firebase/firestore";
import {getAuth} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDrLoyNbUCVgRxVEO5O9dS4HblqwzvGSaA",
  authDomain: "fir-tutorial-17dfb.firebaseapp.com",
  projectId: "fir-tutorial-17dfb",
  storageBucket: "fir-tutorial-17dfb.appspot.com",
  messagingSenderId: "668115858562",
  appId: "1:668115858562:web:ac6cc9031be6452e2ff09b",
  measurementId: "G-Z783G1VG7S"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth(app)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "talkie-4f8e6.firebaseapp.com",
  projectId: "talkie-4f8e6",
  storageBucket: "talkie-4f8e6.appspot.com",
  messagingSenderId: "673517837544",
  appId: "1:673517837544:web:301ee69c5bd94a763d3d5d",
  measurementId: "G-R6S5Q3HTSV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
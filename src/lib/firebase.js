import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage()

// Google Sign-In helper
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Ensure Firestore user documents exist
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      username: user.displayName || (user.email ? user.email.split("@")[0] : "User"),
      email: user.email || "",
      profile: user.photoURL || "",
      id: user.uid,
      blocked: [],
    });
    await setDoc(doc(db, "userchats", user.uid), { chats: [] });
  }

  return user;
}
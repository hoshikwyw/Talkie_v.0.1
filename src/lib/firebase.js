import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage()

let googleSignInPending = false;

export const signInWithGoogle = async () => {
  if (googleSignInPending) return;
  googleSignInPending = true;

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  let result;
  try {
    result = await signInWithPopup(auth, provider);
  } catch (err) {
    googleSignInPending = false;
    throw err;
  }
  googleSignInPending = false;
  const user = result.user;

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

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export async function fetchUser(uid) {
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : null
}

export async function createUserDocument(uid, { username, email, profile }) {
  await setDoc(doc(db, "users", uid), {
    username,
    email,
    profile: profile || "",
    id: uid,
    blocked: [],
  })
  await setDoc(doc(db, "userchats", uid), { chats: [] })
}

export async function updateUserProfile(uid, { username }) {
  await updateDoc(doc(db, "users", uid), {
    username,
  })
}

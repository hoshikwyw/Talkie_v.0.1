import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function fetchUser(uid) {
  const snapshot = await getDoc(doc(db, 'users', uid))
  return snapshot.exists() ? snapshot.data() : null
}

/** Creates the user profile and its (empty) conversation index together. */
export async function createUserDocument(uid, { username, email, profile }) {
  await setDoc(doc(db, 'users', uid), {
    id: uid,
    username,
    email,
    profile: profile || '',
    blocked: [],
  })
  await setDoc(doc(db, 'userchats', uid), { chats: [] })
}

export async function updateUserProfile(uid, { username }) {
  await updateDoc(doc(db, 'users', uid), { username })
}

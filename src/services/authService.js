import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { createUserDocument } from './userService'

/** Screens talk to this module, never to `firebase/auth` directly. */

export const observeAuthState = (callback) => onAuthStateChanged(auth, callback)

/** All three sign-in functions resolve to a Firebase `User`. */
export async function signInWithEmail(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

export const signOutCurrentUser = () => signOut(auth)

export async function registerWithEmail({ username, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await createUserDocument(credential.user.uid, { username, email, profile: '' })
  return credential.user
}

/**
 * Google sign-in doubles as registration: the Firestore profile has to exist
 * before we return, or the first render reads a user that is not there yet.
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  const { user } = await signInWithPopup(auth, provider)
  const profileSnapshot = await getDoc(doc(db, 'users', user.uid))

  if (!profileSnapshot.exists()) {
    await createUserDocument(user.uid, {
      username: user.displayName || user.email?.split('@')[0] || 'User',
      email: user.email || '',
      profile: user.photoURL || '',
    })
  }

  return user
}

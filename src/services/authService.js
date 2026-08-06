import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { isNative } from '@/shared/platform'
import { auth, db } from './firebase'
import { createUserDocument } from './userService'

/** Screens talk to this module, never to `firebase/auth` directly. */

export const observeAuthState = (callback) => onAuthStateChanged(auth, callback)

/** All sign-in functions resolve to a Firebase `User`. */
export async function signInWithEmail(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

export async function registerWithEmail({ username, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await createUserDocument(credential.user.uid, { username, email, profile: '' })
  return credential.user
}

/**
 * Google sign-in doubles as registration, so the Firestore profile has to exist
 * before we return — otherwise the first render reads a user that is not there.
 */
async function ensureUserDocument(user) {
  const snapshot = await getDoc(doc(db, 'users', user.uid))
  if (snapshot.exists()) return

  await createUserDocument(user.uid, {
    username: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    profile: user.photoURL || '',
  })
}

/**
 * `signInWithPopup` cannot work inside a Capacitor WebView — there is no opener
 * window to post the result back to, so the call hangs or is blocked outright.
 *
 * Android instead runs Google's native sign-in sheet and hands back an ID
 * token. We exchange that for a JS SDK session (`skipNativeAuth` is on, so the
 * plugin deliberately does not sign in on the native layer) which keeps one
 * source of auth truth: Firestore, the auth observer and the route guard all
 * read the same session they always have.
 *
 * The dynamic import keeps the plugin out of the web bundle entirely.
 */
async function signInWithGoogleNatively() {
  const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication')
  const { credential } = await FirebaseAuthentication.signInWithGoogle()

  if (!credential?.idToken) {
    const error = new Error('Google sign-in returned no credential')
    error.code = 'auth/native-no-credential'
    throw error
  }

  const { user } = await signInWithCredential(
    auth,
    GoogleAuthProvider.credential(credential.idToken)
  )
  return user
}

async function signInWithGooglePopup() {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  const { user } = await signInWithPopup(auth, provider)
  return user
}

export async function signInWithGoogle() {
  const user = isNative() ? await signInWithGoogleNatively() : await signInWithGooglePopup()
  await ensureUserDocument(user)
  return user
}

export async function signOutCurrentUser() {
  // The native layer holds its own Google session. Clearing it means the next
  // sign-in offers the account picker instead of silently reusing the last one.
  if (isNative()) {
    try {
      const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication')
      await FirebaseAuthentication.signOut()
    } catch (err) {
      console.error('Native sign out failed:', err)
    }
  }

  await signOut(auth)
}

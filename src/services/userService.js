import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Participant profiles, cached with a short lifetime.
 *
 * The conversation-list listener re-runs on every message and used to `getDoc`
 * every participant each time — N extra reads per message, growing with the
 * number of conversations.
 *
 * The cache expires rather than living forever: `invalidateUserCache` only
 * reaches writes made in this tab, so without a TTL a contact who renamed
 * themselves elsewhere would show their old name until a full reload.
 */
const PROFILE_TTL_MS = 5 * 60 * 1000
const profileCache = new Map()

export async function fetchUser(uid) {
  const snapshot = await getDoc(doc(db, 'users', uid))
  return snapshot.exists() ? snapshot.data() : null
}

export async function fetchUserCached(uid) {
  if (!uid) return null

  const cached = profileCache.get(uid)
  if (cached && Date.now() - cached.fetchedAt < PROFILE_TTL_MS) return cached.profile

  const profile = await fetchUser(uid)
  profileCache.set(uid, { profile, fetchedAt: Date.now() })
  return profile
}

export function invalidateUserCache(uid) {
  if (uid) profileCache.delete(uid)
  else profileCache.clear()
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
  invalidateUserCache(uid)
}

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Participant profiles are read once and reused.
 *
 * The conversation-list listener re-runs on every message, and it used to
 * `getDoc` every participant each time — N extra reads per message, growing
 * with the number of conversations. Profiles change rarely, so cache them and
 * invalidate on write.
 */
const profileCache = new Map()

export async function fetchUser(uid) {
  const snapshot = await getDoc(doc(db, 'users', uid))
  return snapshot.exists() ? snapshot.data() : null
}

export async function fetchUserCached(uid) {
  if (!uid) return null
  if (profileCache.has(uid)) return profileCache.get(uid)

  const profile = await fetchUser(uid)
  // Only cache hits — a profile that does not exist yet should be retried.
  if (profile) profileCache.set(uid, profile)
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

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'

/**
 * Firebase client only. Anything that reads or writes application data belongs
 * in a service module beside this one, not here.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

/*
 * Analytics is loaded off the critical path and only where it is supported.
 *
 * It threw outright where cookies are blocked, taking the app down with it,
 * and importing it eagerly put the whole module in the startup bundle for a
 * feature that contributes nothing to first paint.
 */
import('firebase/analytics')
  .then(async ({ getAnalytics, isSupported }) => {
    if (await isSupported()) getAnalytics(app)
  })
  .catch(() => {})

/**
 * Firestore with an on-disk cache.
 *
 * A phone loses connectivity constantly, and without this the app opens to an
 * empty conversation list every time it happens. With it, cached conversations
 * render immediately and writes made offline are queued and replayed on
 * reconnect.
 *
 * The multi-tab manager keeps several browser tabs sharing one cache; without
 * it only the first tab gets persistence. It needs IndexedDB, so fall back to
 * the in-memory default where that is unavailable (private windows, embedded
 * WebViews with storage disabled) rather than losing Firestore entirely.
 */
function createFirestore() {
  try {
    return initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    })
  } catch (err) {
    console.error('Persistent cache unavailable, using memory only:', err)
    return getFirestore(app)
  }
}

export const auth = getAuth(app)
export const db = createFirestore()

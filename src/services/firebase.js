import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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

// Analytics throws where it is unsupported or cookies are blocked, which used
// to take the whole app down with it. Opt in only when the SDK says it is safe.
isAnalyticsSupported()
  .then((supported) => supported && getAnalytics(app))
  .catch(() => {})

export const auth = getAuth(app)
export const db = getFirestore(app)

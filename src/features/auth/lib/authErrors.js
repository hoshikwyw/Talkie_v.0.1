/**
 * Firebase auth errors are not for users: `err.message` renders as
 * "Firebase: Error (auth/invalid-credential)." Every screen was showing that
 * string in a toast. Translate the codes we can actually hit.
 */
const MESSAGES = {
  'auth/invalid-email': 'That email address is not valid.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/email-already-in-use': 'An account with that email already exists.',
  'auth/weak-password': 'Please choose a stronger password.',
  'auth/too-many-requests': 'Too many attempts. Try again in a few minutes.',
  'auth/network-request-failed': 'Network error — check your connection.',
  'auth/popup-blocked': 'Your browser blocked the sign-in popup.',
  'auth/account-exists-with-different-credential':
    'That email is already registered with a different sign-in method.',
  'auth/operation-not-allowed': 'That sign-in method is not enabled.',
  'auth/native-no-credential': 'Google did not return a sign-in token. Please try again.',
}

/** Backing out of a sign-in sheet is a decision, not a failure. */
const SILENT = new Set(['auth/popup-closed-by-user', 'auth/cancelled-popup-request'])

/**
 * Android's Google Sign-In reports through numeric status codes rather than
 * Firebase codes, and they arrive as free text on the error message.
 */
const NATIVE_PATTERNS = [
  { match: /12501|cancell?ed|canceled by user/i, message: null },
  { match: /network/i, message: 'Network error — check your connection.' },
  {
    match: /DEVELOPER_ERROR|status code:?\s*10\b/i,
    message:
      'Google sign-in is not configured for this build. The app’s SHA-1 fingerprint must be registered in the Firebase console.',
  },
  { match: /12500|SIGN_IN_FAILED/i, message: 'Google sign-in failed. Please try again.' },
]

/** @returns {string | null} message to show, or null to stay quiet. */
export function authErrorMessage(error) {
  if (SILENT.has(error?.code)) return null
  if (MESSAGES[error?.code]) return MESSAGES[error.code]

  const text = `${error?.code ?? ''} ${error?.message ?? ''}`
  const native = NATIVE_PATTERNS.find(({ match }) => match.test(text))
  if (native) return native.message

  return 'Something went wrong. Please try again.'
}

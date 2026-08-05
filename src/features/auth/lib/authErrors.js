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
}

/** Closing the popup is a decision, not a failure — nothing to report. */
const SILENT = new Set(['auth/popup-closed-by-user', 'auth/cancelled-popup-request'])

/** @returns {string | null} message to show, or null to stay quiet. */
export function authErrorMessage(error) {
  if (SILENT.has(error?.code)) return null
  return MESSAGES[error?.code] ?? 'Something went wrong. Please try again.'
}

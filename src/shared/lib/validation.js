/** Field rules shared by the sign-up form and the profile editor. */

export const USERNAME_MIN = 2
export const USERNAME_MAX = 30
export const PASSWORD_MIN = 8

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Each validator returns an error string, or `null` when the value is fine. */

export function validateEmail(value) {
  const email = value?.trim() ?? ''
  if (!email) return 'Email is required'
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address'
  return null
}

export function validateUsername(value) {
  const username = value?.trim() ?? ''
  if (!username) return 'Username is required'
  if (username.length < USERNAME_MIN) return `At least ${USERNAME_MIN} characters`
  if (username.length > USERNAME_MAX) return `At most ${USERNAME_MAX} characters`
  return null
}

export function validatePassword(value) {
  if (!value) return 'Password is required'
  if (value.length < PASSWORD_MIN) return `At least ${PASSWORD_MIN} characters`
  return null
}

export function validateConfirmation(password, confirmation) {
  if (!confirmation) return 'Please confirm your password'
  if (password !== confirmation) return 'Passwords do not match'
  return null
}

/** Drops the `null`s so `Object.keys(...).length` means "has errors". */
export const collectErrors = (candidates) =>
  Object.fromEntries(Object.entries(candidates).filter(([, error]) => error))

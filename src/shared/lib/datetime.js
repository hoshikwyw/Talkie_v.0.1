/**
 * Firestore hands back `Timestamp` objects from live snapshots but plain
 * `Date`s for locally-written messages that have not round-tripped yet.
 */
export function toDate(value) {
  if (!value) return null
  if (typeof value.toDate === 'function') return value.toDate()
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric',
})

export function formatMessageTime(value) {
  const date = toDate(value)
  return date ? timeFormatter.format(date) : ''
}

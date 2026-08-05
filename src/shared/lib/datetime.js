const DAY_MS = 24 * 60 * 60 * 1000

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

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
})

const fullFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatMessageTime(value) {
  const date = toDate(value)
  return date ? timeFormatter.format(date) : ''
}

/** Machine-readable value for a `<time datetime>` attribute. */
export function toIsoString(value) {
  return toDate(value)?.toISOString()
}

/** Full date and time, for the tooltip on a grouped timestamp. */
export function formatFullTimestamp(value) {
  const date = toDate(value)
  return date ? fullFormatter.format(date) : ''
}

/** Midnight of the given date, as a timestamp — the grouping key for a day. */
export function startOfDay(date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy.getTime()
}

export function formatDayLabel(value) {
  const date = toDate(value)
  if (!date) return ''

  const today = startOfDay(new Date())
  const day = startOfDay(date)

  if (day === today) return 'Today'
  if (day === today - DAY_MS) return 'Yesterday'
  return dayFormatter.format(date)
}

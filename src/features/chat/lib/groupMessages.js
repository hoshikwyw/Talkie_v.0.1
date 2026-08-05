import { formatDayLabel, startOfDay, toDate } from '@/shared/lib/datetime'

/** Messages closer together than this from one sender read as a single turn. */
const RUN_GAP_MS = 5 * 60 * 1000

function belongToSameRun(previous, current) {
  if (!previous || !current) return false
  if (previous.senderId !== current.senderId) return false

  const previousDate = toDate(previous.createdAt)
  const currentDate = toDate(current.createdAt)
  if (!previousDate || !currentDate) return false
  if (startOfDay(previousDate) !== startOfDay(currentDate)) return false

  return currentDate - previousDate < RUN_GAP_MS
}

/**
 * Splits a flat message array into day sections, and marks where each sender's
 * run ends so the list can show one avatar and one timestamp per turn instead
 * of repeating them on every line.
 *
 * @returns {{ key: string, label: string, items: { message: object, endsRun: boolean }[] }[]}
 */
export function groupMessages(messages = []) {
  const days = []
  let currentDay = null

  messages.forEach((message, index) => {
    const date = toDate(message.createdAt)
    const key = date ? String(startOfDay(date)) : 'undated'

    if (!currentDay || currentDay.key !== key) {
      currentDay = { key, label: date ? formatDayLabel(date) : '', items: [] }
      days.push(currentDay)
    }

    currentDay.items.push({
      message,
      endsRun: !belongToSameRun(message, messages[index + 1]),
    })
  })

  return days
}

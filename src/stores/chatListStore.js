import { create } from 'zustand'
import { subscribeToUserChats } from '@/services/chatService'

/**
 * The conversation list, backed by exactly one Firestore listener.
 *
 * Each consumer used to open its own `onSnapshot`, so the desktop column and
 * the mobile drawer billed two listeners — and two sets of participant reads —
 * for the same data. Subscription is reference counted instead: the first
 * consumer starts it, the last one to leave tears it down.
 */
export const useChatListStore = create(() => ({
  chats: [],
  isLoading: true,
  error: null,
}))

const { setState } = useChatListStore

let unsubscribe = null
let subscriberCount = 0
let subscribedUserId = null

function stop() {
  unsubscribe?.()
  unsubscribe = null
  subscribedUserId = null
  setState({ chats: [], isLoading: true, error: null })
}

function start(userId) {
  stop()
  subscribedUserId = userId
  unsubscribe = subscribeToUserChats(
    userId,
    (chats) => setState({ chats, isLoading: false, error: null }),
    (error) => setState({ isLoading: false, error })
  )
}

/** Retains the shared subscription. Call the returned function to release it. */
export function retainChatList(userId) {
  if (!userId) return () => {}

  subscriberCount += 1
  if (subscribedUserId !== userId) start(userId)

  return () => {
    subscriberCount -= 1
    if (subscriberCount === 0) stop()
  }
}

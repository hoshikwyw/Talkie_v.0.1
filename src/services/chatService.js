import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { db } from './firebase'
import { fetchUserCached } from './userService'

/**
 * Data model
 *
 *   chats/{chatId}        { createdAt, messages: Message[] }
 *   userchats/{userId}    { chats: ChatSummary[] }
 *
 * `messages` is an array on a single document, so every write rewrites the
 * whole array and a busy conversation will eventually hit Firestore's 1 MB
 * document limit. Moving messages to a subcollection is the real fix; it is a
 * schema migration and deliberately out of scope here.
 */

const chatRef = (chatId) => doc(db, 'chats', chatId)
const userChatsRef = (userId) => doc(db, 'userchats', userId)

/**
 * Read-modify-write of one summary inside a user's `chats` array, under a
 * transaction so a concurrent message cannot be clobbered.
 */
async function patchChatSummary(userId, chatId, patch, { touch = true } = {}) {
  await runTransaction(db, async (transaction) => {
    const ref = userChatsRef(userId)
    const snapshot = await transaction.get(ref)
    if (!snapshot.exists()) return

    const chats = snapshot.data().chats ?? []
    const index = chats.findIndex((entry) => entry.chatId === chatId)
    if (index === -1) return

    const next = [...chats]
    next[index] = { ...next[index], ...patch, ...(touch ? { updatedAt: Date.now() } : null) }
    transaction.update(ref, { chats: next })
  })
}

/** Removes a conversation from one user's index. */
async function removeChatSummary(userId, chatId) {
  await runTransaction(db, async (transaction) => {
    const ref = userChatsRef(userId)
    const snapshot = await transaction.get(ref)
    if (!snapshot.exists()) return

    const chats = snapshot.data().chats ?? []
    const next = chats.filter((entry) => entry.chatId !== chatId)
    if (next.length === chats.length) return

    transaction.update(ref, { chats: next })
  })
}

/* ------------------------------------------------------------------ reads */

export function subscribeToChat(chatId, onData, onError) {
  return onSnapshot(
    chatRef(chatId),
    (snapshot) => onData(snapshot.data() ?? null),
    (error) => {
      console.error('Chat subscription failed:', error)
      onError?.(error)
    }
  )
}

export function subscribeToUserChats(userId, onData, onError) {
  return onSnapshot(
    userChatsRef(userId),
    async (snapshot) => {
      const summaries = snapshot.data()?.chats ?? []

      const chats = await Promise.all(
        summaries.map(async (summary) => ({
          ...summary,
          user: await fetchUserCached(summary.receiverId),
        }))
      )

      // `updatedAt` is absent on conversations created before the first
      // message, and undefined arithmetic sorted them randomly.
      onData(chats.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)))
    },
    (error) => {
      console.error('Conversation list subscription failed:', error)
      onError?.(error)
    }
  )
}

export async function searchUserByUsername(username, excludeUserId) {
  const snapshot = await getDocs(query(collection(db, 'users'), where('username', '==', username)))

  // Without this you could find, and then add, yourself.
  return snapshot.docs.map((entry) => entry.data()).find((user) => user.id !== excludeUserId) ?? null
}

/* ----------------------------------------------------------------- writes */

export async function sendMessage(chatId, currentUser, receiverUser, text) {
  const trimmed = text.trim()
  if (!trimmed) return null

  const message = {
    messageId: crypto.randomUUID(),
    senderId: currentUser.id,
    text: trimmed,
    // `serverTimestamp()` is not allowed inside an array element, so the
    // sender's clock is the best available source here.
    createdAt: new Date(),
  }

  await updateDoc(chatRef(chatId), { messages: arrayUnion(message) })

  await Promise.all([
    patchChatSummary(currentUser.id, chatId, { lastMessage: trimmed, isSeen: true }),
    receiverUser?.id
      ? patchChatSummary(receiverUser.id, chatId, { lastMessage: trimmed, isSeen: false })
      : null,
  ])

  return message
}

export async function markChatAsSeen(userId, chatId) {
  await patchChatSummary(userId, chatId, { isSeen: true }, { touch: false })
}

/**
 * Adding the same friend twice used to create a second conversation. Returns
 * `{ chatId, created }` so the caller can tell the two cases apart.
 */
export async function createNewChat(currentUserId, otherUserId) {
  if (currentUserId === otherUserId) {
    throw new Error('You cannot start a conversation with yourself')
  }

  const existing = await getDoc(userChatsRef(currentUserId))
  const duplicate = (existing.data()?.chats ?? []).find((entry) => entry.receiverId === otherUserId)
  if (duplicate) return { chatId: duplicate.chatId, created: false }

  const newChatRef = doc(collection(db, 'chats'))
  const summary = { chatId: newChatRef.id, lastMessage: '', updatedAt: Date.now() }

  // One batch, so a failure cannot leave the conversation on one side only.
  const batch = writeBatch(db)
  batch.set(newChatRef, { createdAt: serverTimestamp(), messages: [] })
  batch.set(
    userChatsRef(currentUserId),
    { chats: arrayUnion({ ...summary, receiverId: otherUserId, isSeen: true }) },
    { merge: true }
  )
  batch.set(
    userChatsRef(otherUserId),
    { chats: arrayUnion({ ...summary, receiverId: currentUserId, isSeen: false }) },
    { merge: true }
  )
  await batch.commit()

  return { chatId: newChatRef.id, created: true }
}

/**
 * Deletes the conversation document *and* both index entries.
 *
 * Only the document was deleted before, so the conversation stayed in both
 * sidebars forever and opening it subscribed to a document that no longer
 * exists.
 */
export async function deleteChat(chatId, participantIds = []) {
  const ids = new Set(participantIds.filter(Boolean))

  // Each summary records the other participant, so a conversation with someone
  // whose profile we do not hold — a user who blocked us — is still cleaned up
  // on both sides.
  for (const userId of [...ids]) {
    const snapshot = await getDoc(userChatsRef(userId))
    const summary = (snapshot.data()?.chats ?? []).find((entry) => entry.chatId === chatId)
    if (summary?.receiverId) ids.add(summary.receiverId)
  }

  await Promise.all([...ids].map((userId) => removeChatSummary(userId, chatId)))
  await deleteDoc(chatRef(chatId))
}

export async function deleteMessage(chatId, message, participantIds = []) {
  const remaining = await runTransaction(db, async (transaction) => {
    const ref = chatRef(chatId)
    const snapshot = await transaction.get(ref)
    if (!snapshot.exists()) return null

    const messages = snapshot.data().messages ?? []
    const next = messages.filter((entry) => entry.messageId !== message.messageId)
    if (next.length === messages.length) return null

    transaction.update(ref, { messages: next })
    return next
  })

  if (!remaining) return

  // The sidebar kept showing a deleted message as the conversation preview.
  const lastMessage = remaining[remaining.length - 1]?.text ?? ''
  await Promise.all(
    participantIds
      .filter(Boolean)
      .map((userId) => patchChatSummary(userId, chatId, { lastMessage }, { touch: false }))
  )
}

export async function toggleBlockUser(currentUserId, targetUserId, isBlocked) {
  await updateDoc(doc(db, 'users', currentUserId), {
    blocked: isBlocked ? arrayRemove(targetUserId) : arrayUnion(targetUserId),
  })
}

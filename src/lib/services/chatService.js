import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  arrayRemove,
} from "firebase/firestore"
import { db } from "../firebase"
import upload from "../upload"

export function subscribeToChat(chatId, callback) {
  return onSnapshot(doc(db, "chats", chatId), (snap) => {
    callback(snap.data())
  })
}

export function subscribeToUserChats(userId, callback) {
  return onSnapshot(doc(db, "userchats", userId), async (res) => {
    const items = res.data()?.chats || []
    const promises = items.map(async (item) => {
      const userDocSnap = await getDoc(doc(db, "users", item.receiverId))
      return { ...item, user: userDocSnap.data() }
    })
    const chatData = await Promise.all(promises)
    callback(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
  })
}

export async function sendMessage(chatId, currentUser, receiverUser, text, imgFile) {
  const trimmed = text.trim()
  if (!trimmed && !imgFile) return

  let imgUrl = null
  if (imgFile) {
    imgUrl = await upload(imgFile)
  }

  const messageId = crypto.randomUUID()

  await updateDoc(doc(db, "chats", chatId), {
    messages: arrayUnion({
      messageId,
      senderId: currentUser.id,
      text: trimmed,
      createdAt: new Date(),
      ...(imgUrl && { img: imgUrl }),
    }),
  })

  const userIds = [currentUser.id, receiverUser.id]
  await Promise.all(
    userIds.map((id) =>
      runTransaction(db, async (transaction) => {
        const userChatsRef = doc(db, "userchats", id)
        const snap = await transaction.get(userChatsRef)
        if (!snap.exists()) return

        const chats = snap.data().chats
        const chatIndex = chats.findIndex((item) => item.chatId === chatId)
        if (chatIndex === -1) return

        chats[chatIndex].lastMessage = trimmed
        chats[chatIndex].updatedAt = Date.now()
        chats[chatIndex].isSeen = id === currentUser.id

        transaction.update(userChatsRef, { chats })
      })
    )
  )
}

export async function markChatAsSeen(userId, chats, chatId) {
  const cleanChats = chats.map(({ user, ...rest }) => rest)
  const chatIndex = cleanChats.findIndex((item) => item.chatId === chatId)
  if (chatIndex === -1) return
  cleanChats[chatIndex].isSeen = true

  await updateDoc(doc(db, "userchats", userId), { chats: cleanChats })
}

export async function createNewChat(currentUserId, otherUserId) {
  const chatRef = doc(collection(db, "chats"))
  await setDoc(chatRef, {
    createdAt: serverTimestamp(),
    messages: [],
  })

  const userChatsRef = collection(db, "userchats")
  await updateDoc(doc(userChatsRef, otherUserId), {
    chats: arrayUnion({
      chatId: chatRef.id,
      lastMessage: "",
      receiverId: currentUserId,
      updatedAt: Date.now(),
    }),
  })
  await updateDoc(doc(userChatsRef, currentUserId), {
    chats: arrayUnion({
      chatId: chatRef.id,
      lastMessage: "",
      receiverId: otherUserId,
      updatedAt: Date.now(),
    }),
  })
}

export async function searchUserByUsername(username) {
  const userRef = collection(db, "users")
  const q = query(userRef, where("username", "==", username))
  const snap = await getDocs(q)
  return snap.empty ? null : snap.docs[0].data()
}

export async function deleteChat(chatId) {
  await deleteDoc(doc(db, "chats", chatId))
}

export async function toggleBlockUser(currentUserId, targetUserId, isBlocked) {
  await updateDoc(doc(db, "users", currentUserId), {
    blocked: isBlocked ? arrayRemove(targetUserId) : arrayUnion(targetUserId),
  })
}

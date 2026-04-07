import { useEffect, useState } from "react"
import { useUserStore } from "../userStore"
import { useChatStore } from "../chatStore"
import { subscribeToUserChats, markChatAsSeen } from "../services/chatService"

export function useChatList() {
  const { currentUser } = useUserStore()
  const { changeChat } = useChatStore()
  const [chats, setChats] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!currentUser?.id) return
    const unSub = subscribeToUserChats(currentUser.id, setChats)
    return () => { unSub() }
  }, [currentUser?.id])

  const handleSelect = async (chat) => {
    try {
      await markChatAsSeen(currentUser.id, chats, chat.chatId)
      changeChat(chat.chatId, chat.user)
    } catch (err) {
      console.error("Failed to select chat:", err)
    }
  }

  const filteredChats = searchTerm
    ? chats.filter((c) =>
        c.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : chats

  return {
    chats: filteredChats,
    modalOpen,
    setModalOpen,
    searchTerm,
    setSearchTerm,
    handleSelect,
    currentUser,
  }
}

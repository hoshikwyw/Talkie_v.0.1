import { useEffect, useMemo, useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useChatStore } from '@/stores/chatStore'
import { markChatAsSeen, subscribeToUserChats } from '@/services/chatService'

/** Live conversation list for the signed-in user, plus search and selection. */
export function useChatList() {
  const currentUser = useUserStore((state) => state.currentUser)
  const changeChat = useChatStore((state) => state.changeChat)
  const activeChatId = useChatStore((state) => state.chatId)

  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!currentUser?.id) return undefined

    setIsLoading(true)
    const unsubscribe = subscribeToUserChats(currentUser.id, (next) => {
      setChats(next)
      setIsLoading(false)
    })

    return unsubscribe
  }, [currentUser?.id])

  const filteredChats = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return chats
    return chats.filter((chat) => chat.user?.username?.toLowerCase().includes(term))
  }, [chats, searchTerm])

  const selectChat = async (chat) => {
    changeChat(chat.chatId, chat.user)
    try {
      await markChatAsSeen(currentUser.id, chats, chat.chatId)
    } catch (err) {
      // Opening the conversation matters more than the read receipt.
      console.error('Failed to mark chat as seen:', err)
    }
  }

  return {
    chats: filteredChats,
    totalChats: chats.length,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectChat,
    activeChatId,
    currentUser,
  }
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useChatStore } from '@/stores/chatStore'
import { retainChatList, useChatListStore } from '@/stores/chatListStore'
import { markChatAsSeen } from '@/services/chatService'

/** Conversation list for the signed-in user, plus search and selection. */
export function useChatList() {
  const currentUser = useUserStore((state) => state.currentUser)
  const changeChat = useChatStore((state) => state.changeChat)
  const activeChatId = useChatStore((state) => state.chatId)

  const chats = useChatListStore((state) => state.chats)
  const isLoading = useChatListStore((state) => state.isLoading)
  const error = useChatListStore((state) => state.error)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => retainChatList(currentUser?.id), [currentUser?.id])

  const filteredChats = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return chats
    return chats.filter((chat) => chat.user?.username?.toLowerCase().includes(term))
  }, [chats, searchTerm])

  const selectChat = useCallback(
    async (chat) => {
      changeChat(chat.chatId, chat.user)

      if (chat.isSeen) return
      try {
        await markChatAsSeen(currentUser.id, chat.chatId)
      } catch (err) {
        // Opening the conversation matters more than the read receipt.
        console.error('Failed to mark chat as seen:', err)
      }
    },
    [changeChat, currentUser?.id]
  )

  return {
    chats: filteredChats,
    totalChats: chats.length,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectChat,
    activeChatId,
    currentUser,
  }
}

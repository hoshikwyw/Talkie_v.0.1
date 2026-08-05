import { useCallback, useEffect, useState } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { useUserStore } from '@/stores/userStore'
import { deleteMessage, sendMessage, subscribeToChat } from '@/services/chatService'
import ChatHeader from './ChatHeader'
import MessageComposer from './MessageComposer'
import MessageList from './MessageList'

/** Owns the conversation subscription and wires the header, list and composer. */
const ChatPanel = ({ onDetailToggle }) => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [chat, setChat] = useState(null)

  useEffect(() => {
    if (!chatId) return undefined
    setChat(null)
    return subscribeToChat(chatId, setChat, () => setChat(null))
  }, [chatId])

  const handleSend = useCallback(
    (text) => sendMessage(chatId, currentUser, user, text),
    [chatId, currentUser, user]
  )

  const handleDeleteMessage = useCallback(
    (message) => deleteMessage(chatId, message, [currentUser?.id, user?.id]),
    [chatId, currentUser?.id, user?.id]
  )

  const blocked = isCurrentUserBlocked || isReceiverBlocked
  const disabledReason = isCurrentUserBlocked
    ? 'You can no longer reply to this conversation'
    : 'You blocked this user. Unblock them to send messages.'

  return (
    <div className="flex h-full flex-col bg-canvas">
      <ChatHeader
        name={user?.username}
        avatar={user?.profile}
        blocked={isCurrentUserBlocked}
        onDetailToggle={onDetailToggle}
      />

      <MessageList
        messages={chat?.messages}
        currentUser={currentUser}
        otherUser={user}
        onDeleteMessage={handleDeleteMessage}
      />

      <MessageComposer onSend={handleSend} disabled={blocked} disabledReason={disabledReason} />
    </div>
  )
}

export default ChatPanel

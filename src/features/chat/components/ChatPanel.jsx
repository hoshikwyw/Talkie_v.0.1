import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useChatStore } from '@/stores/chatStore'
import { useUserStore } from '@/stores/userStore'
import { deleteChat, deleteMessage, sendMessage, subscribeToChat } from '@/services/chatService'
import { Button, EmptyState } from '@/shared/ui'
import ChatHeader from './ChatHeader'
import MessageComposer from './MessageComposer'
import MessageList from './MessageList'

const LOADING = { status: 'loading', messages: [] }

/** Owns the conversation subscription and wires the header, list and composer. */
const ChatPanel = ({ onDetailToggle }) => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, resetChat } = useChatStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [chat, setChat] = useState(LOADING)
  const [removing, setRemoving] = useState(false)

  useEffect(() => {
    if (!chatId) return undefined

    setChat(LOADING)
    return subscribeToChat(
      chatId,
      ({ exists, fromCache, messages }) => {
        if (exists) return setChat({ status: 'ready', messages })
        // Stay in loading until the server confirms the document is gone.
        if (!fromCache) setChat({ status: 'missing', messages: [] })
      },
      () => setChat({ status: 'error', messages: [] })
    )
  }, [chatId])

  const handleSend = useCallback(
    (text) => sendMessage(chatId, currentUser, user, text),
    [chatId, currentUser, user]
  )

  const handleDeleteMessage = useCallback(
    (message) => deleteMessage(chatId, message, [currentUser?.id, user?.id]),
    [chatId, currentUser?.id, user?.id]
  )

  /** Clears the sidebar entries left behind by a conversation that is gone. */
  const handleRemoveStaleChat = async () => {
    setRemoving(true)
    const participantIds = [currentUser?.id, user?.id]
    try {
      resetChat()
      await deleteChat(chatId, participantIds)
      toast.success('Conversation removed')
    } catch (err) {
      console.error('Failed to remove conversation:', err)
      toast.error('Could not remove the conversation')
    } finally {
      setRemoving(false)
    }
  }

  const isMissing = chat.status === 'missing'
  const blocked = isCurrentUserBlocked || isReceiverBlocked

  const disabledReason = isMissing
    ? 'This conversation is no longer available'
    : isCurrentUserBlocked
      ? 'You can no longer reply to this conversation'
      : 'You blocked this user. Unblock them to send messages.'

  return (
    <div className="flex h-full flex-col bg-canvas">
      <ChatHeader
        name={user?.username}
        avatar={user?.profile}
        blocked={isCurrentUserBlocked || isMissing}
        onDetailToggle={onDetailToggle}
      />

      {isMissing ? (
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <EmptyState
            title="Conversation unavailable"
            description="It was deleted, so messages can no longer be sent here."
            action={
              <Button variant="secondary" loading={removing} onClick={handleRemoveStaleChat}>
                Remove from list
              </Button>
            }
          />
        </div>
      ) : (
        <MessageList
          messages={chat.messages}
          currentUser={currentUser}
          otherUser={user}
          onDeleteMessage={handleDeleteMessage}
        />
      )}

      <MessageComposer
        onSend={handleSend}
        disabled={blocked || isMissing}
        disabledReason={disabledReason}
      />
    </div>
  )
}

export default ChatPanel

import React from 'react'
import { MdBlock, MdNotificationsOff } from "react-icons/md"
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { deleteChat, toggleBlockUser } from '../../lib/services/chatService'
import { toast } from 'react-toastify'

const ChatSettings = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } = useChatStore()
  const { currentUser } = useUserStore()

  const handleBlock = async () => {
    if (!user) return
    try {
      await toggleBlockUser(currentUser.id, user.id, isCurrentUserBlocked || isReceiverBlocked)
      changeBlock()
    } catch (err) {
      console.error("Failed to toggle block:", err)
    }
  }

  const handleDelete = async () => {
    try {
      resetChat()
      await deleteChat(chatId)
      toast.success("Conversation Deleted")
    } catch (err) {
      console.error("Failed to delete chat:", err)
      toast.error("Failed to delete conversation")
    }
  }

  return (
    <div className="collapse collapse-arrow rounded-none border-b-2 border-base-300">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-base font-medium">Chat Settings</div>
      <div className="collapse-content flex flex-col items-start gap-2">
        <button className='btn w-full btn-sm btn-info' onClick={handleDelete}>Delete Conversation</button>
        <button className='btn w-full btn-sm btn-error flex items-center' onClick={handleBlock}>
          <MdBlock />
          {isCurrentUserBlocked ? `You are blocked` : isReceiverBlocked ? `Unblock user` : "Block User"}
        </button>
      </div>
    </div>
  )
}

export default ChatSettings

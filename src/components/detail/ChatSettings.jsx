import { MdBlock } from 'react-icons/md'
import { IoTrashOutline } from 'react-icons/io5'
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
      console.error('Failed to toggle block:', err)
    }
  }

  const handleDelete = async () => {
    try {
      resetChat()
      await deleteChat(chatId)
      toast.success('Conversation deleted')
    } catch (err) {
      console.error('Failed to delete chat:', err)
      toast.error('Failed to delete conversation')
    }
  }

  return (
    <div className="p-4 border-b-3 border-pixel-cream/10">
      <h3 className="font-pixel text-[8px] text-pixel-muted mb-3 tracking-wider">SETTINGS</h3>
      <div className="flex flex-col gap-2">
        <button onClick={handleDelete} className="pixel-btn !text-[10px] !justify-start flex items-center gap-2 w-full">
          <IoTrashOutline size={14} className="text-pixel-blue" /> DELETE CHAT
        </button>
        <button onClick={handleBlock} className="pixel-btn !text-[10px] !justify-start flex items-center gap-2 w-full">
          <MdBlock size={14} className="text-pixel-red" />
          {isCurrentUserBlocked ? 'YOU ARE BLOCKED' : isReceiverBlocked ? 'UNBLOCK USER' : 'BLOCK USER'}
        </button>
      </div>
    </div>
  )
}

export default ChatSettings

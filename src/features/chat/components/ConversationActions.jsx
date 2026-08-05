import { useState } from 'react'
import { MdBlock } from 'react-icons/md'
import { IoTrashOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { useChatStore } from '@/stores/chatStore'
import { useUserStore } from '@/stores/userStore'
import { deleteChat, toggleBlockUser } from '@/services/chatService'

const ConversationActions = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, toggleReceiverBlocked, resetChat } =
    useChatStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [busy, setBusy] = useState(false)

  const handleBlock = async () => {
    if (!user) return
    setBusy(true)
    try {
      // Only our own block state may be toggled. This previously passed
      // `isCurrentUserBlocked || isReceiverBlocked`, so being blocked *by*
      // someone made the button unblock a user we had never blocked.
      await toggleBlockUser(currentUser.id, user.id, isReceiverBlocked)
      toggleReceiverBlocked()
      toast.success(isReceiverBlocked ? 'User unblocked' : 'User blocked')
    } catch (err) {
      console.error('Failed to toggle block:', err)
      toast.error('Could not update block status')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    setBusy(true)
    try {
      resetChat()
      await deleteChat(chatId)
      toast.success('Conversation deleted')
    } catch (err) {
      console.error('Failed to delete conversation:', err)
      toast.error('Failed to delete')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="border-b border-muted/15 px-2 py-4">
      <h3 className="mb-2 px-2 font-body text-sm uppercase tracking-widest text-muted">Actions</h3>

      <button type="button" className="menu-item rounded-lg" onClick={handleDelete} disabled={busy}>
        <IoTrashOutline size={18} className="text-muted" />
        Delete conversation
      </button>

      <button
        type="button"
        className="menu-item--danger rounded-lg"
        onClick={handleBlock}
        disabled={busy || isCurrentUserBlocked}
      >
        <MdBlock size={18} />
        {isCurrentUserBlocked ? 'You are blocked' : isReceiverBlocked ? 'Unblock user' : 'Block user'}
      </button>
    </div>
  )
}

export default ConversationActions

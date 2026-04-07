import { MdBlock } from 'react-icons/md'
import { IoTrashOutline } from 'react-icons/io5'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { useThemeStore } from '../../lib/themeStore'
import { deleteChat, toggleBlockUser } from '../../lib/services/chatService'
import { toast } from 'react-toastify'

const ChatSettings = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } = useChatStore()
  const { currentUser } = useUserStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()

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
      console.error('Failed to delete:', err)
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="px-4 py-5" style={{ borderBottom: `1px solid ${theme.muted}15` }}>
      <h3 className="font-body text-sm uppercase tracking-widest mb-3" style={{ color: theme.muted }}>Actions</h3>
      <div className="flex flex-col gap-1.5">
        <button onClick={handleDelete}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-body text-lg transition-colors text-left"
                style={{ color: theme.text }}
                onMouseEnter={(e) => e.currentTarget.style.background = `${theme.muted}15`}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
          <IoTrashOutline size={18} style={{ color: theme.muted }} /> Delete conversation
        </button>
        <button onClick={handleBlock}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-body text-lg transition-colors text-left"
                style={{ color: theme.text }}
                onMouseEnter={(e) => e.currentTarget.style.background = `${theme.muted}15`}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
          <MdBlock size={18} style={{ color: '#e94560' }} />
          {isCurrentUserBlocked ? 'You are blocked' : isReceiverBlocked ? 'Unblock user' : 'Block user'}
        </button>
      </div>
    </div>
  )
}

export default ChatSettings

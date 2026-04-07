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
    <div className="p-4" style={{ borderBottom: `2px solid ${theme.muted}20` }}>
      <h3 className="font-pixel text-[8px] mb-3 tracking-wider" style={{ color: theme.muted }}>SETTINGS</h3>
      <div className="flex flex-col gap-2">
        <button onClick={handleDelete}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg font-pixel text-[9px] transition-colors"
                style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}15` }}
                onMouseEnter={(e) => e.target.style.borderColor = '#e9456040'}
                onMouseLeave={(e) => e.target.style.borderColor = `${theme.muted}15`}>
          <IoTrashOutline size={14} style={{ color: '#e94560' }} /> DELETE CHAT
        </button>
        <button onClick={handleBlock}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg font-pixel text-[9px] transition-colors"
                style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}15` }}
                onMouseEnter={(e) => e.target.style.borderColor = '#e9456040'}
                onMouseLeave={(e) => e.target.style.borderColor = `${theme.muted}15`}>
          <MdBlock size={14} style={{ color: '#e94560' }} />
          {isCurrentUserBlocked ? 'YOU ARE BLOCKED' : isReceiverBlocked ? 'UNBLOCK' : 'BLOCK USER'}
        </button>
      </div>
    </div>
  )
}

export default ChatSettings

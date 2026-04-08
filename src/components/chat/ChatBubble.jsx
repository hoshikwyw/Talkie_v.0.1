import { useState } from 'react'
import { IoTrashOutline, IoCopyOutline } from 'react-icons/io5'
import Avatar from '../sidebar/Avatar'
import { useThemeStore } from '../../lib/themeStore'
import { deleteMessage } from '../../lib/services/chatService'
import { useChatStore } from '../../lib/chatStore'
import { toast } from 'react-toastify'

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

const ChatBubble = ({ message, user, currentUser }) => {
  const isOwn = message.senderId === currentUser.id
  const { getTheme, getBubble } = useThemeStore()
  const { chatId } = useChatStore()
  const theme = getTheme()
  const bubble = getBubble()
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteMessage(chatId, message)
      toast.success('Message deleted')
    } catch (err) {
      console.error('Failed to delete message:', err)
      toast.error('Failed to delete')
    } finally {
      setDeleting(false)
      setMenuOpen(false)
    }
  }

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text)
      toast.success('Copied to clipboard')
    }
    setMenuOpen(false)
  }

  return (
    <>
      {/* Context menu backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
             onClick={() => setMenuOpen(false)} />
      )}

      <div className={`flex gap-2.5 mb-4 ${isOwn ? 'flex-row-reverse' : ''} group`}>
        {/* Avatar */}
        <div className="flex-shrink-0 self-end mb-4">
          <Avatar
            avatar={isOwn ? currentUser?.profile : user?.profile}
            name={isOwn ? currentUser?.username : user?.username}
            size={30}
            online
          />
        </div>

        {/* Bubble content */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[75%] min-w-[80px] relative`}>
          {/* Bubble */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className={`
              px-4 py-3 cursor-pointer select-none
              bg-gradient-to-br ${isOwn ? theme.bubbleOwn : theme.bubbleOther}
              border ${isOwn ? theme.bubbleOwnBorder : theme.bubbleOtherBorder}
              ${isOwn ? bubble.own : bubble.other}
              backdrop-blur-sm transition-transform
              ${menuOpen ? 'scale-[1.02]' : ''}
            `}
          >
            {message.img && (
              <img src={message.img} alt="" className="max-w-[240px] rounded-lg mb-2 border border-white/10" />
            )}
            {message.text && (
              <p className="font-body text-[20px] leading-relaxed break-words" style={{ color: theme.text }}>
                {message.text}
              </p>
            )}
          </div>

          {/* Context menu */}
          {menuOpen && (
            <div className={`absolute z-50 ${isOwn ? 'right-0' : 'left-0'} bottom-full mb-2 rounded-2xl overflow-hidden shadow-2xl min-w-[180px]`}
                 style={{ background: theme.surfaceLight, border: `1px solid ${theme.muted}20` }}>

              {/* Copy */}
              {message.text && (
                <button onClick={handleCopy}
                        className="flex items-center gap-3 w-full px-4 py-3 font-body text-lg transition-colors"
                        style={{ color: theme.text }}
                        onMouseEnter={(e) => e.currentTarget.style.background = `${theme.muted}15`}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <IoCopyOutline size={18} style={{ color: theme.muted }} />
                  Copy
                </button>
              )}

              {/* Delete — only own messages */}
              {isOwn && (
                <>
                  <div style={{ borderTop: `1px solid ${theme.muted}15` }} />
                  <button onClick={handleDelete} disabled={deleting}
                          className="flex items-center gap-3 w-full px-4 py-3 font-body text-lg transition-colors"
                          style={{ color: '#e94560' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(233,69,96,0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <IoTrashOutline size={18} />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Time */}
          <span className="font-body text-[12px] mt-1 px-1" style={{ color: `${theme.muted}90` }}>
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
    </>
  )
}

export default ChatBubble

import { useState } from 'react'
import { IoCopyOutline, IoTrashOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { Avatar } from '@/shared/ui'
import { deleteMessage } from '@/services/chatService'
import { useChatStore } from '@/stores/chatStore'

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: 'numeric' }).format(date)
}

const MessageBubble = ({ message, user, currentUser }) => {
  const isOwn = message.senderId === currentUser.id
  const { chatId } = useChatStore()
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
      {menuOpen && <div className="backdrop bg-black/30" onClick={() => setMenuOpen(false)} />}

      <div className={`group mb-4 flex gap-2.5 ${isOwn ? 'flex-row-reverse' : ''}`}>
        <div className="mb-4 flex-shrink-0 self-end">
          <Avatar
            avatar={isOwn ? currentUser?.profile : user?.profile}
            name={isOwn ? currentUser?.username : user?.username}
            size={30}
            online
          />
        </div>

        <div
          className={`relative flex min-w-[80px] max-w-[75%] flex-col ${
            isOwn ? 'items-end' : 'items-start'
          }`}
        >
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`bubble select-none text-left ${isOwn ? 'bubble--own' : 'bubble--other'} ${
              menuOpen ? 'scale-[1.02]' : ''
            }`}
          >
            {message.img && (
              <img
                src={message.img}
                alt=""
                className="mb-2 max-w-[240px] rounded-lg border border-white/10"
              />
            )}
            {message.text && (
              <p className="break-words font-body text-[20px] leading-relaxed text-content">
                {message.text}
              </p>
            )}
          </button>

          {menuOpen && (
            <div
              className={`panel-raised absolute bottom-full z-50 mb-2 min-w-[180px] animate-slide-up overflow-hidden ${
                isOwn ? 'right-0' : 'left-0'
              }`}
            >
              {message.text && (
                <button type="button" className="menu-item" onClick={handleCopy}>
                  <IoCopyOutline size={18} className="text-muted" />
                  Copy
                </button>
              )}

              {isOwn && (
                <>
                  {message.text && <div className="divider-h" />}
                  <button
                    type="button"
                    className="menu-item--danger"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    <IoTrashOutline size={18} />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </>
              )}
            </div>
          )}

          <span className="mt-1 px-1 font-body text-[12px] text-muted/90">
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
    </>
  )
}

export default MessageBubble

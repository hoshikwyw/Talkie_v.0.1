import { memo, useRef, useState } from 'react'
import { IoCopyOutline, IoTrashOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { Avatar } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'
import { formatFullTimestamp, formatMessageTime, toIsoString } from '@/shared/lib/datetime'
import { useEscapeKey } from '@/shared/hooks/useEscapeKey'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  } catch {
    // Clipboard access needs a secure context; it is not available everywhere.
    toast.error('Could not copy')
  }
}

/**
 * One message. Purely presentational — grouping (`endsRun`) and deletion are
 * the list's job, which keeps this memoisable.
 */
const MessageBubble = ({ message, isOwn, senderName, senderAvatar, endsRun, onDelete }) => {
  const containerRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEscapeKey(() => setMenuOpen(false), menuOpen)
  useOnClickOutside(containerRef, () => setMenuOpen(false), menuOpen)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(message)
      toast.success('Message deleted')
    } catch (err) {
      console.error('Failed to delete message:', err)
      toast.error('Failed to delete')
    } finally {
      setDeleting(false)
      setMenuOpen(false)
    }
  }

  return (
    <div
      className={cn(
        'flex gap-2.5',
        isOwn && 'flex-row-reverse',
        // Tight inside a run, roomy between turns.
        endsRun ? 'mb-4' : 'mb-0.5'
      )}
    >
      {/*
        One avatar per turn; a spacer keeps the rest of the run aligned. The
        bottom margin lifts it clear of the timestamp so it sits level with the
        bubble rather than the text below it.
      */}
      <div className="mb-5 w-[30px] flex-shrink-0 self-end">
        {endsRun && <Avatar avatar={senderAvatar} name={senderName} size={30} online />}
      </div>

      <div
        ref={containerRef}
        className={cn('relative flex min-w-[80px] max-w-[75%] flex-col', isOwn ? 'items-end' : 'items-start')}
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            'bubble select-none text-left',
            isOwn ? 'bubble--own' : 'bubble--other',
            menuOpen && 'scale-[1.02]'
          )}
        >
          {message.img && (
            <img
              src={message.img}
              alt=""
              className="mb-2 max-w-[240px] rounded-lg border border-white/10"
            />
          )}
          {/* A <p> here would be invalid: <button> only accepts phrasing content. */}
          {message.text && (
            <span className="block whitespace-pre-wrap break-words font-body text-[20px] leading-relaxed text-content">
              {message.text}
            </span>
          )}
        </button>

        {menuOpen && (
          <div
            role="menu"
            className={cn(
              'panel-raised absolute bottom-full z-50 mb-2 min-w-[180px] animate-slide-up overflow-hidden',
              isOwn ? 'right-0' : 'left-0'
            )}
          >
            {message.text && (
              <button
                type="button"
                role="menuitem"
                className="menu-item"
                onClick={() => {
                  copyText(message.text)
                  setMenuOpen(false)
                }}
              >
                <IoCopyOutline size={18} className="text-muted" />
                Copy
              </button>
            )}

            {isOwn && (
              <>
                {message.text && <div className="divider-h" />}
                <button
                  type="button"
                  role="menuitem"
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

        {/* Grouping hides most timestamps, so the exact one lives in the tooltip. */}
        {endsRun && (
          <time
            dateTime={toIsoString(message.createdAt)}
            title={formatFullTimestamp(message.createdAt)}
            className="mt-1 px-1 font-body text-[12px] text-muted/90"
          >
            {formatMessageTime(message.createdAt)}
          </time>
        )}
      </div>
    </div>
  )
}

/**
 * A bare `memo()` here did nothing: `snapshot.data()` deserialises new objects
 * on every Firestore update, so the default shallow compare saw a different
 * `message` prop each time and re-rendered the whole history per message.
 *
 * Messages are immutable once written — deleting removes the element rather
 * than mutating it — so comparing identity and content is sufficient.
 */
const MemoizedMessageBubble = memo(
  MessageBubble,
  (previous, next) =>
    previous.message.messageId === next.message.messageId &&
    previous.message.text === next.message.text &&
    previous.message.img === next.message.img &&
    previous.isOwn === next.isOwn &&
    previous.endsRun === next.endsRun &&
    previous.senderName === next.senderName &&
    previous.senderAvatar === next.senderAvatar &&
    previous.onDelete === next.onDelete
)

export default MemoizedMessageBubble

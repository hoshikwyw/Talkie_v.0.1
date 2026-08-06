import { useRef, useState } from 'react'
import { IoHappyOutline, IoSend } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { IconButton, Spinner } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'
import { useAutoResizeTextarea } from '@/shared/hooks/useAutoResizeTextarea'
import { useEscapeKey } from '@/shared/hooks/useEscapeKey'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import EmojiPickerPopover from './EmojiPickerPopover'

const MessageComposer = ({ onSend, disabled = false, disabledReason }) => {
  const containerRef = useRef(null)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [emojiOpen, setEmojiOpen] = useState(false)

  const textareaRef = useAutoResizeTextarea(text)
  const hasText = text.trim().length > 0

  useEscapeKey(() => setEmojiOpen(false), emojiOpen)
  useOnClickOutside(containerRef, () => setEmojiOpen(false), emojiOpen)

  const handleSend = async () => {
    if (!hasText || sending) return

    const pending = text
    setText('')
    setSending(true)
    try {
      await onSend(pending)
    } catch (err) {
      console.error('Failed to send message:', err)
      // The draft reappearing with no explanation read as the app losing it.
      toast.error(err.userMessage ?? 'Message not sent — please try again')
      setText(pending)
    } finally {
      setSending(false)
      textareaRef.current?.focus()
    }
  }

  if (disabled) {
    return (
      <div className="border-t border-muted/15 bg-surface px-4 py-4 text-center">
        <span className="font-body text-base text-muted">{disabledReason}</span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative border-t border-muted/15 bg-surface px-3 py-2 sm:px-4 sm:py-2.5"
    >
      {emojiOpen && (
        <EmojiPickerPopover
          onSelect={(emoji) => {
            setText((previous) => previous + emoji.emoji)
            setEmojiOpen(false)
            textareaRef.current?.focus()
          }}
        />
      )}

      <div className="flex items-end gap-2">
        <div className="flex min-w-0 flex-1 items-end overflow-hidden rounded-3xl border border-muted/15 bg-surface-light transition-colors focus-within:border-primary/40">
          <IconButton
            label={emojiOpen ? 'Close emoji picker' : 'Open emoji picker'}
            active={emojiOpen}
            onClick={() => setEmojiOpen((open) => !open)}
            className="flex-shrink-0 self-end p-3"
          >
            <IoHappyOutline size={22} />
          </IconButton>

          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            aria-label="Message"
            placeholder="Message..."
            className="min-w-0 flex-1 resize-none bg-transparent py-2.5 font-body text-lg text-content outline-none placeholder:text-muted/60"
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                handleSend()
              }
            }}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!hasText || sending}
            aria-label="Send message"
            className={cn(
              'm-1.5 flex-shrink-0 rounded-full p-2 transition-all active:scale-90',
              hasText ? 'bg-primary text-canvas' : 'bg-transparent text-muted',
              'disabled:cursor-not-allowed'
            )}
          >
            {sending ? <Spinner size={18} /> : <IoSend size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageComposer

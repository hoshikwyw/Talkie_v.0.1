import { useMemo } from 'react'
import { IoArrowDown } from 'react-icons/io5'
import { EmptyState } from '@/shared/ui'
import { useStickyScroll } from '@/shared/hooks/useStickyScroll'
import { groupMessages } from '../lib/groupMessages'
import MessageBubble from './MessageBubble'

const DaySeparator = ({ label }) => (
  <div className="my-4 flex items-center gap-3" role="separator" aria-label={label}>
    <span className="h-px flex-1 bg-muted/15" />
    <span className="font-pixel text-label uppercase tracking-wider text-muted/70">{label}</span>
    <span className="h-px flex-1 bg-muted/15" />
  </div>
)

const MessageList = ({ messages, currentUser, otherUser, onDeleteMessage }) => {
  const days = useMemo(() => groupMessages(messages), [messages])
  const { containerRef, isPinned, scrollToBottom, handleScroll } = useStickyScroll(messages?.length)

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="scrollbar-slim h-full overflow-y-auto px-3 py-4 sm:px-6 sm:py-6"
      >
        {days.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <EmptyState title="No messages yet" description="Say hello!" />
          </div>
        ) : (
          days.map((day) => (
            <section key={day.key}>
              {day.label && <DaySeparator label={day.label} />}

              {day.items.map(({ message, endsRun }, index) => {
                const isOwn = message.senderId === currentUser?.id
                const sender = isOwn ? currentUser : otherUser

                return (
                  <MessageBubble
                    key={message.messageId ?? `${message.senderId}-${day.key}-${index}`}
                    message={message}
                    isOwn={isOwn}
                    senderName={sender?.username}
                    senderAvatar={sender?.profile}
                    endsRun={endsRun}
                    onDelete={onDeleteMessage}
                  />
                )
              })}
            </section>
          ))
        )}
      </div>

      {/* Only offered when the reader has scrolled away from the latest. */}
      {!isPinned && days.length > 0 && (
        <button
          type="button"
          onClick={() => scrollToBottom()}
          aria-label="Jump to latest messages"
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-muted/20 bg-surface-light px-4 py-2 font-body text-base text-content shadow-panel transition-transform hover:scale-105"
        >
          <IoArrowDown size={16} />
          Latest
        </button>
      )}
    </div>
  )
}

export default MessageList

import { Avatar } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'

/** One row in the conversation list. */
const ChatListItem = ({ chat, active, onSelect }) => {
  const unread = !chat?.isSeen
  const name = chat?.user?.username ?? 'Unknown'

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      className={cn('list-row flex items-center gap-3', unread && 'list-row--unread', active && 'bg-muted/10')}
    >
      <Avatar avatar={chat?.user?.profile} name={name} size={40} online />

      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            'truncate font-body text-lg',
            unread ? 'text-content' : 'text-content/90'
          )}
        >
          {name}
        </span>
        <span className="truncate font-body text-sm text-muted">
          {chat?.lastMessage || 'No messages yet'}
        </span>
      </span>

      {unread && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" aria-label="Unread" />}
    </button>
  )
}

export default ChatListItem

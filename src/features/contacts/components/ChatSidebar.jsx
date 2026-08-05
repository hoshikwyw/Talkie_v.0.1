import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { IoAdd, IoClose } from 'react-icons/io5'
import { Button, EmptyState, IconButton } from '@/shared/ui'
import { useChatList } from '../hooks/useChatList'
import AddFriendDialog from './AddFriendDialog'
import ChatListItem from './ChatListItem'

const SkeletonRow = () => (
  <div className="flex items-center gap-3 border-b border-muted/10 px-4 py-3">
    <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-full bg-muted/20" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-1/2 animate-pulse rounded bg-muted/20" />
      <div className="h-2.5 w-3/4 animate-pulse rounded bg-muted/10" />
    </div>
  </div>
)

/**
 * The conversation list. Previously two near-identical components — `SideList`
 * for the desktop column and `ChatList` for the mobile drawer — which drifted
 * apart in markup and behaviour. `onClose` is what makes it a drawer.
 */
const ChatSidebar = ({ onClose }) => {
  const { chats, totalChats, isLoading, searchTerm, setSearchTerm, selectChat, activeChatId, currentUser } =
    useChatList()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSelect = async (chat) => {
    await selectChat(chat)
    onClose?.()
  }

  return (
    <div className="flex h-full flex-col bg-surface">
      <header className="border-b border-muted/20 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="font-pixel text-pixel-sm tracking-wider text-primary">Messages</h2>

          <div className="flex items-center gap-1">
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <IoAdd size={14} /> Add
            </Button>
            {onClose && (
              <IconButton label="Close menu" onClick={onClose}>
                <IoClose size={22} />
              </IconButton>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-muted/15 bg-surface-light px-3 transition-colors focus-within:border-primary/50">
          <IoMdSearch size={18} className="flex-shrink-0 text-muted" />
          <input
            type="search"
            aria-label="Search conversations"
            placeholder="Search chats..."
            className="w-full bg-transparent py-2.5 font-body text-base text-content outline-none placeholder:text-muted/60"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </header>

      <div className="scrollbar-slim flex-1 overflow-y-auto">
        {isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : chats.length > 0 ? (
          chats.map((chat) => (
            <ChatListItem
              key={chat.chatId}
              chat={chat}
              active={chat.chatId === activeChatId}
              onSelect={() => handleSelect(chat)}
            />
          ))
        ) : totalChats > 0 ? (
          <EmptyState title="No matches" description={`Nothing found for “${searchTerm}”`} />
        ) : (
          <EmptyState
            title="No chats yet"
            description="Add a friend to start talking!"
            action={
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                <IoAdd size={14} /> Add friend
              </Button>
            }
          />
        )}
      </div>

      <AddFriendDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        currentUser={currentUser}
      />
    </div>
  )
}

export default ChatSidebar

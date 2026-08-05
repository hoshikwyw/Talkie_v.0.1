import { IoArrowBack } from 'react-icons/io5'
import { IoIosMore } from 'react-icons/io'
import { Avatar, IconButton } from '@/shared/ui'
import { useChatStore } from '@/stores/chatStore'

const ChatHeader = ({ name, avatar, blocked = false, onDetailToggle }) => {
  const resetChat = useChatStore((state) => state.resetChat)
  const displayName = name || 'Unavailable'

  return (
    <header className="flex items-center justify-between border-b border-muted/15 bg-surface px-3 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Back to the list — the only way out on a phone. */}
        <IconButton label="Back to conversations" onClick={resetChat} className="lg:hidden">
          <IoArrowBack size={20} />
        </IconButton>

        <Avatar avatar={avatar} name={displayName} size={36} online={!blocked} />

        <div className="min-w-0">
          <p className="truncate font-body text-lg font-semibold text-content sm:text-xl">
            {displayName}
          </p>
          <span className={`font-body text-xs ${blocked ? 'text-muted' : 'text-online'}`}>
            {blocked ? 'unavailable' : 'online'}
          </span>
        </div>
      </div>

      <IconButton label="Conversation details" onClick={onDetailToggle} className="xl:hidden">
        <IoIosMore size={22} />
      </IconButton>
    </header>
  )
}

export default ChatHeader

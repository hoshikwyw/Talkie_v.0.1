import { IoClose } from 'react-icons/io5'
import { useChatStore } from '@/stores/chatStore'
import { IconButton } from '@/shared/ui'
import ConversationUserCard from './ConversationUserCard'
import ConversationActions from './ConversationActions'

const ConversationDetail = ({ onClose }) => {
  const user = useChatStore((state) => state.user)

  return (
    <div className="scrollbar-slim flex h-full flex-col overflow-y-auto bg-surface">
      {onClose && (
        <div className="flex justify-end p-2">
          <IconButton label="Close details" onClick={onClose}>
            <IoClose size={22} />
          </IconButton>
        </div>
      )}

      <ConversationUserCard name={user?.username} avatar={user?.profile} />
      <ConversationActions />
    </div>
  )
}

export default ConversationDetail

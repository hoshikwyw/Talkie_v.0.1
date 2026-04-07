import { useChatStore } from '../../lib/chatStore'
import UserCard from './UserCard'
import ChatSettings from './ChatSettings'
import SharedImgs from './SharedImgs'

const Detail = () => {
  const { chatId, user } = useChatStore()

  return (
    <div className="flex flex-col h-full overflow-y-auto pixel-scrollbar bg-surface-dark">
      <UserCard name={user?.username} avatar={user?.profile} />
      <ChatSettings />
      <SharedImgs chatId={chatId} />
    </div>
  )
}

export default Detail

import { useChatStore } from '../../lib/chatStore'
import { useThemeStore } from '../../lib/themeStore'
import UserCard from './UserCard'
import ChatSettings from './ChatSettings'

const Detail = () => {
  const { user } = useChatStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div className="flex flex-col h-full overflow-y-auto pixel-scrollbar" style={{ background: theme.surface }}>
      <UserCard name={user?.username} avatar={user?.profile} />
      <ChatSettings />
    </div>
  )
}

export default Detail

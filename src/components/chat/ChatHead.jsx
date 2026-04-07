import { IoArrowBack } from 'react-icons/io5'
import { IoIosMore } from 'react-icons/io'
import Avatar from '../sidebar/Avatar'
import { useThemeStore } from '../../lib/themeStore'
import { useChatStore } from '../../lib/chatStore'

const ChatHead = ({ name, avatar, onDetailToggle }) => {
  const { getTheme } = useThemeStore()
  const { resetChat } = useChatStore()
  const theme = getTheme()

  return (
    <div className="flex items-center justify-between px-3 sm:px-5 py-3"
         style={{ background: theme.surface, borderBottom: `1px solid ${theme.muted}15` }}>
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Back button — mobile only */}
        <button onClick={resetChat} className="p-1.5 rounded-lg sm:hidden"
                style={{ color: theme.muted }}>
          <IoArrowBack size={20} />
        </button>
        <Avatar avatar={avatar} name={name} size={36} online />
        <div>
          <p className="font-body text-lg sm:text-xl font-semibold" style={{ color: theme.text }}>{name}</p>
          <span className="font-body text-xs" style={{ color: '#6bcb77' }}>online</span>
        </div>
      </div>
      {/* Detail toggle — visible below xl */}
      <button onClick={onDetailToggle} className="p-2 rounded-lg transition-colors xl:hidden"
              style={{ color: theme.muted }}>
        <IoIosMore size={22} />
      </button>
    </div>
  )
}

export default ChatHead

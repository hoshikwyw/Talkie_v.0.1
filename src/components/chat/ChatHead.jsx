import { IoIosMore } from 'react-icons/io'
import Avatar from '../sidebar/Avatar'
import { useThemeStore } from '../../lib/themeStore'

const ChatHead = ({ name, avatar, onDetailToggle }) => {
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div className="flex items-center justify-between px-5 py-3"
         style={{ background: theme.surface, borderBottom: `1px solid ${theme.muted}15` }}>
      <div className="flex items-center gap-3">
        <Avatar avatar={avatar} name={name} size={38} online />
        <div>
          <p className="font-body text-xl font-semibold" style={{ color: theme.text }}>{name}</p>
          <span className="font-body text-xs" style={{ color: '#6bcb77' }}>online</span>
        </div>
      </div>
      <button onClick={onDetailToggle} className="p-2 rounded-lg transition-colors md:hidden"
              style={{ color: theme.muted }}>
        <IoIosMore size={22} />
      </button>
    </div>
  )
}

export default ChatHead

import { IoIosMore } from 'react-icons/io'
import Avatar from '../sidebar/Avatar'
import { useThemeStore } from '../../lib/themeStore'

const ChatHead = ({ name, avatar, onDetailToggle }) => {
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div className="flex items-center justify-between px-4 py-3 md:px-8"
         style={{ background: theme.surface, borderBottom: `2px solid ${theme.muted}20` }}>
      <div className="flex items-center gap-3">
        <Avatar avatar={avatar} name={name} size={40} online={true} />
        <div>
          <p className="font-body text-xl" style={{ color: theme.text }}>{name}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-body text-sm text-emerald-400">online</span>
          </div>
        </div>
      </div>
      <button onClick={onDetailToggle} className="p-2 rounded-xl transition-colors md:hidden"
              style={{ color: theme.muted }}>
        <IoIosMore size={22} />
      </button>
    </div>
  )
}

export default ChatHead

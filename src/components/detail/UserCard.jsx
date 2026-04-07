import Avatar from '../sidebar/Avatar'
import { useThemeStore } from '../../lib/themeStore'

const UserCard = ({ name, avatar }) => {
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div className="flex flex-col items-center py-8 px-4" style={{ borderBottom: `2px solid ${theme.muted}20` }}>
      <Avatar avatar={avatar} name={name} size={80} online={true} />
      <h2 className="font-pixel text-[10px] mt-4" style={{ color: theme.text }}>{name}</h2>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="font-body text-sm text-emerald-400">online</span>
      </div>
    </div>
  )
}

export default UserCard

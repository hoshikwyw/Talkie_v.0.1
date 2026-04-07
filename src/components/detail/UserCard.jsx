import Avatar from '../sidebar/Avatar'
import { useThemeStore } from '../../lib/themeStore'

const UserCard = ({ name, avatar }) => {
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div className="flex flex-col items-center py-8 px-4" style={{ borderBottom: `1px solid ${theme.muted}15` }}>
      <Avatar avatar={avatar} name={name} size={90} online />
      <h2 className="font-body text-2xl mt-4 font-semibold" style={{ color: theme.text }}>{name}</h2>
      <span className="font-body text-sm mt-1" style={{ color: '#6bcb77' }}>online</span>
    </div>
  )
}

export default UserCard

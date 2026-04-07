import Avatar from './Avatar'
import { useThemeStore } from '../../lib/themeStore'

const UserInfo = ({ name, avatar, lastMessage, online }) => {
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div className='flex items-center gap-3 w-full py-1'>
      <Avatar avatar={avatar} name={name} size={40} online={online} />
      <div className='flex flex-col min-w-0 flex-1'>
        <span className='font-body text-lg truncate' style={{ color: theme.text }}>{name}</span>
        <span className='font-body text-sm truncate' style={{ color: theme.muted }}>{lastMessage}</span>
      </div>
    </div>
  )
}

export default UserInfo

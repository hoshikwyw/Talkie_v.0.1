import { IoIosMenu } from 'react-icons/io'
import { IoLogOutOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'
import { auth } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore'
import { useThemeStore } from '../../lib/themeStore'
import { useNavigate } from 'react-router-dom'
import Avatar from '../sidebar/Avatar'

const Navbar = ({ onMenuClick }) => {
  const { currentUser } = useUserStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()
  const navigate = useNavigate()

  return (
    <nav className="flex items-center justify-between px-5 py-3"
         style={{ background: theme.surface, borderBottom: `2px solid ${theme.muted}20` }}>
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-1 lg:hidden" style={{ color: theme.text }}>
          <IoIosMenu size={24} />
        </button>
        <h1 className="font-pixel text-sm animate-float" style={{ color: theme.primary }}>
          TALKIE
        </h1>
      </div>

      {/* Right */}
      <div className="relative group">
        <button className="flex items-center gap-2 px-2 py-1 rounded-xl transition-colors"
                style={{ color: theme.text }}>
          <Avatar avatar={currentUser?.profile} name={currentUser?.username} size={30} />
          <span className="font-body text-lg hidden sm:inline">{currentUser?.username}</span>
        </button>

        {/* Dropdown */}
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl p-1.5 hidden group-hover:block z-50 shadow-xl"
             style={{ background: theme.surfaceLight, border: `2px solid ${theme.muted}20` }}>
          <button onClick={() => navigate('/profile')}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg font-body text-lg transition-colors"
                  style={{ color: theme.text }}
                  onMouseEnter={(e) => e.target.style.background = `${theme.muted}20`}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
            <IoPersonOutline size={16} /> Profile
          </button>
          <button onClick={() => navigate('/settings')}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg font-body text-lg transition-colors"
                  style={{ color: theme.text }}
                  onMouseEnter={(e) => e.target.style.background = `${theme.muted}20`}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
            <IoSettingsOutline size={16} /> Settings
          </button>
          <div className="my-1" style={{ borderTop: `1px dashed ${theme.muted}30` }} />
          <button onClick={() => auth.signOut()}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg font-body text-lg transition-colors"
                  style={{ color: '#e94560' }}
                  onMouseEnter={(e) => e.target.style.background = `${theme.muted}20`}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
            <IoLogOutOutline size={16} /> Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

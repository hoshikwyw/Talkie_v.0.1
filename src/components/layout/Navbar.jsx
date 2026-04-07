import { IoIosMenu } from 'react-icons/io'
import { IoLogOutOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'
import { auth } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore'
import { useNavigate } from 'react-router-dom'
import Avatar from '../sidebar/Avatar'

const Navbar = ({ onMenuClick }) => {
  const { currentUser } = useUserStore()
  const navigate = useNavigate()

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-surface border-b-3 border-pixel-cream/10">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="pixel-btn-ghost !p-1 lg:hidden">
          <IoIosMenu size={24} />
        </button>
        <h1 className="font-pixel text-sm text-pixel-orange text-shadow-pixel animate-float">
          TALKIE
        </h1>
      </div>

      {/* Right */}
      <div className="relative group">
        <button className="flex items-center gap-2 pixel-btn-ghost">
          <Avatar avatar={currentUser?.profile} name={currentUser?.username} size={28} />
          <span className="font-body text-lg hidden sm:inline">{currentUser?.username}</span>
        </button>

        {/* Dropdown */}
        <div className="absolute right-0 top-full mt-1 w-44 pixel-card p-1 hidden group-hover:block z-50">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 w-full px-3 py-2 font-body text-base text-pixel-cream hover:bg-surface-light transition-colors"
          >
            <IoPersonOutline size={16} /> Profile
          </button>
          <div className="pixel-divider !my-1" />
          <button
            onClick={() => auth.signOut()}
            className="flex items-center gap-2 w-full px-3 py-2 font-body text-base text-pixel-red hover:bg-surface-light transition-colors"
          >
            <IoLogOutOutline size={16} /> Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

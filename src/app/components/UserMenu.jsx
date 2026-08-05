import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoLogOutOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { signOutCurrentUser } from '@/services/authService'
import { Avatar } from '@/shared/ui'
import { useEscapeKey } from '@/shared/hooks/useEscapeKey'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

/**
 * Account menu.
 *
 * This was `hidden group-hover:block` on a button with no click handler, so on
 * any touch device Profile, Settings and Logout could not be reached at all —
 * and keyboard users could not reach them anywhere. It opens on click now, and
 * closes on Escape or an outside press.
 */
const UserMenu = ({ user }) => {
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEscapeKey(() => setOpen(false), open)
  useOnClickOutside(containerRef, () => setOpen(false), open)

  const goTo = (path) => {
    setOpen(false)
    navigate(path)
  }

  const handleSignOut = async () => {
    setOpen(false)
    try {
      await signOutCurrentUser()
    } catch (err) {
      console.error('Sign out failed:', err)
      toast.error('Could not sign out')
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl px-2 py-1 text-content transition-colors hover:bg-muted/10"
      >
        <Avatar avatar={user?.profile} name={user?.username} size={30} />
        <span className="hidden max-w-[160px] truncate font-body text-lg sm:inline">
          {user?.username}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="panel-raised absolute right-0 top-full z-50 mt-2 w-48 animate-slide-up overflow-hidden p-1.5"
        >
          <button type="button" role="menuitem" className="menu-item rounded-lg" onClick={() => goTo('/profile')}>
            <IoPersonOutline size={16} className="text-muted" />
            Profile
          </button>

          <button type="button" role="menuitem" className="menu-item rounded-lg" onClick={() => goTo('/settings')}>
            <IoSettingsOutline size={16} className="text-muted" />
            Settings
          </button>

          <div className="my-1 border-t border-dashed border-muted/30" />

          <button type="button" role="menuitem" className="menu-item--danger rounded-lg" onClick={handleSignOut}>
            <IoLogOutOutline size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu

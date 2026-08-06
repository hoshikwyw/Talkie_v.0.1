import { IoIosMenu } from 'react-icons/io'
import { useUserStore } from '@/stores/userStore'
import { IconButton } from '@/shared/ui'
import UserMenu from './UserMenu'

const AppHeader = ({ onMenuClick }) => {
  const currentUser = useUserStore((state) => state.currentUser)

  return (
    // Edge to edge on Android 15+, so the header sits under the status bar
    // unless it carries the inset. `calc` keeps the design padding on top of
    // the inset rather than replacing it — the inset is 0 on the web.
    <header className="flex items-center justify-between border-b-2 border-muted/20 bg-surface px-4 pb-3 pt-[calc(0.75rem+var(--safe-area-inset-top))] sm:px-5">
      <div className="flex items-center gap-3">
        <IconButton label="Open conversations" onClick={onMenuClick} className="lg:hidden">
          <IoIosMenu size={24} />
        </IconButton>

        <h1 className="animate-float font-pixel text-pixel-md text-primary text-shadow-pixel">
          Talkie
        </h1>
      </div>

      <UserMenu user={currentUser} />
    </header>
  )
}

export default AppHeader

import { Outlet, Navigate } from 'react-router-dom'
import { useUserStore } from '../../lib/userStore'

const AuthGuard = () => {
  const { currentUser, isLoading } = useUserStore()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface-darker gap-4">
        <div className="font-pixel text-lg text-pixel-orange animate-pixel-blink text-shadow-pixel">
          LOADING
        </div>
        <div className="flex gap-1">
          <span className="w-3 h-3 bg-pixel-orange animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-3 h-3 bg-pixel-yellow animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-3 h-3 bg-pixel-purple animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default AuthGuard

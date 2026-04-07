import { Outlet, Navigate } from 'react-router-dom'
import { useUserStore } from '../lib/userStore'

const AuthGuard = () => {
  const { currentUser, isLoading } = useUserStore()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default AuthGuard

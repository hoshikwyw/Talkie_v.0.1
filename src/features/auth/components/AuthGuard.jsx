import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'
import { LoadingScreen } from '@/shared/ui'

/** Gates the authenticated routes until the profile has been resolved. */
const AuthGuard = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  const isLoading = useUserStore((state) => state.isLoading)

  if (isLoading) return <LoadingScreen />
  if (!currentUser) return <Navigate to="/login" replace />

  return <Outlet />
}

export default AuthGuard

import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { observeAuthState } from '@/services/authService'
import { useChatStore } from '@/stores/chatStore'
import { useUserStore } from '@/stores/userStore'
import { getThemeColors } from '@/shared/theme'
import { ErrorBoundary } from '@/shared/ui'
import AppRoutes from './routes'

const App = () => {
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo)

  useEffect(
    () =>
      observeAuthState((user) => {
        // Signing out left the open conversation in the store, so the next
        // person to sign in on this device landed in the previous one's chat.
        if (!user) useChatStore.getState().resetChat()
        fetchUserInfo(user?.uid)
      }),
    [fetchUserInfo]
  )

  const colors = getThemeColors()

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-canvas">
        <AppRoutes />

        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={3000}
          toastStyle={{
            // Toastify styles through props, so it needs literal colours.
            background: colors.surfaceLight,
            border: `1px solid ${colors.muted}33`,
            color: colors.content,
            fontFamily: '"VT323", monospace',
            fontSize: '18px',
            borderRadius: '12px',
          }}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App

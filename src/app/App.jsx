import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { observeAuthState } from '@/services/authService'
import { useChatStore } from '@/stores/chatStore'
import { useUserStore } from '@/stores/userStore'
import { getThemeColors } from '@/shared/theme'
import { useBackButton } from '@/shared/platform/backButton'
import { ErrorBoundary } from '@/shared/ui'
import { hideSplashScreen, initNativeShell } from './native'
import AppRoutes from './routes'

const App = () => {
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo)
  const isLoading = useUserStore((state) => state.isLoading)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let dispose
    initNativeShell().then((cleanup) => {
      dispose = cleanup
    })
    return () => dispose?.()
  }, [])

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

  // Hold the launch screen until there is a real screen behind it.
  useEffect(() => {
    if (!isLoading) hideSplashScreen()
  }, [isLoading])

  /*
   * Lowest-priority back handler: any handler registered by a screen above
   * gets first refusal. Returning false from the home route lets the app exit.
   */
  useBackButton(() => {
    if (location.pathname === '/') return false
    navigate('/')
    return true
  })

  const colors = getThemeColors()

  return (
    <ErrorBoundary>
      <div className="h-full bg-canvas">
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

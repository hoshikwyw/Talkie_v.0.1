import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useThemeStore } from './lib/themeStore'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/layout/ErrorBoundary'
import AuthGuard from './components/layout/AuthGuard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

const App = () => {
  const { fetchUserInfo } = useUserStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => unSub()
  }, [fetchUserInfo])

  return (
    <ErrorBoundary>
      <div data-theme="pixelcozy" className="min-h-screen" style={{ background: theme.bg }}>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastStyle={{
            background: theme.surface,
            border: `2px solid ${theme.muted}20`,
            color: theme.text,
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

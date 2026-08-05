import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { getThemeColors } from '@/shared/theme'
import AuthGuard from './components/layout/AuthGuard'
import ErrorBoundary from './components/layout/ErrorBoundary'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Settings from './pages/Settings'

const App = () => {
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo)

  useEffect(() => onAuthStateChanged(auth, (user) => fetchUserInfo(user?.uid)), [fetchUserInfo])

  const colors = getThemeColors()

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-canvas">
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

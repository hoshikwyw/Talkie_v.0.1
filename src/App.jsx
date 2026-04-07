import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/layout/ErrorBoundary'
import AuthGuard from './components/layout/AuthGuard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

const App = () => {
  const { fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => unSub()
  }, [fetchUserInfo])

  return (
    <ErrorBoundary>
      <div data-theme="pixelcozy" className="min-h-screen bg-surface-darker">
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastStyle={{
            background: '#2a2a3d',
            border: '3px solid rgba(240,234,214,0.1)',
            color: '#f0ead6',
            fontFamily: '"VT323", monospace',
            fontSize: '18px',
          }}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App

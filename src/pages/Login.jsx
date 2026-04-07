import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, signInWithGoogle } from '../lib/firebase'
import { useUserStore } from '../lib/userStore'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { currentUser, fetchUserInfo } = useUserStore()

  if (currentUser) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      await fetchUserInfo(res.user.uid)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true)
      const user = await signInWithGoogle()
      await fetchUserInfo(user.uid)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface-darker p-4">
      <div className="pixel-card p-8 w-full max-w-sm">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-pixel text-lg text-pixel-orange text-shadow-pixel animate-float mb-2">
            TALKIE
          </h1>
          <p className="font-body text-xl text-pixel-muted">Welcome back, player!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <div>
            <label className="font-pixel text-[8px] text-pixel-muted mb-1 block tracking-wider">EMAIL</label>
            <input
              type="text"
              name="email"
              className="pixel-input w-full"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="font-pixel text-[8px] text-pixel-muted mb-1 block tracking-wider">PASSWORD</label>
            <input
              type="password"
              name="password"
              className="pixel-input w-full"
              placeholder="********"
            />
          </div>
          <button type="submit" className="pixel-btn-primary w-full mt-2" disabled={loading}>
            {loading ? 'LOADING...' : 'LOGIN'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 border-t-3 border-dashed border-pixel-cream/10" />
          <span className="font-pixel text-[8px] text-pixel-muted">OR</span>
          <div className="flex-1 border-t-3 border-dashed border-pixel-cream/10" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="pixel-btn w-full flex items-center justify-center gap-3 !border-pixel-purple/40"
        >
          <svg aria-label="Google" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g><path d="m0 0H512V512H0" fill="#fff"/><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"/><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"/><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"/><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"/></g>
          </svg>
          {googleLoading ? 'LOADING...' : 'GOOGLE LOGIN'}
        </button>

        {/* Register link */}
        <div className="text-center mt-6">
          <span className="font-body text-pixel-muted">New player? </span>
          <NavLink to="/register" className="font-body text-pixel-orange hover:text-pixel-yellow transition-colors underline">
            Register here
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login

import { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, signInWithGoogle } from '../lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { createUserDocument } from '../lib/services/userService'
import { useUserStore } from '../lib/userStore'
import { useThemeStore } from '../lib/themeStore'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { currentUser, fetchUserInfo } = useUserStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  if (currentUser) return <Navigate to="/" replace />

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true)
      const user = await signInWithGoogle()
      await fetchUserInfo(user.uid)
      toast.success('Registration Successful!')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setGoogleLoading(false)
    }
  }

  const validate = (username, email, password, confirmPassword) => {
    const errs = {}
    if (!username || username.trim().length < 2) errs.username = 'Min 2 characters'
    if (username && username.trim().length > 30) errs.username = 'Max 30 characters'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email'
    if (!password || password.length < 8) errs.password = 'Min 8 characters'
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords don\'t match'
    return errs
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const { username, email, password, confirmPassword } = Object.fromEntries(formData)

    const errs = validate(username, email, password, confirmPassword)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setLoading(false)
      return
    }
    setErrors({})

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await createUserDocument(res.user.uid, { username: username.trim(), email, profile: '' })
      await fetchUserInfo(res.user.uid)
      toast.success('Registration Successful!')
    } catch (err) {
      console.error('Registration error:', err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ background: theme.bg }}>
      <div className="w-full max-w-sm p-8 rounded-xl" style={{ background: theme.surface, border: `1px solid ${theme.muted}15` }}>
        <div className="text-center mb-6">
          <h1 className="font-pixel text-lg mb-2 animate-float" style={{ color: theme.primary }}>
            TALKIE
          </h1>
          <p className="font-body text-xl" style={{ color: theme.muted }}>Create your account!</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 mb-6">
          <div>
            <label className="font-pixel text-[8px] mb-1 block tracking-wider" style={{ color: theme.muted }}>EMAIL</label>
            {errors.email && <span className="font-body text-xs" style={{ color: '#e94560' }}>{errors.email}</span>}
            <input type="text" name="email" placeholder="you@email.com"
                   className="w-full rounded-xl px-4 py-3 font-body text-lg outline-none"
                   style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}15` }} />
          </div>

          <div>
            <label className="font-pixel text-[8px] mb-1 block tracking-wider" style={{ color: theme.muted }}>USERNAME</label>
            {errors.username && <span className="font-body text-xs" style={{ color: '#e94560' }}>{errors.username}</span>}
            <input type="text" name="username" placeholder="CoolPlayer99"
                   className="w-full rounded-xl px-4 py-3 font-body text-lg outline-none"
                   style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}15` }} />
          </div>

          <div>
            <label className="font-pixel text-[8px] mb-1 block tracking-wider" style={{ color: theme.muted }}>PASSWORD</label>
            {errors.password && <span className="font-body text-xs" style={{ color: '#e94560' }}>{errors.password}</span>}
            <input type="password" name="password" placeholder="********"
                   className="w-full rounded-xl px-4 py-3 font-body text-lg outline-none"
                   style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}15` }} />
          </div>

          <div>
            <label className="font-pixel text-[8px] mb-1 block tracking-wider" style={{ color: theme.muted }}>CONFIRM PASSWORD</label>
            {errors.confirmPassword && <span className="font-body text-xs" style={{ color: '#e94560' }}>{errors.confirmPassword}</span>}
            <input type="password" name="confirmPassword" placeholder="********"
                   className="w-full rounded-xl px-4 py-3 font-body text-lg outline-none"
                   style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}15` }} />
          </div>

          <button type="submit" disabled={loading}
                  className="w-full px-4 py-3 rounded-xl font-pixel text-[9px] mt-2 transition-colors"
                  style={{ background: theme.primary, color: theme.bg }}>
            {loading ? 'LOADING...' : 'REGISTER'}
          </button>
        </form>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1" style={{ borderTop: `2px dashed ${theme.muted}20` }} />
          <span className="font-pixel text-[8px]" style={{ color: theme.muted }}>OR</span>
          <div className="flex-1" style={{ borderTop: `2px dashed ${theme.muted}20` }} />
        </div>

        <button onClick={handleGoogleRegister} disabled={googleLoading}
                className="w-full px-4 py-3 rounded-xl font-pixel text-[9px] flex items-center justify-center gap-3 transition-colors"
                style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}20` }}>
          <svg aria-label="Google" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g><path d="m0 0H512V512H0" fill="#fff"/><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"/><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"/><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"/><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"/></g>
          </svg>
          {googleLoading ? 'LOADING...' : 'GOOGLE REGISTER'}
        </button>

        <div className="text-center mt-6">
          <span className="font-body" style={{ color: theme.muted }}>Already have an account? </span>
          <NavLink to="/login" className="font-body underline" style={{ color: theme.primary }}>
            Login here
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Register

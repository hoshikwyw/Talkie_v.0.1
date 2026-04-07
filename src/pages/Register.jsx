import { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, signInWithGoogle } from '../lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import upload from '../lib/upload'
import { createUserDocument } from '../lib/services/userService'
import { useUserStore } from '../lib/userStore'

const Register = () => {
  const [profile, setProfile] = useState({ file: null, url: '' })
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { currentUser, fetchUserInfo } = useUserStore()

  if (currentUser) return <Navigate to="/" replace />

  const handleProfile = (e) => {
    const f = e.target.files?.[0]
    if (f) setProfile({ file: f, url: URL.createObjectURL(f) })
  }

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
      const imgUrl = profile.file ? await upload(profile.file) : ''
      await createUserDocument(res.user.uid, { username: username.trim(), email, profile: imgUrl })
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
    <div className="flex items-center justify-center min-h-screen bg-surface-darker p-4">
      <div className="pixel-card p-8 w-full max-w-sm">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="font-pixel text-lg text-pixel-orange text-shadow-pixel animate-float mb-2">
            TALKIE
          </h1>
          <p className="font-body text-xl text-pixel-muted">Create your character!</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 mb-6">
          {/* Avatar upload */}
          <div className="flex justify-center">
            <label htmlFor="reg-file" className="cursor-pointer group">
              <div className="w-20 h-20 pixel-avatar overflow-hidden bg-surface-light flex items-center justify-center relative">
                {profile.url ? (
                  <img src={profile.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-pixel text-[6px] text-pixel-muted text-center leading-relaxed group-hover:text-pixel-orange transition-colors">
                    UPLOAD<br />AVATAR
                  </span>
                )}
              </div>
            </label>
            <input type="file" id="reg-file" className="hidden" onChange={handleProfile} />
          </div>

          <div>
            <label className="font-pixel text-[8px] text-pixel-muted mb-1 block tracking-wider">EMAIL</label>
            {errors.email && <span className="font-body text-xs text-pixel-red">{errors.email}</span>}
            <input type="text" name="email" className="pixel-input w-full" placeholder="you@email.com" />
          </div>

          <div>
            <label className="font-pixel text-[8px] text-pixel-muted mb-1 block tracking-wider">USERNAME</label>
            {errors.username && <span className="font-body text-xs text-pixel-red">{errors.username}</span>}
            <input type="text" name="username" className="pixel-input w-full" placeholder="CoolPlayer99" />
          </div>

          <div>
            <label className="font-pixel text-[8px] text-pixel-muted mb-1 block tracking-wider">PASSWORD</label>
            {errors.password && <span className="font-body text-xs text-pixel-red">{errors.password}</span>}
            <input type="password" name="password" className="pixel-input w-full" placeholder="********" />
          </div>

          <div>
            <label className="font-pixel text-[8px] text-pixel-muted mb-1 block tracking-wider">CONFIRM PASSWORD</label>
            {errors.confirmPassword && <span className="font-body text-xs text-pixel-red">{errors.confirmPassword}</span>}
            <input type="password" name="confirmPassword" className="pixel-input w-full" placeholder="********" />
          </div>

          <button type="submit" className="pixel-btn-primary w-full mt-2" disabled={loading}>
            {loading ? 'LOADING...' : 'REGISTER'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 border-t-3 border-dashed border-pixel-cream/10" />
          <span className="font-pixel text-[8px] text-pixel-muted">OR</span>
          <div className="flex-1 border-t-3 border-dashed border-pixel-cream/10" />
        </div>

        <button onClick={handleGoogleRegister} disabled={googleLoading}
          className="pixel-btn w-full flex items-center justify-center gap-3 !border-pixel-purple/40">
          <svg aria-label="Google" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g><path d="m0 0H512V512H0" fill="#fff"/><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"/><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"/><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"/><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"/></g>
          </svg>
          {googleLoading ? 'LOADING...' : 'GOOGLE REGISTER'}
        </button>

        <div className="text-center mt-6">
          <span className="font-body text-pixel-muted">Already a player? </span>
          <NavLink to="/login" className="font-body text-pixel-orange hover:text-pixel-yellow transition-colors underline">
            Login here
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Register

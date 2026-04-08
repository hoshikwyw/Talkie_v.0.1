import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../lib/userStore'
import { useThemeStore } from '../lib/themeStore'
import { updateUserProfile } from '../lib/services/userService'
import { toast } from 'react-toastify'
import Avatar from '../components/sidebar/Avatar'

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser, fetchUserInfo } = useUserStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  const [username, setUsername] = useState(currentUser?.username || '')
  const [saving, setSaving] = useState(false)

  const onSave = async (e) => {
    e.preventDefault()
    if (!currentUser?.id) return

    const trimmedName = username.trim()
    if (trimmedName.length < 2 || trimmedName.length > 30) {
      toast.error('Username must be 2-30 characters')
      return
    }

    try {
      setSaving(true)
      await updateUserProfile(currentUser.id, { username: trimmedName })
      await fetchUserInfo(currentUser.id)
      toast.success('Profile updated!')
      navigate('/')
    } catch (err) {
      console.error('Profile update failed:', err)
      toast.error(err.message || 'Failed to update')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ background: theme.bg }}>
      <div className="w-full max-w-sm p-8 rounded-xl" style={{ background: theme.surface, border: `1px solid ${theme.muted}15` }}>
        <h1 className="font-pixel text-xs text-center mb-8" style={{ color: theme.primary }}>
          EDIT PROFILE
        </h1>

        <form onSubmit={onSave} className="flex flex-col items-center gap-6">
          {/* Avatar preview */}
          <div className="flex flex-col items-center gap-2">
            <Avatar avatar={currentUser?.profile} name={username || currentUser?.username} size={90} online />
            <span className="font-body text-sm" style={{ color: theme.muted }}>
              Avatar updates with your username
            </span>
          </div>

          {/* Username */}
          <div className="w-full">
            <label className="font-pixel text-[8px] mb-1 block tracking-wider" style={{ color: theme.muted }}>USERNAME</label>
            <input
              type="text"
              className="w-full rounded-xl px-4 py-3 font-body text-lg outline-none"
              style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}15` }}
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full">
            <button type="button"
                    className="flex-1 px-4 py-2.5 rounded-xl font-pixel text-[9px] transition-colors"
                    style={{ background: theme.surfaceLight, color: theme.text, border: `1px solid ${theme.muted}15` }}
                    onClick={() => navigate(-1)}>
              CANCEL
            </button>
            <button type="submit" disabled={saving}
                    className="flex-1 px-4 py-2.5 rounded-xl font-pixel text-[9px] transition-colors"
                    style={{ background: theme.primary, color: theme.bg }}>
              {saving ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../lib/userStore'
import { updateUserProfile } from '../lib/services/userService'
import { toast } from 'react-toastify'
import Avatar from '../components/sidebar/Avatar'

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser, fetchUserInfo } = useUserStore()

  const [username, setUsername] = useState(currentUser?.username || '')
  const [previewUrl, setPreviewUrl] = useState(currentUser?.profile || '')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const onFileChange = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreviewUrl(URL.createObjectURL(f))
  }

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
      await updateUserProfile(currentUser.id, {
        username: trimmedName,
        file,
        currentProfile: currentUser.profile || previewUrl,
      })
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
    <div className="flex items-center justify-center min-h-screen bg-surface-darker p-4">
      <div className="pixel-card p-8 w-full max-w-sm">
        <h1 className="font-pixel text-xs text-pixel-orange text-shadow-pixel text-center mb-6">
          EDIT PROFILE
        </h1>

        <form onSubmit={onSave} className="flex flex-col items-center gap-6">
          {/* Avatar */}
          <label htmlFor="profile-file" className="cursor-pointer group">
            <div className="w-28 h-28 pixel-avatar overflow-hidden bg-surface-light flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="font-pixel text-[6px] text-pixel-muted group-hover:text-pixel-orange transition-colors">
                  UPLOAD
                </span>
              )}
            </div>
          </label>
          <input id="profile-file" type="file" className="hidden" onChange={onFileChange} />

          {/* Username */}
          <div className="w-full">
            <label className="font-pixel text-[8px] text-pixel-muted mb-1 block tracking-wider">USERNAME</label>
            <input
              type="text"
              className="pixel-input w-full"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full">
            <button type="button" className="pixel-btn flex-1" onClick={() => navigate(-1)}>
              CANCEL
            </button>
            <button type="submit" className="pixel-btn-primary flex-1" disabled={saving}>
              {saving ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile

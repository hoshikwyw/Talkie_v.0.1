import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUserProfile } from '@/services/userService'
import { useUserStore } from '@/stores/userStore'
import { Avatar, Button, TextField } from '@/shared/ui'
import { USERNAME_MAX, validateUsername } from '@/shared/lib/validation'

const ProfilePage = () => {
  const navigate = useNavigate()
  const currentUser = useUserStore((state) => state.currentUser)
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo)

  const [username, setUsername] = useState(currentUser?.username ?? '')
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const trimmed = username.trim()
  const isUnchanged = trimmed === (currentUser?.username ?? '')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!currentUser?.id) return

    // The rule used to live inline here and disagree with the sign-up form.
    const validationError = validateUsername(username)
    if (validationError) return setError(validationError)

    setSaving(true)
    try {
      await updateUserProfile(currentUser.id, { username: trimmed })
      await fetchUserInfo(currentUser.id)
      toast.success('Profile updated!')
      navigate('/')
    } catch (err) {
      console.error('Profile update failed:', err)
      toast.error('Could not save your profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
      <div className="panel w-full max-w-sm p-8">
        <h1 className="mb-8 text-center font-pixel text-pixel-md text-primary">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6" noValidate>
          <div className="flex flex-col items-center gap-2">
            {/* Reflects the typed name live, since it seeds the fallback avatar. */}
            <Avatar
              avatar={currentUser?.profile}
              name={trimmed || currentUser?.username}
              size={90}
              online
            />
            <span className="font-body text-sm text-muted">Avatar follows your username</span>
          </div>

          <TextField
            label="Username"
            className="w-full"
            name="username"
            autoComplete="nickname"
            maxLength={USERNAME_MAX}
            placeholder="Your name"
            value={username}
            error={error}
            onChange={(event) => {
              setUsername(event.target.value)
              setError(null)
            }}
          />

          <div className="flex w-full gap-3">
            <Button variant="secondary" fullWidth onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={saving} disabled={isUnchanged}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage

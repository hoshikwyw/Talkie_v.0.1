import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useUserStore } from '../lib/userStore'
import upload from '../lib/upload'
import { toast } from 'react-toastify'

// Array of fallback profile pictures in /public
const fallbackImages = [
  "/pfp1.jfif",
  "/pfp2.jfif",
  "/pfp3.jfif",
  "/pfp4.jfif",
  "/pfp5.jfif",
  "/pfp6.jfif",
]

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser, fetchUserInfo } = useUserStore()

  const [username, setUsername] = useState(currentUser?.username || "")

  // If user has a profile, use that. Otherwise pick a random fallback
  const [previewUrl, setPreviewUrl] = useState(
    currentUser?.profile || fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
  )
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
    try {
      setSaving(true)
      let photoUrl = currentUser.profile || previewUrl
      if (file) {
        photoUrl = await upload(file)
      }
      await updateDoc(doc(db, 'users', currentUser.id), {
        username: username || currentUser.username,
        profile: photoUrl,
      })
      await fetchUserInfo(currentUser.id)
      toast.success('Profile updated')
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen gap-6 p-4 '>
      <h1 className='text-2xl font-bold '>Edit Profile</h1>
      <form onSubmit={onSave} className='flex flex-col items-center justify-center gap-5 '>
        <label htmlFor="file" className='cursor-pointer '>
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ">
              <img src={previewUrl} alt="Profile" className='object-cover w-full h-full bg-neutral' />
            </div>
          </div>
        </label>
        <input id='file' type="file" className='hidden ' onChange={onFileChange} />
        <label className="flex items-center gap-2 input input-bordered">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" className="grow" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <div className='flex gap-3 '>
          <button type='button' className=' btn btn-ghost btn-sm' onClick={() => navigate(-1)}>Cancel</button>
          <button className=' btn btn-neutral btn-sm' disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}

export default Profile

import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import Avatar from './Avatar'
import { searchUserByUsername, createNewChat } from '../../lib/services/chatService'
import { toast } from 'react-toastify'

const AddUser = ({ setModalOpen, currentUser }) => {
  const [addUser, setAddUser] = useState(null)
  const [searching, setSearching] = useState(false)

  const handleAddNewUser = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await createNewChat(currentUser.id, addUser.id)
      toast.success('Friend added!')
    } catch (err) {
      console.error('Failed to add user:', err)
      toast.error('Failed to add friend')
    } finally {
      setModalOpen(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('username')?.trim()
    if (!username) return
    setSearching(true)
    try {
      const found = await searchUserByUsername(username)
      setAddUser(found)
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setSearching(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setModalOpen(false)} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="pixel-card p-5 w-full max-w-sm">
          <h3 className="font-pixel text-xs text-pixel-orange mb-4 text-shadow-pixel">+ ADD FRIEND</h3>

          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              name="username"
              placeholder="Search username..."
              className="pixel-input flex-1 text-base"
            />
            <button type="submit" className="pixel-btn-primary !px-3" disabled={searching}>
              <IoMdSearch size={18} />
            </button>
          </form>

          {addUser && (
            <div className="flex items-center justify-between bg-surface-dark p-3 border-2 border-pixel-cream/10">
              <div className="flex items-center gap-3">
                <Avatar avatar={addUser.profile} name={addUser.username} size={32} />
                <span className="font-body text-lg">{addUser.username}</span>
              </div>
              <button className="pixel-btn-primary !text-[10px] !px-3 !py-1" onClick={handleAddNewUser}>
                ADD
              </button>
            </div>
          )}

          {addUser === null && !searching && (
            <p className="text-pixel-muted font-body text-center py-4">
              Search for a user to add
            </p>
          )}

          <div className="flex justify-end mt-4">
            <button className="pixel-btn !text-[10px]" onClick={() => setModalOpen(false)}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddUser

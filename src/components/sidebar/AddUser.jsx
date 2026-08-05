import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { toast } from 'react-toastify'
import Avatar from './Avatar'
import { createNewChat, searchUserByUsername } from '../../lib/services/chatService'

const AddUser = ({ setModalOpen, currentUser }) => {
  const [foundUser, setFoundUser] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [searching, setSearching] = useState(false)

  const handleAddNewUser = async () => {
    try {
      await createNewChat(currentUser.id, foundUser.id)
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
    const username = new FormData(e.target).get('username')?.trim()
    if (!username) return

    setSearching(true)
    try {
      setFoundUser(await searchUserByUsername(username))
    } catch (err) {
      console.error('Search failed:', err)
      setFoundUser(null)
      toast.error('Search failed')
    } finally {
      setHasSearched(true)
      setSearching(false)
    }
  }

  return (
    <>
      <div className="backdrop" onClick={() => setModalOpen(false)} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="panel-raised w-full max-w-sm animate-slide-up p-5">
          <h3 className="mb-4 font-pixel text-pixel-md text-primary text-shadow-pixel">
            + Add Friend
          </h3>

          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <input
              type="text"
              name="username"
              autoFocus
              placeholder="Search username..."
              className="input flex-1"
            />
            <button type="submit" className="btn-primary !px-3.5" disabled={searching} aria-label="Search">
              <IoMdSearch size={18} />
            </button>
          </form>

          {foundUser ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-muted/15 bg-surface p-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar avatar={foundUser.profile} name={foundUser.username} size={32} />
                <span className="truncate font-body text-lg text-content">{foundUser.username}</span>
              </div>
              <button type="button" className="btn-primary !px-3 !py-1.5" onClick={handleAddNewUser}>
                Add
              </button>
            </div>
          ) : (
            <p className="py-4 text-center font-body text-muted">
              {searching
                ? 'Searching...'
                : hasSearched
                  ? 'No user found with that name'
                  : 'Search for a user to add'}
            </p>
          )}

          <div className="mt-4 flex justify-end">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddUser

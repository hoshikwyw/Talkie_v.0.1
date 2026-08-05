import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { toast } from 'react-toastify'
import { Avatar, Button, Modal, TextField } from '@/shared/ui'
import { createNewChat, searchUserByUsername } from '@/services/chatService'

const AddFriendDialog = ({ open, onClose, currentUser }) => {
  const [foundUser, setFoundUser] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [searching, setSearching] = useState(false)
  const [adding, setAdding] = useState(false)

  const reset = () => {
    setFoundUser(null)
    setHasSearched(false)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    const username = new FormData(event.target).get('username')?.trim()
    if (!username) return

    setSearching(true)
    try {
      setFoundUser(await searchUserByUsername(username, currentUser?.id))
    } catch (err) {
      console.error('Search failed:', err)
      setFoundUser(null)
      toast.error('Search failed')
    } finally {
      setHasSearched(true)
      setSearching(false)
    }
  }

  const handleAdd = async () => {
    setAdding(true)
    try {
      const { created } = await createNewChat(currentUser.id, foundUser.id)
      toast.success(
        created ? `${foundUser.username} added!` : `You already have a chat with ${foundUser.username}`
      )
      handleClose()
    } catch (err) {
      console.error('Failed to add user:', err)
      toast.error(err.message || 'Failed to add friend')
    } finally {
      setAdding(false)
    }
  }

  const emptyMessage = hasSearched ? 'No user found with that name' : 'Search for a user to add'

  return (
    <Modal open={open} onClose={handleClose} title="+ Add Friend">
      <form onSubmit={handleSearch} className="mb-4 flex items-start gap-2">
        <TextField
          name="username"
          autoFocus
          autoComplete="off"
          placeholder="Search username..."
          className="flex-1"
        />
        <Button type="submit" loading={searching} aria-label="Search" className="px-3.5 py-3">
          {!searching && <IoMdSearch size={18} />}
        </Button>
      </form>

      {foundUser ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-muted/15 bg-surface p-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar avatar={foundUser.profile} name={foundUser.username} size={32} />
            <span className="truncate font-body text-lg text-content">{foundUser.username}</span>
          </div>
          <Button size="sm" loading={adding} onClick={handleAdd}>
            Add
          </Button>
        </div>
      ) : (
        <p className="py-4 text-center font-body text-muted">
          {searching ? 'Searching...' : emptyMessage}
        </p>
      )}

      <div className="mt-5 flex justify-end">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default AddFriendDialog

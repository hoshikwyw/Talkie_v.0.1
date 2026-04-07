import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io"
import Avatar from './Avatar'
import { searchUserByUsername, createNewChat } from '../../lib/services/chatService'
import { toast } from 'react-toastify'

const AddUser = ({ setModalOpen, currentUser }) => {
    const [addUser, setAddUser] = useState(null)

    const handleAddNewUser = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            await createNewChat(currentUser.id, addUser.id)
            toast.success("Add friend successful!")
        } catch (err) {
            console.error("Failed to add user:", err)
            toast.error("Failed to add friend")
        } finally {
            setModalOpen(false)
        }
    }

    const handleSearchNewUser = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        try {
            const found = await searchUserByUsername(username)
            setAddUser(found)
        } catch (err) {
            console.error("Search failed:", err)
        }
    }

    return (
        <div className="modal">
            <div className="modal-box z-50">
                <form className='flex items-center rounded-md gap-1 bg-base-300 text-base justify-between px-2 py-1' onSubmit={handleSearchNewUser}>
                    <input type="text" placeholder='Search with username' name='username' className='outline-none py-1 px-2 bg-transparent' />
                    <button><IoMdSearch size={24} color='gray' /></button>
                </form>
                {addUser && (
                    <div className="mt-3 flex items-center border-2 px-3 py-2 rounded-md justify-between shadow-md">
                        <div className="flex items-center gap-3">
                            <Avatar avatar={addUser.profile} name={addUser.username} />
                            <p>{addUser.username}</p>
                        </div>
                        <div className='flex items-center gap-2 modal-action'>
                            <button className='btn btn-sm' onClick={handleAddNewUser}>Add</button>
                        </div>
                    </div>
                )}
                <div className="modal-action">
                    <label onClick={() => setModalOpen(false)} htmlFor="my_modal_7" className="btn btn-sm">Cancel</label>
                </div>
            </div>
        </div>
    )
}

export default AddUser

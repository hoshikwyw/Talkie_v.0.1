import React from 'react'
import { IoIosClose, IoMdSearch } from "react-icons/io"
import UserInfo from './listComponents/UserInfo'
import AddUser from './listComponents/AddUser'
import { useChatList } from '../lib/hooks/useChatList'

const List = () => {
    const { chats, modalOpen, setModalOpen, searchTerm, setSearchTerm, handleSelect, currentUser } = useChatList()

    return (
        <>
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full p-4">
                <p className='w-full flex flex-row items-center justify-between mb-3'>
                    <span className='text-xl font-semibold'>Messages</span>
                    <label htmlFor="my-drawer" className="btn btn-ghost btn-circle btn-primary drawer-button">
                        <IoIosClose size={36} />
                    </label>
                </p>
                <div className='flex gap-2'>
                    <div className='flex items-center rounded-md gap-1 bg-base-300 text-base'>
                        <input
                            type="text"
                            placeholder='Search'
                            className='outline-none py-1 px-2 bg-transparent'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <IoMdSearch size={24} color='gray' className="mr-2" />
                    </div>
                    <label onClick={() => setModalOpen(true)} htmlFor="my_modal_7" className="bg-base-300 rounded-md px-2 text-[12px] font-semibold py-2 cursor-pointer">Add</label>
                </div>
                {chats.length === 0 && (
                    <li className="py-8 text-center text-base-content/50">
                        No conversations yet. Add a friend to get started.
                    </li>
                )}
                {chats.map((chat) => (
                    <li className={`${chat?.isSeen ? "" : "bg-blue-300"} rounded-md cursor-pointer`} key={chat?.chatId} onClick={() => handleSelect(chat)}>
                        <UserInfo name={chat?.user?.username} avatar={chat?.user?.profile || ""} lastMessage={chat?.lastMessage || ""} status="online" />
                    </li>
                ))}
            </ul>
            <input type="checkbox" checked={modalOpen} readOnly id="my_modal_7" className="modal-toggle" />
            <AddUser setModalOpen={setModalOpen} currentUser={currentUser} />
        </>
    )
}

export default List

import React from 'react'
import { IoMdSearch } from "react-icons/io"
import AddUser from './AddUser'
import UserInfo from './UserInfo'
import { useChatList } from '../../lib/hooks/useChatList'

const SideList = () => {
    const { chats, modalOpen, setModalOpen, searchTerm, setSearchTerm, handleSelect, currentUser } = useChatList()

    return (
        <div className='grid grid-rows-[auto_1fr_auto] h-[calc(100vh-4.4rem)] relative overflow-y-scroll no-scrollbar'>
            <ul className="menu text-base-content p-4">
                <li className='text-xl font-semibold'>Messages</li>
                <div className='flex gap-2 my-3 w-full justify-evenly'>
                    <div className='flex items-center justify-between rounded-md gap-1 bg-base-200 text-base w-[75%] px-3'>
                        <input
                            type="text"
                            placeholder='Search'
                            className='w-[80%] outline-none py-1 px-2 bg-transparent'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <IoMdSearch size={24} color='gray' />
                    </div>
                    <button onClick={() => setModalOpen(true)} className="bg-base-200 rounded-md px-2 text-base font-semibold py-2 cursor-pointer">Add</button>
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
        </div>
    )
}

export default SideList

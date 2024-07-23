import React, { useEffect, useState } from 'react'
import { IoIosClose, IoMdSearch } from "react-icons/io";
import UserInfo from './listComponents/UserInfo';
import { useUserStore } from '../lib/userStore';
import { doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import AddUser from './listComponents/AddUser';


const List = () => {
    const { currentUser } = useUserStore()
    const [chatList, setChatList] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats
            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId)
                const userDocSnap = await getDoc(userDocRef)
                const user = userDocSnap.data()
                return { ...item, user }
            })
            const chatData = await Promise.all(promises)
            setChatList(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
        })
        return () => { unSub() }
    }, [currentUser.id])



    return (
        <>
            <label htmlFor="my-drawer" aria-label="close sidebar" className=" drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full p-4">
                <p className=' w-full flex flex-row items-center justify-between mb-3'>
                    <span className=' text-xl font-semibold'>Messages</span>
                    <label htmlFor="my-drawer" className="btn btn-ghost btn-circle btn-primary drawer-button">
                        <IoIosClose size={36} />
                    </label>
                </p>
                <div className=' flex gap-2'>
                    <form className=' flex items-center rounded-md gap-1 bg-base-300 text-base' >
                        <input type="text" placeholder='Search' className=' outline-none py-1 px-2 bg-transparent' />
                        <button><IoMdSearch size={24} color='gray' /></button>
                    </form>
                    <label onClick={() => setModalOpen(true)} htmlFor="my_modal_7" className=" bg-base-300 rounded-md px-2 text-[12px] font-semibold py-2">Add</label>
                </div>
                <li className=' w-full overflow-hidden'>
                    {chatList.map((chat) => (
                        <UserInfo name={chat.user.username} avatar={chat.user.profile || ""} lastMessage="Hello, how are you?" status="online" />
                    ))}
                </li>
            </ul>
            <input type="checkbox" checked={modalOpen} id="my_modal_7" className="modal-toggle" />
            <AddUser setModalOpen={setModalOpen} currentUser={currentUser} />

        </>

    )
}

export default List
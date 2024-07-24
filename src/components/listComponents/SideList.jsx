import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { IoMdSearch } from "react-icons/io";
import AddUser from './AddUser';
import UserInfo from './UserInfo';
import { useChatStore } from '../../lib/chatStore';

const SideList = () => {
    const { currentUser } = useUserStore()
    const [chats, setChats] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const { chatId, changeChat } = useChatStore()

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
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
        })
        return () => { unSub() }
    }, [currentUser.id])

    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item
            return rest
        })
        const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId)
        userChats[chatIndex].isSeen = true
        const userChatsRef = doc(db, "userchats", currentUser.id)
        try {
            await updateDoc(userChatsRef, {
                chats: userChats
            })
            changeChat(chat.chatId, chat.user)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className=' grid grid-rows-[auto_1fr_auto] h-[calc(100vh-4.4rem)] relative overflow-y-scroll no-scrollbar'>
                <ul className="menu text-base-content p-4">
                    <li className=' text-xl font-semibold'>Messages</li>
                    <div className=' flex gap-2 my-3 w-full justify-evenly'>
                        <form className=' flex items-center justify-between rounded-md gap-1 bg-base-200 text-base w-[75%] px-3' >
                            <input type="text" placeholder='Search' className=' w-[80%] outline-none py-1 px-2 bg-transparent' />
                            <button className=' w-[10%]'><IoMdSearch size={24} color='gray' /></button>
                        </form>
                        <button onClick={() => setModalOpen(true)} htmlFor="my_modal_7" className=" bg-base-200 rounded-md px-2 text-base font-semibold py-2 cursor-pointer">Add</button>
                    </div>
                    {chats?.map((chat, index) => (
                        <li className={`${chat?.isSeen ? "" : "bg-blue-300"} rounded-md cursor-pointer`} key={chat?.chatId} onClick={() => handleSelect(chat)}>
                            <UserInfo key={index} name={chat?.user.username} avatar={chat?.user.profile || ""} lastMessage={chat?.lastMessage || ""} status="online" />
                        </li>
                    ))}
                </ul>
                <input type="checkbox" checked={modalOpen} id="my_modal_7" className="modal-toggle" />
                <AddUser setModalOpen={setModalOpen} currentUser={currentUser} />
            </div>
        </>
    )
}

export default SideList
import React, { useEffect, useState } from 'react'
import { IoIosClose, IoMdSearch, IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import UserInfo from './listComponents/UserInfo';
import Avatar from './listComponents/Avatar';
import { useUserStore } from '../lib/userStore';
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-toastify';
import Modal from './listComponents/Modal';


const List = () => {
    const { currentUser } = useUserStore()
    const [chatList, setChatList] = useState([])
    const [addUser, setAddUser] = useState(null)
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

    const handleAddNewUser = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const chatRef = collection(db, "chats")
        const userChatsRef = collection(db, "userchats")
        try {
            const newChatRef = doc(chatRef)
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            })
            await updateDoc(doc(userChatsRef, addUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            })
            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: addUser.id,
                    updatedAt: Date.now(),
                })
            })
        } catch (err) {
            console.log(err);
        } finally {
            toast.success("Add friend successful!")
            setModalOpen(false)
        }
    }

    const handleSearchNewUser = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        console.log(username);
        try {
            const userRef = collection(db, "users")
            const q = query(userRef, where("username", "==", username))
            const querySnapShot = await getDocs(q)
            if (!querySnapShot.empty) {
                setAddUser(querySnapShot.docs[0].data())
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
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
            <Modal handleAddNewUser={handleAddNewUser} handleSearchNewUser={handleSearchNewUser} setModalOpen={setModalOpen} addUser={addUser} />

        </>

    )
}

export default List
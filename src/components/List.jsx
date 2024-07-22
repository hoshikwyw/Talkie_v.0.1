import React, { useEffect, useState } from 'react'
import { IoIosClose, IoMdSearch, IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import UserInfo from './listComponents/UserInfo';
import Avatar from './listComponents/Avatar';
import { useUserStore } from '../lib/userStore';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';


const List = () => {
    const [chatList, setChatList] = useState([])
    const [addUser, setAddUser] = useState(null)
    const { currentUser } = useUserStore()

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
                <p className=' w-full flex flex-row items-center justify-between'>
                    <span className=' text-xl font-semibold'>Messages</span>
                    <label htmlFor="my-drawer" className="btn btn-ghost btn-primary drawer-button">
                        <IoIosClose size={36} />
                    </label>
                </p>
                <div className=' flex gap-2'>
                    <form className=' flex items-center rounded-md gap-1 bg-base-300 text-base' >
                        <input type="text" placeholder='Search' className=' outline-none py-1 px-2 bg-transparent' />
                        <button><IoMdSearch size={24} color='gray' /></button>
                    </form>
                    <label htmlFor="my_modal_6" className=" bg-base-300 rounded-md px-2 text-[12px] font-semibold py-2">Add</label>
                </div>
                <li className=' border-2 w-full overflow-hidden'>
                    {chatList.map((chat) => (
                        <UserInfo name="Halsey" avatar="" lastMessage="Hello, how are you?" status="online" />
                    ))}
                </li>
            </ul>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form className=' flex items-center rounded-md gap-1 bg-base-300 text-base justify-between px-2 py-1' onSubmit={handleSearchNewUser}>
                        <input type="text" placeholder='Search with username' name='username' className=' outline-none py-1 px-2 bg-transparent' />
                        <button><IoMdSearch size={24} color='gray' /></button>
                    </form>
                    {addUser && (
                        <div className=" mt-3 flex items-center border-2 px-3 py-2 rounded-md justify-between shadow-md">
                            <div className=" flex items-center gap-3">
                                <Avatar avatar={addUser.profile} name={addUser.username} />
                                <p>{addUser.username}</p>
                            </div>
                            <div className=' flex items-center gap-2'>
                                <button className=' btn btn-sm' onClick={handleAddNewUser}>Add</button>
                            </div>
                        </div>

                    )}
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn btn-sm">Cancel</label>
                    </div>
                </div>
            </div>
        </>

    )
}

export default List
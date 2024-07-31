import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import Avatar from './Avatar';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-toastify';

const AddUser = ({ setModalOpen, currentUser }) => {
    const [addUser, setAddUser] = useState(null)

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
            <div className="modal">
                <div className="modal-box z-50">
                    <form className=' flex items-center rounded-md gap-1 bg-base-300 text-base justify-between px-2 py-1' onSubmit={handleSearchNewUser}>
                        <input type="text" placeholder='Search with username' name='username' className=' outline-none py-1 px-2 bg-transparent' />
                        <button className=''><IoMdSearch size={24} color='gray' /></button>
                    </form>
                    {addUser && (
                        <div className=" mt-3 flex items-center border-2 px-3 py-2 rounded-md justify-between shadow-md">
                            <div className=" flex items-center gap-3">
                                <Avatar avatar={addUser.profile} name={addUser.username} />
                                <p>{addUser.username}</p>
                            </div>
                            <div className=' flex items-center gap-2 modal-action'>
                                <button className=' btn btn-sm' onClick={handleAddNewUser} htmlFor="my_modal_7">Add</button>
                            </div>
                        </div>

                    )}
                    <div className="modal-action">
                        <label onClick={() => setModalOpen(false)} htmlFor="my_modal_7" className="btn btn-sm">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUser




// import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";

// // Replace 'your-collection' with your actual collection name
// const collectionRef = collection(db, 'your-collection');

// try {
//   const querySnapshot = await getDocs(collectionRef);
//   querySnapshot.forEach((doc) => {
//     deleteDoc(doc.ref);
//   });
//   console.log("Collection deleted successfully!");
// } catch (error) {
//   console.error("Error deleting collection: ", error);
// }

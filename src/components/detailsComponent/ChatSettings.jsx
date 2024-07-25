import React from 'react'
import { MdBlock, MdNotificationsOff } from "react-icons/md";
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';


const ChatSettings = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    console.log("clicked>>");
    if (!user) return
    const userDocRef = doc(db, "users", currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isCurrentUserBlocked || isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  }

  // const handleDelete = () => {
  //   resetChat()
  // };

  return (
    <div className={`collapse collapse-arrow rounded-none border-b-2 border-base-300 `} >
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-base font-medium">Chat Settings</div>
      <div className="collapse-content flex flex-col items-start gap-2">
        <button className=' btn w-full btn-sm btn-accent'>Chat Background</button>
        <button className=' btn w-full btn-sm btn-info'>Delete Conversation</button>
        <button className=' btn w-full btn-sm btn-warning'><MdNotificationsOff />Mute</button>
        <button className=' btn w-full btn-sm btn-error flex items-center' onClick={handleBlock}>
          <MdBlock />
          {isCurrentUserBlocked ? `You are blocked` : isReceiverBlocked ? `Unblock user` : "Block User"}
        </button>
      </div>
    </div>
  )
}

export default ChatSettings
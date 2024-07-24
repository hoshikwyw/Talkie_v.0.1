import React, { useEffect, useRef, useState } from 'react'
import ChatHead from './chatComponents/ChatHead'
import { IoImage, IoCamera, IoMic, IoApps, IoSend, IoLogoOctocat } from "react-icons/io5";
import YouChat from './chatComponents/YouChat';
import EmojiPicker from 'emoji-picker-react';
import { SkinTones } from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useChatStore } from '../lib/chatStore';
import { useUserStore } from '../lib/userStore';

const Chat = () => {
  const textPlaceRef = useRef(null);
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [typeText, setTypeText] = useState('')
  const [chat, setChat] = useState()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()
  // console.log(chatId);

  const handleEmoji = (e) => {
    setTypeText(prev => prev + e.emoji)
    setEmojiOpen(false)
  }

  useEffect(() => {
    if (textPlaceRef.current) {
      textPlaceRef.current.scrollTop = textPlaceRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data())
    })
    return () => { unSub() }
  }, [chatId])

  const handleSend = async () => {
    if (typeText === "") return
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: typeText,
          createdAt: new Date(),
        })
      })
      const userIDs = [currentUser.id, user.id]
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id)
        const userChatsSnapshot = await getDoc(userChatsRef)
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()
          const chatIndex = userChatsData.chats.findIndex((item) => item.chatId === chatId)
          userChatsData.chats[chatIndex].lastMessage = typeText
          userChatsData.chats[chatIndex].updatedAt = Date.now()
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats
          })
        }
      })
    } catch (err) {
      console.log(err);
    } finally {
      setTypeText("")
    }
  }

  return (
    <div className=' grid grid-rows-[auto_1fr_auto] h-[calc(100vh-4.4rem)] relative'>
      <ChatHead
        name={user?.username || ""}
        avatar={user?.profile || ""}
        status="online"
        className="h-20"
      />
      <div
        ref={textPlaceRef}
        className=" p-5 overflow-y-scroll no-scrollbar"
      >
        {chat?.messages?.map((message) => (
          <YouChat key={message.createAt} message={message} user={user} currentUser={currentUser} />
        ))}
      </div>

      <div className="flex items-end justify-between px-3 py-2 bg-base-300">
        <div className="flex items-center">
          <button className='btn btn-ghost btn-circle'><IoApps size={24} /></button>
          <button className='btn btn-ghost btn-circle'><IoImage size={24} /></button>
          <button className='btn btn-ghost btn-circle'><IoCamera size={24} /></button>
          <button className='btn btn-ghost btn-circle'><IoMic size={24} /></button>
        </div>
        <div className="flex items-center px-3 py-1 bg-base-200 rounded-2xl w-[50%] lg:w-[80%] relative">
          <textarea
            className='bg-transparent text-base outline-none w-full h-auto resize-none leading-snug p-2'
            placeholder='Type a message'
            value={typeText}
            rows={1}
            onChange={e => setTypeText(e.target.value)}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button className='btn btn-ghost btn-circle'><IoLogoOctocat size={24} onClick={() => setEmojiOpen(!emojiOpen)} /></button>
        </div>
        {emojiOpen && (
          <div className="absolute bottom-16 right-1">
            <EmojiPicker
              onEmojiClick={handleEmoji}
              onSkinToneChange={SkinTones}
              pickerStyle={{
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                zIndex: 50,
                background: 'transparent'
              }}
            />
          </div>
        )}
        <button className='btn btn-ghost btn-circle' onClick={handleSend}><IoSend size={24} /></button>
      </div>
    </div>
  )
}

export default Chat

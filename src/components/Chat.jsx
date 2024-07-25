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
import upload from "../lib/upload"

const Chat = () => {
  const textPlaceRef = useRef(null);
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [typeText, setTypeText] = useState('')
  const [chat, setChat] = useState()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()
  const [img, setImg] = useState({
    file: null,
    url: "",
  })
  console.log(isCurrentUserBlocked,"current user");
  console.log(isReceiverBlocked,"receiver");

  const handleEmoji = (e) => {
    setTypeText(prev => prev + e.emoji)
    setEmojiOpen(false)
  }

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
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
    let imgUrl = null
    console.log(imgUrl);
    try {
      if (img.file) {
        imgUrl = await upload(img.file)
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: typeText,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl })
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
      setImg({ file: null, url: "" })
      setTypeText("")
    }
  }

  return (
    <div className=' grid grid-rows-[auto_1fr_auto] h-[calc(100vh-4.4rem)] relative'>
      <ChatHead
        name={user?.username || ""}
        avatar={user?.profile || ""}
        status=""
        className="h-20"
      />
      <div
        ref={textPlaceRef}
        className=" p-5 overflow-y-scroll no-scrollbar"
      >
        {chat?.messages?.map((message) => (
          <YouChat key={message.createdAt} message={message} img={img} user={user} currentUser={currentUser} />
        ))}
      </div>

      <div className="flex items-end justify-between px-3 py-2 bg-base-300">
        {isCurrentUserBlocked || isReceiverBlocked ? (
          <div className=' w-full items-center justify-center'>
            <p className=' text-center font-semibold'>You cannot send a message</p>
          </div>
        ) : (
          <div className=" w-full flex items-center">
            <div className="flex items-center">
              <button className='btn btn-ghost btn-circle'><IoApps size={24} /></button>
              <label htmlFor="file" className='btn btn-ghost btn-circle'><IoImage size={24} /></label>
              <input type='file' id='file' onChange={handleImg} className=' hidden' />
              <button className='btn btn-ghost btn-circle'><IoCamera size={24} /></button>
              <button className='btn btn-ghost btn-circle'><IoMic size={24} /></button>
            </div>
            <div className="flex items-center px-3 py-1 bg-base-200 rounded-2xl w-[50%] lg:w-[80%] relative">
              {img.url && (
                <div className="image-container size-14 leading-snug">
                  <img src={img.url} alt="Displayed" />
                </div>
              )}
              <textarea
                className='bg-transparent text-base outline-none w-full h-auto resize-none leading-snug p-2'
                placeholder={
                  isCurrentUserBlocked || isReceiverBlocked
                    ? "You cannot send a message"
                    : "Type a message..."
                }
                value={typeText}
                rows={1}
                onChange={e => setTypeText(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}

              />
              <button className='btn btn-ghost btn-circle' ><IoLogoOctocat size={24} onClick={() => setEmojiOpen(!emojiOpen)} /></button>
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
            <button className='btn btn-ghost btn-circle' onClick={handleSend} ><IoSend size={24} /></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat

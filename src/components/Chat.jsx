import React, { useEffect, useRef, useState } from 'react'
import ChatHead from './chatComponents/ChatHead'
import { IoImage, IoSend } from "react-icons/io5"
import { IoLogoOctocat } from "react-icons/io5"
import YouChat from './chatComponents/YouChat'
import EmojiPicker from 'emoji-picker-react'
import { SkinTones } from 'emoji-picker-react'
import { useChatStore } from '../lib/chatStore'
import { useUserStore } from '../lib/userStore'
import { subscribeToChat, sendMessage } from '../lib/services/chatService'
import SubDetails from './SubDetails'

const Chat = () => {
  const textPlaceRef = useRef(null)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [typeText, setTypeText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [chat, setChat] = useState()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()
  const [img, setImg] = useState({ file: null, url: "" })

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
      textPlaceRef.current.scrollTop = textPlaceRef.current.scrollHeight
    }
  }, [chat?.messages?.length])

  useEffect(() => {
    const unSub = subscribeToChat(chatId, setChat)
    return () => { unSub() }
  }, [chatId])

  const handleSend = async () => {
    if (typeText.trim() === "" && !img.file) return
    setIsSending(true)
    const textToSend = typeText
    const imgToSend = img.file
    setTypeText("")
    setImg({ file: null, url: "" })

    try {
      await sendMessage(chatId, currentUser, user, textToSend, imgToSend)
    } catch (err) {
      console.error("Failed to send message:", err)
      setTypeText(textToSend)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="w-full drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="w-full drawer-content">
        <div className="grid grid-rows-[auto_1fr_auto] h-[calc(100vh-4.4rem)] relative">
          <ChatHead
            name={user?.username || ""}
            avatar={user?.profile || ""}
            status=""
            className="h-20"
          />
          <div ref={textPlaceRef} className="p-5 overflow-y-scroll no-scrollbar">
            {chat?.messages?.length === 0 && (
              <div className="flex items-center justify-center h-full text-base-content/50">
                <p>No messages yet. Say hello!</p>
              </div>
            )}
            {chat?.messages?.map((message, index) => (
              <YouChat
                key={message.messageId || `${message.senderId}-${index}`}
                message={message}
                user={user}
                currentUser={currentUser}
              />
            ))}
          </div>
          <div className="flex items-end justify-between w-full px-3 py-2 bg-base-300">
            {isCurrentUserBlocked || isReceiverBlocked ? (
              <div className="items-center justify-center w-full">
                <p className="font-semibold text-center">You cannot send a message</p>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <div className="flex items-center">
                  <label htmlFor="file" className="btn btn-ghost btn-circle btn-sm">
                    <IoImage size={20} />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleImg}
                    className="hidden"
                  />
                </div>
                <div className="flex items-center px-2 py-1 bg-base-200 rounded-2xl w-[50%] lg:w-[80%] relative">
                  {img.url && (
                    <div className="pt-2 leading-snug image-container size-14">
                      <img src={img.url} alt="Attached" />
                    </div>
                  )}
                  <textarea
                    className="w-full h-auto px-2 py-1 text-sm leading-snug bg-transparent outline-none resize-none"
                    placeholder="Type a message..."
                    value={typeText}
                    rows={1}
                    onChange={(e) => setTypeText(e.target.value)}
                    onInput={(e) => {
                      e.target.style.height = "auto"
                      e.target.style.height = `${e.target.scrollHeight}px`
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                  />
                  <button className="btn btn-ghost btn-circle btn-sm">
                    <IoLogoOctocat
                      size={20}
                      onClick={() => setEmojiOpen(!emojiOpen)}
                    />
                  </button>
                  <button
                    className="btn btn-ghost btn-circle btn-sm"
                    onClick={handleSend}
                    disabled={isSending}
                  >
                    <IoSend size={20} />
                  </button>
                </div>
                {emojiOpen && (
                  <div className="absolute bottom-16 right-1">
                    <EmojiPicker
                      onEmojiClick={handleEmoji}
                      onSkinToneChange={SkinTones}
                      pickerStyle={{
                        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                        zIndex: 50,
                        background: "transparent",
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <div className="w-full p-4 menu bg-base-200">
          <SubDetails />
        </div>
      </div>
    </div>
  )
}

export default Chat

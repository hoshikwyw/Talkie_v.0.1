import React, { useEffect, useRef, useState } from 'react'
import ChatHead from './subComponents/ChatHead'
import { IoImage, IoCamera, IoMic, IoApps, IoSend, IoLogoOctocat } from "react-icons/io5";
import YouChat from './subComponents/YouChat';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const textPlaceRef = useRef(null);
  const [emojiOpen, setEmojiOpen] = useState(true)
  const [typeText, setTypeText] = useState('')

  const handleEmoji = (e) => {
    setTypeText(prev => prev + e.emoji)
    setEmojiOpen(false)
  }

  // Scroll to the bottom when the component mounts or updates
  useEffect(() => {
    if (textPlaceRef.current) {
      textPlaceRef.current.scrollTop = textPlaceRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className='grid grid-rows-[auto_1fr_auto] h-[calc(100vh-4.5rem)] relative'> {/* Using grid layout to handle the height distribution */}
      <ChatHead
        name="Halsey"
        avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        status="online"
        className="h-16"
      />
      <div
        ref={textPlaceRef}
        className="overflow-y-auto p-5 textPlace"
      >
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
        <YouChat />
      </div>
      <div className="flex items-end justify-between px-3 py-2 bg-base-300">
        <div className="flex items-center">
          <button className='btn btn-ghost'><IoApps size={24} /></button>
          <button className='btn btn-ghost'><IoImage size={24} /></button>
          <button className='btn btn-ghost'><IoCamera size={24} /></button>
          <button className='btn btn-ghost'><IoMic size={24} /></button>
        </div>
        <div className="flex items-center px-3 py-1 bg-base-200 rounded-md w-[50%] lg:w-[60%] relative">
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
          <button className='btn btn-ghost'><IoLogoOctocat size={24} onClick={() => setEmojiOpen(!emojiOpen)} /></button>
        </div>
        {emojiOpen && (
          <div className="absolute bottom-16 right-1">
            <EmojiPicker
              onEmojiClick={handleEmoji}
              pickerStyle={{
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                zIndex: 50,
              }}
            />
          </div>
        )}
        <button className='btn btn-ghost'><IoSend size={24} /></button>
      </div>
    </div>
  )
}

export default Chat

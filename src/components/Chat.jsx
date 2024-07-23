import React, { useEffect, useRef, useState } from 'react'
import ChatHead from './chatComponents/ChatHead'
import { IoImage, IoCamera, IoMic, IoApps, IoSend, IoLogoOctocat } from "react-icons/io5";
import YouChat from './chatComponents/YouChat';
import EmojiPicker from 'emoji-picker-react';
import { SkinTones } from 'emoji-picker-react';

const Chat = () => {
  const textPlaceRef = useRef(null);
  const [emojiOpen, setEmojiOpen] = useState(false)
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
        avatar=""
        status="online"
        className="h-20"
      />
      <div
        ref={textPlaceRef}
        className=" p-5 overflow-y-scroll no-scrollbar"
      >
        <YouChat />
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
        <button className='btn btn-ghost btn-circle'><IoSend size={24} /></button>
      </div>
    </div>
  )
}

export default Chat

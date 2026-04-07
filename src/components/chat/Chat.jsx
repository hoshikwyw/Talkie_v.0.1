import { useEffect, useRef, useState } from 'react'
import { IoImage, IoSend } from 'react-icons/io5'
import { IoLogoOctocat } from 'react-icons/io5'
import ChatHead from './ChatHead'
import ChatBubble from './ChatBubble'
import EmojiPicker from 'emoji-picker-react'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { subscribeToChat, sendMessage } from '../../lib/services/chatService'

const Chat = ({ onDetailToggle }) => {
  const scrollRef = useRef(null)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [typeText, setTypeText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [chat, setChat] = useState()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()
  const [img, setImg] = useState({ file: null, url: '' })

  const handleEmoji = (e) => {
    setTypeText((prev) => prev + e.emoji)
    setEmojiOpen(false)
  }

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chat?.messages?.length])

  useEffect(() => {
    const unSub = subscribeToChat(chatId, setChat)
    return () => unSub()
  }, [chatId])

  const handleSend = async () => {
    if (typeText.trim() === '' && !img.file) return
    setIsSending(true)
    const textToSend = typeText
    const imgToSend = img.file
    setTypeText('')
    setImg({ file: null, url: '' })
    try {
      await sendMessage(chatId, currentUser, user, textToSend, imgToSend)
    } catch (err) {
      console.error('Failed to send message:', err)
      setTypeText(textToSend)
    } finally {
      setIsSending(false)
    }
  }

  const blocked = isCurrentUserBlocked || isReceiverBlocked

  return (
    <div className="flex flex-col h-full">
      <ChatHead name={user?.username || ''} avatar={user?.profile || ''} onDetailToggle={onDetailToggle} />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pixel-scrollbar p-4">
        {(!chat?.messages || chat.messages.length === 0) && (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="font-pixel text-[10px] text-pixel-muted text-shadow-pixel">NO MESSAGES YET</span>
            <span className="font-body text-pixel-muted">Say hello!</span>
          </div>
        )}
        {chat?.messages?.map((message, index) => (
          <ChatBubble
            key={message.messageId || `${message.senderId}-${index}`}
            message={message}
            user={user}
            currentUser={currentUser}
          />
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-surface border-t-3 border-pixel-cream/10">
        {blocked ? (
          <div className="text-center py-3">
            <span className="font-pixel text-[8px] text-pixel-red">BLOCKED - CANNOT SEND MESSAGES</span>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <label htmlFor="chat-file" className="pixel-btn-ghost !p-2 cursor-pointer flex-shrink-0">
              <IoImage size={20} className="text-pixel-purple" />
            </label>
            <input type="file" id="chat-file" onChange={handleImg} className="hidden" />

            <div className="flex-1 flex flex-col pixel-input !p-0 !shadow-none relative">
              {img.url && (
                <div className="p-2 border-b border-pixel-cream/10">
                  <div className="relative inline-block">
                    <img src={img.url} alt="Attached" className="h-16 rounded-sm border-2 border-pixel-cream/10" />
                    <button
                      onClick={() => setImg({ file: null, url: '' })}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-pixel-red text-pixel-cream text-xs flex items-center justify-center"
                    >
                      x
                    </button>
                  </div>
                </div>
              )}
              <textarea
                className="bg-transparent outline-none font-body text-lg text-pixel-cream w-full px-3 py-2 resize-none placeholder:text-pixel-muted/50"
                placeholder="Type a message..."
                value={typeText}
                rows={1}
                onChange={(e) => setTypeText(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = 'auto'
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
            </div>

            <button onClick={() => setEmojiOpen(!emojiOpen)} className="pixel-btn-ghost !p-2 flex-shrink-0">
              <IoLogoOctocat size={20} className="text-pixel-yellow" />
            </button>

            <button onClick={handleSend} disabled={isSending} className="pixel-btn-primary !p-2 flex-shrink-0">
              <IoSend size={18} />
            </button>

            {emojiOpen && (
              <div className="absolute bottom-20 right-4 z-50">
                <EmojiPicker onEmojiClick={handleEmoji} theme="dark" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat

import { useEffect, useRef, useState } from 'react'
import { IoImage, IoSend } from 'react-icons/io5'
import { IoLogoOctocat } from 'react-icons/io5'
import ChatHead from './ChatHead'
import ChatBubble from './ChatBubble'
import EmojiPicker from 'emoji-picker-react'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { subscribeToChat, sendMessage } from '../../lib/services/chatService'
import { useThemeStore } from '../../lib/themeStore'

const Chat = ({ onDetailToggle }) => {
  const scrollRef = useRef(null)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [typeText, setTypeText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [chat, setChat] = useState()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()
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
    <div className="flex flex-col h-full" style={{ background: theme.bg }}>
      <ChatHead name={user?.username || ''} avatar={user?.profile || ''} onDetailToggle={onDetailToggle} />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pixel-scrollbar px-4 py-6 md:px-8">
        {(!chat?.messages || chat.messages.length === 0) && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <span className="font-pixel text-[10px]" style={{ color: theme.muted }}>NO MESSAGES YET</span>
            <span className="font-body text-lg" style={{ color: theme.muted }}>Say hello!</span>
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
      <div className="px-4 py-3 md:px-8" style={{ background: theme.surface, borderTop: `2px solid ${theme.muted}20` }}>
        {blocked ? (
          <div className="text-center py-3">
            <span className="font-pixel text-[9px]" style={{ color: theme.primary }}>BLOCKED - CANNOT SEND</span>
          </div>
        ) : (
          <div className="flex items-end gap-3">
            {/* Image upload */}
            <label htmlFor="chat-file" className="flex-shrink-0 p-2 rounded-xl cursor-pointer transition-colors hover:opacity-80"
                   style={{ background: `${theme.primary}15` }}>
              <IoImage size={20} style={{ color: theme.primary }} />
            </label>
            <input type="file" id="chat-file" onChange={handleImg} className="hidden" />

            {/* Text input area */}
            <div className="flex-1 rounded-2xl overflow-hidden" style={{ background: theme.surfaceLight, border: `1px solid ${theme.muted}20` }}>
              {img.url && (
                <div className="px-3 pt-3" style={{ borderBottom: `1px solid ${theme.muted}15` }}>
                  <div className="relative inline-block">
                    <img src={img.url} alt="Attached" className="h-16 rounded-lg border border-white/10" />
                    <button
                      onClick={() => setImg({ file: null, url: '' })}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center"
                      style={{ background: theme.primary, color: theme.bg }}
                    >
                      x
                    </button>
                  </div>
                </div>
              )}
              <textarea
                className="bg-transparent outline-none font-body text-lg w-full px-4 py-3 resize-none"
                style={{ color: theme.text }}
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

            {/* Emoji */}
            <button onClick={() => setEmojiOpen(!emojiOpen)}
                    className="flex-shrink-0 p-2 rounded-xl transition-colors hover:opacity-80"
                    style={{ background: `${theme.accent}15` }}>
              <IoLogoOctocat size={20} style={{ color: theme.accent }} />
            </button>

            {/* Send */}
            <button onClick={handleSend} disabled={isSending}
                    className="flex-shrink-0 p-3 rounded-xl transition-all hover:scale-105 active:scale-95"
                    style={{ background: theme.primary, color: theme.bg }}>
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

import { useEffect, useRef, useState } from 'react'
import { IoSend } from 'react-icons/io5'
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
  const emojiBtnRef = useRef(null)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [typeText, setTypeText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [chat, setChat] = useState()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  const handleEmoji = (e) => {
    setTypeText((prev) => prev + e.emoji)
    setEmojiOpen(false)
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
    if (typeText.trim() === '') return
    setIsSending(true)
    const textToSend = typeText
    setTypeText('')
    try {
      await sendMessage(chatId, currentUser, user, textToSend)
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
      <div ref={scrollRef} className="flex-1 overflow-y-auto pixel-scrollbar px-3 py-4 sm:px-6 sm:py-6">
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

      {/* Emoji picker */}
      {emojiOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setEmojiOpen(false)} />

          {/* Mobile: fixed bottom sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-hidden shadow-2xl sm:hidden"
               style={{ border: `1px solid ${theme.muted}20`, borderBottom: 'none' }}>
            <EmojiPicker
              onEmojiClick={handleEmoji}
              theme="dark"
              width="100%"
              height={280}
              searchDisabled
              skinTonesDisabled
              previewConfig={{ showPreview: false }}
              lazyLoadEmojis
            />
          </div>

          {/* Desktop/tablet: anchored above emoji button */}
          {emojiBtnRef.current && (() => {
            const rect = emojiBtnRef.current.getBoundingClientRect()
            return (
              <div className="fixed z-50 rounded-xl overflow-hidden shadow-2xl hidden sm:block"
                   style={{
                     border: `1px solid ${theme.muted}20`,
                     bottom: window.innerHeight - rect.top + 8,
                     right: window.innerWidth - rect.right,
                   }}>
                <EmojiPicker
                  onEmojiClick={handleEmoji}
                  theme="dark"
                  width={300}
                  height={350}
                  searchDisabled
                  skinTonesDisabled
                  previewConfig={{ showPreview: false }}
                  lazyLoadEmojis
                />
              </div>
            )
          })()}
        </>
      )}

      {/* Input bar */}
      <div className="px-2 py-2 sm:px-4 sm:py-2.5"
           style={{ background: theme.surface, borderTop: `1px solid ${theme.muted}15` }}>
        {blocked ? (
          <div className="text-center py-3">
            <span className="font-body text-base" style={{ color: theme.muted }}>You cannot send messages in this chat</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Text input */}
            <div className="flex-1 min-w-0 rounded-2xl overflow-hidden"
                 style={{ background: theme.surfaceLight, border: `1px solid ${theme.muted}15` }}>
              <textarea
                className="bg-transparent outline-none font-body text-lg w-full px-3 py-2.5 sm:px-4 sm:py-3 resize-none"
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
            <div className="relative flex-shrink-0" ref={emojiBtnRef}>
              <button onClick={() => setEmojiOpen(!emojiOpen)}
                      className="p-2 rounded-full"
                      style={{ color: theme.muted }}>
                <IoLogoOctocat size={20} />
              </button>
            </div>

            {/* Send */}
            <button onClick={handleSend} disabled={isSending}
                    className="flex-shrink-0 p-2.5 rounded-full transition-all active:scale-95"
                    style={{ background: theme.primary, color: theme.bg }}>
              <IoSend size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat

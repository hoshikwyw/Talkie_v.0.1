import { useEffect, useState } from 'react'
import { subscribeToChat } from '../../lib/services/chatService'
import { useThemeStore } from '../../lib/themeStore'

const SharedImgs = ({ chatId }) => {
  const [sharedImgs, setSharedImgs] = useState([])
  const [expanded, setExpanded] = useState(false)
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  useEffect(() => {
    const unSub = subscribeToChat(chatId, (data) => {
      const messages = data?.messages || []
      setSharedImgs(messages.filter((msg) => msg.img))
    })
    return () => unSub()
  }, [chatId])

  return (
    <div className="p-4">
      <button onClick={() => setExpanded(!expanded)}
              className="font-pixel text-[8px] tracking-wider flex items-center gap-2 w-full"
              style={{ color: theme.muted }}>
        SHARED PHOTOS ({sharedImgs.length})
        <span style={{ color: theme.primary }}>{expanded ? '[-]' : '[+]'}</span>
      </button>
      {expanded && (
        <div className="flex flex-wrap gap-2 mt-3">
          {sharedImgs.map((photo, index) => (
            <div key={photo.messageId || index} className="w-16 h-16 rounded-lg overflow-hidden"
                 style={{ border: `1px solid ${theme.muted}20` }}>
              <img src={photo.img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          {sharedImgs.length === 0 && (
            <p className="font-body text-sm" style={{ color: theme.muted }}>No photos yet</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SharedImgs

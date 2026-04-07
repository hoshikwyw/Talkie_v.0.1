import { useEffect, useState } from 'react'
import { subscribeToChat } from '../../lib/services/chatService'

const SharedImgs = ({ chatId }) => {
  const [sharedImgs, setSharedImgs] = useState([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const unSub = subscribeToChat(chatId, (data) => {
      const messages = data?.messages || []
      setSharedImgs(messages.filter((msg) => msg.img))
    })
    return () => unSub()
  }, [chatId])

  return (
    <div className="p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="font-pixel text-[8px] text-pixel-muted mb-3 tracking-wider flex items-center gap-2 w-full"
      >
        SHARED PHOTOS ({sharedImgs.length})
        <span className="text-pixel-orange">{expanded ? '[-]' : '[+]'}</span>
      </button>
      {expanded && (
        <div className="flex flex-wrap gap-2">
          {sharedImgs.map((photo, index) => (
            <div key={photo.messageId || index} className="w-16 h-16 border-2 border-pixel-cream/10 overflow-hidden">
              <img src={photo.img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          {sharedImgs.length === 0 && (
            <p className="font-body text-sm text-pixel-muted">No photos shared yet</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SharedImgs

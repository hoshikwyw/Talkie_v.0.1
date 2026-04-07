import { useEffect, useState } from 'react'
import { subscribeToChat } from '../../lib/services/chatService'
import { useThemeStore } from '../../lib/themeStore'
import { IoChevronDown, IoChevronForward } from 'react-icons/io5'

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
    <div className="px-4 py-5">
      <button onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 w-full font-body text-sm uppercase tracking-widest"
              style={{ color: theme.muted }}>
        {expanded ? <IoChevronDown size={14} /> : <IoChevronForward size={14} />}
        Shared photos
        <span className="ml-auto font-body text-base" style={{ color: theme.primary }}>{sharedImgs.length}</span>
      </button>
      {expanded && (
        <div className="flex flex-wrap gap-2 mt-3">
          {sharedImgs.map((photo, index) => (
            <div key={photo.messageId || index}
                 className="w-16 h-16 rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-2 hover:ring-white/20 transition-all cursor-pointer">
              <img src={photo.img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          {sharedImgs.length === 0 && (
            <p className="font-body text-base py-2" style={{ color: theme.muted }}>No photos yet</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SharedImgs

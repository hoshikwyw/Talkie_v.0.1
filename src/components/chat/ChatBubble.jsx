import Avatar from '../sidebar/Avatar'
import { useThemeStore } from '../../lib/themeStore'

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

const ChatBubble = ({ message, user, currentUser }) => {
  const isOwn = message.senderId === currentUser.id
  const { getTheme, getBubble } = useThemeStore()
  const theme = getTheme()
  const bubble = getBubble()

  return (
    <div className={`flex gap-2.5 mb-4 ${isOwn ? 'flex-row-reverse' : ''} group`}>
      {/* Avatar */}
      <div className="flex-shrink-0 self-end mb-4">
        <Avatar
          avatar={isOwn ? currentUser?.profile : user?.profile}
          name={isOwn ? currentUser?.username : user?.username}
          size={30}
          online
        />
      </div>

      {/* Bubble content */}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[75%] min-w-[80px]`}>
        {/* Bubble */}
        <div
          className={`
            px-4 py-3
            bg-gradient-to-br ${isOwn ? theme.bubbleOwn : theme.bubbleOther}
            border ${isOwn ? theme.bubbleOwnBorder : theme.bubbleOtherBorder}
            ${isOwn ? bubble.own : bubble.other}
            backdrop-blur-sm
          `}
        >
          {message.img && (
            <img
              src={message.img}
              alt=""
              className="max-w-[240px] rounded-lg mb-2 border border-white/10"
            />
          )}
          {message.text && (
            <p className="font-body text-[20px] leading-relaxed break-words" style={{ color: theme.text }}>
              {message.text}
            </p>
          )}
        </div>

        {/* Time — always visible */}
        <span className="font-body text-[12px] mt-1 px-1" style={{ color: `${theme.muted}90` }}>
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default ChatBubble

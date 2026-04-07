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
    <div className={`flex gap-2.5 mb-5 ${isOwn ? 'flex-row-reverse' : ''} group`}>
      {/* Avatar */}
      <div className="flex-shrink-0 self-end mb-5">
        <Avatar
          avatar={isOwn ? currentUser?.profile : user?.profile}
          name={isOwn ? currentUser?.username : user?.username}
          size={32}
        />
      </div>

      {/* Bubble content */}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[65%]`}>
        {/* Name */}
        <span className={`font-body text-xs mb-1 px-1 ${isOwn ? 'text-right' : ''}`}
              style={{ color: theme.muted }}>
          {isOwn ? 'You' : user?.username}
        </span>

        {/* Bubble */}
        <div
          className={`
            relative px-4 py-2.5
            bg-gradient-to-br ${isOwn ? theme.bubbleOwn : theme.bubbleOther}
            border ${isOwn ? theme.bubbleOwnBorder : theme.bubbleOtherBorder}
            ${isOwn ? bubble.own : bubble.other}
            backdrop-blur-sm
            transition-all duration-200
            hover:scale-[1.01]
          `}
        >
          {message.img && (
            <img
              src={message.img}
              alt=""
              className="max-w-[220px] rounded-lg mb-2 border border-white/10"
            />
          )}
          {message.text && (
            <p className="font-body text-[20px] leading-relaxed break-words" style={{ color: theme.text }}>
              {message.text}
            </p>
          )}
        </div>

        {/* Time */}
        <span className={`font-body text-[13px] mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity`}
              style={{ color: theme.muted }}>
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default ChatBubble

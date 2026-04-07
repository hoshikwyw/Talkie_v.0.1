import Avatar from '../sidebar/Avatar'

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

  return (
    <div className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <div className="flex-shrink-0 self-end">
        <Avatar
          avatar={isOwn ? currentUser?.profile : user?.profile}
          name={isOwn ? currentUser?.username : user?.username}
          size={28}
        />
      </div>
      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-4 py-2 ${isOwn ? 'bubble-own' : 'bubble-other'}`}>
          {message.img && (
            <img
              src={message.img}
              alt=""
              className="max-w-[200px] rounded-sm border-2 border-pixel-cream/10 mb-2"
            />
          )}
          {message.text && (
            <p className="font-body text-lg leading-snug break-words">{message.text}</p>
          )}
        </div>
        <span className={`font-body text-xs text-pixel-muted mt-1 ${isOwn ? 'text-right' : ''}`}>
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default ChatBubble

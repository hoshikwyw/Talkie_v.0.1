import React from 'react'
import Avatar from '../listComponents/Avatar'

function formatTime(timestamp) {
  if (!timestamp) return ""
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "numeric",
  }).format(date)
}

const YouChat = ({ message, user, currentUser }) => {
  const isOwn = message.senderId === currentUser.id

  return (
    <div className={`chat ${isOwn ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image">
        <Avatar
          avatar={isOwn ? currentUser?.profile : user?.profile}
          name={isOwn ? currentUser?.username : user?.username}
          status="online"
        />
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">{formatTime(message.createdAt)}</time>
      </div>
      <div className="chat-bubble">
        {message.img && (
          <img src={message.img} alt="" className='size-32 rounded-md' />
        )}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  )
}

export default YouChat

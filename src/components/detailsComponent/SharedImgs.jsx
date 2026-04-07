import React, { useEffect, useState } from 'react'
import SendImg from './SendImg'
import { subscribeToChat } from '../../lib/services/chatService'

const SharedImgs = ({ chatId }) => {
  const [sharedImgs, setSharedImgs] = useState([])

  useEffect(() => {
    const unSub = subscribeToChat(chatId, (data) => {
      const messages = data?.messages || []
      setSharedImgs(messages.filter((msg) => msg.img))
    })
    return () => { unSub() }
  }, [chatId])

  return (
    <div className="collapse collapse-arrow rounded-none">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-base font-medium">Shared Photos</div>
      <div className="collapse-content flex flex-row flex-wrap gap-2">
        {sharedImgs.map((photo, index) => (
          <SendImg key={photo.messageId || index} src={photo.img} />
        ))}
      </div>
    </div>
  )
}

export default SharedImgs

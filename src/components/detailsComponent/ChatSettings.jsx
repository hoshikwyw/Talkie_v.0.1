import React, { useState } from 'react'

const ChatSettings = () => {
  const [click, setClick] = useState(true)

  return (
    <div className={`collapse collapse-arrow rounded-none ${click ? 'collapse-open' : 'collapse-close'}`} >
      <input type="radio" name="my-accordion-2" checked onClick={() => setClick(!click)} />
      <div className="collapse-title text-base font-medium">Chat Settings</div>
      <div className="collapse-content flex flex-col items-start">
        <button>Mute</button>
        <button>Delete Conversation</button>
        <button>Block</button>
      </div>
    </div>
  )
}

export default ChatSettings
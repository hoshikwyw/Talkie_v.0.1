import React from 'react'
import { MdBlock, MdNotificationsOff } from "react-icons/md";


const ChatSettings = () => {

  return (
    <div className={`collapse collapse-arrow rounded-none border-b-2 border-base-300 `} >
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-base font-medium">Chat Settings</div>
      <div className="collapse-content flex flex-col items-start gap-2">
        <button className=' btn w-full btn-sm btn-accent'>Chat Background</button>
        <button className=' btn w-full btn-sm btn-info'>Delete Conversation</button>
        <button className=' btn w-full btn-sm btn-warning'><MdNotificationsOff />Mute</button>
        <button className=' btn w-full btn-sm btn-error flex items-center'><MdBlock />
          Block</button>
      </div>
    </div>
  )
}

export default ChatSettings
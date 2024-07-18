import Avvvatars from 'avvvatars-react'
import React from 'react'

const Avatar = ({ avatar, name, status }) => {
  return (
    <div className={`avatar ${status === 'online' ? 'ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2' : 'w-10 rounded-full ring-offset-base-100 ring ring-offset-2 ring-gray-400'}`}>
        <div className="w-12 rounded-full">
            {avatar ? <img src={avatar} alt={name} /> : <Avvvatars value={name} size={40} />}
        </div>
    </div>
  )
}

export default Avatar
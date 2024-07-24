import React from 'react'
import Avatar from '../listComponents/Avatar'

const YouChat = ({ key, message, user, currentUser }) => {
    // console.log(message);
    // console.log(user);
    // console.log(currentUser);
    return (
        <div>
            <div className={`chat ${message.senderId === currentUser.id ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image">
                    <Avatar avatar={message.senderId === currentUser.id ? currentUser.profile : user.profile} name="Halsey" status="online" />
                </div>
                <div className="chat-header">
                    {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">
                    {message.img && (
                        <img src={message.img} alt="" className=' size-32 rounded-md' />
                    )}
                    {message.text && (
                        <p>{message.text}</p>
                    )}
                </div>
                {/* <div className="chat-footer opacity-50">2 hours ago</div> */}
            </div>
        </div>
    )
}

export default YouChat
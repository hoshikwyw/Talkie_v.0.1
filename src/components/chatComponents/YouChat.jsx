import React from 'react'
import Avatar from '../listComponents/Avatar'
import { useUserStore } from '../../lib/userStore'

const YouChat = (props) => {
    const { currentUser } = useUserStore()
    return (
        <div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <Avatar avatar="" name="Halsey" status="online" />
                </div>
                <div className="chat-header">
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <Avatar avatar={currentUser.profile || ""} />
                </div>
                <div className="chat-header">
                    Me
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">
                    <img src="/pfp.jpg" alt="" />
                </div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
        </div>
    )
}

export default YouChat
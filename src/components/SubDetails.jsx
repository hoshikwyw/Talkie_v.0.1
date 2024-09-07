import React from 'react'
import { useUserStore } from '../lib/userStore'
import { useChatStore } from '../lib/chatStore'
import UserCard from './detailsComponent/UserCard'
import ChatSettings from './detailsComponent/ChatSettings'
import SharedFiles from './detailsComponent/SharedFiles'
import SharedImgs from './detailsComponent/SharedImgs'

const SubDetails = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
    const { currentUser } = useUserStore()
    return (
        <>
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className=" drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full">
                {/* <UserCard name={user.username} avatar={user.profile} status="" />
                <div className="">
                    <ChatSettings />
                    <SharedFiles />
                    <SharedImgs chatId={chatId} />
                </div> */}
                <h1>Hello side drawer</h1>
            </ul>
        </>
    )
}

export default SubDetails

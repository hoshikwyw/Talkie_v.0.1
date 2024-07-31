import React from 'react'
import UserCard from './detailsComponent/UserCard'
import ChatSettings from './detailsComponent/ChatSettings'
import SharedFiles from './detailsComponent/SharedFiles'
import SharedImgs from './detailsComponent/SharedImgs'
import { useChatStore } from '../lib/chatStore'
import { useUserStore } from '../lib/userStore'

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()

  return (
    <div className=' grid grid-rows-[auto_1fr_auto] h-[calc(100vh-4.4rem)] relative overflow-y-scroll no-scrollbar'>
      <UserCard name={user.username} avatar={user.profile} status="" />
      <div className="">
        <ChatSettings />
        <SharedFiles />
        <SharedImgs chatId={chatId} />
      </div>
    </div>
  )
}

export default Detail
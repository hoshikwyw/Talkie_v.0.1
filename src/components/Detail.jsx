import React from 'react'
import UserCard from './detailsComponent/UserCard'
import ChatSettings from './detailsComponent/ChatSettings'
import SharedFiles from './detailsComponent/SharedFiles'
import SharedImgs from './detailsComponent/SharedImgs'

const Detail = () => {
  return (
    <div>
      <UserCard name="Halsey" avatar="/user.jpg" status="online" />
      <div className="">
        <ChatSettings />
        <SharedFiles />
        <SharedImgs />
      </div>
    </div>
  )
}

export default Detail
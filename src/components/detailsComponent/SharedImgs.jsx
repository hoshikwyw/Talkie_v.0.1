import React, { useEffect, useState } from 'react'
import SendImg from './SendImg'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { FcDownload } from "react-icons/fc";

const SharedImgs = ({ chatId }) => {
  const [sharedImgs, setSharedImgs] = useState([])
  console.log(sharedImgs);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      let sendedSMS = res.data().messages
      const sendImgs = []
      sendedSMS.forEach((sms, index) => {
        if (sms.img) {
          sendImgs.push(sms)
        }
      })
      setSharedImgs(sendImgs)
    })
    return () => { unSub() }
  }, [chatId])


  return (
    <div className={`collapse collapse-arrow rounded-none  `} >
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-base font-medium">Shared Photos</div>
      <div className="collapse-content flex flex-row flex-wrap gap-2">
        {sharedImgs.map((photo, index) => (
          <SendImg key={index} src={photo.img} />
        ))}
      </div>
    </div>
  )
}

export default SharedImgs
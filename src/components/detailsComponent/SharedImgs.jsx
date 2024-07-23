import React from 'react'
import SendImg from './SendImg'

const SharedImgs = () => {

  return (
    <div className={`collapse collapse-arrow rounded-none  `} >
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-base font-medium">Shared Photos</div>
      <div className="collapse-content flex flex-row flex-wrap gap-2">
        <SendImg src="/pfp.jpg" />
        <SendImg src="/pfp.jpg" />
        <SendImg src="/pfp.jpg" />
        <SendImg src="/coding.jpg" />
      </div>
    </div>
  )
}

export default SharedImgs
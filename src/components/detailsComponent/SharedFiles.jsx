import React from 'react'
import Files from './Files'

const SharedFiles = () => {
  
  return (
    <div className={`collapse collapse-arrow rounded-none border-b-2 border-base-300`} onClick={() => setClick(!click)}>
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-base font-medium">Shared Files</div>
      <div className="collapse-content gap-2 flex flex-col">
        <Files name="Blah" />
        <Files name="Ladedeeda" />
        <Files name="Blank Space" />
      </div>
    </div>
  )
}

export default SharedFiles
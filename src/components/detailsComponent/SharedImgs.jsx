import React, { useState } from 'react'

const SharedImgs = () => {
  const [click , setClick] = useState(false)
  return (
    <div className={`collapse collapse-arrow rounded-none ${click ? 'collapse-open' : 'collapse-close'}`} onClick={() => setClick(!click)}>
      <input type="radio" name="my-accordion-2" checked={click} />
      <div className="collapse-title text-base font-medium">Shared Photos</div>
      <div className="collapse-content">
        <div className=" flex items-center justify-between">
          <img src="/pfp.jpg" alt="" className=' w-12' />
          <button>download</button>
        </div>
        <div className=" flex items-center justify-between">
          <img src="/pfp.jpg" alt="" className=' w-12' />
          <button>download</button>
        </div>
        <div className=" flex items-center justify-between">
          <img src="/pfp.jpg" alt="" className=' w-12' />
          <button>download</button>
        </div>
        <div className=" flex items-center justify-between">
          <img src="/pfp.jpg" alt="" className=' w-12' />
          <button>download</button>
        </div>
      </div>
    </div>
  )
}

export default SharedImgs
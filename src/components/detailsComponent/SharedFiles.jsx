import React, { useState } from 'react'

const SharedFiles = () => {
  const [click , setClick] = useState(false)
  return (
    <div className={`collapse collapse-arrow rounded-none ${click ? 'collapse-open' : 'collapse-close'}`} onClick={() => setClick(!click)}>
      <input type="radio" name="my-accordion-2" checked={click} />
      <div className="collapse-title text-base font-medium">Shared Files</div>
      <div className="collapse-content">
        <p>blah blah blah</p>
        <p>blah blah blah</p>
        <p>blah blah blah</p>
        <p>blah blah blah</p>
      </div>
    </div>
  )
}

export default SharedFiles
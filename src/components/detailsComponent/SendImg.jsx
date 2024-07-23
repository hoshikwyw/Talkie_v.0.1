import React from 'react'
import { FcDownload } from "react-icons/fc";

const SendImg = ({ src }) => {
  return (
    <div className="card image-full size-28 shadow-xl group">
      <figure>
        <img
          src={src}
          alt="Shoes" />
      </figure>
      <div className="card-body items-center flex justify-center">
        <div className="card-actions justify-center items-center hidden group-hover:block">
          <div className="tooltip" data-tip="Download">
            <button className="btn btn-circle btn-base-100"><FcDownload size={28} /></button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SendImg
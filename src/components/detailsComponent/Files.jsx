import React from 'react'
import { FcDownload } from "react-icons/fc";

const Files = ({ name }) => {
    return (
        <div className=' w-full flex items-center justify-between group'>
            <div className=" flex items-center justify-between gap-2 w-full bg-base-300 py-2 px-3 rounded-md">
                <p className=' font-semibold text-base text-current'>{name}</p>
                <div className="tooltip" data-tip="Download">
                    <button className=' btn btn-sm btn-ghost'><FcDownload size={20} /></button>
                </div>

            </div>
        </div>
    )
}

export default Files
import React from 'react'
import { IoIosCall, IoIosVideocam, IoIosMore } from "react-icons/io";


const ChatHead = ({ name, avatar, status }) => {
    return (
        <div className="navbar bg-base-100 w-full flex justify-between shadow-md">
            <div className="avatar gap-5 flex justify-center items-center">
                <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
                <div className=" flex flex-col justify-start">
                    <p className=" text-xl font-semibold">{name}</p>
                    <p className=' font-semibold text-sm'>{status}</p>
                </div>
            </div>
            <div className=" flex items-center gap-3">
                <button className="btn glass"><IoIosCall size={20} /></button>
                <button className="btn glass"><IoIosVideocam size={20} /></button>
                <button className="btn glass"><IoIosMore size={20} /></button>
            </div>
        </div>
    )
}

export default ChatHead
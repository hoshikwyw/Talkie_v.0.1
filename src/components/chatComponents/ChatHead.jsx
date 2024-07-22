import React from 'react'
import { IoIosCall, IoIosVideocam, IoIosMore } from "react-icons/io";
import Avatar from '../listComponents/Avatar';


const ChatHead = ({ name, avatar, status }) => {
    return (
        <div className="navbar bg-base-100 w-full flex justify-between shadow-md">
            <div className=" gap-5 flex justify-center items-center px-3">
                <Avatar avatar={avatar} name={name} status={status} />
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
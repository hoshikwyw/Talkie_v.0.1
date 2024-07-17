import React from 'react'
import { IoIosClose } from "react-icons/io";
import UserInfo from './listComponents/UserInfo';


const List = () => {
    return (
        <>
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <p className=' w-full flex flex-row items-center justify-between'>
                    <h1 className=' text-xl font-semibold'>Messages</h1>
                    <label htmlFor="my-drawer" className="btn btn-ghost btn-primary drawer-button">
                        <IoIosClose size={36} />
                    </label>
                </p>
                <li className=' border-2 w-full overflow-hidden'>
                    <UserInfo name="Halsey" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" lastMessage="Hello, how are you?" status="online" />
                    <UserInfo name="John" lastMessage="dfjskdjgksjgjiefoijkl" status="offline" />
                    <UserInfo name="Daniel Jame" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" lastMessage="Hello, how are you?" status="online" />
                    <UserInfo name="Halsey" lastMessage="Hello, how are you?" status="online" />
                    <UserInfo name="John" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" lastMessage="dfjskdjgksjgjiefoijkl" status="offline" />
                    <UserInfo name="Daniel Jame" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" lastMessage="Hello, how are you?" status="online" />
                </li>
            </ul>
        </>

    )
}

export default List
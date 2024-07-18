import React, { useState } from 'react'
import { IoIosClose, IoMdSearch, IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import UserInfo from './listComponents/UserInfo';
import Avatar from './listComponents/Avatar';


const List = () => {
    const [clicked, setClicked] = useState(false)
    const handleAdd = (e) => {
        e.preventDefault()
        setClicked(!clicked)
    }

    return (
        <>
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <p className=' w-full flex flex-row items-center justify-between'>
                    <span className=' text-xl font-semibold'>Messages</span>
                    <label htmlFor="my-drawer" className="btn btn-ghost btn-primary drawer-button">
                        <IoIosClose size={36} />
                    </label>
                </p>
                <div className=' flex items-center justify-between '>
                    <form className=' flex items-center rounded-md gap-1 bg-base-300 text-base'>
                        <input type="text" placeholder='Search' className=' outline-none py-1 px-2 bg-transparent' />
                        <button><IoMdSearch size={24} color='gray' /></button>
                    </form>
                    {/* <button className='' onClick={handleAdd}>{clicked ? (<IoIosRemoveCircle size={34} color='gray' />) : (<IoIosAddCircle size={34} color='gray' />)}</button> */}
                    <label htmlFor="my_modal_6" className=" bg-base-300 rounded-md px-1 text-[12px] font-semibold py-2">Add New</label>
                </div>
                <li className=' border-2 w-full overflow-hidden'>
                    <UserInfo name="Halsey" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" lastMessage="Hello, how are you?" status="online" />
                    <UserInfo name="John" lastMessage="dfjskdjgksjgjiefoijkl" status="offline" />
                    <UserInfo name="Daniel Jame" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" lastMessage="Hello, how are you?" status="online" />
                    <UserInfo name="Halsey" lastMessage="Hello, how are you?" status="online" />
                    <UserInfo name="John" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" lastMessage="dfjskdjgksjgjiefoijkl" status="offline" />
                    <UserInfo name="Daniel Jame" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" lastMessage="Hello, how are you?" status="online" />
                </li>

            </ul>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form className=' flex items-center rounded-md gap-1 bg-base-300 text-base justify-between px-2 py-1'>
                        <input type="text" placeholder='Search' className=' outline-none py-1 px-2 bg-transparent' />
                        <button><IoMdSearch size={24} color='gray' /></button>
                    </form>
                    <div className=" mt-3 flex items-center border-2 px-3 py-2 rounded-md justify-between shadow-md">
                        <div className=" flex items-center gap-3">
                            <Avatar />
                            <p>Halsey</p>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <button className=' btn btn-sm'>Add</button>
                            <button className=' btn btn-sm'>Remove</button>
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn btn-sm">Cancel</label>
                    </div>
                </div>
            </div>
        </>

    )
}

export default List
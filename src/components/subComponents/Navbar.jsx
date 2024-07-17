import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";


const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <label htmlFor="my-drawer" className="btn btn-ghost btn-primary drawer-button"><IoIosMenu size={30} /></label>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Talkie</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <IoIosNotificationsOutline className=' size-7' />
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="/pfp.jpg" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
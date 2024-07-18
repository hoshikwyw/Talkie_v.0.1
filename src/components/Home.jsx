import React from 'react'
import Navbar from './subComponents/Navbar'
import Chat from './Chat'
import Detail from './Detail'
import List from './List'
import Login from './Login'

const Home = () => {
    const user = true
    return (
        <div data-theme="lemonade" className=' min-w-screen min-h-screen'>
            {user ? (
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Navbar />
                        <div className=" flex w-full mt-1">
                            <div className=" w-[70%] gap-2">
                                <Chat />
                            </div>
                            <div className=" w-[30%] border-s-2">
                                <Detail />
                            </div>
                        </div>
                    </div>
                    <div className="drawer-side">
                        <List />
                    </div>
                </div>

            ) : (
                <Login />
            )}
        </div>
    )
}

export default Home
import React, { useEffect } from 'react'
import Navbar from './subComponents/Navbar'
import Chat from './Chat'
import Detail from './Detail'
import List from './List'
import Login from './Login'
import { useUserStore } from '../lib/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import SideList from './listComponents/SideList'
import { useChatStore } from '../lib/chatStore'

const Home = () => {
    const { currentUser, isLoading, fetchUserInfo } = useUserStore()
    const { chatId } = useChatStore()
    // console.log(chatId);

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid)
        })
        return () => { unSub() }
    }, [fetchUserInfo])

    if (isLoading) return <div className=" loading absolute top-[40%] left-[50%] size-14 justify-center flex items-center">Loading...</div>;

    return (
        <div data-theme="nord" className=' min-h-screen overflow-hidden min-w-screen'>
            {currentUser ? (
                <div className="drawer ">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Navbar />
                        <div className=" flex w-full mt-1">
                            <div className=" w-[25%] bg-base-300 shadow-md hidden lg:block">
                                <SideList />
                            </div>
                            <div className=" w-full md:w-[70%] lg:w-[50%]">
                                {chatId && (<Chat />)}
                            </div>
                            <div className=" w-[30%] lg:w-[25%] bg-base-200 lg:block md:block hidden ">
                                {chatId && (<Detail />)}
                            </div>
                        </div>
                    </div>
                    <div className="drawer-side z-30">
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
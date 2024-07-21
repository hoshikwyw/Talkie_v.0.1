import React, { useEffect } from 'react'
import Navbar from './subComponents/Navbar'
import Chat from './Chat'
import Detail from './Detail'
import List from './List'
import Login from './Login'
import { useUserStore } from '../lib/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

const Home = () => {
    const { currentUser, isLoading, fetchUserInfo } = useUserStore()

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid)
        })
        return () => { unSub() }
    }, [fetchUserInfo])

    if (isLoading) return <div className=" loading absolute top-[40%] left-[50%] size-14 justify-center flex items-center">Loading...</div>;

    return (
        <div data-theme="lemonade" className=' min-w-screen min-h-screen'>
            {currentUser ? (
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
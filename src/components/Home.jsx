import React from 'react'
import Navbar from './subComponents/Navbar'
import Chat from './Chat'
import Detail from './Detail'
import List from './List'
import SideList from './listComponents/SideList'
import { useChatStore } from '../lib/chatStore'

const Home = () => {
    const { chatId } = useChatStore()

    return (
        <div data-theme="dim" className='min-h-screen overflow-hidden min-w-screen'>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Navbar />
                    <div className="flex w-full mt-1">
                        <div className="w-[25%] bg-base-300 shadow-md hidden lg:block">
                            <SideList />
                        </div>
                        <div className="w-full md:w-[70%] lg:w-[50%]">
                            {chatId ? (
                                <Chat />
                            ) : (
                                <div className="flex items-center justify-center h-[calc(100vh-4.4rem)] text-base-content/50">
                                    <p className="text-lg">Select a conversation to start chatting</p>
                                </div>
                            )}
                        </div>
                        <div className="w-[30%] lg:w-[25%] bg-base-200 lg:block md:block hidden">
                            {chatId && <Detail />}
                        </div>
                    </div>
                </div>
                <div className="z-30 drawer-side">
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Home

import React from 'react'
import List from './components/List'
import Detail from './components/Detail'
import Chat from './components/Chat'
import Navbar from './components/subComponents/Navbar'

const App = () => {
  return (
    <div data-theme="lemonade" className=' min-w-screen min-h-screen'>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar />
          <div className=" flex w-full mt-1">
            <div className=" w-[70%] gap-2">
              <Chat />
            </div>
            <div className=" w-[30%] border-2">
              <Detail />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <List />
        </div>
      </div>
    </div>
  )
}

export default App
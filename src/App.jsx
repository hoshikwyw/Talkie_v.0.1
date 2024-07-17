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
          {/* Page content here */}
          <Navbar />
          <Detail />
          <Chat />
        </div>
        <div className="drawer-side">
          <List />
        </div>
      </div>
    </div>
  )
}

export default App
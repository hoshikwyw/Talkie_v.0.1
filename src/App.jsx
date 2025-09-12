import React from 'react'
import Paths from './components/Paths'
import NotiAlert from './components/subComponents/NotiAlert'


const App = () => {
  return (
    <div data-theme="dim" className='relative min-h-screen min-w-screen'>
      <Paths />
      <NotiAlert />
    </div>
  )
}

export default App
import React from 'react'
import Paths from './components/Paths'
import NotiAlert from './components/subComponents/NotiAlert'


const App = () => {
  return (
    <div data-theme="nord" className=' min-w-screen min-h-screen relative'>
      <Paths />
      <NotiAlert />
    </div>
  )
}

export default App
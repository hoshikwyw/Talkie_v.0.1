import React from 'react'
import Paths from './components/Paths'
import NotiAlert from './components/subComponents/NotiAlert'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <div data-theme="dim" className='relative min-h-screen min-w-screen'>
        <Paths />
        <NotiAlert />
      </div>
    </ErrorBoundary>
  )
}

export default App

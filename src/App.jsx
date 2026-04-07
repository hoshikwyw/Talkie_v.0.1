import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import Paths from './components/Paths'
import NotiAlert from './components/subComponents/NotiAlert'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  const { fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => unSub()
  }, [fetchUserInfo])

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

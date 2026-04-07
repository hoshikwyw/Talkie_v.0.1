import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useUserStore } from '../lib/userStore'

const AuthGuard = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => { unSub() }
  }, [fetchUserInfo])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default AuthGuard

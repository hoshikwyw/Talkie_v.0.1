import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import RegisterPage from './RegisterPage'
import Profile from './Profile'
import AuthGuard from './AuthGuard'

const Paths = () => {
    return (
        <Routes>
            <Route element={<AuthGuard />}>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterPage />} />
        </Routes>
    )
}

export default Paths

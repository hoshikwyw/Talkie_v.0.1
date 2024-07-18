import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import RegisterPage from './RegisterPage'

const Paths = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<RegisterPage />} />
        </Routes>
    )
}

export default Paths
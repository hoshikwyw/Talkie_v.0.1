import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, signInWithGoogle } from '../lib/firebase'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) navigate('/', { replace: true })
        })
        return () => unSub()
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true)
            await signInWithGoogle()
        } catch (err) {
            if (err.code !== 'auth/cancelled-popup-request' && err.code !== 'auth/popup-closed-by-user') {
                toast.error(err.message)
            }
        } finally {
            setGoogleLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen gap-3'>
            <div className="flex flex-col items-center justify-center">
                <h1 className='text-2xl font-bold'>Welcome Back To</h1>
                <h1 className='text-lg font-semibold'>Walkie Talkie</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
                <form className='flex flex-col items-center justify-center gap-5' onSubmit={handleSubmit}>
                    <label className="relative flex items-center gap-2 input input-bordered">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" name='email' className="grow" placeholder="Email" />
                    </label>
                    <label className="relative flex items-center gap-2 input input-bordered">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input type="password" name='password' className="grow" placeholder='Password' />
                    </label>
                    <button className='btn btn-neutral btn-sm' disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                </form>
                <div className='flex items-center justify-center gap-3 text-sm font-semibold'>
                    <p className='cursor-pointer'>New to this ? Please register your account.</p>
                    <NavLink to="/register" className='btn btn-link'>Register</NavLink>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 icons">
                <button className="rounded btn btn-outline btn-sm btn-wide" onClick={handleGoogleLogin} disabled={googleLoading}>
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    {googleLoading ? 'Loading...' : 'LogIn with Google'}
                </button>
            </div>
        </div>
    )
}

export default Login

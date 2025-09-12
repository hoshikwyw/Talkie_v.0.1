import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, signInWithGoogle } from '../lib/firebase'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)
        // console.log(email, password);
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("user logged in successfully");
        } catch (err) {
            console.log(err, "error message");
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
            console.log(err)
            toast.error(err.message)
        } finally {
            setGoogleLoading(false)
        }
    }
    return (
        <div className='flex flex-col items-center w-full min-h-screen gap-3 justify-evenly'>
            <div className="flex flex-col items-center justify-center ">

                <h1 className='text-2xl font-bold '>Welcome Back To</h1>
                <h1 className='text-lg font-semibold '>Walkie Talkie</h1>
            </div>
            <div className="flex flex-col items-center justify-center ">
                <form action="" className='flex flex-col items-center justify-center gap-5 ' onSubmit={handleSubmit}>
                    <label className="relative flex items-center gap-2 input input-bordered">
                        {/* <div className="absolute right-0 label -top-7 ">
                            <span className=" text-red-600 font-semibold text-[10px]">password must be at least 8 characters</span>
                        </div> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" name='email' className="grow" placeholder="Email" />
                    </label>

                    <label className="relative flex items-center gap-2 input input-bordered">
                        {/* <div className="absolute right-0 label -top-7 ">
                            <span className=" text-red-600 font-semibold text-[10px]">password must be at least 8 characters</span>
                        </div> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type="password" name='password' className="grow" placeholder='Password' />
                    </label>
                    <button className=' btn btn-neutral btn-sm' disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                </form>
                <div className='flex items-center justify-center gap-3 text-sm font-semibold '>
                    <p className='cursor-pointer '>New to this ? Please register your account.</p>
                    <NavLink to="/register" className='btn btn-link'>Register</NavLink>
                </div>

            </div>
            <div className="flex flex-col items-center justify-center gap-3 icons">
                <h1 className='text-sm font-semibold '>Log in with</h1>
                <div className="flex gap-3 ">
                    <div className='tooltip tooltip-bottom' data-tip="Facebook"><button className=' btn btn-primary btn-ghost btn-circle'><img src="/fb.png" alt="" /></button></div>
                    <div className='tooltip tooltip-bottom' data-tip="Google"><button type='button' onClick={handleGoogleLogin} className=' btn btn-primary btn-ghost btn-circle' disabled={googleLoading}><img src="/gg.png" alt="" /></button></div>
                    <div className='tooltip tooltip-bottom' data-tip="X"><button className=' btn btn-primary btn-ghost btn-circle'><img src="/x.png" alt="" /></button></div>
                </div>
            </div>
        </div>
    )
}

export default Login
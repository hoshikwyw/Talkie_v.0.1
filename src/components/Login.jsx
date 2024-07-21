import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../lib/firebase'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)
        console.log(email, password);
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className=' flex w-full justify-evenly items-center flex-col min-h-screen gap-3'>
            <div className=" flex flex-col justify-center items-center">

                <h1 className=' font-bold text-2xl'>Welcome Back To</h1>
                <h1 className=' font-semibold text-lg'>Walkie Talkie</h1>
            </div>
            <div className=" flex flex-col justify-center items-center">
                <form action="" className=' flex justify-center items-center flex-col gap-5' onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center gap-2 relative">
                        {/* <div className="label absolute -top-7 right-0 ">
                            <span className=" text-red-600 font-semibold text-[10px]">password must be at least 8 characters</span>
                        </div> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" name='email' className="grow" placeholder="Email" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 relative">
                        {/* <div className="label absolute -top-7 right-0 ">
                            <span className=" text-red-600 font-semibold text-[10px]">password must be at least 8 characters</span>
                        </div> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type="password" name='password' className="grow" placeholder='Password' />
                    </label>
                    <button className=' btn' disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                </form>
                <div className=' flex justify-center items-center gap-3 font-semibold text-sm'>
                    <p className=' cursor-pointer'>New to this ? Please register your account.</p>
                    <NavLink to="/register" className='btn btn-ghost'>Register</NavLink>
                </div>

            </div>
            <div className="icons flex flex-col justify-center items-center gap-3">
                <h1 className=' font-semibold text-sm'>Log in with</h1>
                <div className=" flex gap-3">
                    <div className='tooltip tooltip-bottom' data-tip="Facebook"><button className=' btn btn-primary btn-ghost btn-circle'><img src="/fb.png" alt="" /></button></div>
                    <div className='tooltip tooltip-bottom' data-tip="Google"><button className=' btn btn-primary btn-ghost btn-circle'><img src="/gg.png" alt="" /></button></div>
                    <div className='tooltip tooltip-bottom' data-tip="X"><button className=' btn btn-primary btn-ghost btn-circle'><img src="/x.png" alt="" /></button></div>
                </div>
            </div>
        </div>
    )
}

export default Login
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, db } from '../lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import upload from '../lib/upload'
import { doc, setDoc } from 'firebase/firestore'

const RegisterPage = () => {
    const [profile, setProfile] = useState({
        file: null,
        url: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleProfile = (e) => {
        setProfile({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { username, email, password, confirmPassword } = Object.fromEntries(formData)

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const imgUrl = await upload(profile.file)
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                profile: imgUrl,
                id: res.user.uid,
                blocked: [],
            })
            await setDoc(doc(db, "userchats", res.user.uid), { chats: [] })
            toast.success("Registration Successful!")
            navigate("/")
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className=' flex w-full justify-between items-center flex-col min-h-screen gap-2 overflow-hidden'>
            <div className="flex flex-col items-center justify-center">

                <h1 className=' font-bold text-2xl'>Welcome To</h1>
                <h1 className=' font-semibold text-lg'>Walkie Talkie</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
                <form action="" className=' flex justify-center items-center flex-col gap-5' onSubmit={handleRegister}>
                    <label htmlFor="file">
                        {profile.url ?
                            (<img className=' w-28 h-28 rounded-md' src={profile.url} alt="" />) :
                            (
                                <div className=' relative cursor-pointer'>
                                    <img className=' w-28 h-28 rounded-md opacity-35 shadow-xl' src="/noPfp.jpg" alt="" />
                                    <span className=' absolute top-10 left-3 font-semibold text-sm text-gray-700'>Upload Photo</span>
                                </div>)
                        }
                    </label>
                    <input type="file" name="file" id="file" className=' hidden' onChange={handleProfile} />
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
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text" name='username' className="grow" placeholder="Username" />
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
                        <input type="password" name='confirmPassword' className="grow" placeholder='Confirm Password' />
                    </label>
                    <button className=' btn' disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
                </form>
                <div className=' flex justify-center items-center gap-1 font-semibold text-sm'>
                    <p className=' cursor-pointer'>Already have an account ?</p>
                    <NavLink to="/" className='btn btn-ghost'>LogIn</NavLink>
                </div>

            </div>
            <div className="icons flex flex-col justify-center items-center gap-3">
                <h1 className=' font-semibold text-sm'>Register with</h1>
                <div className=" flex gap-3">
                    <div className='tooltip tooltip-bottom' data-tip="Facebook"><button className=' btn btn-primary btn-ghost btn-circle'><img src="/fb.png" alt="" /></button></div>
                    <div className='tooltip tooltip-bottom' data-tip="Google"><button className=' btn btn-primary btn-ghost btn-circle'><img src="/gg.png" alt="" /></button></div>
                    <div className='tooltip tooltip-bottom' data-tip="X"><button className=' btn btn-primary btn-ghost btn-circle'><img src="/x.png" alt="" /></button></div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
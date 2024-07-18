import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const RegisterPage = () => {
    const [profile, setProfile] = useState({
        file: null,
        url: ""
    })
    const handleProfile = (e) => {
        setProfile({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) })
    }
    return (
        <div className=' flex w-full justify-center items-center flex-col min-h-screen gap-3'>
            <h1 className=' font-bold text-2xl'>Welcome To</h1>
            <h1 className=' font-semibold text-lg'>Walkie Talkie</h1>
            <form action="" className=' flex justify-center items-center flex-col gap-3'>
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
                <label className="input input-bordered flex items-center gap-2">
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
                    <input type="text" className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Username" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
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
                    <input type="password" className="grow" placeholder='Password' />
                </label>
                <label className="input input-bordered flex items-center gap-2">
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
                    <input type="password" className="grow" placeholder='Confirm Password' />
                </label>
                <button className=' btn'>Register</button>
            </form>
            <div className=' flex justify-center items-center gap-1 font-semibold text-sm'>
                <p className=' cursor-pointer'>Already have an account ?</p>
                <NavLink to="/" className='btn btn-ghost'>LogIn</NavLink>
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
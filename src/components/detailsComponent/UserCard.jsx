import React from 'react'

const UserCard = ({ name, avatar, status }) => {
    return (
        <div className=' flex flex-col justify-center items-center py-2 border-b-2'>
            <div className="avatar">
                <div className=" w-32 rounded-full">
                    <img src={avatar} />
                </div>
            </div>
            <h1 className="text-xl font-bold">{name}</h1>
            <h1 className="text-sm font-semibold">{status}</h1>
        </div>
    )
}

export default UserCard
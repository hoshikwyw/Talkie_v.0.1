import React from 'react';
import Avvvatars from 'avvvatars-react';

const Avatar = ({ avatar, name, status }) => (
    <div className={`avatar ${status === 'online' ? 'ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2' : 'w-10 rounded-full ring-offset-base-100 ring ring-offset-2 ring-gray-400'}`}>
        <div className="w-12 rounded-full">
            {avatar ? <img src={avatar} alt={name} /> : <Avvvatars value={name} size={40} />}
        </div>
    </div>
);
const UserInfo = ({ name, avatar, lastMessage, status }) => (
    <div className='my-2 w-full flex items-center'>
        <Avatar avatar={avatar} name={name} status={status} />
        <div className='flex flex-col gap-1 justify-start ms-2'>
            <h1 className='font-semibold text-md truncate'>{name}</h1>
            <h1 className='text-sm truncate'>{lastMessage}</h1>
        </div>
    </div>
);

export default UserInfo;

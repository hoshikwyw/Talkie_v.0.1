import React from 'react';
import Avatar from './Avatar';


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

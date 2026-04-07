import Avatar from './Avatar'

const UserInfo = ({ name, avatar, lastMessage, online }) => (
  <div className='flex items-center gap-3 w-full py-1'>
    <Avatar avatar={avatar} name={name} size={36} online={online} />
    <div className='flex flex-col min-w-0'>
      <span className='font-body text-lg text-pixel-cream truncate'>{name}</span>
      <span className='font-body text-sm text-pixel-muted truncate'>{lastMessage}</span>
    </div>
  </div>
)

export default UserInfo

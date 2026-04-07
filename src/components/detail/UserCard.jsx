import Avatar from '../sidebar/Avatar'

const UserCard = ({ name, avatar }) => {
  return (
    <div className="flex flex-col items-center py-6 px-4 border-b-3 border-pixel-cream/10 bg-surface">
      <Avatar avatar={avatar} name={name} size={80} online={true} />
      <h2 className="font-pixel text-[10px] text-pixel-cream mt-4 text-shadow-pixel">{name}</h2>
      <span className="font-body text-sm text-pixel-green mt-1">online</span>
    </div>
  )
}

export default UserCard

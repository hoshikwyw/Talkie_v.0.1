import Avvvatars from 'avvvatars-react'

const Avatar = ({ avatar, name, size = 40, online = false }) => {
  return (
    <div className={`pixel-avatar ${online ? 'pixel-avatar-online' : ''} rounded-sm overflow-hidden flex-shrink-0`}
         style={{ width: size + 6, height: size + 6 }}>
      {avatar ? (
        <img src={avatar} alt={name} className="object-cover w-full h-full" style={{ imageRendering: 'auto' }} />
      ) : (
        <Avvvatars value={name || 'user'} size={size} />
      )}
    </div>
  )
}

export default Avatar
